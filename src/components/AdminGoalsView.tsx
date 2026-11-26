import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom";

interface Goal {
  id: string;
  title: string;
  date: string;
  completed: boolean;
}

interface Meeting {
  id: string;
  date: string;
  duration: string;
  notes: string;
}

export default function AdminGoalsView() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all goals globally
    const goalsQuery = query(collection(db, "goals"), orderBy("createdAt", "desc"));
    const unsubscribeGoals = onSnapshot(goalsQuery, (snapshot) => {
      const loadedGoals = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: String(doc.data().title ?? ""),
        date: String(doc.data().date ?? ""),
        completed: Boolean(doc.data().completed),
      }));
      setGoals(loadedGoals);
    });

    // Fetch all meetings globally
    const meetingsQuery = query(collection(db, "meetings"), orderBy("createdAt", "desc"));
    const unsubscribeMeetings = onSnapshot(meetingsQuery, (snapshot) => {
      const loadedMeetings = snapshot.docs.map((doc) => ({
        id: doc.id,
        date: String(doc.data().date ?? ""),
        duration: String(doc.data().duration ?? ""),
        notes: String(doc.data().notes ?? ""),
      }));
      setMeetings(loadedMeetings);
      setLoading(false);
    });

    return () => {
      unsubscribeGoals();
      unsubscribeMeetings();
    };
  }, []);

  const completedCount = goals.filter((g) => g.completed).length;
  const percentage = goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0;

  return (
    <main className="min-h-screen bg-[#f1def1] p-5 text-left text-[#3c2941] [color-scheme:light] sm:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="m-0! text-2xl! font-semibold! tracking-normal! text-[#3c2941]!">
              ADMIN OVERSIGHT: GOALS & MEETINGS
            </h1>
            <p className="mt-1 text-xs font-medium uppercase text-[#3c2941]/75">
              Viewing all program goals and logged sessions across users.
            </p>
          </div>
          <Link
            to="/admin-matching"
            className="text-xs font-bold text-[#3c2941] hover:underline"
          >
            ← BACK TO MATCHING
          </Link>
        </header>

        {loading ? (
          <p role="status" className="text-sm text-[#3c2941]/80">
            Loading data from Firebase…
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Global Goals Overview */}
            <section className="flex flex-col gap-4 lg:col-span-6">
              <h2 className="text-base font-semibold uppercase text-[#3c2941]">
                ALL PROGRAM GOALS ({goals.length})
              </h2>

              <div className="rounded-2xl border border-[#e4cce7] bg-[#fffaff] p-5">
                <div className="mb-4 flex items-center justify-between text-xs font-bold uppercase text-[#3c2941]">
                  <span>OVERALL COMPLETION</span>
                  <span>{percentage}% ({completedCount}/{goals.length})</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#e4cce7]">
                  <div
                    className="h-full bg-[#73457d] transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {goals.length === 0 ? (
                <div className="rounded-2xl border border-[#e4cce7] bg-[#fffaff] p-6 text-center text-sm text-[#3c2941]/70">
                  No goals have been created by users yet.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {goals.map((goal) => (
                    <div
                      key={goal.id}
                      className="flex items-center justify-between rounded-2xl border border-[#e4cce7] bg-[#fffaff] p-4"
                    >
                      <div>
                        <h3 className="text-sm font-semibold tracking-wide text-[#3c2941]">
                          {goal.title}
                        </h3>
                        <p className="mt-0.5 text-[11px] font-medium uppercase text-[#3c2941]/60">
                          TARGET: {goal.date}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                          goal.completed
                            ? "bg-[#b8dedb] text-[#3c2941]"
                            : "bg-[#f1def1] text-[#3c2941]/75"
                        }`}
                      >
                        {goal.completed ? "COMPLETED" : "PENDING"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Global Meetings Log */}
            <section className="flex flex-col gap-4 lg:col-span-6">
              <h2 className="text-base font-semibold uppercase text-[#3c2941]">
                LOGGED MEETINGS ({meetings.length})
              </h2>

              {meetings.length === 0 ? (
                <div className="rounded-2xl border border-[#e4cce7] bg-[#fffaff] p-6 text-center text-sm text-[#3c2941]/70">
                  No meetings have been logged by users yet.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {meetings.map((meeting) => (
                    <div
                      key={meeting.id}
                      className="rounded-2xl border border-[#e4cce7] bg-[#fffaff] p-4"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#3c2941]">
                          DATE: {meeting.date}
                        </span>
                        <span className="rounded bg-[#b8dedb] px-2 py-0.5 text-[10px] font-semibold text-[#3c2941]">
                          {meeting.duration}
                        </span>
                      </div>
                      <p className="text-xs text-[#3c2941]/80 mt-2">
                        {meeting.notes || "No notes provided."}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}