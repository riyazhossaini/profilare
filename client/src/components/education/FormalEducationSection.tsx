import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { FormalEducationItem } from "../../data/education";

export function FormalEducationCard({ username, item, onEdit, onDelete }: { username: string; item: FormalEducationItem; onEdit?: () => void; onDelete?: () => void }) {
  return (
    <article className="group relative rounded-2xl border border-violet-100 bg-white p-4">
      {onEdit || onDelete ? <div className="absolute right-3 top-3 flex gap-1 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">{onEdit ? <button onClick={onEdit} className="rounded-full border border-zinc-200 bg-white p-1.5 text-zinc-700"><Pencil className="h-3.5 w-3.5" /></button> : null}{onDelete ? <button onClick={onDelete} className="rounded-full border border-rose-200 bg-white p-1.5 text-rose-600"><Trash2 className="h-3.5 w-3.5" /></button> : null}</div> : null}
      <h3 className="text-lg font-bold">{item.institution}</h3>
      <p className="text-sm text-zinc-600">{item.degree}</p>
      <p className="text-xs text-zinc-500">{item.timeline}</p>
      <p className="mt-2 text-sm text-zinc-700">{item.story}</p>
      <div className="mt-2 flex flex-wrap gap-2">{item.skills.slice(0, 3).map((s) => <span key={s} className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">{s}</span>)}</div>
      <Link to={`/profile/${username}/education/${item.slug}`} className="mt-3 inline-flex text-sm font-semibold text-violet-700">Open Education Detail</Link>
    </article>
  );
}

export function FormalEducationSection({ username, items, onEdit, onDelete }: { username: string; items: FormalEducationItem[]; onEdit?: (slug: string) => void; onDelete?: (slug: string) => void }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Formal Education</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">{items.map((item) => <FormalEducationCard key={item.slug} username={username} item={item} onEdit={onEdit ? () => onEdit(item.slug) : undefined} onDelete={onDelete ? () => onDelete(item.slug) : undefined} />)}</div>
    </section>
  );
}

