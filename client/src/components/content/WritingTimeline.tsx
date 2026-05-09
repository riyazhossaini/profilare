export function WritingTimeline({ items }: { items: string[] }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Writing Timeline</h2>
      <div className="mt-4 space-y-3">{items.map((item, idx) => <div key={item} className="relative rounded-2xl border border-violet-100 bg-white p-4 pl-10"><span className="absolute left-4 top-5 h-3 w-3 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600" />{idx < items.length - 1 ? <span className="absolute left-[21px] top-9 h-[calc(100%-1.3rem)] w-px bg-violet-200" /> : null}<p className="text-sm text-zinc-700">{item}</p></div>)}</div>
    </section>
  );
}
