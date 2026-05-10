import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Save, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { EditableSectionBlock } from "../../components/EditableSectionBlock";
import { CurrentFocusSection } from "../../components/experience/CurrentFocusSection";
import { ExperienceCardsSection } from "../../components/experience/ExperienceCardsSection";
import { ExperienceCTA } from "../../components/experience/ExperienceCTA";
import { ExperienceHero } from "../../components/experience/ExperienceHero";
import { ExperienceTimeline } from "../../components/experience/ExperienceTimeline";
import { ExperienceTopNav } from "../../components/experience/ExperienceTopNav";
import { PersonalProjectsSection } from "../../components/experience/PersonalProjectsSection";
import { StartupExperienceSection } from "../../components/experience/StartupExperienceSection";
import { profileData } from "../../data/profile";
import { getGlobalProfileAvatarUrl } from "../../lib/profileAvatar";
import { currentFocus, experienceItems, experiencePhilosophy, timelineItems, type ExperienceItem } from "../../data/experience";

type ExperiencePatch = {
  role?: string;
  org?: string;
  timeline?: string;
  category?: ExperienceItem["category"];
  status?: ExperienceItem["status"];
  short?: string;
  impact?: string;
};
type HeroDraft = { name: string; username: string; headline: string; statement: string; avatarText: string };
type TimelineDraft = { year: string; title: string; story: string; skills: string; achievement: string; slug: string; hidden?: boolean };
type ToastState =
  | { type: "confirm-delete"; message: string; action: "hide-hero" | "hide-timeline" | "delete-timeline" | "delete-card" | "hide-current-focus" | "delete-current-focus"; index?: number; slug?: string }
  | { type: "success"; message: string }
  | null;

const EXPERIENCE_KEY = "profilare:experience-card-edits";
const EXPERIENCE_HIDDEN_KEY = "profilare:experience-card-hidden";
const EXPERIENCE_HERO_KEY = "profilare:experience-hero-edit";
const EXPERIENCE_HERO_VISIBLE_KEY = "profilare:experience-hero-visible";
const EXPERIENCE_TIMELINE_KEY = "profilare:experience-timeline-edit";
const EXPERIENCE_TIMELINE_VISIBLE_KEY = "profilare:experience-timeline-visible";
const EXPERIENCE_CURRENT_FOCUS_KEY = "profilare:experience-current-focus-edit";
const EXPERIENCE_CURRENT_FOCUS_VISIBLE_KEY = "profilare:experience-current-focus-visible";

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function ExperiencePage() {
  const { username } = useParams<{ username: string }>();
  const [search, setSearch] = useState("");
  const [patches, setPatches] = useState<Record<string, ExperiencePatch>>(() => load(EXPERIENCE_KEY, {}));
  const [hiddenCards, setHiddenCards] = useState<Record<string, boolean>>(() => load(EXPERIENCE_HIDDEN_KEY, {}));
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>(null);

  const [heroVisible, setHeroVisible] = useState<boolean>(() => load(EXPERIENCE_HERO_VISIBLE_KEY, true));
  const [editingHero, setEditingHero] = useState(false);
  const [hero, setHero] = useState<HeroDraft>(() =>
    load(EXPERIENCE_HERO_KEY, {
      name: profileData.name,
      username: profileData.username,
      headline: profileData.headline,
      statement: experiencePhilosophy,
      avatarText: profileData.name.split(" ").map((v) => v[0]?.toUpperCase() || "").slice(0, 2).join(""),
    }),
  );

  const [timelineVisible, setTimelineVisible] = useState<boolean>(() => load(EXPERIENCE_TIMELINE_VISIBLE_KEY, true));
  const [timelineState, setTimelineState] = useState<TimelineDraft[]>(() =>
    load(
      EXPERIENCE_TIMELINE_KEY,
      timelineItems.map((t) => ({ ...t, skills: t.skills.join(", ") })),
    ),
  );
  const [editingTimelineIndex, setEditingTimelineIndex] = useState<number | null>(null);

  const [currentFocusVisible, setCurrentFocusVisible] = useState<boolean>(() => load(EXPERIENCE_CURRENT_FOCUS_VISIBLE_KEY, true));
  const [currentFocusState, setCurrentFocusState] = useState<string[]>(() => load(EXPERIENCE_CURRENT_FOCUS_KEY, currentFocus));
  const [editingFocusIndex, setEditingFocusIndex] = useState<number | null>(null);

  if (!username || username !== profileData.username) return <Navigate to={`/profile/${profileData.username}`} replace />;

  const mergedItems = useMemo(
    () =>
      experienceItems
        .map((item) => {
          const patch = patches[item.slug] || {};
          return {
            ...item,
            role: patch.role ?? item.role,
            org: patch.org ?? item.org,
            timeline: patch.timeline ?? item.timeline,
            category: patch.category ?? item.category,
            status: patch.status ?? item.status,
            short: patch.short ?? item.short,
            impact: patch.impact ?? item.impact,
          };
        })
        .filter((item) => !hiddenCards[item.slug]),
    [patches, hiddenCards],
  );

  const startupItems = mergedItems.filter((i) => i.category === "Startup" || i.category === "Experiment");
  const personalItems = mergedItems.filter((i) => i.category === "Project" || i.category === "Journey");

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return mergedItems.filter((item) => !q || item.role.toLowerCase().includes(q) || item.org.toLowerCase().includes(q) || item.short.toLowerCase().includes(q));
  }, [mergedItems, search]);

  const visibleTimeline = timelineState.filter((t) => !t.hidden);
  const editingTimeline = editingTimelineIndex !== null ? timelineState[editingTimelineIndex] || null : null;
  const editingItem = editingSlug ? mergedItems.find((item) => item.slug === editingSlug) || null : null;

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <ExperienceTopNav username={profileData.username} name={profileData.name} search={search} onSearch={setSearch} />

        {heroVisible ? (
          <section className="group relative">
            <div className="absolute right-3 top-8 z-10 flex gap-2">
              <button onClick={() => setEditingHero(true)} className="rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => setToast({ type: "confirm-delete", message: "Hide Experience hero section?", action: "hide-hero" })} className="rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
            <ExperienceHero name={hero.name} username={hero.username} headline={hero.headline} statement={hero.statement} avatarText={hero.avatarText} avatarUrl={getGlobalProfileAvatarUrl()} />
          </section>
        ) : <HiddenSection text="Experience hero is hidden." onShow={() => { setHeroVisible(true); save(EXPERIENCE_HERO_VISIBLE_KEY, true); setToast({ type: "success", message: "Experience hero restored." }); }} />}

        {timelineVisible ? (
          <section className="group relative">
            <button onClick={() => setToast({ type: "confirm-delete", message: "Hide Experience Timeline section?", action: "hide-timeline" })} className="absolute right-3 top-8 z-10 rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            <EditableSectionBlock sectionId="experience-timeline" label="Experience Timeline">
              {visibleTimeline.length ? <ExperienceTimeline username={profileData.username} items={visibleTimeline.map((item) => ({ ...item, skills: item.skills.split(",").map((s) => s.trim()).filter(Boolean) }))} onEdit={(visibleIndex) => { const target = visibleTimeline[visibleIndex]; const original = timelineState.findIndex((t) => t.slug === target.slug && !t.hidden); if (original >= 0) setEditingTimelineIndex(original); }} onDelete={(visibleIndex) => { const target = visibleTimeline[visibleIndex]; const original = timelineState.findIndex((t) => t.slug === target.slug && !t.hidden); if (original >= 0) setToast({ type: "confirm-delete", message: "Delete this timeline item?", action: "delete-timeline", index: original }); }} /> : <RestoreAll text="All timeline items are deleted." onRestore={() => { const restored = timelineState.map((t) => ({ ...t, hidden: false })); setTimelineState(restored); save(EXPERIENCE_TIMELINE_KEY, restored); setToast({ type: "success", message: "Timeline restored." }); }} />}
            </EditableSectionBlock>
          </section>
        ) : <HiddenSection text="Experience Timeline section is hidden." onShow={() => { setTimelineVisible(true); save(EXPERIENCE_TIMELINE_VISIBLE_KEY, true); setToast({ type: "success", message: "Timeline section restored." }); }} />}

        <EditableSectionBlock sectionId="experience-cards" label="Experience Cards">
          {filteredItems.length ? <ExperienceCardsSection username={profileData.username} items={filteredItems} onEdit={setEditingSlug} onDelete={(slug) => setToast({ type: "confirm-delete", message: "Delete this experience card?", action: "delete-card", slug })} /> : <RestoreAll text="All experience cards are deleted." onRestore={() => { setHiddenCards({}); save(EXPERIENCE_HIDDEN_KEY, {}); setToast({ type: "success", message: "Experience cards restored." }); }} />}
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="experience-startup" label="Startup Experience"><StartupExperienceSection username={profileData.username} items={startupItems} onEdit={setEditingSlug} onDelete={(slug) => setToast({ type: "confirm-delete", message: "Delete this startup card?", action: "delete-card", slug })} /></EditableSectionBlock>
        <EditableSectionBlock sectionId="experience-personal-projects" label="Personal Projects"><PersonalProjectsSection username={profileData.username} items={personalItems} onEdit={setEditingSlug} onDelete={(slug) => setToast({ type: "confirm-delete", message: "Delete this personal project card?", action: "delete-card", slug })} /></EditableSectionBlock>

        {currentFocusVisible ? (
          <section className="group relative">
            <button onClick={() => setToast({ type: "confirm-delete", message: "Hide Current Focus section?", action: "hide-current-focus" })} className="absolute right-3 top-8 z-10 rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            <EditableSectionBlock sectionId="experience-current-focus" label="Current Focus">
              {currentFocusState.length ? <CurrentFocusSection items={currentFocusState} onEdit={(index) => setEditingFocusIndex(index)} onDelete={(index) => setToast({ type: "confirm-delete", message: "Delete this focus item?", action: "delete-current-focus", index })} /> : <RestoreAll text="All focus items are deleted." onRestore={() => { setCurrentFocusState(currentFocus); save(EXPERIENCE_CURRENT_FOCUS_KEY, currentFocus); setToast({ type: "success", message: "Current focus restored." }); }} />}
            </EditableSectionBlock>
          </section>
        ) : <HiddenSection text="Current Focus section is hidden." onShow={() => { setCurrentFocusVisible(true); save(EXPERIENCE_CURRENT_FOCUS_VISIBLE_KEY, true); setToast({ type: "success", message: "Current Focus section restored." }); }} />}

        <EditableSectionBlock sectionId="experience-cta" label="Next Step"><ExperienceCTA username={profileData.username} /></EditableSectionBlock>
      </div>

      <AnimatePresence>
        {editingItem ? <ExperienceCardModal value={editingItem} onClose={() => setEditingSlug(null)} onSave={(next) => { const updated = { ...patches, [editingItem.slug]: next }; setPatches(updated); save(EXPERIENCE_KEY, updated); setEditingSlug(null); setToast({ type: "success", message: "Experience card updated." }); }} /> : null}
        {editingHero ? <HeroEditModal value={hero} onClose={() => setEditingHero(false)} onSave={(next) => { setHero(next); save(EXPERIENCE_HERO_KEY, next); setEditingHero(false); setToast({ type: "success", message: "Experience hero updated." }); }} /> : null}
        {editingTimeline ? <TimelineEditModal value={editingTimeline} onClose={() => setEditingTimelineIndex(null)} onSave={(next) => { const copy = [...timelineState]; copy[editingTimelineIndex!] = { ...copy[editingTimelineIndex!], ...next }; setTimelineState(copy); save(EXPERIENCE_TIMELINE_KEY, copy); setEditingTimelineIndex(null); setToast({ type: "success", message: "Timeline item updated." }); }} /> : null}
        {editingFocusIndex !== null ? <TextEditModal title="Edit Focus Item" value={currentFocusState[editingFocusIndex] || ""} label="Focus" onClose={() => setEditingFocusIndex(null)} onSave={(next) => { const copy = [...currentFocusState]; copy[editingFocusIndex] = next; setCurrentFocusState(copy); save(EXPERIENCE_CURRENT_FOCUS_KEY, copy); setEditingFocusIndex(null); setToast({ type: "success", message: "Focus item updated." }); }} /> : null}
        {toast ? <Toast toast={toast} onClose={() => setToast(null)} onConfirm={() => {
          if (toast.type !== "confirm-delete") return;
          if (toast.action === "hide-hero") { setHeroVisible(false); save(EXPERIENCE_HERO_VISIBLE_KEY, false); setToast({ type: "success", message: "Experience hero hidden." }); return; }
          if (toast.action === "hide-timeline") { setTimelineVisible(false); save(EXPERIENCE_TIMELINE_VISIBLE_KEY, false); setToast({ type: "success", message: "Experience Timeline hidden." }); return; }
          if (toast.action === "delete-timeline" && typeof toast.index === "number") { const copy = [...timelineState]; copy[toast.index] = { ...copy[toast.index], hidden: true }; setTimelineState(copy); save(EXPERIENCE_TIMELINE_KEY, copy); setToast({ type: "success", message: "Timeline item deleted." }); return; }
          if (toast.action === "delete-card" && toast.slug) { const next = { ...hiddenCards, [toast.slug]: true }; setHiddenCards(next); save(EXPERIENCE_HIDDEN_KEY, next); setToast({ type: "success", message: "Experience card deleted." }); return; }
          if (toast.action === "hide-current-focus") { setCurrentFocusVisible(false); save(EXPERIENCE_CURRENT_FOCUS_VISIBLE_KEY, false); setToast({ type: "success", message: "Current Focus section hidden." }); return; }
          if (toast.action === "delete-current-focus" && typeof toast.index === "number") { const copy = currentFocusState.filter((_, i) => i !== toast.index); setCurrentFocusState(copy); save(EXPERIENCE_CURRENT_FOCUS_KEY, copy); setToast({ type: "success", message: "Focus item deleted." }); }
        }} /> : null}
      </AnimatePresence>
    </main>
  );
}

function ExperienceCardModal({ value, onClose, onSave }: { value: ExperienceItem; onClose: () => void; onSave: (next: ExperiencePatch) => void }) {
  const [draft, setDraft] = useState<ExperiencePatch>({ role: value.role, org: value.org, timeline: value.timeline, category: value.category, status: value.status, short: value.short, impact: value.impact });
  return <ModalShell title="Edit Experience Card" onClose={onClose} onSave={() => onSave(draft)}><Field label="Role" value={draft.role || ""} onChange={(v) => setDraft((p) => ({ ...p, role: v }))} /><Field label="Organization" value={draft.org || ""} onChange={(v) => setDraft((p) => ({ ...p, org: v }))} /><Field label="Timeline" value={draft.timeline || ""} onChange={(v) => setDraft((p) => ({ ...p, timeline: v }))} /><Field label="Category" value={draft.category || ""} onChange={(v) => setDraft((p) => ({ ...p, category: v as ExperienceItem["category"] }))} /><Field label="Status" value={draft.status || ""} onChange={(v) => setDraft((p) => ({ ...p, status: v as ExperienceItem["status"] }))} /><Field label="Impact" value={draft.impact || ""} onChange={(v) => setDraft((p) => ({ ...p, impact: v }))} /><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Short Description</label><textarea value={draft.short || ""} onChange={(e) => setDraft((p) => ({ ...p, short: e.target.value }))} className="min-h-24 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" /></div></ModalShell>;
}

function HeroEditModal({ value, onClose, onSave }: { value: HeroDraft; onClose: () => void; onSave: (v: HeroDraft) => void }) {
  const [draft, setDraft] = useState(value);
  return <ModalShell title="Edit Experience Hero" onClose={onClose} onSave={() => onSave(draft)}><Field label="Name" value={draft.name} onChange={(v) => setDraft((p) => ({ ...p, name: v }))} /><Field label="Username" value={draft.username} onChange={(v) => setDraft((p) => ({ ...p, username: v }))} /><Field label="Headline" value={draft.headline} onChange={(v) => setDraft((p) => ({ ...p, headline: v }))} /><Field label="Avatar Text" value={draft.avatarText} onChange={(v) => setDraft((p) => ({ ...p, avatarText: v.slice(0, 3).toUpperCase() }))} /><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Statement</label><textarea value={draft.statement} onChange={(e) => setDraft((p) => ({ ...p, statement: e.target.value }))} className="min-h-24 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" /></div></ModalShell>;
}

function TimelineEditModal({ value, onClose, onSave }: { value: TimelineDraft; onClose: () => void; onSave: (v: TimelineDraft) => void }) {
  const [draft, setDraft] = useState(value);
  return <ModalShell title="Edit Timeline Item" onClose={onClose} onSave={() => onSave(draft)}><Field label="Year" value={draft.year} onChange={(v) => setDraft((p) => ({ ...p, year: v }))} /><Field label="Title" value={draft.title} onChange={(v) => setDraft((p) => ({ ...p, title: v }))} /><Field label="Slug" value={draft.slug} onChange={(v) => setDraft((p) => ({ ...p, slug: v }))} /><Field label="Skills (comma separated)" value={draft.skills} onChange={(v) => setDraft((p) => ({ ...p, skills: v }))} /><Field label="Achievement" value={draft.achievement} onChange={(v) => setDraft((p) => ({ ...p, achievement: v }))} /><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Story</label><textarea value={draft.story} onChange={(e) => setDraft((p) => ({ ...p, story: e.target.value }))} className="min-h-24 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" /></div></ModalShell>;
}

function TextEditModal({ title, value, label, onClose, onSave }: { title: string; value: string; label: string; onClose: () => void; onSave: (v: string) => void }) {
  const [text, setText] = useState(value);
  return <ModalShell title={title} onClose={onClose} onSave={() => onSave(text)}><div className="md:col-span-2"><Field label={label} value={text} onChange={setText} /></div></ModalShell>;
}

function ModalShell({ title, onClose, onSave, children }: { title: string; onClose: () => void; onSave: () => void; children: React.ReactNode }) {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4"><motion.div initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }} className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-lg font-bold text-zinc-900">{title}</h3><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5 text-zinc-700"><X className="h-4 w-4" /></button></div><div className="mt-4 grid gap-3 overflow-y-auto pr-1 md:grid-cols-2">{children}</div><button onClick={onSave} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"><Save className="h-4 w-4" />Save</button></motion.div></motion.div>;
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return <label><span className="mb-1 block text-xs text-zinc-600">{label}</span><input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" /></label>;
}

function HiddenSection({ text, onShow }: { text: string; onShow: () => void }) {
  return <section className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center"><p className="text-sm text-zinc-600">{text}</p><button onClick={onShow} className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">Show Section</button></section>;
}

function RestoreAll({ text, onRestore }: { text: string; onRestore: () => void }) {
  return <section className="mt-2 rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center"><p className="text-sm text-zinc-600">{text}</p><button onClick={onRestore} className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">Restore</button></section>;
}

function Toast({ toast, onClose, onConfirm }: { toast: ToastState; onClose: () => void; onConfirm: () => void }) {
  if (!toast) return null;
  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="fixed bottom-4 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl"><p className="text-sm text-zinc-800">{toast.message}</p>{toast.type === "confirm-delete" ? <div className="mt-3 flex gap-2"><button onClick={onConfirm} className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">Confirm</button><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Cancel</button></div> : <button onClick={onClose} className="mt-3 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Close</button>}</motion.div>;
}





