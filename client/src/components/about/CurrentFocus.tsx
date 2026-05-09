import { motion } from "framer-motion";

type CurrentFocusProps = {
  focusItems: string[];
};

export function CurrentFocus({ focusItems }: CurrentFocusProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Current Focus</h2>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {focusItems.map((item) => (
          <span key={item} className="rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-800">
            {item}
          </span>
        ))}
      </div>
    </motion.section>
  );
}
