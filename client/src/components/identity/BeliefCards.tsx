import { motion } from "framer-motion";

export function BeliefCards({ beliefs }: { beliefs: string[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Beliefs</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        {beliefs.map((belief) => (
          <article key={belief} className="rounded-2xl border border-violet-100 bg-white p-4">
            <p className="text-sm font-medium text-zinc-700 md:text-base">{belief}</p>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
