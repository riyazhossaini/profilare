export function LearningPhilosophy({ text }: { text: string }) {
  return (
    <section className="mt-6 rounded-3xl border border-violet-200 bg-gradient-to-br from-white to-violet-50/70 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Learning Philosophy</h2>
      <p className="mt-3 text-sm leading-relaxed text-zinc-700 md:text-base">{text}</p>
    </section>
  );
}
