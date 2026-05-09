export function CollaborationSection({ data }: { data: { open: string; lookingFor: string[]; contributions: string } }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Collaboration & Contribution</h2>
      <p className="mt-2 text-sm text-zinc-700">{data.open}</p>
      <div className="mt-3 flex flex-wrap gap-2">{data.lookingFor.map((l) => <span key={l} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{l}</span>)}</div>
      <p className="mt-3 text-sm text-zinc-700">{data.contributions}</p>
    </section>
  );
}
