import { Link } from "react-router-dom";
import type { SelfLearningItem } from "../../data/education";

export function SelfLearningCard({ username, item }: { username: string; item: SelfLearningItem }) {
  const Icon = item.icon;
  return (
    <article className="rounded-2xl border border-violet-100 bg-white p-4">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white"><Icon className="h-5 w-5" /></span>
      <h3 className="mt-3 text-lg font-bold">{item.topic}</h3>
      <p className="mt-1 text-sm text-zinc-700">{item.why}</p>
      <p className="mt-1 text-xs text-zinc-500">{item.status} • {item.level}</p>
      <p className="mt-1 text-xs text-zinc-500">Resources: {item.resources.slice(0, 2).join(", ")}</p>
      <Link to={`/profile/${username}/education/self-learning/${item.slug}`} className="mt-3 inline-flex text-sm font-semibold text-violet-700">Explore Learning Journey</Link>
    </article>
  );
}

export function SelfLearningSection({ username, items }: { username: string; items: SelfLearningItem[] }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Self Learning</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{items.map((item) => <SelfLearningCard key={item.slug} username={username} item={item} />)}</div>
    </section>
  );
}
