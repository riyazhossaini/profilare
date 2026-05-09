export function KnowledgeMap({ nodes, edges }: { nodes: string[]; edges: Array<[string, string]> }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Knowledge Map</h2>
      <div className="mt-3 flex flex-wrap gap-2">{nodes.map((n) => <span key={n} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{n}</span>)}</div>
      <div className="mt-3 grid gap-2 md:grid-cols-2">{edges.map((e) => <p key={`${e[0]}-${e[1]}`} className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{e[0]} <span className="text-zinc-400">{"->"}</span> {e[1]}</p>)}</div>
    </section>
  );
}
