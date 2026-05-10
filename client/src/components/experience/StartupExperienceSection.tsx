import type { ExperienceItem } from "../../data/experience";
import { ExperienceCard } from "./ExperienceCardsSection";

export function StartupExperienceSection({ username, items, onEdit, onDelete }: { username: string; items: ExperienceItem[]; onEdit?: (slug: string) => void; onDelete?: (slug: string) => void }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Startup Experience</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">{items.map((item) => <ExperienceCard key={item.slug} username={username} item={item} onEdit={onEdit ? () => onEdit(item.slug) : undefined} onDelete={onDelete ? () => onDelete(item.slug) : undefined} />)}</div>
    </section>
  );
}

