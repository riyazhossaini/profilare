export function MediaContentSection({
  items,
}: {
  items: Array<{ slug: string; title: string; type: string; duration: string; date: string; status: string; tags: string[]; views: number; saves: number; summary: string; platform: string; externalUrl: string }>;
}) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Video & Media Content</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {items.map((m) => (
          <article key={m.slug} className="rounded-2xl border border-violet-100 bg-white p-4 transition hover:-translate-y-0.5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-violet-700">{m.type}</p>
              <span className="rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-violet-700">{m.status}</span>
            </div>
            <h3 className="mt-1 font-bold text-zinc-900">{m.title}</h3>
            <p className="mt-1 text-xs text-zinc-500">
              {m.date} • {m.duration}
            </p>
            <p className="mt-2 text-sm text-zinc-700">{m.summary}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {m.tags.map((t) => (
                <span key={`${m.slug}-${t}`} className="rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-violet-700">
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-2 text-xs text-zinc-500">{m.views} views • {m.saves} saves</p>
            <a href={m.externalUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-sm font-semibold text-violet-700">
              Open on {m.platform}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
