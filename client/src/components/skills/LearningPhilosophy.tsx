import { motion } from "framer-motion";

export function LearningPhilosophy({ statement, methods }: { statement: string; methods: string[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-violet-200 bg-gradient-to-br from-white to-violet-50/70 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Learning Philosophy</h2>
      <p className="mt-3 text-sm leading-relaxed text-zinc-700 md:text-base">{statement}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {methods.map((method) => (
          <span key={method} className="rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700">{method}</span>
        ))}
      </div>
    </motion.section>
  );
}
