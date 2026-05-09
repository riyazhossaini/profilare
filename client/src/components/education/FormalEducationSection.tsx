import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import type { FormalEducationItem } from "../../data/education";

export function FormalEducationCard({ username, item }: { username: string; item: FormalEducationItem }) {
  return (
    <article className="rounded-2xl border border-violet-100 bg-white p-4">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white"><Building2 className="h-5 w-5" /></span>
      <h3 className="mt-3 text-lg font-bold">{item.institution}</h3>
      <p className="text-sm text-zinc-600">{item.degree}</p>
      <p className="text-xs text-zinc-500">{item.timeline}</p>
      <p className="mt-2 text-sm text-zinc-700">{item.story}</p>
      <Link to={`/profile/${username}/education/formal/${item.slug}`} className="mt-3 inline-flex text-sm font-semibold text-violet-700">View Experience</Link>
    </article>
  );
}

export function FormalEducationSection({ username, items }: { username: string; items: FormalEducationItem[] }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Formal Education</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">{items.map((item) => <FormalEducationCard key={item.slug} username={username} item={item} />)}</div>
    </section>
  );
}
