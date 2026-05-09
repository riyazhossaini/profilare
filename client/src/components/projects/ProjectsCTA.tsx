import { Link } from "react-router-dom";

export function ProjectsCTA({ username }: { username: string }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 text-center shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Continue Exploring</h2>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <Link to={`/profile/${username}/experience`} className="rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">View Experience</Link>
        <Link to={`/profile/${username}/skills`} className="rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">View Skills</Link>
        <Link to={`/profile/${username}/identity`} className="rounded-full border border-violet-200 bg-white px-5 py-2.5 text-sm font-semibold text-violet-700">View Identity</Link>
        <Link to={`/profile/${username}/contact`} className="rounded-full border border-violet-200 bg-white px-5 py-2.5 text-sm font-semibold text-violet-700">Contact Me</Link>
      </div>
    </section>
  );
}
