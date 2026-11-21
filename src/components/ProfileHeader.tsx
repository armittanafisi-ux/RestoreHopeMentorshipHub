interface ProfileHeaderProps {
  name: string;
  isEditing: boolean;
  onNameChange: (name: string) => void;
  onToggleEdit: () => void;
}

export default function ProfileHeader({
  name,
  isEditing,
  onNameChange,
  onToggleEdit,
}: ProfileHeaderProps) {
  return (
    <section className="flex flex-wrap items-center gap-6 rounded-[20px] border border-[#dcc6e4] bg-[#fdf8ff] px-6 py-5">
      <div
        className="grid h-[86px] w-[86px] shrink-0 place-items-center overflow-hidden rounded-[18px] bg-[#bfdfd9]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" width="84" height="84">
          <circle cx="50" cy="32" r="18" fill="#6b3f73" />
          <path d="M14 92c4-24 20-34 36-34s32 10 36 34z" fill="#6b3f73" />
        </svg>
      </div>

      {isEditing ? (
        <input
          className="min-w-0 flex-1 rounded-lg border border-[#dcc6e4] bg-white px-2.5 py-1 text-3xl font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b3f73]"
          value={name}
          aria-label="Your name"
          onChange={(e) => onNameChange(e.target.value)}
        />
      ) : (
        <h1 className="min-w-0 flex-1 text-3xl font-medium">{name}</h1>
      )}

      <button
        className="rounded-[10px] bg-[#bfdfd9] px-6 py-3 text-sm uppercase hover:bg-[#a9d0c8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b3f73] focus-visible:ring-offset-2"
        onClick={onToggleEdit}
      >
        {isEditing ? "Save profile" : "Edit profile"}
      </button>
    </section>
  );
}