import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProjectItem } from "../../data/projects";

export function FeaturedProjects({ username, items, onEdit, onDelete }: { username: string; items: ProjectItem[]; onEdit?: (slug: string) => void; onDelete?: (slug: string) => void }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Featured Projects</h2>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.slug} className="group relative rounded-2xl border border-violet-100 bg-gradient-to-br from-white to-violet-50/40 p-5">
              {onEdit || onDelete ? <div className="absolute right-3 top-3 flex gap-1 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">{onEdit ? <button onClick={() => onEdit(item.slug)} className="rounded-full border border-zinc-200 bg-white p-1.5 text-zinc-700"><Pencil className="h-3.5 w-3.5" /></button> : null}{onDelete ? <button onClick={() => onDelete(item.slug)} className="rounded-full border border-rose-200 bg-white p-1.5 text-rose-600"><Trash2 className="h-3.5 w-3.5" /></button> : null}</div> : null}
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white"><Icon className="h-5 w-5" /></span>
              <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
              <p className="mt-1 text-sm text-zinc-700">{item.tagline}</p>
              <p className="mt-2 text-xs text-zinc-500">{item.status} • {item.timeline}</p>
              <div className="mt-3 flex flex-wrap gap-2">{item.tech.slice(0, 4).map((t) => <span key={t} className="rounded-full border border-violet-200 bg-white px-2.5 py-1 text-xs font-semibold text-violet-700">{t}</span>)}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to={`/profile/${username}/projects/${item.slug}`} className="rounded-full bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white">Explore Project</Link>
                <a href={item.links.caseStudy || "#"} className="rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700">Case Study</a>
                <a href={item.links.demo || "#"} className="rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700">Live Demo</a>
                <a href={item.links.github || "#"} className="rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700">GitHub</a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

