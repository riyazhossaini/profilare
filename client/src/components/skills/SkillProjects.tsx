import { motion } from "framer-motion";

export function SkillProjects({ items }: { items: Array<{ project: string; skills: string[] }> }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Projects Connected to Skills</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.project} className="rounded-2xl border border-violet-100 bg-white p-4">
            <h3 className="text-base font-bold text-zinc-900">{item.project}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {item.skills.map((skill) => (
                <span key={`${item.project}-${skill}`} className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-800">{skill}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
