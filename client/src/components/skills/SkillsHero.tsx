import { motion } from "framer-motion";

type SkillsHeroProps = {
  name: string;
  username: string;
  headline: string;
  statement: string;
  avatarText?: string;
  avatarUrl?: string;
};

export function SkillsHero({ name, username, headline, statement, avatarText = "RH", avatarUrl = "" }: SkillsHeroProps) {
  const u = username.trim();
  const h = headline.trim();
  const s = statement.trim();
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-5 rounded-3xl border border-white/70 bg-white/75 p-6 shadow-[0_28px_56px_-32px_rgba(79,70,229,0.55)] backdrop-blur md:p-8"
    >
      <div className="flex flex-col items-center text-center">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 text-2xl font-bold text-white shadow-xl">{avatarUrl ? <img src={avatarUrl} alt={`${name} avatar`} className="h-full w-full object-cover" /> : avatarText}</div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl">{name}</h1>
        {u ? <p className="mt-1 text-base font-medium text-zinc-600">@{u}</p> : null}
        {h ? <p className="mt-2 text-lg font-semibold text-zinc-800">{h}</p> : null}
        {s ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-700 md:text-lg">"{s}"</p> : null}
      </div>
    </motion.section>
  );
}
