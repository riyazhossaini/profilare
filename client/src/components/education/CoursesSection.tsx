import { Pencil, Trash2 } from "lucide-react";

export function CoursesSection({ items, onEdit, onDelete }: { items: Array<{ provider: string; name: string; timeline: string; skills: string[] }>; onEdit?: (index: number) => void; onDelete?: (index: number) => void }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Courses & Certifications</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {items.map((item, idx) => (
          <article key={`${item.name}-${idx}`} className="group relative rounded-2xl border border-violet-100 bg-white p-4">
            {onEdit || onDelete ? (
              <div className="absolute right-3 top-3 flex gap-1 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
                {onEdit ? <button onClick={() => onEdit(idx)} className="rounded-full border border-zinc-200 bg-white p-1.5 text-zinc-700"><Pencil className="h-3.5 w-3.5" /></button> : null}
                {onDelete ? <button onClick={() => onDelete(idx)} className="rounded-full border border-rose-200 bg-white p-1.5 text-rose-600"><Trash2 className="h-3.5 w-3.5" /></button> : null}
              </div>
            ) : null}
            <p className="text-xs font-semibold text-violet-700">{item.provider}</p>
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p className="text-xs text-zinc-500">{item.timeline}</p>
            <div className="mt-2 flex flex-wrap gap-2">{item.skills.map((s) => <span key={s} className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">{s}</span>)}</div>
            <button type="button" className="mt-3 rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700">View Certificate</button>
          </article>
        ))}
      </div>
    </section>
  );
}

