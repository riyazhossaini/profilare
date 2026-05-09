export function AudienceInteraction({ data }: { data: { newsletter: string; collaboration: string; discussion: string } }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Audience Interaction</h2>
      <p className="mt-2 text-sm text-zinc-700"><b>Newsletter:</b> {data.newsletter}</p>
      <p className="mt-1 text-sm text-zinc-700"><b>Collaboration:</b> {data.collaboration}</p>
      <p className="mt-1 text-sm text-zinc-700"><b>Discussion:</b> {data.discussion}</p>
    </section>
  );
}
