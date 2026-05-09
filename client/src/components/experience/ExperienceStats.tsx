export function ExperienceStats({ items }: { items: Array<{ label: string; value: string }> }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Experience Statistics</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{items.map((i) => <article key={i.label} className="rounded-2xl border border-violet-100 bg-white p-3"><p className="text-xs text-zinc-500">{i.label}</p><p className="text-lg font-bold">{i.value}</p></article>)}</div>
    </section>
  );
}
