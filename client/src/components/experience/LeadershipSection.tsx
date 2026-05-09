export function LeadershipSection({ data }: { data: { style: string; responsibilityAreas: string[]; collaboration: string; decisionMaking: string; problemSolving: string } }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Leadership & Responsibility</h2>
      <p className="mt-2 text-sm text-zinc-700"><b>Leadership style:</b> {data.style}</p>
      <p className="mt-1 text-sm text-zinc-700"><b>Collaboration:</b> {data.collaboration}</p>
      <p className="mt-1 text-sm text-zinc-700"><b>Decision-making:</b> {data.decisionMaking}</p>
      <p className="mt-1 text-sm text-zinc-700"><b>Problem-solving:</b> {data.problemSolving}</p>
      <div className="mt-3 flex flex-wrap gap-2">{data.responsibilityAreas.map((r) => <span key={r} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{r}</span>)}</div>
    </section>
  );
}
