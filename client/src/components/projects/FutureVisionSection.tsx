export function FutureVisionSection({ data }: { data: { products: string[]; ambitions: string; explore: string[]; ecosystem: string } }) {
  return (
    <section className="mt-6 rounded-3xl border border-violet-200 bg-gradient-to-br from-white to-violet-50/70 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Vision & Future</h2>
      <p className="mt-2 text-sm text-zinc-700"><b>Ambition:</b> {data.ambitions}</p>
      <p className="mt-1 text-sm text-zinc-700"><b>Ecosystem vision:</b> {data.ecosystem}</p>
      <div className="mt-3 flex flex-wrap gap-2">{data.products.map((p) => <span key={p} className="rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-semibold text-violet-700">{p}</span>)}</div>
      <div className="mt-3 flex flex-wrap gap-2">{data.explore.map((e) => <span key={e} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{e}</span>)}</div>
    </section>
  );
}
