export function LessonsSection({ items }: { items: Array<{ title: string; lesson: string }> }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Failures & Lessons</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">{items.map((i) => <article key={i.title} className="rounded-2xl border border-violet-100 bg-white p-4"><h3 className="font-bold text-zinc-900">{i.title}</h3><p className="mt-2 text-sm text-zinc-700">{i.lesson}</p></article>)}</div>
    </section>
  );
}
