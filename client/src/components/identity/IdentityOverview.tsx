import { motion } from "framer-motion";

type IdentityOverviewProps = {
  items: Array<{ title: string; text: string }>;
};

export function IdentityOverview({ items }: IdentityOverviewProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Identity Overview</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.title} className="rounded-2xl border border-violet-100 bg-gradient-to-br from-white to-violet-50/40 p-4">
            <h3 className="text-sm font-bold uppercase tracking-wide text-violet-700">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-700 md:text-base">{item.text}</p>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
