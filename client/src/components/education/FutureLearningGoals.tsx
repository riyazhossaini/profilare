export function FutureLearningGoals({ items }: { items: string[] }) {
  return (
    <section className="mt-6 rounded-3xl border border-violet-200 bg-gradient-to-br from-white to-violet-50/70 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Future Learning Goals</h2>
      <div className="mt-3 flex flex-wrap gap-2">{items.map((i) => <span key={i} className="rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700">{i}</span>)}</div>
    </section>
  );
}
