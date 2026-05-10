import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

export function IdentityTimeline({ title = "Identity Timeline", items, onEdit, onDelete }: { title?: string; items: string[]; onEdit?: (index: number) => void; onDelete?: (index: number) => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">{title}</h2>
      <div className="mt-5 space-y-3">
        {items.map((item, idx) => (
          <div key={`${item}-${idx}`} className="group relative rounded-2xl border border-violet-100 bg-white p-4 pl-10">
            {onEdit || onDelete ? (
              <div className="absolute right-3 top-3 flex gap-1 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
                {onEdit ? (
                  <button onClick={() => onEdit(idx)} className="rounded-full border border-zinc-200 bg-white p-1.5 text-zinc-700">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                ) : null}
                {onDelete ? (
                  <button onClick={() => onDelete(idx)} className="rounded-full border border-rose-200 bg-white p-1.5 text-rose-600">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                ) : null}
              </div>
            ) : null}
            <span className="absolute left-4 top-5 h-3 w-3 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600" />
            {idx < items.length - 1 ? <span className="absolute left-[21px] top-9 h-[calc(100%-1.3rem)] w-px bg-violet-200" /> : null}
            <p className="text-sm font-medium text-zinc-700 md:text-base">{item}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

