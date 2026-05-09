import type { LucideIcon } from "lucide-react";

export function WritingCategories({ items }: { items: Array<{ name: string; icon: LucideIcon; count: number; description: string }> }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Writing Categories</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.name} className="rounded-2xl border border-violet-100 bg-white p-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white"><Icon className="h-5 w-5" /></span>
              <h3 className="mt-3 font-bold">{item.name}</h3>
              <p className="text-xs text-zinc-500">{item.count} posts</p>
              <p className="mt-1 text-sm text-zinc-700">{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
