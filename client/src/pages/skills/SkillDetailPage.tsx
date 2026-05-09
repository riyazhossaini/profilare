import { Navigate, useParams } from "react-router-dom";
import { SkillsTopNav } from "../../components/skills/SkillsTopNav";
import { LearningTimeline } from "../../components/skills/LearningTimeline";
import { profileData } from "../../data/profile";
import { allSkills } from "../../data/skills";

export function SkillDetailPage() {
  const { username, skillSlug } = useParams<{ username: string; skillSlug: string }>();

  if (!username || username !== profileData.username) {
    return <Navigate to={`/profile/${profileData.username}`} replace />;
  }

  const skill = allSkills.find((item) => item.slug === skillSlug);

  if (!skill) {
    return <Navigate to={`/profile/${profileData.username}/skills`} replace />;
  }

  const Icon = skill.icon;

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <SkillsTopNav username={profileData.username} name={profileData.name} search="" onSearch={() => undefined} />

        <section className="mt-5 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_54px_-34px_rgba(79,70,229,0.55)] md:p-8">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
            <Icon className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl">{skill.name}</h1>
          <p className="mt-2 text-base text-zinc-600">{skill.personalConnection}</p>
          <div className="mt-4 h-2 rounded-full bg-violet-100">
            <div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600" style={{ width: `${skill.progress}%` }} />
          </div>
          <p className="mt-2 text-sm text-zinc-500">Level: {skill.level} • Learning since {skill.learningSince}</p>
        </section>

        <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Why I learned this</h2>
          <p className="mt-3 text-sm text-zinc-700 md:text-base">{skill.why}</p>
        </section>

        <LearningTimeline items={skill.timeline} />

        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <article className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Resources</h2>
            <div className="mt-3 space-y-2">{skill.resources.map((resource) => <p key={resource} className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{resource}</p>)}</div>
          </article>
          <article className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Real-world usage</h2>
            <div className="mt-3 space-y-2">{skill.realWorldUsage.map((usage) => <p key={usage} className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{usage}</p>)}</div>
          </article>
        </section>

        <section className="mt-6 rounded-3xl border border-violet-200 bg-gradient-to-br from-white to-violet-50/70 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Future plans</h2>
          <p className="mt-3 text-sm text-zinc-700 md:text-base">{skill.futurePlans}</p>
          <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-violet-700">Related skills</h3>
          <div className="mt-2 flex flex-wrap gap-2">{skill.relatedSkills.map((related) => <span key={related} className="rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700">{related}</span>)}</div>
        </section>
      </div>
    </main>
  );
}
