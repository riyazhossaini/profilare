import { motion } from "framer-motion";

export function LearningTimeline({ items }: { items: Array<{ phase: string; detail: string }> }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Learning Journey Timeline</h2>
      <div className="mt-4 space-y-3">
        {items.map((item, index) => (
          <article key={item.phase} className="relative rounded-2xl border border-violet-100 bg-white p-4 pl-10">
            <span className="absolute left-4 top-5 h-3 w-3 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600" />
            {index < items.length - 1 ? <span className="absolute left-[21px] top-9 h-[calc(100%-1.3rem)] w-px bg-violet-200" /> : null}
            <h3 className="text-sm font-bold uppercase tracking-wide text-violet-700">{item.phase}</h3>
            <p className="mt-1 text-sm text-zinc-700 md:text-base">{item.detail}</p>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
