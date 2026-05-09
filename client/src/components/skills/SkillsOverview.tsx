import { motion } from "framer-motion";

type OverviewMetric = { label: string; value: string; progress: number };

export function SkillsOverview({ metrics }: { metrics: OverviewMetric[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Skills Overview</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <article key={metric.label} className="rounded-2xl border border-violet-100 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-700">{metric.label}</p>
            <p className="mt-1 text-sm font-semibold text-zinc-800">{metric.value}</p>
            <div className="mt-3 h-2 rounded-full bg-violet-100">
              <div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600" style={{ width: `${metric.progress}%` }} />
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
