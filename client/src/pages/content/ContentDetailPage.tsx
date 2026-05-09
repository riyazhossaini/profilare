import { Navigate, useParams } from "react-router-dom";
import { ContentTopNav } from "../../components/content/ContentTopNav";
import { contentItems } from "../../data/content";
import { profileData } from "../../data/profile";

export function ContentDetailPage() {
  const { username, contentSlug } = useParams<{ username: string; contentSlug: string }>();
  if (!username || username !== profileData.username) return <Navigate to={`/profile/${profileData.username}`} replace />;

  const item = contentItems.find((c) => c.slug === contentSlug);
  if (!item) return <Navigate to={`/profile/${profileData.username}/content`} replace />;

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-4xl">
        <ContentTopNav username={profileData.username} name={profileData.name} search="" onSearch={() => undefined} />
        <section className="mt-5 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_54px_-34px_rgba(79,70,229,0.55)]">
          <h1 className="text-3xl font-extrabold">{item.title}</h1>
          <p className="mt-2 text-zinc-700">{item.subtitle}</p>
          <p className="mt-2 text-sm text-zinc-500">Riyaz Hossaini • {item.date} • {item.readingTime} • {item.category}</p>
          <div className="mt-3 flex flex-wrap gap-2">{item.tags.map((t) => <span key={t} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{t}</span>)}</div>
          <div className="mt-3 flex flex-wrap gap-2"><button type="button" className="rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-semibold text-violet-700">Share</button><button type="button" className="rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-semibold text-violet-700">Save</button></div>
        </section>
        <article className="prose prose-zinc mt-6 max-w-none rounded-3xl border border-white/70 bg-white/85 p-6 leading-relaxed shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
          {item.body.map((p) => <p key={p}>{p}</p>)}
          <blockquote className="border-l-4 border-violet-300 pl-4 text-zinc-700">"Write to discover what you actually think."</blockquote>
          <pre className="overflow-auto rounded-xl bg-zinc-900 p-4 text-xs text-zinc-100"><code>{`// Reflection loop\nthink() -> write() -> refine() -> share()`}</code></pre>
        </article>
        <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-2xl font-bold">Key Insights</h2><div className="mt-3 space-y-2">{item.insights.map((i) => <p key={i} className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{i}</p>)}</div></section>
        <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-2xl font-bold">Reader Reactions</h2><p className="mt-2 text-sm text-zinc-700">{item.likes} likes • {item.saves} saves • {item.views} reads</p></section>
        <section className="mt-6 rounded-3xl border border-violet-200 bg-gradient-to-br from-white to-violet-50/70 p-6"><h2 className="text-2xl font-bold">Reflection</h2><p className="mt-3 text-sm text-zinc-700">{item.reflection}</p><h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-violet-700">Related Content</h3><div className="mt-2 flex flex-wrap gap-2">{item.related.map((r) => <span key={r} className="rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-semibold text-violet-700">{r}</span>)}</div></section>
      </div>
    </main>
  );
}

