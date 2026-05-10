import { Pencil, Trash2 } from "lucide-react";

export function CurrentFocusSection({ items, onEdit, onDelete }: { items: string[]; onEdit?: (index: number) => void; onDelete?: (index: number) => void }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Current Focus</h2>
      <div className="mt-3 flex flex-wrap gap-2">{items.map((i, idx) => <span key={`${i}-${idx}`} className="group inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">{i}{onEdit ? <button onClick={() => onEdit(idx)} className="rounded-full p-0.5 text-zinc-600"><Pencil className="h-3 w-3" /></button> : null}{onDelete ? <button onClick={() => onDelete(idx)} className="rounded-full p-0.5 text-rose-600"><Trash2 className="h-3 w-3" /></button> : null}</span>)}</div>
    </section>
  );
}

