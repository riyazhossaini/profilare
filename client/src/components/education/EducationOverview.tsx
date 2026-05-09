import { motion } from "framer-motion";

export function EducationOverview({ overview }: { overview: { fields: string; current: string; style: string; methods: string[]; philosophy: string } }) {
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }} className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Education Overview</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <p className="rounded-xl border border-violet-100 bg-white p-3 text-sm"><b>Main fields:</b> {overview.fields}</p>
        <p className="rounded-xl border border-violet-100 bg-white p-3 text-sm"><b>Current study:</b> {overview.current}</p>
        <p className="rounded-xl border border-violet-100 bg-white p-3 text-sm"><b>Learning style:</b> {overview.style}</p>
        <p className="rounded-xl border border-violet-100 bg-white p-3 text-sm"><b>Knowledge philosophy:</b> {overview.philosophy}</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">{overview.methods.map((m) => <span key={m} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{m}</span>)}</div>
    </motion.section>
  );
}
