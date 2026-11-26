import { useState } from "react";
import type { FormEvent } from "react";
import { X } from "lucide-react";

export interface Goal {
  id: string;
  title: string;
  date: string;
  completed: boolean;
}

export interface ModalProps {
  onClose: () => void;
  onAddGoal?: (title: string, targetDate: string) => Promise<void> | void;
  onUpdateGoal?: (id: string, completed: boolean) => Promise<void> | void;
  onLogMeeting?: (date: string, duration: string, notes: string) => Promise<void> | void;
  goals?: Goal[];
}

export function LogMeetingModal({ onClose, onLogMeeting }: ModalProps) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const inputClass =
    "w-full rounded-lg border border-[#e4cce7] bg-white px-3 py-2 text-sm text-[#3c2941] focus:outline-none focus:ring-2 focus:ring-[#73457d]";
  const labelClass = "mb-1 block text-xs font-medium uppercase text-[#3c2941]";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;

    const formData = new FormData(event.currentTarget);
    const date = String(formData.get("date") ?? "").trim();
    const duration = String(formData.get("duration") ?? "").trim();
    const notes = String(formData.get("notes") ?? "").trim();

    if (!date || !duration) {
      setError("Enter both a meeting date and duration.");
      return;
    }

    setError("");
    setSaving(true);

    try {
      if (onLogMeeting) await onLogMeeting(date, duration, notes);
      onClose();
    } catch {
      setError("Unable to save meeting. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-[#e4cce7] bg-[#fffaff] p-6 text-[#3c2941] shadow-xl">
        <div className="mb-1 flex items-start justify-between">
          <h2 className="text-lg font-semibold uppercase tracking-wide">
            LOG MEETING
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="flex items-center gap-1 text-xs font-semibold uppercase text-[#3c2941]/70 hover:text-[#3c2941] disabled:opacity-50"
          >
            CLOSE <X size={16} />
          </button>
        </div>
        <p className="mb-5 text-xs uppercase text-[#3c2941]/75">
          RECORD A MEETING WITH YOUR MENTOR.
        </p>

        <form onSubmit={handleSubmit} aria-busy={saving} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="meetingDate" className={labelClass}>
                Meeting Date
              </label>
              <input
                id="meetingDate"
                name="date"
                type="date"
                className={inputClass}
                disabled={saving}
                required
              />
            </div>
            <div>
              <label htmlFor="meetingDuration" className={labelClass}>
                Duration (Minutes)
              </label>
              <input
                id="meetingDuration"
                name="duration"
                type="text"
                placeholder="45 MIN"
                maxLength={30}
                className={inputClass}
                disabled={saving}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="meetingNotes" className={labelClass}>
              Notes
            </label>
            <textarea
              id="meetingNotes"
              name="notes"
              rows={4}
              maxLength={500}
              placeholder="Write meeting notes..."
              className={`${inputClass} resize-none`}
              disabled={saving}
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-lg border border-[#e4cce7] bg-white px-5 py-2 text-xs font-semibold uppercase hover:bg-[#f1def1] disabled:opacity-60"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#b8dedb] px-5 py-2 text-xs font-semibold uppercase hover:bg-[#a5cfcc] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "SAVING..." : "SAVE MEETING"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AddGoalModal({ onClose, onAddGoal }: ModalProps) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const inputClass =
    "w-full rounded-lg border border-[#e4cce7] bg-white px-3 py-2 text-sm text-[#3c2941] focus:outline-none focus:ring-2 focus:ring-[#73457d]";
  const labelClass = "mb-1 block text-xs font-medium uppercase text-[#3c2941]";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;

    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const targetDate = String(formData.get("targetDate") ?? "").trim();

    if (!title || title.length > 120) {
      setError("Enter a goal title up to 120 characters.");
      return;
    }

    setError("");
    setSaving(true);

    try {
      if (onAddGoal) await onAddGoal(title, targetDate || "NO TARGET DATE");
      onClose();
    } catch {
      setError("Unable to save goal. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-[#e4cce7] bg-[#fffaff] p-6 text-[#3c2941] shadow-xl">
        <div className="mb-1 flex items-start justify-between">
          <h2 className="text-lg font-semibold uppercase tracking-wide">
            ADD GOAL
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="flex items-center gap-1 text-xs font-semibold uppercase text-[#3c2941]/70 hover:text-[#3c2941] disabled:opacity-50"
          >
            CLOSE <X size={16} />
          </button>
        </div>
        <p className="mb-5 text-xs uppercase text-[#3c2941]/75">
          SET A CLEAR NEXT STEP WITH YOUR MENTEE.
        </p>

        <form onSubmit={handleSubmit} aria-busy={saving} className="space-y-4">
          <div>
            <label htmlFor="goalTitle" className={labelClass}>
              Goal Title
            </label>
            <input
              id="goalTitle"
              name="title"
              type="text"
              placeholder="Enter a goal title..."
              maxLength={120}
              className={inputClass}
              disabled={saving}
              required
            />
          </div>

          <div>
            <label htmlFor="goalTargetDate" className={labelClass}>
              Target Date
            </label>
            <input
              id="goalTargetDate"
              name="targetDate"
              type="date"
              className={inputClass}
              disabled={saving}
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-lg border border-[#e4cce7] bg-white px-5 py-2 text-xs font-semibold uppercase hover:bg-[#f1def1] disabled:opacity-60"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#b8dedb] px-5 py-2 text-xs font-semibold uppercase hover:bg-[#a5cfcc] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "SAVING..." : "ADD GOAL"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function UpdateGoalModal({
  onClose,
  goals = [],
  onUpdateGoal,
}: ModalProps) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const inputClass =
    "w-full rounded-lg border border-[#e4cce7] bg-white px-3 py-2 text-sm text-[#3c2941] focus:outline-none focus:ring-2 focus:ring-[#73457d]";
  const labelClass = "mb-1 block text-xs font-medium uppercase text-[#3c2941]";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;

    const formData = new FormData(event.currentTarget);
    const goalId = String(formData.get("goalId") ?? "");
    const status = String(formData.get("status") ?? "");

    if (!goalId || (status !== "completed" && status !== "not_completed")) {
      setError("Select both a goal and a status.");
      return;
    }

    setError("");
    setSaving(true);

    try {
      if (onUpdateGoal) await onUpdateGoal(goalId, status === "completed");
      onClose();
    } catch {
      setError("Unable to update goal. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-[#e4cce7] bg-[#fffaff] p-6 text-[#3c2941] shadow-xl">
        <div className="mb-1 flex items-start justify-between">
          <h2 className="text-lg font-semibold uppercase tracking-wide">
            UPDATE GOAL
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="flex items-center gap-1 text-xs font-semibold uppercase text-[#3c2941]/70 hover:text-[#3c2941] disabled:opacity-50"
          >
            CLOSE <X size={16} />
          </button>
        </div>
        <p className="mb-5 text-xs uppercase text-[#3c2941]/75">
          CHOOSE A GOAL AND RECORD THE LATEST PROGRESS.
        </p>

        <form onSubmit={handleSubmit} aria-busy={saving} className="space-y-4">
          <div>
            <label htmlFor="selectGoal" className={labelClass}>
              Goal
            </label>
            <select
              id="selectGoal"
              name="goalId"
              defaultValue=""
              className={inputClass}
              disabled={saving || goals.length === 0}
              required
            >
              <option value="" disabled>
                {goals.length === 0 ? "No goals available" : "Select a goal"}
              </option>
              {goals.map((goal) => (
                <option key={goal.id} value={goal.id}>
                  {goal.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="selectStatus" className={labelClass}>
              Status
            </label>
            <select
              id="selectStatus"
              name="status"
              defaultValue=""
              className={inputClass}
              disabled={saving}
              required
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="completed">Completed</option>
              <option value="not_completed">Not Completed</option>
            </select>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-lg border border-[#e4cce7] bg-white px-5 py-2 text-xs font-semibold uppercase hover:bg-[#f1def1] disabled:opacity-60"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={saving || goals.length === 0}
              className="rounded-lg bg-[#b8dedb] px-5 py-2 text-xs font-semibold uppercase hover:bg-[#a5cfcc] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "SAVING..." : "SAVE CHANGES"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}