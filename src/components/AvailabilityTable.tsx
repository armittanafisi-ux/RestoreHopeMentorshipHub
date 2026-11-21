import { DAYS, SLOTS } from "../types";
import type { Availability, Day, SlotKey } from "../types";

interface AvailabilityTableProps {
  availability: Availability;
  isEditing: boolean;
  onToggleEdit: () => void;
  onToggleSlot: (day: Day, slot: SlotKey) => void;
}

export default function AvailabilityTable({
  availability,
  isEditing,
  onToggleEdit,
  onToggleSlot,
}: AvailabilityTableProps) {
  return (
    <section className="rounded-[20px] border border-[#dcc6e4] bg-[#fdf8ff] px-6 py-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[1.1rem] font-semibold uppercase">Availability</h2>
        <button
          className="rounded-[10px] bg-[#bfdfd9] px-6 py-3 text-sm uppercase hover:bg-[#a9d0c8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b3f73] focus-visible:ring-offset-2"
          onClick={onToggleEdit}
        >
          {isEditing ? "Save availability" : "Edit availability"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-center">
          <thead>
            <tr>
              <th
                scope="col"
                className="w-[22%] rounded-l-[10px] bg-[#bfdfd9] py-2.5 pl-3 text-left text-sm font-medium uppercase"
              >
                Day
              </th>
              {SLOTS.map((slot) => (
                <th
                  scope="col"
                  key={slot.key}
                  className="bg-[#bfdfd9] px-2 py-2.5 text-sm font-medium last:rounded-r-[10px]"
                >
                  <span className="block font-semibold uppercase">{slot.label}</span>
                  <span className="block text-xs font-normal">{slot.hours}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DAYS.map((day) => (
              <tr key={day} className="border-b border-[#dcc6e4] last:border-b-0">
                <th
                  scope="row"
                  className="w-[22%] py-3 pl-3 text-left text-sm font-normal uppercase"
                >
                  {day}
                </th>
                {SLOTS.map((slot) => {
                  const isOpen = availability[day][slot.key];
                  return (
                    <td key={slot.key} className="px-2 py-3">
                      {isEditing ? (
                        <input
                          type="checkbox"
                          className="h-[1.1rem] w-[1.1rem] cursor-pointer accent-[#6b3f73]"
                          checked={isOpen}
                          aria-label={`${day} ${slot.label}`}
                          onChange={() => onToggleSlot(day, slot.key)}
                        />
                      ) : isOpen ? (
                        "Available"
                      ) : (
                        "—"
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}