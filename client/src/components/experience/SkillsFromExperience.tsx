export function SkillsFromExperience({ rows }: { rows: Array<{ exp: string; skills: string[] }> }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Skills Gained from Experiences</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {rows.map((row) => (
          <article key={row.exp} className="rounded-2xl border border-violet-100 bg-white p-4">
            <h3 className="font-bold text-zinc-900">{row.exp}</h3>
            <div className="mt-2 flex flex-wrap gap-2">{row.skills.map((s) => <span key={s} className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">{s}</span>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
