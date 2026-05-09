import { Navigate, useParams } from "react-router-dom";
import { ContentTopNav } from "../../components/content/ContentTopNav";
import { mediaContent } from "../../data/content";
import { profileData } from "../../data/profile";

export function MediaDetailPage() {
  const { username, mediaSlug } = useParams<{ username: string; mediaSlug: string }>();
  if (!username || username !== profileData.username) return <Navigate to={`/profile/${profileData.username}`} replace />;

  const media = mediaContent.find((m) => m.slug === mediaSlug);
  if (!media) return <Navigate to={`/profile/${profileData.username}/content`} replace />;

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-4xl">
        <ContentTopNav username={profileData.username} name={profileData.name} search="" onSearch={() => undefined} />

        <section className="mt-5 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_54px_-34px_rgba(79,70,229,0.55)]">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold text-violet-700">{media.type}</p>
            <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{media.status}</span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold text-zinc-900">{media.title}</h1>
          <p className="mt-1 text-sm text-zinc-500">{media.date} • {media.duration}</p>
          <p className="mt-3 text-sm text-zinc-700">{media.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">{media.tags.map((t) => <span key={`${media.slug}-${t}`} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{t}</span>)}</div>
          <a href={media.externalUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-semibold text-violet-700">
            Open on {media.platform}
          </a>
        </section>

        <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
          <h2 className="text-2xl font-bold">Media Preview</h2>
          <div className="mt-3 rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-6 text-center text-sm text-zinc-700">
            Embedded {media.type.toLowerCase()} preview area (video/audio/visual essay)
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6">
          <h2 className="text-2xl font-bold">Notes</h2>
          <div className="mt-3 space-y-2">{media.body.map((p) => <p key={p} className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{p}</p>)}</div>
        </section>

        <section className="mt-6 rounded-3xl border border-violet-200 bg-gradient-to-br from-white to-violet-50/70 p-6">
          <h2 className="text-2xl font-bold">Related Content</h2>
          <div className="mt-3 flex flex-wrap gap-2">{media.related.map((r) => <span key={r} className="rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-semibold text-violet-700">{r}</span>)}</div>
          <p className="mt-3 text-xs text-zinc-500">{media.views} views • {media.saves} saves</p>
        </section>
      </div>
    </main>
  );
}
