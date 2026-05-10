import { ArrowRight, Pencil, Trash2, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type ClickCardItem = {
  slug: string;
  name: string;
  short: string;
  icon: LucideIcon;
};

type ClickCardGridProps = {
  title: string;
  cta: string;
  routePrefix: string;
  items: ClickCardItem[];
  onEdit?: (slug: string) => void;
  onDelete?: (slug: string) => void;
};

function ClickCardGrid({ title, cta, routePrefix, items, onEdit, onDelete }: ClickCardGridProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">{title}</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.slug} className="group relative rounded-2xl border border-violet-100 bg-white p-4 transition hover:-translate-y-0.5 hover:border-violet-200">
              {onDelete ? (
                <button onClick={() => onDelete(item.slug)} className="absolute right-12 top-3 rounded-full border border-rose-200 bg-white p-1.5 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              ) : null}
              {onEdit ? (
                <button onClick={() => onEdit(item.slug)} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-1.5 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              ) : null}
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 text-lg font-bold text-zinc-900">{item.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-700">{item.short}</p>
              <Link to={`${routePrefix}/${item.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet-700 transition hover:text-violet-800">
                {cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          );
        })}
      </div>
    </motion.section>
  );
}

type RoleCardsProps = { routePrefix: string; items: ClickCardItem[]; onEdit?: (slug: string) => void; onDelete?: (slug: string) => void };
export function RoleCards({ routePrefix, items, onEdit, onDelete }: RoleCardsProps) {
  return <ClickCardGrid title="Roles" cta="Read my story" routePrefix={routePrefix} items={items} onEdit={onEdit} onDelete={onDelete} />;
}

type InterestCardsProps = { routePrefix: string; items: ClickCardItem[]; onEdit?: (slug: string) => void; onDelete?: (slug: string) => void };
export function InterestCards({ routePrefix, items, onEdit, onDelete }: InterestCardsProps) {
  return <ClickCardGrid title="Interests" cta="Explore" routePrefix={routePrefix} items={items} onEdit={onEdit} onDelete={onDelete} />;
}

type ValueCardsProps = { routePrefix: string; items: ClickCardItem[]; onEdit?: (slug: string) => void; onDelete?: (slug: string) => void };
export function ValueCards({ routePrefix, items, onEdit, onDelete }: ValueCardsProps) {
  return <ClickCardGrid title="Values" cta="Understand this value" routePrefix={routePrefix} items={items} onEdit={onEdit} onDelete={onDelete} />;
}

