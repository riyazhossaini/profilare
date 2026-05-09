import { motion } from "framer-motion";

export function SkillsGraph({ nodes, edges }: { nodes: string[]; edges: Array<[string, string]> }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Skill Relationships</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {nodes.map((node) => (
          <span key={node} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-800">{node}</span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
        {edges.map((edge) => (
          <p key={`${edge[0]}-${edge[1]}`} className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{edge[0]} <span className="text-zinc-400">{"->"}</span> {edge[1]}</p>
        ))}
      </div>
    </motion.section>
  );
}

