import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ProjectsTopNav } from "../../components/projects/ProjectsTopNav";
import { profileData } from "../../data/profile";
import { projects } from "../../data/projects";

type ProjectDetailDraft = {
  title: string;
  tagline: string;
  timeline: string;
  category: string;
  status: string;
  about: string;
  problem: string;
  users: string;
  vision: string;
  story: string;
  features: string[];
  tech: string[];
  typography: string;
  philosophy: string;
  brand: string;
  colors: string[];
  challenges: string[];
  lessons: string[];
  roadmap: string[];
  related: string[];
};

type ListKey = "features" | "tech" | "challenges" | "lessons" | "roadmap" | "related";
type ToastState =
  | { type: "confirm-delete"; message: string; action: "delete-item"; key: ListKey; index: number }
  | { type: "success"; message: string }
  | null;

const KEY = "profilare:project-detail-edits";

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

export function ProjectDetailPage() {
  const { username, projectSlug } = useParams<{ username: string; projectSlug: string }>();
  if (!username || username !== profileData.username) return <Navigate to={`/profile/${profileData.username}`} replace />;

  const project = projects.find((p) => p.slug === projectSlug);
  if (!project) return <Navigate to={`/profile/${profileData.username}/projects`} replace />;

  const all = load<Record<string, ProjectDetailDraft>>(KEY, {});
  const initial: ProjectDetailDraft = all[project.slug] || {
    title: project.title,
    tagline: project.tagline,
    timeline: project.timeline,
    category: project.category,
    status: project.status,
    about: project.about,
    problem: project.problem,
    users: project.users,
    vision: project.vision,
    story: project.story,
    features: project.features,
    tech: project.tech,
    typography: project.design.typography,
    philosophy: project.design.philosophy,
    brand: project.design.brand,
    colors: project.design.colors,
    challenges: project.challenges,
    lessons: project.lessons,
    roadmap: project.roadmap,
    related: project.related,
  };

  const [data, setData] = useState<ProjectDetailDraft>(initial);
  const [toast, setToast] = useState<ToastState>(null);
  const [modal, setModal] = useState<null | { title: string; type: "field" | "list"; key: keyof ProjectDetailDraft }>(null);

  const persist = (next: ProjectDetailDraft) => {
    setData(next);
    save(KEY, { ...all, [project.slug]: next });
  };

  const Icon = project.icon;

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <ProjectsTopNav username={profileData.username} name={profileData.name} search="" onSearch={() => undefined} />

        <section className="group relative mt-5 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_54px_-34px_rgba(79,70,229,0.55)]">
          <button onClick={() => setModal({ title: "Edit Header", type: "field", key: "title" })} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button>
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white"><Icon className="h-6 w-6" /></span>
            <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{data.status}</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold">{data.title}</h1>
          <p className="mt-1 text-zinc-700">{data.tagline}</p>
          <p className="mt-1 text-sm text-zinc-500">{data.timeline} • {data.category}</p>
        </section>

        <Block title="About Project" onEdit={() => setModal({ title: "Edit About", type: "field", key: "about" })}>
          <p className="mt-2 text-sm text-zinc-700"><b>What:</b> {data.about}</p>
          <p className="mt-1 text-sm text-zinc-700"><b>Why:</b> {data.problem}</p>
          <p className="mt-1 text-sm text-zinc-700"><b>Users:</b> {data.users}</p>
          <p className="mt-1 text-sm text-zinc-700"><b>Vision:</b> {data.vision}</p>
        </Block>

        <Block title="Project Story" onEdit={() => setModal({ title: "Edit Story", type: "field", key: "story" })}><p className="mt-2 text-sm text-zinc-700">{data.story}</p></Block>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <ListBlock title="Features" items={data.features} onEdit={() => setModal({ title: "Edit Features", type: "list", key: "features" })} onDelete={(index) => setToast({ type: "confirm-delete", message: "Delete this feature?", action: "delete-item", key: "features", index })} />
          <ListChips title="Tech Stack" items={data.tech} onEdit={() => setModal({ title: "Edit Tech Stack", type: "list", key: "tech" })} onDelete={(index) => setToast({ type: "confirm-delete", message: "Delete this tech item?", action: "delete-item", key: "tech", index })} />
        </section>

        <section className="group relative mt-6 rounded-3xl border border-white/70 bg-white/80 p-6">
          <button onClick={() => setModal({ title: "Edit Design System", type: "field", key: "typography" })} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button>
          <h2 className="text-2xl font-bold">Design System</h2>
          <p className="mt-2 text-sm text-zinc-700"><b>Typography:</b> {data.typography}</p>
          <p className="mt-1 text-sm text-zinc-700"><b>UI Philosophy:</b> {data.philosophy}</p>
          <p className="mt-1 text-sm text-zinc-700"><b>Brand Direction:</b> {data.brand}</p>
          <div className="mt-2 flex gap-2">{data.colors.map((c, i) => <span key={`${c}-${i}`} className="h-7 w-7 rounded-full border" style={{ backgroundColor: c }} />)}</div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <ListBlock title="Challenges" items={data.challenges} onEdit={() => setModal({ title: "Edit Challenges", type: "list", key: "challenges" })} onDelete={(index) => setToast({ type: "confirm-delete", message: "Delete this challenge?", action: "delete-item", key: "challenges", index })} />
          <ListBlock title="Lessons" items={data.lessons} onEdit={() => setModal({ title: "Edit Lessons", type: "list", key: "lessons" })} onDelete={(index) => setToast({ type: "confirm-delete", message: "Delete this lesson?", action: "delete-item", key: "lessons", index })} />
        </section>

        <section className="group relative mt-6 rounded-3xl border border-white/70 bg-white/80 p-6">
          <button onClick={() => setModal({ title: "Edit Roadmap", type: "list", key: "roadmap" })} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button>
          <h2 className="text-2xl font-bold">Roadmap</h2>
          <div className="mt-3 space-y-2">{data.roadmap.map((r, i) => <p key={`${r}-${i}`} className="group/r rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{r}<button onClick={() => setToast({ type: "confirm-delete", message: "Delete this roadmap item?", action: "delete-item", key: "roadmap", index: i })} className="ml-2 hidden text-rose-600 group-hover/r:inline"><Trash2 className="inline h-3 w-3" /></button></p>)}</div>
          <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-violet-700">Related projects</h3>
          <div className="mt-2 flex flex-wrap gap-2">{data.related.map((r, i) => <span key={`${r}-${i}`} className="group/rel rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{r}<button onClick={() => setToast({ type: "confirm-delete", message: "Delete this related project?", action: "delete-item", key: "related", index: i })} className="ml-1 hidden text-rose-600 group-hover/rel:inline"><Trash2 className="inline h-3 w-3" /></button></span>)}</div>
        </section>
      </div>

      <AnimatePresence>
        {modal ? <EditModal title={modal.title} type={modal.type} value={data[modal.key]} onClose={() => setModal(null)} onSave={(next) => { const updated = { ...data, [modal.key]: next } as ProjectDetailDraft; persist(updated); setModal(null); setToast({ type: "success", message: "Updated." }); }} /> : null}
        {toast ? <Toast toast={toast} onClose={() => setToast(null)} onConfirm={() => { if (toast.type !== "confirm-delete") return; const copy = [...(data[toast.key] as string[])]; copy.splice(toast.index, 1); persist({ ...data, [toast.key]: copy } as ProjectDetailDraft); setToast({ type: "success", message: "Deleted." }); }} /> : null}
      </AnimatePresence>
    </main>
  );
}

function Block({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  return <section className="group relative mt-6 rounded-3xl border border-white/70 bg-white/80 p-6"><button onClick={onEdit} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button><h2 className="text-2xl font-bold">{title}</h2>{children}</section>;
}

function ListBlock({ title, items, onEdit, onDelete }: { title: string; items: string[]; onEdit: () => void; onDelete: (index: number) => void }) {
  return <article className="group relative rounded-3xl border border-white/70 bg-white/80 p-6"><button onClick={onEdit} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button><h2 className="text-xl font-bold">{title}</h2><div className="mt-3 space-y-2">{items.map((v, i) => <p key={`${v}-${i}`} className="group/item rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{v}<button onClick={() => onDelete(i)} className="ml-2 hidden text-rose-600 group-hover/item:inline"><Trash2 className="inline h-3 w-3" /></button></p>)}</div></article>;
}

function ListChips({ title, items, onEdit, onDelete }: { title: string; items: string[]; onEdit: () => void; onDelete: (index: number) => void }) {
  return <article className="group relative rounded-3xl border border-white/70 bg-white/80 p-6"><button onClick={onEdit} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button><h2 className="text-xl font-bold">{title}</h2><div className="mt-3 flex flex-wrap gap-2">{items.map((v, i) => <span key={`${v}-${i}`} className="group/chip rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{v}<button onClick={() => onDelete(i)} className="ml-1 hidden text-rose-600 group-hover/chip:inline"><Trash2 className="inline h-3 w-3" /></button></span>)}</div></article>;
}

function EditModal({ title, type, value, onClose, onSave }: { title: string; type: "field" | "list"; value: unknown; onClose: () => void; onSave: (next: unknown) => void }) {
  const [text, setText] = useState(type === "list" ? (Array.isArray(value) ? value.join("\n") : "") : String(value || ""));
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4"><motion.div initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }} className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-lg font-bold">{title}</h3><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5"><X className="h-4 w-4" /></button></div><div className="mt-4"><textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-40 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div><button onClick={() => onSave(type === "list" ? text.split("\n").map((v) => v.trim()).filter(Boolean) : text)} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"><Save className="h-4 w-4" />Save</button></motion.div></motion.div>;
}

function Toast({ toast, onClose, onConfirm }: { toast: ToastState; onClose: () => void; onConfirm: () => void }) {
  if (!toast) return null;
  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="fixed bottom-4 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl"><p className="text-sm text-zinc-800">{toast.message}</p>{toast.type === "confirm-delete" ? <div className="mt-3 flex gap-2"><button onClick={onConfirm} className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">Confirm</button><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Cancel</button></div> : <button onClick={onClose} className="mt-3 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Close</button>}</motion.div>;
}
