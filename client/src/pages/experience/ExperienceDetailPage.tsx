import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ExperienceTopNav } from "../../components/experience/ExperienceTopNav";
import { experienceItems } from "../../data/experience";
import { profileData } from "../../data/profile";

type DetailDraft = {
  role: string;
  org: string;
  timeline: string;
  category: string;
  status: string;
  short: string;
  whyStarted: string;
  problem: string;
  responsibilities: string[];
  challenges: string[];
  skills: string[];
  achievements: string[];
  reflection: string;
  related: string[];
};

type ToastState =
  | { type: "confirm-delete"; message: string; action: "delete-item"; section: "responsibilities" | "challenges" | "skills" | "achievements" | "related"; index: number }
  | { type: "success"; message: string }
  | null;

const KEY = "profilare:experience-detail-edits";

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function ExperienceDetailPage() {
  const { username, experienceSlug } = useParams<{ username: string; experienceSlug: string }>();
  if (!username || username !== profileData.username) return <Navigate to={`/profile/${profileData.username}`} replace />;

  const exp = experienceItems.find((item) => item.slug === experienceSlug);
  if (!exp) return <Navigate to={`/profile/${profileData.username}/experience`} replace />;

  const allEdits = load<Record<string, DetailDraft>>(KEY, {});
  const initial: DetailDraft = allEdits[exp.slug] || {
    role: exp.role,
    org: exp.org,
    timeline: exp.timeline,
    category: exp.category,
    status: exp.status,
    short: exp.short,
    whyStarted: exp.whyStarted,
    problem: exp.problem,
    responsibilities: exp.responsibilities,
    challenges: exp.challenges,
    skills: exp.skills,
    achievements: exp.achievements,
    reflection: exp.reflection,
    related: exp.related,
  };

  const [data, setData] = useState<DetailDraft>(initial);
  const [toast, setToast] = useState<ToastState>(null);
  const [modal, setModal] = useState<null | { title: string; type: "field" | "list"; key: keyof DetailDraft }>(null);

  const persist = (next: DetailDraft) => {
    setData(next);
    const updated = { ...allEdits, [exp.slug]: next };
    save(KEY, updated);
  };

  const Icon = exp.icon;

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <ExperienceTopNav username={profileData.username} name={profileData.name} search="" onSearch={() => undefined} />

        <section className="group relative mt-5 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_54px_-34px_rgba(79,70,229,0.55)]">
          <button onClick={() => setModal({ title: "Edit Header", type: "field", key: "role" })} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white"><Icon className="h-6 w-6" /></span>
          <h1 className="mt-4 text-3xl font-extrabold">{data.role}</h1>
          <p className="text-zinc-600">{data.org}</p>
          <p className="text-sm text-zinc-500">{data.timeline} • {data.category} • {data.status}</p>
        </section>

        <Section title="About the experience" onEdit={() => setModal({ title: "Edit About", type: "field", key: "short" })}>
          <p className="mt-2 text-sm text-zinc-700"><b>What:</b> {data.short}</p>
          <p className="mt-1 text-sm text-zinc-700"><b>Why started:</b> {data.whyStarted}</p>
          <p className="mt-1 text-sm text-zinc-700"><b>Problem:</b> {data.problem}</p>
        </Section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <ListSection title="Responsibilities" items={data.responsibilities} onEdit={() => setModal({ title: "Edit Responsibilities", type: "list", key: "responsibilities" })} onDelete={(index) => setToast({ type: "confirm-delete", message: "Delete this responsibility?", action: "delete-item", section: "responsibilities", index })} />
          <ListSection title="Challenges" items={data.challenges} onEdit={() => setModal({ title: "Edit Challenges", type: "list", key: "challenges" })} onDelete={(index) => setToast({ type: "confirm-delete", message: "Delete this challenge?", action: "delete-item", section: "challenges", index })} />
        </section>

        <section className="group relative mt-6 rounded-3xl border border-white/70 bg-white/80 p-6">
          <button onClick={() => setModal({ title: "Edit Skills Used", type: "list", key: "skills" })} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button>
          <h2 className="text-2xl font-bold">Skills Used</h2>
          <div className="mt-3 flex flex-wrap gap-2">{data.skills.map((s, i) => <span key={`${s}-${i}`} className="group/skill rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{s}<button onClick={() => setToast({ type: "confirm-delete", message: "Delete this skill?", action: "delete-item", section: "skills", index: i })} className="ml-1 hidden text-rose-600 group-hover/skill:inline"><Trash2 className="inline h-3 w-3" /></button></span>)}</div>
        </section>

        <ListSection title="Results & Achievements" items={data.achievements} onEdit={() => setModal({ title: "Edit Achievements", type: "list", key: "achievements" })} onDelete={(index) => setToast({ type: "confirm-delete", message: "Delete this achievement?", action: "delete-item", section: "achievements", index })} />

        <section className="group relative mt-6 rounded-3xl border border-violet-200 bg-gradient-to-br from-white to-violet-50/70 p-6">
          <button onClick={() => setModal({ title: "Edit Reflection", type: "field", key: "reflection" })} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button>
          <h2 className="text-2xl font-bold">Reflection</h2>
          <p className="mt-3 text-sm text-zinc-700">{data.reflection}</p>
          <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-violet-700">Related projects</h3>
          <div className="mt-2 flex flex-wrap gap-2">{data.related.map((r, i) => <span key={`${r}-${i}`} className="group/rel rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-semibold text-violet-700">{r}<button onClick={() => setToast({ type: "confirm-delete", message: "Delete this related project?", action: "delete-item", section: "related", index: i })} className="ml-1 hidden text-rose-600 group-hover/rel:inline"><Trash2 className="inline h-3 w-3" /></button></span>)}</div>
        </section>
      </div>

      <AnimatePresence>
        {modal ? (
          <EditModal
            title={modal.title}
            type={modal.type}
            value={data[modal.key]}
            onClose={() => setModal(null)}
            onSave={(next) => {
              const updated = { ...data, [modal.key]: next } as DetailDraft;
              persist(updated);
              setModal(null);
              setToast({ type: "success", message: "Updated." });
            }}
          />
        ) : null}
        {toast ? <Toast toast={toast} onClose={() => setToast(null)} onConfirm={() => {
          if (toast.type !== "confirm-delete") return;
          const list = [...(data[toast.section] as string[])];
          list.splice(toast.index, 1);
          persist({ ...data, [toast.section]: list } as DetailDraft);
          setToast({ type: "success", message: "Deleted." });
        }} /> : null}
      </AnimatePresence>
    </main>
  );
}

function Section({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  return <section className="group relative mt-6 rounded-3xl border border-white/70 bg-white/80 p-6"><button onClick={onEdit} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button><h2 className="text-2xl font-bold">{title}</h2>{children}</section>;
}

function ListSection({ title, items, onEdit, onDelete }: { title: string; items: string[]; onEdit: () => void; onDelete: (index: number) => void }) {
  return <article className="group relative rounded-3xl border border-white/70 bg-white/80 p-6"><button onClick={onEdit} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button><h2 className="text-xl font-bold">{title}</h2><div className="mt-3 space-y-2">{items.map((v, i) => <p key={`${v}-${i}`} className="group/item rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{v}<button onClick={() => onDelete(i)} className="ml-2 hidden text-rose-600 group-hover/item:inline"><Trash2 className="inline h-3 w-3" /></button></p>)}</div></article>;
}

function EditModal({ title, type, value, onClose, onSave }: { title: string; type: "field" | "list"; value: unknown; onClose: () => void; onSave: (next: unknown) => void }) {
  const [text, setText] = useState(type === "list" ? (Array.isArray(value) ? value.join("\n") : "") : String(value || ""));
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4"><motion.div initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }} className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-lg font-bold">{title}</h3><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5"><X className="h-4 w-4" /></button></div><div className="mt-4"><textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-40 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div><button onClick={() => onSave(type === "list" ? text.split("\n").map((v) => v.trim()).filter(Boolean) : text)} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"><Save className="h-4 w-4" />Save</button></motion.div></motion.div>;
}

function Toast({ toast, onClose, onConfirm }: { toast: ToastState; onClose: () => void; onConfirm: () => void }) {
  if (!toast) return null;
  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="fixed bottom-4 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl"><p className="text-sm text-zinc-800">{toast.message}</p>{toast.type === "confirm-delete" ? <div className="mt-3 flex gap-2"><button onClick={onConfirm} className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">Confirm</button><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Cancel</button></div> : <button onClick={onClose} className="mt-3 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Close</button>}</motion.div>;
}
