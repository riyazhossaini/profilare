import { Link } from "react-router-dom";

export function ContentCurrentFocus({ items }: { items: string[] }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Current Focus</h2>
      <div className="mt-3 flex flex-wrap gap-2">{items.map((i) => <span key={i} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">{i}</span>)}</div>
    </section>
  );
}

export function ContentCTA({ username }: { username: string }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 text-center shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Continue Exploring</h2>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <Link to={`/profile/${username}/projects`} className="rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">View Projects</Link>
        <Link to={`/profile/${username}/identity`} className="rounded-full border border-violet-200 bg-white px-5 py-2.5 text-sm font-semibold text-violet-700">View Identity</Link>
        <Link to={`/profile/${username}/skills`} className="rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">View Skills</Link>
        <Link to={`/profile/${username}/contact`} className="rounded-full border border-violet-200 bg-white px-5 py-2.5 text-sm font-semibold text-violet-700">Contact Me</Link>
      </div>
    </section>
  );
}
