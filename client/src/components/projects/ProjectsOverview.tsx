export function ProjectsOverview({ data }: { data: { categories: string; focus: string; industries: string[]; strengths: string; philosophy: string } }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Projects Overview</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <p className="rounded-xl border border-violet-100 bg-white p-3 text-sm"><b>Categories:</b> {data.categories}</p>
        <p className="rounded-xl border border-violet-100 bg-white p-3 text-sm"><b>Current focus:</b> {data.focus}</p>
        <p className="rounded-xl border border-violet-100 bg-white p-3 text-sm"><b>Builder strengths:</b> {data.strengths}</p>
        <p className="rounded-xl border border-violet-100 bg-white p-3 text-sm"><b>Product philosophy:</b> {data.philosophy}</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">{data.industries.map((i) => <span key={i} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{i}</span>)}</div>
    </section>
  );
}
