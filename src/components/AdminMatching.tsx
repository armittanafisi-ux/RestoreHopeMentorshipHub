import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ListFilter } from "lucide-react";
import { INITIAL_PAIRINGS, type Pairing } from "../components/pairingsData";

const AdminMatching = () => {
  const navigate = useNavigate();
  const [pairings, setPairings] = useState<Pairing[]>(INITIAL_PAIRINGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMatchedOnly, setFilterMatchedOnly] = useState(false);
  const [mentorInput, setMentorInput] = useState("");
  const [menteeInput, setMenteeInput] = useState("");

  const handleManualMatch = () => {
    if (!mentorInput.trim() || !menteeInput.trim()) return;

    const newPairing: Pairing = {
      id: Date.now().toString(),
      mentor: mentorInput.toUpperCase(),
      mentee: menteeInput.toUpperCase(),
      interests: "GENERAL MENTORSHIP",
      availability: "FLEXIBLE",
      matched: true,
      matchedDate: "22 NOV 2026",
      lastMeeting: "N/A",
    };

    setPairings([newPairing, ...pairings]);
    setMentorInput("");
    setMenteeInput("");
  };

  const handleMatchPair = (id: string) => {
    setPairings(
      pairings.map((pair) =>
        pair.id === id
          ? {
              ...pair,
              matched: true,
              matchedDate: "22 NOV 2026",
              lastMeeting: "N/A",
            }
          : pair
      )
    );
  };

  const filteredPairings = pairings.filter((pair) => {
    const matchesSearch =
      pair.mentor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pair.mentee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pair.interests.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterMatchedOnly) {
      return matchesSearch && pair.matched;
    }
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F2E3F3] p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="relative flex-1 min-w-[260px] max-w-md">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
            />
            <input
              type="text"
              placeholder="SEARCH ALL PROFILES"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border border-slate-500 pl-10 pr-4 py-2 text-xs font-semibold tracking-wider text-slate-800 placeholder:text-slate-600 focus:outline-none focus:border-purple-900"
            />
          </div>

          <button
            onClick={() => setFilterMatchedOnly(!filterMatchedOnly)}
            className={`flex items-center gap-2 border border-slate-500 px-4 py-2 text-xs font-semibold tracking-wider transition-colors ${
              filterMatchedOnly
                ? "bg-purple-900 text-white border-purple-900"
                : "text-slate-800 hover:bg-white/40"
            }`}
          >
            <ListFilter size={16} />
            FILTER
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-10">
          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-slate-700 tracking-wider mb-2">
              ENTER MENTOR NAME...
            </label>
            <input
              type="text"
              value={mentorInput}
              onChange={(e) => setMentorInput(e.target.value)}
              className="w-full bg-white rounded-md px-4 py-3 text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-slate-700 tracking-wider mb-2">
              ENTER MENTEE NAME...
            </label>
            <input
              type="text"
              value={menteeInput}
              onChange={(e) => setMenteeInput(e.target.value)}
              className="w-full bg-white rounded-md px-4 py-3 text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="md:col-span-4">
            <button
              onClick={handleManualMatch}
              className="w-full bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm tracking-wider py-3 px-6 rounded-md shadow-sm transition-colors"
            >
              MATCH!
            </button>
          </div>
        </div>

        <h2 className="text-lg font-extrabold text-slate-800 tracking-wide mb-4">
          MENTOR & MENTEE PAIRINGS
        </h2>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-purple-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EAD5EE]/60 border-b border-purple-200 text-[11px] font-bold text-slate-700 tracking-wider">
                  <th className="py-3.5 px-5">MENTOR</th>
                  <th className="py-3.5 px-5">MENTEE</th>
                  <th className="py-3.5 px-5">SHARED INTERESTS</th>
                  <th className="py-3.5 px-5">SHARED AVAILABILITY</th>
                  <th className="py-3.5 px-5 text-center">MATCHED?</th>
                  <th className="py-3.5 px-5 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                {filteredPairings.map((pair) => (
                  <tr key={pair.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-5">{pair.mentor}</td>
                    <td className="py-3.5 px-5">{pair.mentee}</td>
                    <td className="py-3.5 px-5">{pair.interests}</td>
                    <td className="py-3.5 px-5">{pair.availability}</td>
                    <td className="py-3.5 px-5 text-center">
                      <span
                        className={`inline-block px-4 py-1 rounded-full text-[11px] font-bold tracking-wider ${
                          pair.matched
                            ? "bg-[#D5F0E3] text-slate-800"
                            : "bg-[#EAD5EE] text-slate-700"
                        }`}
                      >
                        {pair.matched ? "YES" : "NO"}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      {pair.matched ? (
                        <button
                          onClick={() => navigate(`/match-details/${pair.id}`, { state: { pair } })}
                          className="border border-slate-300 hover:border-slate-500 bg-white text-slate-700 text-[11px] font-bold tracking-wider px-4 py-1.5 rounded transition-colors"
                        >
                          VIEW MATCH
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMatchPair(pair.id)}
                          className="border border-slate-300 hover:border-slate-500 bg-white text-slate-700 text-[11px] font-bold tracking-wider px-4 py-1.5 rounded transition-colors"
                        >
                          MATCH PAIR
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMatching;