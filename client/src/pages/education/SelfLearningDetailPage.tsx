import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { EducationTopNav } from "../../components/education/EducationTopNav";
import { profileData } from "../../data/profile";
import { selfLearningTopics } from "../../data/education";

type TimelineItem = { phase: string; detail: string };
type Draft = {
  topic: string;
  philosophy: string;
  why: string;
  timeline: TimelineItem[];
  resources: string[];
  applications: string[];
  futureVision: string;
};

type ToastState =
  | { type: "confirm-delete"; message: string; section: "timeline" | "resources" | "applications"; index: number }
  | { type: "success"; message: string }
  | null;

const KEY = "profilare:self-learning-detail-edits";

function load<T>(key: string, fallback: T): T { try { const raw = localStorage.getItem(key); if (!raw) return fallback; return JSON.parse(raw) as T; } catch { return fallback; } }
function save<T>(key: string, value: T) { localStorage.setItem(key, JSON.stringify(value)); }

export function SelfLearningDetailPage() {
  const { username, topicSlug } = useParams<{ username: string; topicSlug: string }>();
  if (!username || username !== profileData.username) return <Navigate to={`/profile/${profileData.username}`} replace />;
  const topic = selfLearningTopics.find((i) => i.slug === topicSlug);
  if (!topic) return <Navigate to={`/profile/${profileData.username}/education`} replace />;
  const Icon = topic.icon;

  const all = load<Record<string, Draft>>(KEY, {});
  const initial: Draft = all[topic.slug] || { topic: topic.topic, philosophy: topic.philosophy, why: topic.why, timeline: topic.timeline, resources: topic.resources, applications: topic.applications, futureVision: topic.futureVision };

  const [data, setData] = useState<Draft>(initial);
  const [modal, setModal] = useState<null | { title: string; type: "field" | "list" | "timeline"; key: keyof Draft }>(null);
  const [toast, setToast] = useState<ToastState>(null);

  const persist = (next: Draft) => { setData(next); save(KEY, { ...all, [topic.slug]: next }); };

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <EducationTopNav username={profileData.username} name={profileData.name} search="" onSearch={() => undefined} />
        <section className="group relative mt-5 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_54px_-34px_rgba(79,70,229,0.55)]">
          <button onClick={() => setModal({ title: "Edit Header", type: "field", key: "topic" })} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white"><Icon className="h-6 w-6" /></span>
          <h1 className="mt-4 text-3xl font-extrabold">{data.topic}</h1>
          <p className="mt-2 text-zinc-700">{data.philosophy}</p>
        </section>
        <section className="group relative mt-6 rounded-3xl border border-white/70 bg-white/80 p-6"><button onClick={() => setModal({ title: "Edit Why", type: "field", key: "why" })} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button><h2 className="text-2xl font-bold">Why I started learning this</h2><p className="mt-3 text-sm text-zinc-700">{data.why}</p></section>
        <section className="group relative mt-6 rounded-3xl border border-white/70 bg-white/80 p-6"><button onClick={() => setModal({ title: "Edit Timeline", type: "timeline", key: "timeline" })} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button><h2 className="text-2xl font-bold">Learning timeline</h2><div className="mt-3 space-y-2">{data.timeline.map((t, i) => <p key={`${t.phase}-${i}`} className="group/t rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700"><b>{t.phase}:</b> {t.detail}<button onClick={() => setToast({ type: "confirm-delete", message: "Delete this timeline row?", section: "timeline", index: i })} className="ml-2 hidden text-rose-600 group-hover/t:inline"><Trash2 className="inline h-3 w-3" /></button></p>)}</div></section>
        <section className="mt-6 grid gap-4 md:grid-cols-2"><ListBlock title="Resources" items={data.resources} onEdit={() => setModal({ title: "Edit Resources", type: "list", key: "resources" })} onDelete={(i) => setToast({ type: "confirm-delete", message: "Delete this resource?", section: "resources", index: i })} /><ListBlock title="Real-world application" items={data.applications} onEdit={() => setModal({ title: "Edit Applications", type: "list", key: "applications" })} onDelete={(i) => setToast({ type: "confirm-delete", message: "Delete this application?", section: "applications", index: i })} /></section>
        <section className="group relative mt-6 rounded-3xl border border-violet-200 bg-gradient-to-br from-white to-violet-50/70 p-6"><button onClick={() => setModal({ title: "Edit Future Vision", type: "field", key: "futureVision" })} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button><h2 className="text-2xl font-bold">Future vision</h2><p className="mt-3 text-sm text-zinc-700">{data.futureVision}</p></section>
      </div>

      <AnimatePresence>
        {modal ? <EditModal title={modal.title} type={modal.type} value={data[modal.key]} onClose={() => setModal(null)} onSave={(next) => { persist({ ...data, [modal.key]: next } as Draft); setModal(null); setToast({ type: "success", message: "Updated." }); }} /> : null}
        {toast ? <Toast toast={toast} onClose={() => setToast(null)} onConfirm={() => { if (toast.type !== "confirm-delete") return; if (toast.section === "timeline") { const list = [...data.timeline]; list.splice(toast.index, 1); persist({ ...data, timeline: list }); } else if (toast.section === "resources") { const list = [...data.resources]; list.splice(toast.index, 1); persist({ ...data, resources: list }); } else { const list = [...data.applications]; list.splice(toast.index, 1); persist({ ...data, applications: list }); } setToast({ type: "success", message: "Deleted." }); }} /> : null}
      </AnimatePresence>
    </main>
  );
}

function ListBlock({ title, items, onEdit, onDelete }: { title: string; items: string[]; onEdit: () => void; onDelete: (index: number) => void }) {
  return <article className="group relative rounded-3xl border border-white/70 bg-white/80 p-6"><button onClick={onEdit} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button><h2 className="text-xl font-bold">{title}</h2><div className="mt-3 space-y-2">{items.map((v, i) => <p key={`${v}-${i}`} className="group/i rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{v}<button onClick={() => onDelete(i)} className="ml-2 hidden text-rose-600 group-hover/i:inline"><Trash2 className="inline h-3 w-3" /></button></p>)}</div></article>;
}

function EditModal({ title, type, value, onClose, onSave }: { title: string; type: "field" | "list" | "timeline"; value: unknown; onClose: () => void; onSave: (v: unknown) => void }) {
  const [text, setText] = useState(type === "timeline" ? (Array.isArray(value) ? (value as TimelineItem[]).map((t) => `${t.phase} :: ${t.detail}`).join("\n") : "") : type === "list" ? (Array.isArray(value) ? (value as string[]).join("\n") : "") : String(value || ""));
  const commit = () => {
    if (type === "field") onSave(text);
    else if (type === "list") onSave(text.split("\n").map((v) => v.trim()).filter(Boolean));
    else onSave(text.split("\n").map((v) => v.trim()).filter(Boolean).map((line) => { const [phase, ...rest] = line.split("::"); return { phase: phase.trim(), detail: rest.join("::").trim() }; }).filter((t) => t.phase && t.detail));
  };
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4"><motion.div initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }} className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-lg font-bold">{title}</h3><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5"><X className="h-4 w-4" /></button></div>{type === "timeline" ? <p className="mt-3 text-xs text-zinc-500">Use: `Phase :: Detail` one per line</p> : null}<textarea value={text} onChange={(e) => setText(e.target.value)} className="mt-4 min-h-40 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /><button onClick={commit} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"><Save className="h-4 w-4" />Save</button></motion.div></motion.div>;
}

function Toast({ toast, onClose, onConfirm }: { toast: ToastState; onClose: () => void; onConfirm: () => void }) { if (!toast) return null; return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="fixed bottom-4 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl"><p className="text-sm text-zinc-800">{toast.message}</p>{toast.type === "confirm-delete" ? <div className="mt-3 flex gap-2"><button onClick={onConfirm} className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">Confirm</button><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Cancel</button></div> : <button onClick={onClose} className="mt-3 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Close</button>}</motion.div>; }
