import { Link } from "react-router-dom";

export function ExperienceTimeline({ username, items }: { username: string; items: Array<{ year: string; title: string; story: string; skills: string[]; achievement: string; slug: string }> }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Main Experience Timeline</h2>
      <div className="mt-4 space-y-3">
        {items.map((item, idx) => (
          <article key={item.slug} className="relative rounded-2xl border border-violet-100 bg-white p-4 pl-10">
            <span className="absolute left-4 top-5 h-3 w-3 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600" />
            {idx < items.length - 1 ? <span className="absolute left-[21px] top-9 h-[calc(100%-1.3rem)] w-px bg-violet-200" /> : null}
            <p className="text-xs font-bold text-violet-700">{item.year}</p>
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="mt-1 text-sm text-zinc-700">{item.story}</p>
            <p className="mt-1 text-xs text-zinc-500">Skills gained: {item.skills.join(", ")}</p>
            <p className="mt-1 text-xs text-zinc-500">Achievement: {item.achievement}</p>
            <Link to={`/profile/${username}/experience/${item.slug}`} className="mt-2 inline-flex text-sm font-semibold text-violet-700">View Full Journey</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
