import { motion } from "framer-motion";

type MissionCardProps = {
  mission: string;
  doingNow: string;
  whyMatters: string;
  nextMilestone: string;
};

export function MissionCard({ mission, doingNow, whyMatters, nextMilestone }: MissionCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-violet-200 bg-gradient-to-br from-white to-violet-50/70 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Current Mission</h2>
      <p className="mt-3 text-base font-medium text-zinc-800">{mission}</p>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <article className="rounded-2xl border border-violet-100 bg-white p-4"><h3 className="text-sm font-bold text-violet-700">What I’m doing now</h3><p className="mt-1 text-sm text-zinc-700">{doingNow}</p></article>
        <article className="rounded-2xl border border-violet-100 bg-white p-4"><h3 className="text-sm font-bold text-violet-700">Why it matters</h3><p className="mt-1 text-sm text-zinc-700">{whyMatters}</p></article>
        <article className="rounded-2xl border border-violet-100 bg-white p-4"><h3 className="text-sm font-bold text-violet-700">Next milestone</h3><p className="mt-1 text-sm text-zinc-700">{nextMilestone}</p></article>
      </div>
    </motion.section>
  );
}
