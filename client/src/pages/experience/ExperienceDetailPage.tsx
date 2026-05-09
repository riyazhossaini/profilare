import { Navigate, useParams } from "react-router-dom";
import { ExperienceTopNav } from "../../components/experience/ExperienceTopNav";
import { experienceItems } from "../../data/experience";
import { profileData } from "../../data/profile";

export function ExperienceDetailPage() {
  const { username, experienceSlug } = useParams<{ username: string; experienceSlug: string }>();
  if (!username || username !== profileData.username) return <Navigate to={`/profile/${profileData.username}`} replace />;

  const exp = experienceItems.find((item) => item.slug === experienceSlug);
  if (!exp) return <Navigate to={`/profile/${profileData.username}/experience`} replace />;

  const Icon = exp.icon;

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <ExperienceTopNav username={profileData.username} name={profileData.name} search="" onSearch={() => undefined} />

        <section className="mt-5 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_54px_-34px_rgba(79,70,229,0.55)]">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white"><Icon className="h-6 w-6" /></span>
          <h1 className="mt-4 text-3xl font-extrabold">{exp.role}</h1>
          <p className="text-zinc-600">{exp.org}</p>
          <p className="text-sm text-zinc-500">{exp.timeline} • {exp.category} • {exp.status}</p>
        </section>

        <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-2xl font-bold">About the experience</h2><p className="mt-2 text-sm text-zinc-700"><b>What:</b> {exp.short}</p><p className="mt-1 text-sm text-zinc-700"><b>Why started:</b> {exp.whyStarted}</p><p className="mt-1 text-sm text-zinc-700"><b>Problem:</b> {exp.problem}</p></section>
        <section className="mt-6 grid gap-4 md:grid-cols-2"><article className="rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-xl font-bold">Responsibilities</h2><div className="mt-3 space-y-2">{exp.responsibilities.map((r) => <p key={r} className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{r}</p>)}</div></article><article className="rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-xl font-bold">Challenges</h2><div className="mt-3 space-y-2">{exp.challenges.map((c) => <p key={c} className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{c}</p>)}</div></article></section>
        <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-2xl font-bold">Skills Used</h2><div className="mt-3 flex flex-wrap gap-2">{exp.skills.map((s) => <span key={s} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{s}</span>)}</div></section>
        <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-2xl font-bold">Results & Achievements</h2><div className="mt-3 space-y-2">{exp.achievements.map((a) => <p key={a} className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{a}</p>)}</div></section>
        <section className="mt-6 rounded-3xl border border-violet-200 bg-gradient-to-br from-white to-violet-50/70 p-6"><h2 className="text-2xl font-bold">Reflection</h2><p className="mt-3 text-sm text-zinc-700">{exp.reflection}</p><h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-violet-700">Related projects</h3><div className="mt-2 flex flex-wrap gap-2">{exp.related.map((r) => <span key={r} className="rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-semibold text-violet-700">{r}</span>)}</div></section>
      </div>
    </main>
  );
}
