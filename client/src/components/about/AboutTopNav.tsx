import { Share2 } from "lucide-react";
import { BackButton } from "../BackButton";

type AboutTopNavProps = {
  username: string;
  name: string;
};

export function AboutTopNav({ username, name }: AboutTopNavProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <BackButton to={`/profile/${username}`} />
      <p className="text-sm font-semibold text-zinc-600">{name}</p>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:text-violet-700"
      >
        <Share2 className="h-4 w-4" />
        Share
      </button>
    </div>
  );
}
