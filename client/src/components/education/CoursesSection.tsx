export function CoursesSection({ items }: { items: Array<{ provider: string; name: string; timeline: string; skills: string[] }> }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Courses & Certifications</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.name} className="rounded-2xl border border-violet-100 bg-white p-4">
            <p className="text-xs text-violet-700 font-semibold">{item.provider}</p>
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p className="text-xs text-zinc-500">{item.timeline}</p>
            <div className="mt-2 flex flex-wrap gap-2">{item.skills.map((s) => <span key={s} className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">{s}</span>)}</div>
            <button type="button" className="mt-3 rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700">View Certificate</button>
          </article>
        ))}
      </div>
    </section>
  );
}
