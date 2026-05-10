import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

export function CurrentLearningSection({ items, onEdit, onDelete }: { items: Array<{ name: string; progress: number; weeklyGoal: string; status: string }>; onEdit?: (name: string) => void; onDelete?: (name: string) => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Currently Learning</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.name} className="group relative rounded-2xl border border-violet-100 bg-white p-4">
            {onEdit || onDelete ? (
              <div className="absolute right-3 top-3 flex gap-1 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
                {onEdit ? <button onClick={() => onEdit(item.name)} className="rounded-full border border-zinc-200 bg-white p-1.5 text-zinc-700"><Pencil className="h-3.5 w-3.5" /></button> : null}
                {onDelete ? <button onClick={() => onDelete(item.name)} className="rounded-full border border-rose-200 bg-white p-1.5 text-rose-600"><Trash2 className="h-3.5 w-3.5" /></button> : null}
              </div>
            ) : null}
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-bold text-zinc-900">{item.name}</h3>
              <span className="text-xs font-semibold text-violet-700">{item.status}</span>
            </div>
            <p className="mt-1 text-xs text-zinc-500">Weekly goal: {item.weeklyGoal}</p>
            <div className="mt-3 h-2 rounded-full bg-violet-100">
              <div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600" style={{ width: `${item.progress}%` }} />
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
