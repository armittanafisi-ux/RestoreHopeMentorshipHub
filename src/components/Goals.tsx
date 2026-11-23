import { useState } from "react";
import {LogMeetingModal, AddGoalModal, UpdateGoalModal} from "./GoalModals";

interface Goal {
    id: string;
    title: string;
    date: string;
    completed: boolean;
}

const Goals = () => {
  const [percentage] = useState<number>(0);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [activeModal, setActiveModal] = useState<"meeting" | "add" | "update" | null>(null);
  const completedCount = goals.filter((g) => g.completed).length;

  const handleAddGoal = (title: string, date: string) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: title.toUpperCase(),
      date: date.toUpperCase(),
      completed: false,
    };
    setGoals([newGoal, ...goals]);
  };

  const toggleGoalCompletion = (id: string) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

 return (
    <div className="min-h-screen bg-[#F2E3F3] p-8 font-sans">
      <h1 className="text-3xl font-extrabold text-slate-800 tracking-wide mb-8">
        GOALS
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
        <div className="lg:col-span-5 bg-white rounded-3xl p-8 shadow-sm flex flex-col items-center justify-between">
          <div className="w-full text-left">
            <h2 className="text-slate-700 font-bold text-sm tracking-wider">
              GOAL COMPLETION
            </h2>
          </div>

          <div className="relative flex items-center justify-center my-8">
            <svg className="w-56 h-56 transform -rotate-90">
              <circle
                cx="112"
                cy="112"
                r="90"
                stroke="#EAD5EE"
                strokeWidth="16"
                fill="transparent"
              />
              <circle
                cx="112"
                cy="112"
                r="90"
                stroke="#C7A3CE"
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
              <span className="text-5xl font-bold text-slate-800">
                {percentage}%
              </span>
              <span className="text-xs font-bold text-slate-600 tracking-wider mt-1">
                COMPLETE
              </span>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3">
            <button
              onClick={() => setActiveModal("meeting")}
              className="w-full bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#A8E6CF] text-slate-800 font-bold flex items-center justify-center text-sm shadow-inner">
                01
              </div>
              <span className="text-sm font-bold text-slate-800 tracking-wide group-hover:text-purple-900 transition-colors">
                LOG MEETING
              </span>
            </button>

            <button
              onClick={() => setActiveModal("add")}
              className="w-full bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#A8E6CF] text-slate-800 font-bold flex items-center justify-center text-sm shadow-inner">
                02
              </div>
              <span className="text-sm font-bold text-slate-800 tracking-wide group-hover:text-purple-900 transition-colors">
                ADD GOAL
              </span>
            </button>

            <button
              onClick={() => setActiveModal("update")}
              className="w-full bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#A8E6CF] text-slate-800 font-bold flex items-center justify-center text-sm shadow-inner">
                03
              </div>
              <span className="text-sm font-bold text-slate-800 tracking-wide group-hover:text-purple-900 transition-colors">
                UPDATE GOAL
              </span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="mb-1">
            <h2 className="text-lg font-extrabold text-slate-800 tracking-wide">ALL GOALS</h2>
            <p className="text-xs font-bold text-slate-500">{completedCount} OF {goals.length} COMPLETED</p>
          </div>

          <div className="flex flex-col gap-3">
            {goals.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center text-slate-400 font-medium text-sm shadow-sm">
                No goals added yet. Click "Add Goal" to create one!
              </div>
            ) : (
              goals.map((goal) => (
                <div 
                  key={goal.id}
                  onClick={() => toggleGoalCompletion(goal.id)}
                  className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div>
                    <h3 className="text-base font-bold text-slate-800 tracking-wide">{goal.title}</h3>
                    <p className="text-xs font-bold text-slate-400 mt-0.5">TARGET: {goal.date}</p>
                  </div>
                  <span className={`text-xs font-bold tracking-wider ${goal.completed ? "text-emerald-600" : "text-slate-400"}`}>
                    {goal.completed ? "COMPLETED" : "NOT COMPLETED"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {activeModal === "meeting" && <LogMeetingModal onClose={() => setActiveModal(null)} />}
      {activeModal === "add" && <AddGoalModal onClose={() => setActiveModal(null)} onAddGoal={handleAddGoal} />}
      {activeModal === "update" && <UpdateGoalModal onClose={() => setActiveModal(null)} />}
    </div>
  );
};

export default Goals;