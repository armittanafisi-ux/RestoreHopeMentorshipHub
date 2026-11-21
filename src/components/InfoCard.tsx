export interface InfoRow {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

interface InfoCardProps {
  title: string;
  rows: InfoRow[];
  isEditing: boolean;
}

export default function InfoCard({ title, rows, isEditing }: InfoCardProps) {
  return (
    <section className="rounded-[20px] border border-[#dcc6e4] bg-[#fdf8ff] px-6 py-5">
      <h2 className="mb-3 text-[1.1rem] font-semibold uppercase">{title}</h2>
      <dl>
        {rows.map((row) => (
          <div
            key={row.label}
            className="border-b border-[#dcc6e4] py-2.5 last:border-b-0 last:pb-0"
          >
            <dt className="text-xs uppercase">{row.label}</dt>
            <dd className="mt-1 min-h-[1.4rem] text-[0.95rem]">
              {isEditing ? (
                <input
                  className="w-full rounded-md border border-[#dcc6e4] bg-white px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b3f73]"
                  value={row.value}
                  aria-label={row.label}
                  onChange={(e) => row.onChange(e.target.value)}
                />
              ) : (
                row.value || "..."
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}