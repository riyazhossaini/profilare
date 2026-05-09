import { ArrowRight, Pencil, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

type SectionCardProps = {
  to: string;
  title: string;
  description: string;
  icon: LucideIcon;
  onEdit?: () => void;
};

export function SectionCard({ to, title, description, icon: Icon, onEdit }: SectionCardProps) {
  return (
    <Link
      to={to}
      className="group relative block rounded-2xl border border-white/70 bg-white/80 p-5 shadow-[0_18px_36px_-26px_rgba(79,70,229,0.55)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_24px_44px_-24px_rgba(79,70,229,0.6)]"
    >
      {onEdit ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEdit();
          }}
          className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-1.5 text-zinc-700 opacity-0 transition group-hover:opacity-100"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
      ) : null}
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-md">
            <Icon className="h-5 w-5" />
          </span>
          <h3 className="text-lg font-bold text-zinc-900">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">{description}</p>
        </div>
        <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-violet-600" />
      </div>
    </Link>
  );
}
