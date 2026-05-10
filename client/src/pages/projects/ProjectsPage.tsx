import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Save, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { EditableSectionBlock } from "../../components/EditableSectionBlock";
import { CollaborationSection } from "../../components/projects/CollaborationSection";
import { ExperimentalIdeasSection } from "../../components/projects/ExperimentalIdeasSection";
import { FeaturedProjects } from "../../components/projects/FeaturedProjects";
import { FutureVisionSection } from "../../components/projects/FutureVisionSection";
import { ProjectGrid } from "../../components/projects/ProjectGrid";
import { ProjectTimeline } from "../../components/projects/ProjectTimeline";
import { ProjectsCTA } from "../../components/projects/ProjectsCTA";
import { ProjectsCurrentFocus } from "../../components/projects/ProjectsCurrentFocus";
import { ProjectsHero } from "../../components/projects/ProjectsHero";
import { ProjectsTopNav } from "../../components/projects/ProjectsTopNav";
import { StartupProjectsSection } from "../../components/projects/StartupProjectsSection";
import { profileData } from "../../data/profile";
import { getGlobalProfileAvatarUrl } from "../../lib/profileAvatar";
import { collaboration, currentProjectFocus, futureVision, projectTimeline, projects, projectsPhilosophy, type ProjectItem } from "../../data/projects";

type ProjectPatch = { title?: string; tagline?: string; category?: string; timeline?: string; status?: ProjectItem["status"]; summary?: string; goal?: string; caseStudy?: string; demo?: string; github?: string };
type HeroDraft = { name: string; username: string; headline: string; statement: string; avatarText: string };
type CollaborationDraft = { open: string; lookingFor: string[]; contributions: string };
type FutureVisionDraft = { products: string[]; ambitions: string; explore: string[]; ecosystem: string };
type ToastState =
  | { type: "confirm-delete"; message: string; action: "delete-card" | "hide-hero" | "hide-timeline" | "hide-collaboration" | "hide-focus" | "hide-vision"; slug?: string }
  | { type: "success"; message: string }
  | null;

const PROJECTS_KEY = "profilare:projects-card-edits";
const PROJECTS_HIDDEN_KEY = "profilare:projects-hidden";
const PROJECTS_HERO_KEY = "profilare:projects-hero";
const PROJECTS_HERO_VISIBLE_KEY = "profilare:projects-hero-visible";
const PROJECTS_TIMELINE_KEY = "profilare:projects-timeline";
const PROJECTS_COLLAB_KEY = "profilare:projects-collaboration";
const PROJECTS_FOCUS_KEY = "profilare:projects-focus";
const PROJECTS_VISION_KEY = "profilare:projects-vision";
const PROJECTS_TIMELINE_VISIBLE_KEY = "profilare:projects-timeline-visible";
const PROJECTS_COLLAB_VISIBLE_KEY = "profilare:projects-collaboration-visible";
const PROJECTS_FOCUS_VISIBLE_KEY = "profilare:projects-focus-visible";
const PROJECTS_VISION_VISIBLE_KEY = "profilare:projects-vision-visible";

function load<T>(key: string, fallback: T): T { try { const raw = localStorage.getItem(key); if (!raw) return fallback; return JSON.parse(raw) as T; } catch { return fallback; } }
function save<T>(key: string, value: T) { localStorage.setItem(key, JSON.stringify(value)); }

export function ProjectsPage() {
  const { username } = useParams<{ username: string }>();
  const [search, setSearch] = useState("");
  const [patches, setPatches] = useState<Record<string, ProjectPatch>>(() => load(PROJECTS_KEY, {}));
  const [hiddenCards, setHiddenCards] = useState<Record<string, boolean>>(() => load(PROJECTS_HIDDEN_KEY, {}));
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>(null);

  const [heroVisible, setHeroVisible] = useState<boolean>(() => load(PROJECTS_HERO_VISIBLE_KEY, true));
  const [editingHero, setEditingHero] = useState(false);
  const [hero, setHero] = useState<HeroDraft>(() => load(PROJECTS_HERO_KEY, { name: profileData.name, username: profileData.username, headline: profileData.headline, statement: projectsPhilosophy, avatarText: profileData.name.split(" ").map((v) => v[0]?.toUpperCase() || "").slice(0, 2).join("") }));

  const [timelineState, setTimelineState] = useState<string[]>(() => load(PROJECTS_TIMELINE_KEY, projectTimeline));
  const [collabState, setCollabState] = useState<CollaborationDraft>(() => load(PROJECTS_COLLAB_KEY, collaboration));
  const [focusState, setFocusState] = useState<string[]>(() => load(PROJECTS_FOCUS_KEY, currentProjectFocus));
  const [visionState, setVisionState] = useState<FutureVisionDraft>(() => load(PROJECTS_VISION_KEY, futureVision));
  const [timelineVisible, setTimelineVisible] = useState<boolean>(() => load(PROJECTS_TIMELINE_VISIBLE_KEY, true));
  const [collabVisible, setCollabVisible] = useState<boolean>(() => load(PROJECTS_COLLAB_VISIBLE_KEY, true));
  const [focusVisible, setFocusVisible] = useState<boolean>(() => load(PROJECTS_FOCUS_VISIBLE_KEY, true));
  const [visionVisible, setVisionVisible] = useState<boolean>(() => load(PROJECTS_VISION_VISIBLE_KEY, true));

  const [editingTimeline, setEditingTimeline] = useState(false);
  const [editingCollab, setEditingCollab] = useState(false);
  const [editingFocus, setEditingFocus] = useState(false);
  const [editingVision, setEditingVision] = useState(false);

  if (!username || username !== profileData.username) return <Navigate to={`/profile/${profileData.username}`} replace />;

  const mergedProjects = useMemo(() => projects.map((p) => { const patch = patches[p.slug] || {}; return { ...p, title: patch.title ?? p.title, tagline: patch.tagline ?? p.tagline, category: patch.category ?? p.category, timeline: patch.timeline ?? p.timeline, status: patch.status ?? p.status, summary: patch.summary ?? p.summary, goal: patch.goal ?? p.goal, links: { ...p.links, caseStudy: patch.caseStudy ?? p.links.caseStudy, demo: patch.demo ?? p.links.demo, github: patch.github ?? p.links.github } }; }).filter((p) => !hiddenCards[p.slug]), [patches, hiddenCards]);

  const featuredItems = mergedProjects.slice(0, 3);
  const startupItems = mergedProjects.filter((p) => p.category === "Startup" || p.category === "AI Project");
  const experimentalItems = mergedProjects.filter((p) => p.status === "Concept" || p.status === "Research");
  const filtered = useMemo(() => { const q = search.trim().toLowerCase(); return mergedProjects.filter((p) => !q || p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)); }, [mergedProjects, search]);
  const editingItem = editingSlug ? mergedProjects.find((p) => p.slug === editingSlug) || null : null;

  return <main className="px-4 py-8 md:px-8 md:py-12"><div className="mx-auto w-full max-w-6xl">
    <ProjectsTopNav username={profileData.username} name={profileData.name} search={search} onSearch={setSearch} />

    {heroVisible ? <section className="group relative"><div className="absolute right-3 top-8 z-10 flex gap-2"><button onClick={() => setEditingHero(true)} className="rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button><button onClick={() => setToast({ type: "confirm-delete", message: "Hide Projects hero section?", action: "hide-hero" })} className="rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button></div><ProjectsHero name={hero.name} username={hero.username} headline={hero.headline} statement={hero.statement} avatarText={hero.avatarText} avatarUrl={getGlobalProfileAvatarUrl()} /></section> : <HiddenSection text="Projects hero is hidden." onShow={() => { setHeroVisible(true); save(PROJECTS_HERO_VISIBLE_KEY, true); setToast({ type: "success", message: "Projects hero restored." }); }} />}

    <EditableSectionBlock sectionId="projects-featured" label="Featured Projects"><FeaturedProjects username={profileData.username} items={featuredItems} onEdit={setEditingSlug} onDelete={(slug) => setToast({ type: "confirm-delete", message: "Delete this project card?", action: "delete-card", slug })} /></EditableSectionBlock>
    <EditableSectionBlock sectionId="projects-grid" label="Project Grid">{filtered.length ? <ProjectGrid username={profileData.username} items={filtered} onEdit={setEditingSlug} onDelete={(slug) => setToast({ type: "confirm-delete", message: "Delete this project card?", action: "delete-card", slug })} /> : <RestoreAll text="All project cards are deleted." onRestore={() => { setHiddenCards({}); save(PROJECTS_HIDDEN_KEY, {}); setToast({ type: "success", message: "Project cards restored." }); }} />}</EditableSectionBlock>
    <EditableSectionBlock sectionId="projects-startup" label="Startup Projects"><StartupProjectsSection username={profileData.username} items={startupItems} onEdit={setEditingSlug} onDelete={(slug) => setToast({ type: "confirm-delete", message: "Delete this startup project card?", action: "delete-card", slug })} /></EditableSectionBlock>
    <EditableSectionBlock sectionId="projects-experimental" label="Experimental Ideas"><ExperimentalIdeasSection username={profileData.username} items={experimentalItems} onEdit={setEditingSlug} onDelete={(slug) => setToast({ type: "confirm-delete", message: "Delete this experimental project card?", action: "delete-card", slug })} /></EditableSectionBlock>

    {timelineVisible ? <section className="group relative"><div className="absolute right-3 top-8 z-10 flex gap-2"><button onClick={() => setEditingTimeline(true)} className="rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button><button onClick={() => setToast({ type: "confirm-delete", message: "Hide Project Timeline section?", action: "hide-timeline" })} className="rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button></div><EditableSectionBlock sectionId="projects-timeline" label="Project Timeline"><ProjectTimeline items={timelineState} /></EditableSectionBlock></section> : <HiddenSection text="Project Timeline section is hidden." onShow={() => { setTimelineVisible(true); save(PROJECTS_TIMELINE_VISIBLE_KEY, true); setToast({ type: "success", message: "Project Timeline restored." }); }} />}
    {collabVisible ? <section className="group relative"><div className="absolute right-3 top-8 z-10 flex gap-2"><button onClick={() => setEditingCollab(true)} className="rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button><button onClick={() => setToast({ type: "confirm-delete", message: "Hide Collaboration section?", action: "hide-collaboration" })} className="rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button></div><EditableSectionBlock sectionId="projects-collaboration" label="Collaboration"><CollaborationSection data={collabState} /></EditableSectionBlock></section> : <HiddenSection text="Collaboration section is hidden." onShow={() => { setCollabVisible(true); save(PROJECTS_COLLAB_VISIBLE_KEY, true); setToast({ type: "success", message: "Collaboration restored." }); }} />}
    {focusVisible ? <section className="group relative"><div className="absolute right-3 top-8 z-10 flex gap-2"><button onClick={() => setEditingFocus(true)} className="rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button><button onClick={() => setToast({ type: "confirm-delete", message: "Hide Current Focus section?", action: "hide-focus" })} className="rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button></div><EditableSectionBlock sectionId="projects-current-focus" label="Current Focus"><ProjectsCurrentFocus items={focusState} /></EditableSectionBlock></section> : <HiddenSection text="Current Focus section is hidden." onShow={() => { setFocusVisible(true); save(PROJECTS_FOCUS_VISIBLE_KEY, true); setToast({ type: "success", message: "Current Focus restored." }); }} />}
    {visionVisible ? <section className="group relative"><div className="absolute right-3 top-8 z-10 flex gap-2"><button onClick={() => setEditingVision(true)} className="rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button><button onClick={() => setToast({ type: "confirm-delete", message: "Hide Future Vision section?", action: "hide-vision" })} className="rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button></div><EditableSectionBlock sectionId="projects-future-vision" label="Future Vision"><FutureVisionSection data={visionState} /></EditableSectionBlock></section> : <HiddenSection text="Future Vision section is hidden." onShow={() => { setVisionVisible(true); save(PROJECTS_VISION_VISIBLE_KEY, true); setToast({ type: "success", message: "Future Vision restored." }); }} />}
    <EditableSectionBlock sectionId="projects-cta" label="Next Step"><ProjectsCTA username={profileData.username} /></EditableSectionBlock>
  </div>
  <AnimatePresence>
    {editingItem ? <ProjectCardModal value={editingItem} onClose={() => setEditingSlug(null)} onSave={(next) => { const updated = { ...patches, [editingItem.slug]: next }; setPatches(updated); save(PROJECTS_KEY, updated); setEditingSlug(null); setToast({ type: "success", message: "Project updated." }); }} /> : null}
    {editingHero ? <HeroEditModal value={hero} onClose={() => setEditingHero(false)} onSave={(next) => { setHero(next); save(PROJECTS_HERO_KEY, next); setEditingHero(false); setToast({ type: "success", message: "Projects hero updated." }); }} /> : null}
    {editingTimeline ? <ListEditModal title="Edit Project Timeline" lines={timelineState} onClose={() => setEditingTimeline(false)} onSave={(next) => { setTimelineState(next); save(PROJECTS_TIMELINE_KEY, next); setEditingTimeline(false); setToast({ type: "success", message: "Timeline updated." }); }} /> : null}
    {editingFocus ? <ListEditModal title="Edit Current Focus" lines={focusState} onClose={() => setEditingFocus(false)} onSave={(next) => { setFocusState(next); save(PROJECTS_FOCUS_KEY, next); setEditingFocus(false); setToast({ type: "success", message: "Current focus updated." }); }} /> : null}
    {editingCollab ? <CollabEditModal value={collabState} onClose={() => setEditingCollab(false)} onSave={(next) => { setCollabState(next); save(PROJECTS_COLLAB_KEY, next); setEditingCollab(false); setToast({ type: "success", message: "Collaboration updated." }); }} /> : null}
    {editingVision ? <VisionEditModal value={visionState} onClose={() => setEditingVision(false)} onSave={(next) => { setVisionState(next); save(PROJECTS_VISION_KEY, next); setEditingVision(false); setToast({ type: "success", message: "Future vision updated." }); }} /> : null}
    {toast ? <Toast toast={toast} onClose={() => setToast(null)} onConfirm={() => {
      if (toast.type !== "confirm-delete") return;
      if (toast.action === "hide-hero") { setHeroVisible(false); save(PROJECTS_HERO_VISIBLE_KEY, false); setToast({ type: "success", message: "Projects hero hidden." }); return; }
      if (toast.action === "hide-timeline") { setTimelineVisible(false); save(PROJECTS_TIMELINE_VISIBLE_KEY, false); setToast({ type: "success", message: "Project Timeline hidden." }); return; }
      if (toast.action === "hide-collaboration") { setCollabVisible(false); save(PROJECTS_COLLAB_VISIBLE_KEY, false); setToast({ type: "success", message: "Collaboration hidden." }); return; }
      if (toast.action === "hide-focus") { setFocusVisible(false); save(PROJECTS_FOCUS_VISIBLE_KEY, false); setToast({ type: "success", message: "Current Focus hidden." }); return; }
      if (toast.action === "hide-vision") { setVisionVisible(false); save(PROJECTS_VISION_VISIBLE_KEY, false); setToast({ type: "success", message: "Future Vision hidden." }); return; }
      if (toast.action === "delete-card" && toast.slug) { const next = { ...hiddenCards, [toast.slug]: true }; setHiddenCards(next); save(PROJECTS_HIDDEN_KEY, next); setToast({ type: "success", message: "Project card deleted." }); }
    }} /> : null}
  </AnimatePresence>
  </main>;
}

function ProjectCardModal({ value, onClose, onSave }: { value: ProjectItem; onClose: () => void; onSave: (next: ProjectPatch) => void }) {
  const [draft, setDraft] = useState<ProjectPatch>({ title: value.title, tagline: value.tagline, category: value.category, timeline: value.timeline, status: value.status, summary: value.summary, goal: value.goal, caseStudy: value.links.caseStudy || "", demo: value.links.demo || "", github: value.links.github || "" });
  return <ModalShell title="Edit Project Card" onClose={onClose} onSave={() => onSave(draft)}><Field label="Title" value={draft.title || ""} onChange={(v) => setDraft((p) => ({ ...p, title: v }))} /><Field label="Tagline" value={draft.tagline || ""} onChange={(v) => setDraft((p) => ({ ...p, tagline: v }))} /><Field label="Category" value={draft.category || ""} onChange={(v) => setDraft((p) => ({ ...p, category: v }))} /><Field label="Timeline" value={draft.timeline || ""} onChange={(v) => setDraft((p) => ({ ...p, timeline: v }))} /><Field label="Status" value={draft.status || ""} onChange={(v) => setDraft((p) => ({ ...p, status: v as ProjectItem["status"] }))} /><Field label="Goal" value={draft.goal || ""} onChange={(v) => setDraft((p) => ({ ...p, goal: v }))} /><Field label="Case Study URL" value={draft.caseStudy || ""} onChange={(v) => setDraft((p) => ({ ...p, caseStudy: v }))} /><Field label="Demo URL" value={draft.demo || ""} onChange={(v) => setDraft((p) => ({ ...p, demo: v }))} /><Field label="GitHub URL" value={draft.github || ""} onChange={(v) => setDraft((p) => ({ ...p, github: v }))} /><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Summary</label><textarea value={draft.summary || ""} onChange={(e) => setDraft((p) => ({ ...p, summary: e.target.value }))} className="min-h-24 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" /></div></ModalShell>;
}

function HeroEditModal({ value, onClose, onSave }: { value: HeroDraft; onClose: () => void; onSave: (v: HeroDraft) => void }) {
  const [d, setD] = useState(value);
  return <ModalShell title="Edit Projects Hero" onClose={onClose} onSave={() => onSave(d)}><Field label="Name" value={d.name} onChange={(v) => setD((p) => ({ ...p, name: v }))} /><Field label="Username" value={d.username} onChange={(v) => setD((p) => ({ ...p, username: v }))} /><Field label="Headline" value={d.headline} onChange={(v) => setD((p) => ({ ...p, headline: v }))} /><Field label="Avatar Text" value={d.avatarText} onChange={(v) => setD((p) => ({ ...p, avatarText: v.slice(0, 3).toUpperCase() }))} /><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Statement</label><textarea value={d.statement} onChange={(e) => setD((p) => ({ ...p, statement: e.target.value }))} className="min-h-24 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" /></div></ModalShell>;
}

function ListEditModal({ title, lines, onClose, onSave }: { title: string; lines: string[]; onClose: () => void; onSave: (next: string[]) => void }) {
  const [text, setText] = useState(lines.join("\n"));
  return <ModalShell title={title} onClose={onClose} onSave={() => onSave(text.split("\n").map((s) => s.trim()).filter(Boolean))}><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">One item per line</label><textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-44 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" /></div></ModalShell>;
}

function CollabEditModal({ value, onClose, onSave }: { value: CollaborationDraft; onClose: () => void; onSave: (next: CollaborationDraft) => void }) {
  const [open, setOpen] = useState(value.open);
  const [lookingFor, setLookingFor] = useState(value.lookingFor.join("\n"));
  const [contributions, setContributions] = useState(value.contributions);
  return <ModalShell title="Edit Collaboration" onClose={onClose} onSave={() => onSave({ open, contributions, lookingFor: lookingFor.split("\n").map((s) => s.trim()).filter(Boolean) })}><div className="md:col-span-2"><Field label="Open message" value={open} onChange={setOpen} /></div><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Looking For (one per line)</label><textarea value={lookingFor} onChange={(e) => setLookingFor(e.target.value)} className="min-h-24 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" /></div><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Contributions</label><textarea value={contributions} onChange={(e) => setContributions(e.target.value)} className="min-h-24 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" /></div></ModalShell>;
}

function VisionEditModal({ value, onClose, onSave }: { value: FutureVisionDraft; onClose: () => void; onSave: (next: FutureVisionDraft) => void }) {
  const [products, setProducts] = useState(value.products.join("\n"));
  const [explore, setExplore] = useState(value.explore.join("\n"));
  const [ambitions, setAmbitions] = useState(value.ambitions);
  const [ecosystem, setEcosystem] = useState(value.ecosystem);
  return <ModalShell title="Edit Future Vision" onClose={onClose} onSave={() => onSave({ products: products.split("\n").map((s) => s.trim()).filter(Boolean), explore: explore.split("\n").map((s) => s.trim()).filter(Boolean), ambitions, ecosystem })}><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Products (one per line)</label><textarea value={products} onChange={(e) => setProducts(e.target.value)} className="min-h-24 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" /></div><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Explore (one per line)</label><textarea value={explore} onChange={(e) => setExplore(e.target.value)} className="min-h-24 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" /></div><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Ambitions</label><textarea value={ambitions} onChange={(e) => setAmbitions(e.target.value)} className="min-h-24 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" /></div><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Ecosystem</label><textarea value={ecosystem} onChange={(e) => setEcosystem(e.target.value)} className="min-h-24 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" /></div></ModalShell>;
}

function ModalShell({ title, onClose, onSave, children }: { title: string; onClose: () => void; onSave: () => void; children: React.ReactNode }) {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4"><motion.div initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }} className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-lg font-bold text-zinc-900">{title}</h3><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5 text-zinc-700"><X className="h-4 w-4" /></button></div><div className="mt-4 grid gap-3 overflow-y-auto pr-1 md:grid-cols-2">{children}</div><button onClick={onSave} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"><Save className="h-4 w-4" />Save</button></motion.div></motion.div>;
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return <label><span className="mb-1 block text-xs text-zinc-600">{label}</span><input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" /></label>;
}

function HiddenSection({ text, onShow }: { text: string; onShow: () => void }) { return <section className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center"><p className="text-sm text-zinc-600">{text}</p><button onClick={onShow} className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">Show Section</button></section>; }
function RestoreAll({ text, onRestore }: { text: string; onRestore: () => void }) { return <section className="mt-2 rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center"><p className="text-sm text-zinc-600">{text}</p><button onClick={onRestore} className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">Restore</button></section>; }
function Toast({ toast, onClose, onConfirm }: { toast: ToastState; onClose: () => void; onConfirm: () => void }) { if (!toast) return null; return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="fixed bottom-4 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl"><p className="text-sm text-zinc-800">{toast.message}</p>{toast.type === "confirm-delete" ? <div className="mt-3 flex gap-2"><button onClick={onConfirm} className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">Confirm</button><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Cancel</button></div> : <button onClick={onClose} className="mt-3 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Close</button>}</motion.div>; }




