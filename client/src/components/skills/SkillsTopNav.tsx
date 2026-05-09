import { Search, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

type SkillsTopNavProps = {
  username: string;
  name: string;
  search: string;
  onSearch: (value: string) => void;
};

export function SkillsTopNav({ username, name, search, onSearch }: SkillsTopNavProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <Link
        to={`/profile/${username}`}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:text-violet-700"
      >
        Back to profile
      </Link>
      <p className="text-sm font-semibold text-zinc-600">{name}</p>
      <div className="flex items-center gap-2">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search skill"
            className="w-56 rounded-full border border-white/70 bg-white/90 py-2 pl-9 pr-3 text-sm outline-none ring-violet-200 transition focus:ring"
          />
        </label>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/80 px-3 py-2 text-sm font-semibold text-zinc-700"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filter
        </button>
      </div>
    </div>
  );
}
