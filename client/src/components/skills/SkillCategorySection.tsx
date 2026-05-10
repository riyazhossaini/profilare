import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { SkillCard } from "./SkillCard";
import type { SkillCategory } from "../../data/skills";

export function SkillCategorySection({ username, category, onEdit, onDelete }: { username: string; category: SkillCategory; onEdit?: (slug: string) => void; onDelete?: (slug: string) => void }) {
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
          <div key={skill.slug} className="group relative">
            {onEdit || onDelete ? (
              <div className="absolute right-3 top-3 z-10 flex gap-1 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
                {onEdit ? <button onClick={() => onEdit(skill.slug)} className="rounded-full border border-zinc-200 bg-white p-1.5 text-zinc-700"><Pencil className="h-3.5 w-3.5" /></button> : null}
                {onDelete ? <button onClick={() => onDelete(skill.slug)} className="rounded-full border border-rose-200 bg-white p-1.5 text-rose-600"><Trash2 className="h-3.5 w-3.5" /></button> : null}
              </div>
            ) : null}
            <SkillCard username={username} slug={skill.slug} name={skill.name} icon={skill.icon} summary={skill.summary} level={skill.level} progress={skill.progress} learningSince={skill.learningSince} currentUsage={skill.currentUsage} />
          </div>
        ))}
      </div>
    </motion.section>
  );
}
