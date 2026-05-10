import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

export function SkillsAchievements({ items, onEdit, onDelete }: { items: string[]; onEdit?: (index: number) => void; onDelete?: (index: number) => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Achievements & Milestones</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        {items.map((item, idx) => (
          <p key={`${item}-${idx}`} className="group relative rounded-xl border border-violet-100 bg-white px-3 py-2 pr-20 text-sm text-zinc-700">{item}
            {onEdit || onDelete ? <span className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-1 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">{onEdit ? <button onClick={() => onEdit(idx)} className="rounded-full border border-zinc-200 bg-white p-1 text-zinc-700"><Pencil className="h-3 w-3" /></button> : null}{onDelete ? <button onClick={() => onDelete(idx)} className="rounded-full border border-rose-200 bg-white p-1 text-rose-600"><Trash2 className="h-3 w-3" /></button> : null}</span> : null}
          </p>
        ))}
      </div>
    </motion.section>
  );
}
