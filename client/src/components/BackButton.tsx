import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

type BackButtonProps = {
  to: string;
};

export function BackButton({ to }: BackButtonProps) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:text-violet-700"
    >
      <ChevronLeft className="h-4 w-4" />
      Back to profile
    </Link>
  );
}
