import { motion } from "framer-motion";

type VisionCardProps = {
  vision: string;
  direction: string;
  impact: string;
  problems: string;
  become: string;
};

export function VisionCard({ vision, direction, impact, problems, become }: VisionCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_22px_50px_-34px_rgba(79,70,229,0.55)]"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Long-term Vision</h2>
      <p className="mt-3 text-base font-medium text-zinc-800">{vision}</p>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <article className="rounded-2xl border border-violet-100 bg-white p-4"><h3 className="text-sm font-bold text-violet-700">Future direction</h3><p className="mt-1 text-sm text-zinc-700">{direction}</p></article>
        <article className="rounded-2xl border border-violet-100 bg-white p-4"><h3 className="text-sm font-bold text-violet-700">Type of impact</h3><p className="mt-1 text-sm text-zinc-700">{impact}</p></article>
        <article className="rounded-2xl border border-violet-100 bg-white p-4"><h3 className="text-sm font-bold text-violet-700">Problems to solve</h3><p className="mt-1 text-sm text-zinc-700">{problems}</p></article>
        <article className="rounded-2xl border border-violet-100 bg-white p-4"><h3 className="text-sm font-bold text-violet-700">Person to become</h3><p className="mt-1 text-sm text-zinc-700">{become}</p></article>
      </div>
    </motion.section>
  );
}
