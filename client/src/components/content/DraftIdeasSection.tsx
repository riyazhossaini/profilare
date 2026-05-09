import { Link } from "react-router-dom";

export function DraftIdeasSection({ username, items }: { username: string; items: string[] }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">Drafts & Future Ideas</h2>
        <Link to={`/profile/${username}/content/drafts`} className="rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700">
          View Page
        </Link>
      </div>
      <div className="mt-4 space-y-2">{items.map((i) => <p key={i} className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{i}</p>)}</div>
    </section>
  );
}
