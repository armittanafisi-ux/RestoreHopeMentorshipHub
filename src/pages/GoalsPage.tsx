//import NavBar from "../components/NavBar";
import GoalCompleteGraph from "../components/GoalCompleteGraph";

interface Goal {
  id: number;
  title: string;
  createdAt: string;
  completed: boolean;
}

// Placeholder data. Later this can come from Firebase.
const goals: Goal[] = [
  { id: 1, title: "GOAL 1", createdAt: "NOV 18, 2026", completed: true },
  { id: 2, title: "GOAL 2", createdAt: "NOV 16, 2026", completed: false },
  { id: 3, title: "GOAL 3", createdAt: "NOV 14, 2026", completed: false },
  { id: 4, title: "GOAL 4", createdAt: "NOV 12, 2026", completed: false },
];

const GoalsPage = () => {
  const completedCount = goals.filter((g) => g.completed).length;
  const percent = Math.round((completedCount / goals.length) * 100);

  return (
    <div className="min-h-screen bg-[#F2DDF2]">
      {/* <NavBar /> */}

      <div className="px-16 py-10">
        <h1 className="mb-12 text-3xl font-bold text-[#39263F]">GOALS</h1>

        <div className="flex flex-col gap-10 md:flex-row md:items-center">
          <div className="flex justify-center md:w-1/2">
            <GoalCompleteGraph percent={percent} trailColor="#FFFFFF" className="h-72 w-72" />
          </div>

          {/* List of goals */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-[#39263F]">ALL GOALS</h2>
            <p className="mb-4 text-sm text-[#39263F]">
              {completedCount} OF {goals.length} COMPLETED
            </p>

            <div className="flex flex-col gap-3">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className="flex items-center justify-between bg-[#FFF9FF] px-5 py-4 text-[#39263F]"
                >
                  <div>
                    <p className="text-lg">{goal.title}</p>
                    <p className="text-sm">CREATED {goal.createdAt}</p>
                  </div>
                  <p className="text-sm">
                    {goal.completed ? "COMPLETED" : "NOT COMPLETED"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsPage;