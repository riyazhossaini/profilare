export function FutureDirection({ data }: { data: { nextExperiences: string[]; career: string; startupGoals: string; longTerm: string } }) {
  return (
    <section className="mt-6 rounded-3xl border border-violet-200 bg-gradient-to-br from-white to-violet-50/70 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Future Direction</h2>
      <p className="mt-2 text-sm text-zinc-700"><b>Career direction:</b> {data.career}</p>
      <p className="mt-1 text-sm text-zinc-700"><b>Startup goals:</b> {data.startupGoals}</p>
      <p className="mt-1 text-sm text-zinc-700"><b>Long-term journey:</b> {data.longTerm}</p>
      <div className="mt-3 flex flex-wrap gap-2">{data.nextExperiences.map((n) => <span key={n} className="rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-semibold text-violet-700">{n}</span>)}</div>
    </section>
  );
}
