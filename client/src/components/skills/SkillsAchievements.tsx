import { motion } from "framer-motion";

export function SkillsAchievements({ items }: { items: string[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Achievements & Milestones</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        {items.map((item) => (
          <p key={item} className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{item}</p>
        ))}
      </div>
    </motion.section>
  );
}
