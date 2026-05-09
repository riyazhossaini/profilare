export function ContentOverview({ data }: { data: { topics: string[]; types: string[]; themes: string; discussed: string; style: string } }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Content Overview</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <p className="rounded-xl border border-violet-100 bg-white p-3 text-sm"><b>Favorite types:</b> {data.types.join(", ")}</p>
        <p className="rounded-xl border border-violet-100 bg-white p-3 text-sm"><b>Current themes:</b> {data.themes}</p>
        <p className="rounded-xl border border-violet-100 bg-white p-3 text-sm"><b>Most discussed:</b> {data.discussed}</p>
        <p className="rounded-xl border border-violet-100 bg-white p-3 text-sm"><b>Writing style:</b> {data.style}</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">{data.topics.map((t) => <span key={t} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{t}</span>)}</div>
    </section>
  );
}
