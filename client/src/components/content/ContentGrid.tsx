import { Link } from "react-router-dom";
import type { ContentItem } from "../../data/content";

export function ContentCard({ username, item }: { username: string; item: ContentItem }) {
  return (
    <article className="rounded-2xl border border-violet-100 bg-white p-4 transition hover:-translate-y-0.5">
      <h3 className="text-lg font-bold">{item.title}</h3>
      <p className="mt-1 text-sm text-zinc-700">{item.summary}</p>
      <p className="mt-2 text-xs text-zinc-500">{item.category} • {item.date} • {item.readingTime}</p>
      <div className="mt-2 flex flex-wrap gap-2">{item.tags.slice(0, 3).map((t) => <span key={t} className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">{t}</span>)}</div>
      <p className="mt-2 text-xs text-zinc-500">{item.views} reads • {item.likes} likes • {item.saves} saves</p>
      <button type="button" className="mt-2 rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-semibold text-violet-700">Save</button>
      <Link to={`/profile/${username}/content/${item.slug}`} className="mt-2 block text-sm font-semibold text-violet-700">Open Content</Link>
    </article>
  );
}

export function ContentGrid({ username, items }: { username: string; items: ContentItem[] }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Content Grid</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{items.map((i) => <ContentCard key={i.slug} username={username} item={i} />)}</div>
    </section>
  );
}
