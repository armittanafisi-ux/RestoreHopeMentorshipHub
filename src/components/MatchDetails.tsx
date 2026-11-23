import { useLocation, useParams, Link } from "react-router-dom";
import { User, Check, Minus } from "lucide-react";
import { INITIAL_PAIRINGS, type Pairing } from "../components/pairingsData";

const MatchDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const pair: Pairing =
    location.state?.pair ||
    INITIAL_PAIRINGS.find((p) => p.id === id) ||
    INITIAL_PAIRINGS[0];

  const pastMeetings = [
    {
      date: "16 NOV 2026",
      duration: "45 MIN",
      title: "PROGRESS CHECK-IN",
      notes: "REVIEWED CAREER OPTIONS AND NEXT STEPS.",
    },
    {
      date: "9 NOV 2026",
      duration: "45 MIN",
      title: "CAREER EXPLORATION",
      notes: "DISCUSSED STRENGTHS AND STUDY ROUTINES.",
    },
    {
      date: "2 NOV 2026",
      duration: "45 MIN",
      title: "INTRODUCTION & GOALS",
      notes: "AGREED PRIORITIES FOR THE MENTORING MATCH.",
    },
  ];

  const matchGoals = [
    {
      title: "BUILD A WEEKLY STUDY PLAN",
      status: "COMPLETED · 9 NOV 2026",
      completed: true,
    },
    {
      title: "EXPLORE THREE CAREER PATHS",
      status: "COMPLETED · 16 NOV 2026",
      completed: true,
    },
    {
      title: "PREPARE A PERSONAL ACTION PLAN",
      status: "IN PROGRESS · DUE 30 NOV 2026",
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F2E3F3] p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-wide">
            MATCH DETAILS
          </h1>
          <Link
            to="/admin-matching"
            className="text-xs font-bold text-slate-600 hover:text-purple-900 underline"
          >
            ← BACK TO MATCHING
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 flex flex-col">
            <span className="text-[11px] font-bold text-slate-500 tracking-wider mb-3">
              MENTOR
            </span>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#64416B] text-white flex items-center justify-center">
                <User size={24} />
              </div>
              <div>
                <p className="text-lg font-extrabold text-slate-800 tracking-wide">
                  {pair.mentor}
                </p>
                <Link
                  to="/profile"
                  className="text-[11px] font-bold text-slate-500 hover:text-purple-900 tracking-wider"
                >
                  VIEW PROFILE
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col">
            <span className="text-[11px] font-bold text-slate-500 tracking-wider mb-3">
              MENTEE
            </span>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#64416B] text-white flex items-center justify-center">
                <User size={24} />
              </div>
              <div>
                <p className="text-lg font-extrabold text-slate-800 tracking-wide">
                  {pair.mentee}
                </p>
                <Link
                  to="/mentee-dashboard"
                  className="text-[11px] font-bold text-slate-500 hover:text-purple-900 tracking-wider"
                >
                  VIEW PROFILE
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 md:border-l border-purple-200 md:pl-8 flex flex-col justify-center gap-2 text-xs font-bold text-slate-700 tracking-wider">
            <p>MATCHED ON: {pair.matchedDate || "2 NOV 2026"}</p>
            <p>LAST MEETING: {pair.lastMeeting || "16 NOV 2026"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <h2 className="text-lg font-extrabold text-slate-800 tracking-wide mb-4">
              PAST MEETINGS
            </h2>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="grid grid-cols-12 bg-[#EAD5EE]/50 px-6 py-3 text-[11px] font-bold text-slate-600 tracking-wider">
                <div className="col-span-3">DATE</div>
                <div className="col-span-3">DURATION</div>
                <div className="col-span-6">DISCUSSION</div>
              </div>

              <div className="divide-y divide-purple-100">
                {pastMeetings.map((meeting, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-12 px-6 py-5 text-xs items-start"
                  >
                    <div className="col-span-3 font-semibold text-slate-700">
                      {meeting.date}
                    </div>
                    <div className="col-span-3 font-semibold text-slate-700">
                      {meeting.duration}
                    </div>
                    <div className="col-span-6">
                      <p className="font-bold text-slate-800 tracking-wide mb-1">
                        {meeting.title}
                      </p>
                      <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                        {meeting.notes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <h2 className="text-lg font-extrabold text-slate-800 tracking-wide mb-4">
              GOALS
            </h2>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 tracking-wider mb-3">
                <span>2 OF 3 GOALS COMPLETED</span>
                <span>67%</span>
              </div>

              <div className="w-full h-2 bg-[#EAD5EE] rounded-full overflow-hidden mb-6">
                <div className="h-full bg-[#64416B] w-[67%] rounded-full" />
              </div>

              <div className="divide-y divide-purple-100">
                {matchGoals.map((goal, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        goal.completed
                          ? "bg-[#D5F0E3] text-emerald-700"
                          : "bg-[#EAD5EE] text-[#64416B]"
                      }`}
                    >
                      {goal.completed ? <Check size={14} /> : <Minus size={14} />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 tracking-wide">
                        {goal.title}
                      </p>
                      <p className="text-[11px] font-semibold text-slate-400 mt-1">
                        {goal.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;