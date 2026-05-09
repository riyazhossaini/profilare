import { Link } from "react-router-dom";
import type { ContentItem } from "../../data/content";

export function FeaturedContent({ username, items }: { username: string; items: ContentItem[] }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Featured Content</h2>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <article key={item.slug} className="rounded-2xl border border-violet-100 bg-gradient-to-br from-white to-violet-50/40 p-5">
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="mt-1 text-sm text-zinc-700">{item.summary}</p>
            <p className="mt-2 text-xs text-zinc-500">{item.date} • {item.readingTime} • {item.category}</p>
            <div className="mt-2 flex flex-wrap gap-2">{item.tags.map((t) => <span key={t} className="rounded-full border border-violet-200 bg-white px-2.5 py-1 text-xs font-semibold text-violet-700">{t}</span>)}</div>
            <p className="mt-2 text-xs text-zinc-500">{item.views} reads • {item.likes} likes • {item.saves} saves</p>
            <Link to={`/profile/${username}/content/${item.slug}`} className="mt-3 inline-flex text-sm font-semibold text-violet-700">Read Full</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
