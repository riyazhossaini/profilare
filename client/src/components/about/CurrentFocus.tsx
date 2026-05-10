import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

type CurrentFocusProps = {
  title?: string;
  focusItems: string[];
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
};

export function CurrentFocus({ title = "Current Focus", focusItems, onEdit, onDelete }: CurrentFocusProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">{title}</h2>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {focusItems.map((item, index) => (
          <span key={`${item}-${index}`} className="group inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-800">
            {item}
            {onEdit ? (
              <button onClick={() => onEdit(index)} className="rounded-full border border-zinc-200 bg-white p-1 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
                <Pencil className="h-3 w-3" />
              </button>
            ) : null}
            {onDelete ? (
              <button onClick={() => onDelete(index)} className="rounded-full border border-rose-200 bg-white p-1 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
                <Trash2 className="h-3 w-3" />
              </button>
            ) : null}
          </span>
        ))}
      </div>
    </motion.section>
  );
}

