import {useState} from "react";
import {X} from "lucide-react";

interface ModalProps {
  onClose: () => void;
}

interface AddGoalModalProps extends ModalProps {
    onAddGoal: (title: string, targetDate: string) => void;
}

export const LogMeetingModal = ({ onClose }: ModalProps) => {
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    console.log({ date, duration, notes });
    onClose();
};

return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-xl relative">
        <div className="flex justify-between items-start mb-1">
          <h2 className="text-lg font-extrabold text-slate-800 tracking-wide">LOG MEETING</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-xs font-bold">
            CLOSE <X size={16} />
          </button>
        </div>
        <p className="text-xs text-slate-500 mb-6 font-medium">RECORD A MEETING WITH YOUR MENTOR.</p>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">MEETING DATE</label>
              <input 
                type="text" 
                placeholder="DD / MM / YYYY" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">DURATION</label>
              <input 
                type="text" 
                placeholder="MINUTES" 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">NOTES</label>
            <textarea 
              rows={4}
              placeholder="---" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-purple-400 resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-5 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            CANCEL
          </button>
          <button onClick={handleSave} className="px-5 py-2 text-sm font-bold bg-[#A8E6CF] text-slate-800 hover:bg-[#95dbc3] rounded-xl shadow-sm transition-colors">
            SAVE MEETING
          </button>
        </div>
      </div>
    </div>
  );
};

export const AddGoalModal = ({ onClose, onAddGoal }: AddGoalModalProps) => {
  const [title, setTitle] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAddGoal(title, targetDate || "TODAY");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-xl relative">
        <div className="flex justify-between items-start mb-1">
          <h2 className="text-lg font-extrabold text-slate-800 tracking-wide">ADD GOAL</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-xs font-bold">
            CLOSE <X size={16} />
          </button>
        </div>
        <p className="text-xs text-slate-500 mb-6 font-medium">SET A CLEAR NEXT STEP WITH YOUR MENTEE.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">GOAL TITLE</label>
            <input 
              type="text" 
              placeholder="ADD A NEW GOAL TITLE..." 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-purple-400"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">TARGET DATE</label>
            <input 
              type="text" 
              placeholder="DD / MM / YYYY" 
              value={targetDate} 
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-5 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            CANCEL
          </button>
          <button onClick={handleAdd} className="px-5 py-2 text-sm font-bold bg-[#A8E6CF] text-slate-800 hover:bg-[#95dbc3] rounded-xl shadow-sm transition-colors">
            ADD GOAL
          </button>
        </div>
      </div>
    </div>
  );
};

export const UpdateGoalModal = ({ onClose }: ModalProps) => {
  const [goal, setGoal] = useState("");
  const [status, setStatus] = useState("");

  const handleUpdate = () => {
    console.log({ goal, status });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-xl relative">
        <div className="flex justify-between items-start mb-1">
          <h2 className="text-lg font-extrabold text-slate-800 tracking-wide">UPDATE GOAL</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-xs font-bold">
            CLOSE <X size={16} />
          </button>
        </div>
        <p className="text-xs text-slate-500 mb-6 font-medium">CHOOSE A GOAL AND RECORD THE LATEST PROGRESS.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">GOAL</label>
            <input 
              type="text" 
              placeholder="SELECT A GOAL..." 
              value={goal} 
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-purple-400"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">STATUS</label>
            <input 
              type="text" 
              placeholder="SELECT STATUS" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-5 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            CANCEL
          </button>
          <button onClick={handleUpdate} className="px-5 py-2 text-sm font-bold bg-[#A8E6CF] text-slate-800 hover:bg-[#95dbc3] rounded-xl shadow-sm transition-colors">
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
};