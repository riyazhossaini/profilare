import { motion } from "framer-motion";

type MissionVisionCardsProps = {
  mission: string;
  vision: string;
};

export function MissionVisionCards({ mission, vision }: MissionVisionCardsProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      <article className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
        <h3 className="text-xl font-bold text-zinc-900">My Mission</h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-700 md:text-base">{mission}</p>
      </article>
      <article className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
        <h3 className="text-xl font-bold text-zinc-900">My Vision</h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-700 md:text-base">{vision}</p>
      </article>
    </motion.section>
  );
}
