import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export function ContentCurrentFocus({ items, onEdit, onDelete }: { items: string[]; onEdit?: (index: number) => void; onDelete?: (index: number) => void }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Current Focus</h2>
      <div className="mt-3 flex flex-wrap gap-2">{items.map((i, idx) => <span key={`${i}-${idx}`} className="group inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">{i}{onEdit ? <button onClick={() => onEdit(idx)} className="pointer-events-none rounded-full p-0.5 text-zinc-600 opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-3 w-3" /></button> : null}{onDelete ? <button onClick={() => onDelete(idx)} className="pointer-events-none rounded-full p-0.5 text-rose-600 opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Trash2 className="h-3 w-3" /></button> : null}</span>)}</div>
    </section>
  );
}

export function ContentCTA({ username }: { username: string }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 text-center shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Continue Exploring</h2>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <Link to={`/profile/${username}/projects`} className="rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">View Projects</Link>
        <Link to={`/profile/${username}/identity`} className="rounded-full border border-violet-200 bg-white px-5 py-2.5 text-sm font-semibold text-violet-700">View Identity</Link>
        <Link to={`/profile/${username}/skills`} className="rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">View Skills</Link>
        <Link to={`/profile/${username}/contact`} className="rounded-full border border-violet-200 bg-white px-5 py-2.5 text-sm font-semibold text-violet-700">Contact Me</Link>
      </div>
    </section>
  );
}
