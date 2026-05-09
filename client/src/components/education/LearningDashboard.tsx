export function LearningDashboard({ items }: { items: Array<{ topic: string; progress: number; weeklyGoal: string }> }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Current Learning Dashboard</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.topic} className="rounded-2xl border border-violet-100 bg-white p-4">
            <div className="flex items-center justify-between"><h3 className="font-bold">{item.topic}</h3><span className="text-xs text-zinc-500">{item.progress}%</span></div>
            <p className="mt-1 text-xs text-zinc-500">Weekly goal: {item.weeklyGoal}</p>
            <div className="mt-2 h-2 rounded-full bg-violet-100"><div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600" style={{ width: `${item.progress}%` }} /></div>
          </article>
        ))}
      </div>
    </section>
  );
}
