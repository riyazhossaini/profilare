import { Navigate, useParams } from "react-router-dom";
import { EducationTopNav } from "../../components/education/EducationTopNav";
import { selfLearningTopics } from "../../data/education";
import { profileData } from "../../data/profile";

export function SelfLearningDetailPage() {
  const { username, topicSlug } = useParams<{ username: string; topicSlug: string }>();
  if (!username || username !== profileData.username) return <Navigate to={`/profile/${profileData.username}`} replace />;
  const topic = selfLearningTopics.find((i) => i.slug === topicSlug);
  if (!topic) return <Navigate to={`/profile/${profileData.username}/education`} replace />;
  const Icon = topic.icon;

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <EducationTopNav username={profileData.username} name={profileData.name} search="" onSearch={() => undefined} />
        <section className="mt-5 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_54px_-34px_rgba(79,70,229,0.55)]">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white"><Icon className="h-6 w-6" /></span>
          <h1 className="mt-4 text-3xl font-extrabold">{topic.topic}</h1>
          <p className="mt-2 text-zinc-700">{topic.philosophy}</p>
        </section>
        <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-2xl font-bold">Why I started learning this</h2><p className="mt-3 text-sm text-zinc-700">{topic.why}</p></section>
        <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-2xl font-bold">Learning timeline</h2><div className="mt-3 space-y-2">{topic.timeline.map((t) => <p key={t.phase} className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700"><b>{t.phase}:</b> {t.detail}</p>)}</div></section>
        <section className="mt-6 grid gap-4 md:grid-cols-2"><article className="rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-xl font-bold">Resources</h2><div className="mt-3 space-y-2">{topic.resources.map((r) => <p key={r} className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{r}</p>)}</div></article><article className="rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-xl font-bold">Real-world application</h2><div className="mt-3 space-y-2">{topic.applications.map((a) => <p key={a} className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{a}</p>)}</div></article></section>
        <section className="mt-6 rounded-3xl border border-violet-200 bg-gradient-to-br from-white to-violet-50/70 p-6"><h2 className="text-2xl font-bold">Future vision</h2><p className="mt-3 text-sm text-zinc-700">{topic.futureVision}</p></section>
      </div>
    </main>
  );
}

