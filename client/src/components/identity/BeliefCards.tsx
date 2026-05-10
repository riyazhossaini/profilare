import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

export function BeliefCards({ title = "Beliefs", beliefs, onEdit, onDelete }: { title?: string; beliefs: string[]; onEdit?: (index: number) => void; onDelete?: (index: number) => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">{title}</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        {beliefs.map((belief, index) => (
          <article key={`${belief}-${index}`} className="group relative rounded-2xl border border-violet-100 bg-white p-4">
            {onEdit || onDelete ? (
              <div className="absolute right-3 top-3 flex gap-1 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
                {onEdit ? (
                  <button onClick={() => onEdit(index)} className="rounded-full border border-zinc-200 bg-white p-1.5 text-zinc-700">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                ) : null}
                {onDelete ? (
                  <button onClick={() => onDelete(index)} className="rounded-full border border-rose-200 bg-white p-1.5 text-rose-600">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                ) : null}
              </div>
            ) : null}
            <p className="text-sm font-medium text-zinc-700 md:text-base">{belief}</p>
          </article>
        ))}
      </div>
    </motion.section>
  );
}

