import { motion } from "framer-motion";

type PersonalFactsProps = {
  facts: Array<{ label: string; value: string }>;
};

export function PersonalFacts({ facts }: PersonalFactsProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Personal Facts</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {facts.map((fact) => (
          <article key={fact.label} className="rounded-2xl border border-violet-100 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-violet-700">{fact.label}</p>
            <p className="mt-2 text-sm font-semibold text-zinc-800">{fact.value}</p>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
