import { Pencil, Trash2 } from "lucide-react";

export function AudienceInteraction({ data, onEdit, onDelete }: { data: { newsletter: string; collaboration: string; discussion: string }; onEdit?: (key: "newsletter" | "collaboration" | "discussion") => void; onDelete?: (key: "newsletter" | "collaboration" | "discussion") => void }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Audience Interaction</h2>
      <AudienceLine label="Newsletter" value={data.newsletter} onEdit={onEdit ? () => onEdit("newsletter") : undefined} onDelete={onDelete ? () => onDelete("newsletter") : undefined} />
      <AudienceLine label="Collaboration" value={data.collaboration} onEdit={onEdit ? () => onEdit("collaboration") : undefined} onDelete={onDelete ? () => onDelete("collaboration") : undefined} />
      <AudienceLine label="Discussion" value={data.discussion} onEdit={onEdit ? () => onEdit("discussion") : undefined} onDelete={onDelete ? () => onDelete("discussion") : undefined} />
    </section>
  );
}

function AudienceLine({ label, value, onEdit, onDelete }: { label: string; value: string; onEdit?: () => void; onDelete?: () => void }) {
  return (
    <div className="group mt-2 flex items-start justify-between gap-3">
      <p className="text-sm text-zinc-700"><b>{label}:</b> {value || "-"}</p>
      {onEdit || onDelete ? (
        <div className="flex gap-1 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
          {onEdit ? <button onClick={onEdit} className="rounded-full border border-zinc-200 bg-white p-1.5 text-zinc-700"><Pencil className="h-3.5 w-3.5" /></button> : null}
          {onDelete ? <button onClick={onDelete} className="rounded-full border border-rose-200 bg-white p-1.5 text-rose-600"><Trash2 className="h-3.5 w-3.5" /></button> : null}
        </div>
      ) : null}
    </div>
  );
}
