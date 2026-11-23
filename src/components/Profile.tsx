import { Link } from "react-router-dom";
import { User } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#F2E3F3] p-8 font-sans">
      <h1 className="text-3xl font-extrabold text-slate-800 tracking-wide mb-8">
        PROFILE
      </h1>

      <div className="bg-white rounded-3xl p-8 shadow-sm max-w-xl mx-auto flex flex-col items-center text-center gap-4">
        <div className="w-20 h-20 rounded-full bg-slate-700 text-white flex items-center justify-center mb-2">
          <User size={36} />
        </div>
        <h2 className="text-xl font-bold text-slate-800">PROFILE DASHBOARD</h2>
        <p className="text-sm text-slate-500 mb-4">Quick links to different portal views.</p>

        <Link
          to="/mentee-dashboard"
          className="w-full bg-[#A8E6CF] text-slate-800 font-bold py-3 px-6 rounded-2xl shadow-sm hover:bg-[#95dbc3] transition-colors"
        >
          VIEW MENTEE DASHBOARD
        </Link>

        <Link
          to="/admin-matching"
          className="w-full bg-[#EAD5EE] text-slate-800 font-bold py-3 px-6 rounded-2xl shadow-sm hover:bg-[#dec2e3] transition-colors"
        >
          VIEW ADMIN TASK PAGE (MATCHING)
        </Link>
      </div>
    </div>
  );
};

export default Profile;