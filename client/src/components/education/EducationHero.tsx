import { motion } from "framer-motion";

type Props = { name: string; username: string; headline: string; statement: string };

export function EducationHero({ name, username, headline, statement }: Props) {
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mt-5 rounded-3xl border border-white/70 bg-white/80 p-6 text-center shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 text-2xl font-bold text-white">RH</div>
      <h1 className="mt-4 text-3xl font-extrabold text-zinc-900">{name}</h1>
      <p className="text-zinc-600">@{username}</p>
      <p className="mt-2 font-semibold text-zinc-800">{headline}</p>
      <p className="mx-auto mt-4 max-w-3xl text-zinc-700">"{statement}"</p>
    </motion.section>
  );
}
