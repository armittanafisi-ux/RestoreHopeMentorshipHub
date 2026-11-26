import { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { Trash2 } from "lucide-react";
import { db } from "../firebaseConfig";
import {
  AddGoalModal,
  LogMeetingModal,
  UpdateGoalModal,
} from "./GoalModals";
import type { Goal } from "./GoalModals";

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [activeModal, setActiveModal] = useState<
    "meeting" | "add" | "update" | null
  >(null);

  useEffect(() => {
    const goalsQuery = query(
      collection(db, "goals"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      goalsQuery,
      (snapshot) => {
        const loadedGoals = snapshot.docs.map((item) => {
          const data = item.data();
          return {
            id: item.id,
            title: String(data.title ?? ""),
            date: String(data.date ?? ""),
            completed: Boolean(data.completed),
          };
        });

        setGoals(loadedGoals);
        setLoading(false);
      },
      (cause) => {
        console.error("Failed to load goals:", cause);
        setError("Unable to load goals from Firebase. Check your connection.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const completedCount = goals.filter((goal) => goal.completed).length;
  const percentage =
    goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0;

  async function handleAddGoal(title: string, targetDate: string) {
    setError("");
    try {
      await addDoc(collection(db, "goals"), {
        title: title.toUpperCase(),
        date: targetDate.toUpperCase(),
        completed: false,
        createdAt: serverTimestamp(),
      });
    } catch (cause) {
      console.error("Failed to add goal:", cause);
      if (cause instanceof FirebaseError) {
        setError(`Firebase error (${cause.code}): Unable to save goal.`);
      } else {
        setError("Unable to save goal. Please try again.");
      }
      throw cause;
    }
  }

  async function handleUpdateGoal(id: string, completed: boolean) {
    setError("");
    try {
      const goalRef = doc(db, "goals", id);
      await updateDoc(goalRef, { completed });
    } catch (cause) {
      console.error("Failed to update goal:", cause);
      setError("Unable to update goal status.");
      throw cause;
    }
  }

  async function handleDeleteGoal(id: string) {
    if (saving) return;
    setError("");
    setSaving(true);
    try {
      await deleteDoc(doc(db, "goals", id));
    } catch (cause) {
      console.error("Failed to delete goal:", cause);
      setError("Unable to delete goal.");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogMeeting(
    date: string,
    duration: string,
    notes: string
  ) {
    setError("");
    try {
      await addDoc(collection(db, "meetings"), {
        date,
        duration,
        notes,
        createdAt: serverTimestamp(),
      });
    } catch (cause) {
      console.error("Failed to log meeting:", cause);
      setError("Unable to save meeting.");
      throw cause;
    }
  }

  return (
    <main className="min-h-screen bg-[#f1def1] p-5 text-left text-[#3c2941] [color-scheme:light] sm:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="m-0! text-2xl! font-semibold! tracking-normal! text-[#3c2941]!">
            GOALS
          </h1>
        </header>

        {error && (
          <p role="alert" className="mb-4 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <section
            aria-labelledby="completion-heading"
            className="flex flex-col items-center justify-between rounded-2xl border border-[#e4cce7] bg-[#fffaff] p-6 lg:col-span-5"
          >
            <div className="w-full text-left">
              <h2
                id="completion-heading"
                className="m-0! text-base! font-semibold! uppercase text-[#3c2941]!"
              >
                GOAL COMPLETION
              </h2>
            </div>

            <div className="relative my-8 flex items-center justify-center">
              <svg className="h-56 w-56 -rotate-90 transform">
                <circle
                  cx="112"
                  cy="112"
                  r="90"
                  stroke="#e4cce7"
                  strokeWidth="16"
                  fill="transparent"
                />
                <circle
                  cx="112"
                  cy="112"
                  r="90"
                  stroke="#73457d"
                  strokeWidth="16"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 90}
                  strokeDashoffset={
                    (2 * Math.PI * 90 * (100 - percentage)) / 100
                  }
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-out"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-5xl font-bold text-[#3c2941]">
                  {percentage}%
                </span>
                <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#3c2941]/75">
                  COMPLETE
                </span>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3">
              <button
                type="button"
                onClick={() => setActiveModal("meeting")}
                className="group flex w-full items-center gap-4 rounded-xl border border-[#e4cce7] bg-white p-4 text-left transition-colors hover:bg-[#f1def1]/50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#b8dedb] text-sm font-semibold text-[#3c2941]">
                  01
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide text-[#3c2941]">
                  LOG MEETING
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModal("add")}
                className="group flex w-full items-center gap-4 rounded-xl border border-[#e4cce7] bg-white p-4 text-left transition-colors hover:bg-[#f1def1]/50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#b8dedb] text-sm font-semibold text-[#3c2941]">
                  02
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide text-[#3c2941]">
                  ADD GOAL
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModal("update")}
                className="group flex w-full items-center gap-4 rounded-xl border border-[#e4cce7] bg-white p-4 text-left transition-colors hover:bg-[#f1def1]/50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#b8dedb] text-sm font-semibold text-[#3c2941]">
                  03
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide text-[#3c2941]">
                  UPDATE GOAL
                </span>
              </button>
            </div>
          </section>

          <section
            aria-labelledby="all-goals-heading"
            className="flex flex-col gap-4 lg:col-span-7"
          >
            <div>
              <h2
                id="all-goals-heading"
                className="m-0! text-base! font-semibold! uppercase text-[#3c2941]!"
              >
                ALL GOALS
              </h2>
              <p className="mt-1! text-xs font-medium uppercase text-[#3c2941]/75">
                {completedCount} OF {goals.length} COMPLETED
              </p>
            </div>

            {loading ? (
              <p role="status" className="text-sm text-[#3c2941]/80">
                Loading goals from Firebase…
              </p>
            ) : goals.length === 0 ? (
              <div className="rounded-2xl border border-[#e4cce7] bg-[#fffaff] p-8 text-center text-sm text-[#3c2941]/70">
                No goals added yet. Click "Add Goal" to create one.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-[#e4cce7] bg-[#fffaff] p-5 transition-colors hover:border-[#73457d]/40"
                  >
                    <button
                      type="button"
                      onClick={() => handleUpdateGoal(goal.id, !goal.completed)}
                      className="flex-1 text-left"
                    >
                      <h3 className="text-base font-semibold tracking-wide text-[#3c2941]">
                        {goal.title}
                      </h3>
                      <p className="mt-1 text-xs font-medium uppercase text-[#3c2941]/60">
                        TARGET: {goal.date}
                      </p>
                    </button>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateGoal(goal.id, !goal.completed)
                        }
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                          goal.completed
                            ? "bg-[#b8dedb] text-[#3c2941]"
                            : "bg-[#f1def1] text-[#3c2941]/75"
                        }`}
                      >
                        {goal.completed ? "COMPLETED" : "NOT COMPLETED"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteGoal(goal.id)}
                        aria-label={`Delete ${goal.title}`}
                        className="rounded-lg p-1.5 text-[#3c2941]/60 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {activeModal === "meeting" && (
        <LogMeetingModal
          onClose={() => setActiveModal(null)}
          onLogMeeting={handleLogMeeting}
        />
      )}

      {activeModal === "add" && (
        <AddGoalModal
          onClose={() => setActiveModal(null)}
          onAddGoal={handleAddGoal}
        />
      )}

      {activeModal === "update" && (
        <UpdateGoalModal
          onClose={() => setActiveModal(null)}
          goals={goals}
          onUpdateGoal={handleUpdateGoal}
        />
      )}
    </main>
  );
}