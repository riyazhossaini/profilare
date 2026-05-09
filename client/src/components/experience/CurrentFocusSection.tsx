export function CurrentFocusSection({ items }: { items: string[] }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Current Focus</h2>
      <div className="mt-3 flex flex-wrap gap-2">{items.map((i) => <span key={i} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">{i}</span>)}</div>
    </section>
  );
}
