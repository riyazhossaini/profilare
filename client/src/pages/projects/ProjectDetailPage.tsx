import { Navigate, useParams } from "react-router-dom";
import { projects } from "../../data/projects";
import { profileData } from "../../data/profile";
import { ProjectsTopNav } from "../../components/projects/ProjectsTopNav";

export function ProjectDetailPage() {
  const { username, projectSlug } = useParams<{ username: string; projectSlug: string }>();
  if (!username || username !== profileData.username) return <Navigate to={`/profile/${profileData.username}`} replace />;

  const project = projects.find((p) => p.slug === projectSlug);
  if (!project) return <Navigate to={`/profile/${profileData.username}/projects`} replace />;

  const Icon = project.icon;

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <ProjectsTopNav username={profileData.username} name={profileData.name} search="" onSearch={() => undefined} />

        <section className="mt-5 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_54px_-34px_rgba(79,70,229,0.55)]">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white"><Icon className="h-6 w-6" /></span>
            <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{project.status}</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold">{project.title}</h1>
          <p className="mt-1 text-zinc-700">{project.tagline}</p>
          <p className="mt-1 text-sm text-zinc-500">{project.timeline} • {project.category}</p>
        </section>

        <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-2xl font-bold">About Project</h2><p className="mt-2 text-sm text-zinc-700"><b>What:</b> {project.about}</p><p className="mt-1 text-sm text-zinc-700"><b>Why:</b> {project.problem}</p><p className="mt-1 text-sm text-zinc-700"><b>Users:</b> {project.users}</p><p className="mt-1 text-sm text-zinc-700"><b>Vision:</b> {project.vision}</p></section>
        <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-2xl font-bold">Project Story</h2><p className="mt-2 text-sm text-zinc-700">{project.story}</p></section>
        <section className="mt-6 grid gap-4 md:grid-cols-2"><article className="rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-xl font-bold">Features</h2><div className="mt-3 space-y-2">{project.features.map((f) => <p key={f} className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{f}</p>)}</div></article><article className="rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-xl font-bold">Tech Stack</h2><div className="mt-3 flex flex-wrap gap-2">{project.tech.map((t) => <span key={t} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{t}</span>)}</div></article></section>
        <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-2xl font-bold">Design System</h2><p className="mt-2 text-sm text-zinc-700"><b>Typography:</b> {project.design.typography}</p><p className="mt-1 text-sm text-zinc-700"><b>UI Philosophy:</b> {project.design.philosophy}</p><p className="mt-1 text-sm text-zinc-700"><b>Brand Direction:</b> {project.design.brand}</p><div className="mt-2 flex gap-2">{project.design.colors.map((c) => <span key={c} className="h-7 w-7 rounded-full border" style={{ backgroundColor: c }} />)}</div></section>
        <section className="mt-6 grid gap-4 md:grid-cols-2"><article className="rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-xl font-bold">Challenges</h2><div className="mt-3 space-y-2">{project.challenges.map((c) => <p key={c} className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{c}</p>)}</div></article><article className="rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-xl font-bold">Lessons</h2><div className="mt-3 space-y-2">{project.lessons.map((l) => <p key={l} className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{l}</p>)}</div></article></section>
        <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-2xl font-bold">Roadmap</h2><div className="mt-3 space-y-2">{project.roadmap.map((r) => <p key={r} className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{r}</p>)}</div><h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-violet-700">Related projects</h3><div className="mt-2 flex flex-wrap gap-2">{project.related.map((r) => <span key={r} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{r}</span>)}</div></section>
      </div>
    </main>
  );
}

