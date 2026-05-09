import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function RelatedProfileLinks({ username }: { username: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 text-center shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Continue Exploring</h2>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <Link to={`/profile/${username}/projects`} className="rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-110">View Projects</Link>
        <Link to={`/profile/${username}/skills`} className="rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-110">View Skills</Link>
        <Link to={`/profile/${username}/links`} className="rounded-full border border-violet-200 bg-white px-5 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50">My Links</Link>
        <Link to={`/profile/${username}/contact`} className="rounded-full border border-violet-200 bg-white px-5 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50">Contact Me</Link>
      </div>
    </motion.section>
  );
}
