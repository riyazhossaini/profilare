import { Link } from "react-router-dom";
import type { ProjectItem } from "../../data/projects";

function statusClass(status: ProjectItem["status"]) {
  if (status === "Building") return "bg-amber-100 text-amber-800 border-amber-200";
  if (status === "Active") return "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (status === "Completed") return "bg-blue-100 text-blue-800 border-blue-200";
  if (status === "Research") return "bg-purple-100 text-purple-800 border-purple-200";
  return "bg-zinc-100 text-zinc-700 border-zinc-200";
}

export function ProjectCard({ username, item }: { username: string; item: ProjectItem }) {
  const Icon = item.icon;
  return (
    <article className="rounded-2xl border border-violet-100 bg-white p-4 transition hover:-translate-y-0.5">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white"><Icon className="h-5 w-5" /></span>
        <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClass(item.status)}`}>{item.status}</span>
      </div>
      <h3 className="mt-3 text-lg font-bold">{item.title}</h3>
      <p className="text-xs text-zinc-500">{item.category} • {item.timeline}</p>
      <p className="mt-2 text-sm text-zinc-700">{item.summary}</p>
      <p className="mt-1 text-xs text-zinc-500">Goal: {item.goal}</p>
      <div className="mt-2 flex flex-wrap gap-2">{item.tech.slice(0, 4).map((t) => <span key={t} className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">{t}</span>)}</div>
      <Link to={`/profile/${username}/projects/${item.slug}`} className="mt-3 inline-flex text-sm font-semibold text-violet-700">Open Project</Link>
    </article>
  );
}

export function ProjectGrid({ username, items }: { username: string; items: ProjectItem[] }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Project Cards</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{items.map((item) => <ProjectCard key={item.slug} username={username} item={item} />)}</div>
    </section>
  );
}
