import { Navigate, useParams } from "react-router-dom";
import { EducationTopNav } from "../../components/education/EducationTopNav";
import { formalEducation } from "../../data/education";
import { profileData } from "../../data/profile";

export function FormalEducationDetailPage() {
  const { username, formalSlug } = useParams<{ username: string; formalSlug: string }>();
  if (!username || username !== profileData.username) return <Navigate to={`/profile/${profileData.username}`} replace />;
  const item = formalEducation.find((i) => i.slug === formalSlug);
  if (!item) return <Navigate to={`/profile/${profileData.username}/education`} replace />;

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <EducationTopNav username={profileData.username} name={profileData.name} search="" onSearch={() => undefined} />
        <section className="mt-5 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_54px_-34px_rgba(79,70,229,0.55)]">
          <h1 className="text-3xl font-extrabold">{item.institution}</h1>
          <p className="text-zinc-600">{item.degree}</p>
          <p className="text-sm text-zinc-500">{item.timeline} • Formal Education</p>
        </section>
        <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-2xl font-bold">My Experience</h2><p className="mt-3 text-sm text-zinc-700">{item.story}</p><p className="mt-3 text-sm text-zinc-700">{item.reflection}</p></section>
        <section className="mt-6 grid gap-4 md:grid-cols-2"><article className="rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-xl font-bold">Skills & Subjects</h2><div className="mt-3 flex flex-wrap gap-2">{item.skills.map((s) => <span key={s} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{s}</span>)}</div></article><article className="rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-xl font-bold">Projects & Activities</h2><div className="mt-3 space-y-2">{item.experiences.map((e) => <p key={e} className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{e}</p>)}</div></article></section>
        <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-2xl font-bold">Memories & Milestones</h2><div className="mt-3 space-y-2">{item.milestones.map((m) => <p key={m} className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{m}</p>)}</div></section>
      </div>
    </main>
  );
}

