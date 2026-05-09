export function ReadingInspiration({ data }: { data: { books: string[]; writers: string[]; thinkers: string[]; podcasts: string[] } }) {
  const groups = [
    { title: "Books", items: data.books },
    { title: "Writers", items: data.writers },
    { title: "Thinkers", items: data.thinkers },
    { title: "Podcasts", items: data.podcasts },
  ];
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Reading & Inspiration</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{groups.map((g) => <article key={g.title} className="rounded-2xl border border-violet-100 bg-white p-4"><h3 className="font-bold text-violet-700">{g.title}</h3><div className="mt-2 space-y-1">{g.items.map((i) => <p key={i} className="text-sm text-zinc-700">{i}</p>)}</div></article>)}</div>
    </section>
  );
}
