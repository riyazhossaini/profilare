import { motion } from "framer-motion";

type PersonalityGridProps = {
  traits: Array<{ name: string; text: string; level: number }>;
};

export function PersonalityGrid({ traits }: PersonalityGridProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Personality</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {traits.map((trait) => (
          <article key={trait.name} className="rounded-2xl border border-violet-100 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-bold text-zinc-900">{trait.name}</h3>
              <span className="text-xs font-semibold text-violet-700">{trait.level}%</span>
            </div>
            <p className="mt-2 text-sm text-zinc-700">{trait.text}</p>
            <div className="mt-3 h-2 rounded-full bg-violet-100">
              <div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600" style={{ width: `${trait.level}%` }} />
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
