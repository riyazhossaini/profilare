import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export function ContentTopNav({ username, name, search, onSearch }: { username: string; name: string; search: string; onSearch: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to={`/profile/${username}`} className="inline-flex rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-zinc-700">Back to profile</Link>
        <p className="text-sm font-semibold text-zinc-600">{name}</p>
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input value={search} onChange={(e) => onSearch(e.target.value)} placeholder="Search content" className="w-56 rounded-full border border-white/70 bg-white/90 py-2 pl-9 pr-3 text-sm outline-none" />
        </label>
      </div>
    </div>
  );
}
