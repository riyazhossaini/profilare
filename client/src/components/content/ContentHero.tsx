import { motion } from "framer-motion";

export function ContentHero({ name, username, headline, statement, stats, avatarText = "RH", avatarUrl = "" }: { name: string; username: string; headline: string; statement: string; stats: Array<{ label: string; value: string }>; avatarText?: string; avatarUrl?: string }) {
  const u = username.trim();
  const h = headline.trim();
  const s = statement.trim();
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mt-5 rounded-3xl border border-white/70 bg-white/80 p-6 text-center shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 text-2xl font-bold text-white">{avatarUrl ? <img src={avatarUrl} alt={`${name} avatar`} className="h-full w-full object-cover" /> : avatarText}</div>
      <h1 className="mt-4 text-3xl font-extrabold text-zinc-900">{name}</h1>
      {u ? <p className="text-zinc-600">@{u}</p> : null}
      {h ? <p className="mt-2 font-semibold text-zinc-800">{h}</p> : null}
      {s ? <p className="mx-auto mt-4 max-w-3xl text-zinc-700">"{s}"</p> : null}
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{stats.map((s) => <article key={s.label} className="rounded-2xl border border-violet-100 bg-white p-3"><p className="text-xs text-zinc-500">{s.label}</p><p className="text-lg font-bold">{s.value}</p></article>)}</div>
    </motion.section>
  );
}
