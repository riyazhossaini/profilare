import { motion } from "framer-motion";

type StoryTimelineProps = {
  points: Array<{ title: string; text: string }>;
};

export function StoryTimeline({ points }: StoryTimelineProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">My Story</h2>
      <div className="mt-5 space-y-4">
        {points.map((point, idx) => (
          <div key={point.title} className="relative rounded-2xl border border-violet-100 bg-white p-4 pl-10">
            <span className="absolute left-4 top-5 h-3 w-3 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600" />
            {idx < points.length - 1 ? <span className="absolute left-[21px] top-9 h-[calc(100%-1.3rem)] w-px bg-violet-200" /> : null}
            <h3 className="text-base font-bold text-zinc-900 md:text-lg">{point.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-zinc-700 md:text-base">{point.text}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
