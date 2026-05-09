import { motion } from "framer-motion";

export function ExperienceOverview({ data }: { data: { areas: string; strengths: string; focus: string; industries: string[]; favoriteWork: string } }) {
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }} className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Experience Overview</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <p className="rounded-xl border border-violet-100 bg-white p-3 text-sm"><b>Main areas:</b> {data.areas}</p>
        <p className="rounded-xl border border-violet-100 bg-white p-3 text-sm"><b>Strongest capabilities:</b> {data.strengths}</p>
        <p className="rounded-xl border border-violet-100 bg-white p-3 text-sm"><b>Current focus:</b> {data.focus}</p>
        <p className="rounded-xl border border-violet-100 bg-white p-3 text-sm"><b>Favorite work:</b> {data.favoriteWork}</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">{data.industries.map((i) => <span key={i} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{i}</span>)}</div>
    </motion.section>
  );
}
