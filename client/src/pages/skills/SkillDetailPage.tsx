import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { LearningTimeline } from "../../components/skills/LearningTimeline";
import { SkillsTopNav } from "../../components/skills/SkillsTopNav";
import { profileData } from "../../data/profile";
import { allSkills, type Skill } from "../../data/skills";

type SkillDetailDraft = {
  name: string;
  personalConnection: string;
  progress: number;
  level: string;
  learningSince: string;
  why: string;
  timeline: Array<{ phase: string; detail: string }>;
  resources: string[];
  realWorldUsage: string[];
  futurePlans: string;
  relatedSkills: string[];
};

type ToastState =
  | { type: "confirm-delete"; message: string; action: "delete-list" | "delete-timeline"; section: "resources" | "realWorldUsage" | "relatedSkills" | "timeline"; index: number }
  | { type: "success"; message: string }
  | null;

const KEY = "profilare:skill-detail-edits";

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

export function SkillDetailPage() {
  const { username, skillSlug } = useParams<{ username: string; skillSlug: string }>();

  if (!username || username !== profileData.username) {
    return <Navigate to={`/profile/${profileData.username}`} replace />;
  }

  const skill = allSkills.find((item) => item.slug === skillSlug);

  if (!skill) {
    return <Navigate to={`/profile/${profileData.username}/skills`} replace />;
  }

  const all = load<Record<string, SkillDetailDraft>>(KEY, {});
  const initial: SkillDetailDraft = all[skill.slug] || {
    name: skill.name,
    personalConnection: skill.personalConnection,
    progress: skill.progress,
    level: skill.level,
    learningSince: skill.learningSince,
    why: skill.why,
    timeline: skill.timeline,
    resources: skill.resources,
    realWorldUsage: skill.realWorldUsage,
    futurePlans: skill.futurePlans,
    relatedSkills: skill.relatedSkills,
  };

  const [data, setData] = useState<SkillDetailDraft>(initial);
  const [toast, setToast] = useState<ToastState>(null);
  const [modal, setModal] = useState<null | { title: string; type: "field" | "list" | "timeline"; key: keyof SkillDetailDraft }>(null);

  const persist = (next: SkillDetailDraft) => {
    setData(next);
    save(KEY, { ...all, [skill.slug]: next });
  };

  const Icon = skill.icon;

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <SkillsTopNav username={profileData.username} name={profileData.name} search="" onSearch={() => undefined} />

        <section className="group relative mt-5 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_54px_-34px_rgba(79,70,229,0.55)] md:p-8">
          <button onClick={() => setModal({ title: "Edit Skill Header", type: "field", key: "name" })} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white"><Icon className="h-6 w-6" /></span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl">{data.name}</h1>
          <p className="mt-2 text-base text-zinc-600">{data.personalConnection}</p>
          <div className="mt-4 h-2 rounded-full bg-violet-100"><div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600" style={{ width: `${data.progress}%` }} /></div>
          <p className="mt-2 text-sm text-zinc-500">Level: {data.level} • Learning since {data.learningSince}</p>
        </section>

        <section className="group relative mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
          <button onClick={() => setModal({ title: "Edit Why I Learned This", type: "field", key: "why" })} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Why I learned this</h2>
          <p className="mt-3 text-sm text-zinc-700 md:text-base">{data.why}</p>
        </section>

        <section className="group relative">
          <button onClick={() => setModal({ title: "Edit Learning Timeline", type: "timeline", key: "timeline" })} className="absolute right-3 top-3 z-10 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button>
          <LearningTimeline items={data.timeline} />
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <article className="group relative rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
            <button onClick={() => setModal({ title: "Edit Resources", type: "list", key: "resources" })} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Resources</h2>
            <div className="mt-3 space-y-2">{data.resources.map((resource, idx) => <p key={`${resource}-${idx}`} className="group/r rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{resource}<button onClick={() => setToast({ type: "confirm-delete", message: "Delete this resource?", action: "delete-list", section: "resources", index: idx })} className="ml-2 hidden text-rose-600 group-hover/r:inline"><Trash2 className="inline h-3 w-3" /></button></p>)}</div>
          </article>
          <article className="group relative rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
            <button onClick={() => setModal({ title: "Edit Real-world Usage", type: "list", key: "realWorldUsage" })} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Real-world usage</h2>
            <div className="mt-3 space-y-2">{data.realWorldUsage.map((usage, idx) => <p key={`${usage}-${idx}`} className="group/u rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{usage}<button onClick={() => setToast({ type: "confirm-delete", message: "Delete this usage item?", action: "delete-list", section: "realWorldUsage", index: idx })} className="ml-2 hidden text-rose-600 group-hover/u:inline"><Trash2 className="inline h-3 w-3" /></button></p>)}</div>
          </article>
        </section>

        <section className="group relative mt-6 rounded-3xl border border-violet-200 bg-gradient-to-br from-white to-violet-50/70 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
          <button onClick={() => setModal({ title: "Edit Future Plans", type: "field", key: "futurePlans" })} className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Future plans</h2>
          <p className="mt-3 text-sm text-zinc-700 md:text-base">{data.futurePlans}</p>
          <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-violet-700">Related skills</h3>
          <div className="mt-2 flex flex-wrap gap-2">{data.relatedSkills.map((related, idx) => <span key={`${related}-${idx}`} className="group/rel rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700">{related}<button onClick={() => setToast({ type: "confirm-delete", message: "Delete this related skill?", action: "delete-list", section: "relatedSkills", index: idx })} className="ml-1 hidden text-rose-600 group-hover/rel:inline"><Trash2 className="inline h-3 w-3" /></button></span>)}</div>
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
              const updated = { ...data, [modal.key]: next } as SkillDetailDraft;
              persist(updated);
              setModal(null);
              setToast({ type: "success", message: "Updated." });
            }}
          />
        ) : null}
        {toast ? <Toast toast={toast} onClose={() => setToast(null)} onConfirm={() => {
          if (toast.type !== "confirm-delete") return;
          if (toast.section === "timeline") {
            const list = [...data.timeline];
            list.splice(toast.index, 1);
            persist({ ...data, timeline: list });
          } else {
            const list = [...(data[toast.section] as string[])];
            list.splice(toast.index, 1);
            persist({ ...data, [toast.section]: list } as SkillDetailDraft);
          }
          setToast({ type: "success", message: "Deleted." });
        }} /> : null}
      </AnimatePresence>
    </main>
  );
}

function EditModal({ title, type, value, onClose, onSave }: { title: string; type: "field" | "list" | "timeline"; value: unknown; onClose: () => void; onSave: (next: unknown) => void }) {
  const [text, setText] = useState(
    type === "timeline"
      ? (Array.isArray(value) ? (value as Array<{ phase: string; detail: string }>).map((t) => `${t.phase} :: ${t.detail}`).join("\n") : "")
      : type === "list"
      ? (Array.isArray(value) ? (value as string[]).join("\n") : "")
      : String(value || ""),
  );

  const saveValue = () => {
    if (type === "timeline") {
      const parsed = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [phase, ...rest] = line.split("::");
          return { phase: (phase || "").trim(), detail: rest.join("::").trim() };
        })
        .filter((item) => item.phase && item.detail);
      onSave(parsed);
      return;
    }
    if (type === "list") {
      onSave(text.split("\n").map((v) => v.trim()).filter(Boolean));
      return;
    }
    onSave(text);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4">
      <motion.div initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }} className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5"><X className="h-4 w-4" /></button>
        </div>
        <div className="mt-4">
          {type === "timeline" ? <p className="mb-2 text-xs text-zinc-500">Use format: `Phase :: Detail` (one per line)</p> : null}
          <textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-44 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
        </div>
        <button onClick={saveValue} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"><Save className="h-4 w-4" />Save</button>
      </motion.div>
    </motion.div>
  );
}

function Toast({ toast, onClose, onConfirm }: { toast: ToastState; onClose: () => void; onConfirm: () => void }) {
  if (!toast) return null;
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="fixed bottom-4 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl">
      <p className="text-sm text-zinc-800">{toast.message}</p>
      {toast.type === "confirm-delete" ? (
        <div className="mt-3 flex gap-2"><button onClick={onConfirm} className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">Confirm</button><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Cancel</button></div>
      ) : (
        <button onClick={onClose} className="mt-3 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Close</button>
      )}
    </motion.div>
  );
}
