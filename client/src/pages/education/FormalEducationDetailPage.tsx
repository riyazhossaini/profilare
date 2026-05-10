import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { EducationTopNav } from "../../components/education/EducationTopNav";
import { formalEducation } from "../../data/education";
import { profileData } from "../../data/profile";

type Draft = {
  institution: string;
  degree: string;
  timeline: string;
  story: string;
  reflection: string;
  skills: string[];
  experiences: string[];
  milestones: string[];
};

type ToastState =
  | { type: "confirm-delete"; message: string; section: "skills" | "experiences" | "milestones"; index: number }
  | { type: "success"; message: string }
  | null;

const KEY = "profilare:formal-education-detail-edits";

function load<T>(key: string, fallback: T): T { try { const raw = localStorage.getItem(key); if (!raw) return fallback; return JSON.parse(raw) as T; } catch { return fallback; } }
function save<T>(key: string, value: T) { localStorage.setItem(key, JSON.stringify(value)); }

export function FormalEducationDetailPage() {
  const { username, formalSlug } = useParams<{ username: string; formalSlug: string }>();
  if (!username || username !== profileData.username) return <Navigate to={`/profile/${profileData.username}`} replace />;
  const item = formalEducation.find((i) => i.slug === formalSlug);
  if (!item) return <Navigate to={`/profile/${profileData.username}/education`} replace />;

  const all = load<Record<string, Draft>>(KEY, {});
  const initial: Draft = all[item.slug] || { institution: item.institution, degree: item.degree, timeline: item.timeline, story: item.story, reflection: item.reflection, skills: item.skills, experiences: item.experiences, milestones: item.milestones };

  const [data, setData] = useState<Draft>(initial);
  const [modal, setModal] = useState<null | { title: string; type: "field" | "list"; key: keyof Draft }>(null);
  const [toast, setToast] = useState<ToastState>(null);

  const persist = (next: Draft) => { setData(next); save(KEY, { ...all, [item.slug]: next }); };

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <EducationTopNav username={profileData.username} name={profileData.name} search="" onSearch={() => undefined} />
        <section className="group relative mt-5 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_54px_-34px_rgba(79,70,229,0.55)]">
          <button onClick={() => setModal({ title: "Edit Header", type: "field", key: "institution" })} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button>
          <h1 className="text-3xl font-extrabold">{data.institution}</h1>
          <p className="text-zinc-600">{data.degree}</p>
          <p className="text-sm text-zinc-500">{data.timeline} • Formal Education</p>
        </section>
        <section className="group relative mt-6 rounded-3xl border border-white/70 bg-white/80 p-6"><button onClick={() => setModal({ title: "Edit Experience", type: "field", key: "story" })} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button><h2 className="text-2xl font-bold">My Experience</h2><p className="mt-3 text-sm text-zinc-700">{data.story}</p><p className="mt-3 text-sm text-zinc-700">{data.reflection}</p></section>
        <section className="mt-6 grid gap-4 md:grid-cols-2"><ListChips title="Skills & Subjects" items={data.skills} onEdit={() => setModal({ title: "Edit Skills", type: "list", key: "skills" })} onDelete={(i) => setToast({ type: "confirm-delete", message: "Delete this skill?", section: "skills", index: i })} /><ListBlock title="Projects & Activities" items={data.experiences} onEdit={() => setModal({ title: "Edit Activities", type: "list", key: "experiences" })} onDelete={(i) => setToast({ type: "confirm-delete", message: "Delete this activity?", section: "experiences", index: i })} /></section>
        <ListBlock title="Memories & Milestones" items={data.milestones} onEdit={() => setModal({ title: "Edit Milestones", type: "list", key: "milestones" })} onDelete={(i) => setToast({ type: "confirm-delete", message: "Delete this milestone?", section: "milestones", index: i })} />
      </div>

      <AnimatePresence>
        {modal ? <EditModal title={modal.title} type={modal.type} value={data[modal.key]} onClose={() => setModal(null)} onSave={(next) => { persist({ ...data, [modal.key]: next } as Draft); setModal(null); setToast({ type: "success", message: "Updated." }); }} /> : null}
        {toast ? <Toast toast={toast} onClose={() => setToast(null)} onConfirm={() => { if (toast.type !== "confirm-delete") return; const copy = [...data[toast.section]]; copy.splice(toast.index, 1); persist({ ...data, [toast.section]: copy }); setToast({ type: "success", message: "Deleted." }); }} /> : null}
      </AnimatePresence>
    </main>
  );
}

function ListBlock({ title, items, onEdit, onDelete }: { title: string; items: string[]; onEdit: () => void; onDelete: (index: number) => void }) {
  return <article className="group relative mt-6 rounded-3xl border border-white/70 bg-white/80 p-6"><button onClick={onEdit} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button><h2 className="text-2xl font-bold">{title}</h2><div className="mt-3 space-y-2">{items.map((it, i) => <p key={`${it}-${i}`} className="group/item rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{it}<button onClick={() => onDelete(i)} className="ml-2 hidden text-rose-600 group-hover/item:inline"><Trash2 className="inline h-3 w-3" /></button></p>)}</div></article>;
}

function ListChips({ title, items, onEdit, onDelete }: { title: string; items: string[]; onEdit: () => void; onDelete: (index: number) => void }) {
  return <article className="group relative rounded-3xl border border-white/70 bg-white/80 p-6"><button onClick={onEdit} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button><h2 className="text-xl font-bold">{title}</h2><div className="mt-3 flex flex-wrap gap-2">{items.map((it, i) => <span key={`${it}-${i}`} className="group/ch rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{it}<button onClick={() => onDelete(i)} className="ml-1 hidden text-rose-600 group-hover/ch:inline"><Trash2 className="inline h-3 w-3" /></button></span>)}</div></article>;
}

function EditModal({ title, type, value, onClose, onSave }: { title: string; type: "field" | "list"; value: unknown; onClose: () => void; onSave: (v: unknown) => void }) {
  const [text, setText] = useState(type === "list" ? (Array.isArray(value) ? (value as string[]).join("\n") : "") : String(value || ""));
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4"><motion.div initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }} className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-lg font-bold">{title}</h3><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5"><X className="h-4 w-4" /></button></div><textarea value={text} onChange={(e) => setText(e.target.value)} className="mt-4 min-h-40 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /><button onClick={() => onSave(type === "list" ? text.split("\n").map((v) => v.trim()).filter(Boolean) : text)} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"><Save className="h-4 w-4" />Save</button></motion.div></motion.div>;
}

function Toast({ toast, onClose, onConfirm }: { toast: ToastState; onClose: () => void; onConfirm: () => void }) {
  if (!toast) return null;
  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="fixed bottom-4 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl"><p className="text-sm text-zinc-800">{toast.message}</p>{toast.type === "confirm-delete" ? <div className="mt-3 flex gap-2"><button onClick={onConfirm} className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">Confirm</button><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Cancel</button></div> : <button onClick={onClose} className="mt-3 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Close</button>}</motion.div>;
}
