import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

type ValueItem = { title: string; description: string; icon: LucideIcon };

type ValuesGridProps = {
  values: ValueItem[];
};

export function ValuesGrid({ values }: ValuesGridProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Values</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {values.map((value) => {
          const Icon = value.icon;
          return (
            <article key={value.title} className="rounded-2xl border border-violet-100 bg-white p-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 text-base font-bold text-zinc-900">{value.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-700">{value.description}</p>
            </article>
          );
        })}
      </div>
    </motion.section>
  );
}
