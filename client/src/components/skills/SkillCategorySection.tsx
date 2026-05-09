import { motion } from "framer-motion";
import { SkillCard } from "./SkillCard";
import type { SkillCategory } from "../../data/skills";

export function SkillCategorySection({ username, category }: { username: string; category: SkillCategory }) {
  const Icon = category.icon;

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white"><Icon className="h-5 w-5" /></span>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">{category.title}</h2>
          <p className="text-sm text-zinc-600">{category.description}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {category.skills.map((skill) => (
          <SkillCard key={skill.slug} username={username} slug={skill.slug} name={skill.name} icon={skill.icon} summary={skill.summary} level={skill.level} progress={skill.progress} learningSince={skill.learningSince} currentUsage={skill.currentUsage} />
        ))}
      </div>
    </motion.section>
  );
}
