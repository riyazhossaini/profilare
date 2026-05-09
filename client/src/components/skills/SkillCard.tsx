import { ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

type SkillCardProps = {
  username: string;
  slug: string;
  name: string;
  icon: LucideIcon;
  summary: string;
  level: string;
  progress: number;
  learningSince: string;
  currentUsage: string;
};

export function SkillCard({ username, slug, name, icon: Icon, summary, level, progress, learningSince, currentUsage }: SkillCardProps) {
  return (
    <article className="rounded-2xl border border-violet-100 bg-white p-4 transition hover:-translate-y-0.5 hover:border-violet-200">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-3 text-lg font-bold text-zinc-900">{name}</h3>
      <p className="mt-1 text-sm leading-relaxed text-zinc-700">{summary}</p>
      <p className="mt-2 text-xs font-semibold text-zinc-500">Level: {level}</p>
      <div className="mt-2 h-2 rounded-full bg-violet-100">
        <div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-2 text-xs text-zinc-500">Learning since {learningSince}</p>
      <p className="mt-1 text-xs text-zinc-500">{currentUsage}</p>
      <Link to={`/profile/${username}/skills/${slug}`} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-violet-700 transition hover:text-violet-800">
        View Journey
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
