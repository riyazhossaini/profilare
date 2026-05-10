import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Save, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CoursesSection } from "../../components/education/CoursesSection";
import { EducationCTA } from "../../components/education/EducationCTA";
import { EducationHero } from "../../components/education/EducationHero";
import { EducationTimeline } from "../../components/education/EducationTimeline";
import { EducationTopNav } from "../../components/education/EducationTopNav";
import { FormalEducationSection } from "../../components/education/FormalEducationSection";
import { FutureLearningGoals } from "../../components/education/FutureLearningGoals";
import { LearningDashboard } from "../../components/education/LearningDashboard";
import { ReadingResources } from "../../components/education/ReadingResources";
import { SelfLearningSection } from "../../components/education/SelfLearningSection";
import { EditableSectionBlock } from "../../components/EditableSectionBlock";
import { coursesAndCerts, currentLearning, educationPhilosophy, educationTimeline, formalEducation, futureLearningGoals, resourcesSection, selfLearningTopics, type FormalEducationItem, type SelfLearningItem } from "../../data/education";
import { profileData } from "../../data/profile";
import { getGlobalProfileAvatarUrl } from "../../lib/profileAvatar";

type FPatch = { institution?: string; degree?: string; timeline?: string; story?: string };
type SPatch = { topic?: string; why?: string; status?: string; level?: string };
type CourseDraft = { provider: string; name: string; timeline: string; skills: string[]; hidden?: boolean };
type HeroDraft = { name: string; username: string; headline: string; statement: string; avatarText: string };
type ToastState = | { type: "confirm-delete"; message: string; action: "hide-hero" | "delete-formal" | "delete-self" | "delete-course"; slug?: string; index?: number } | { type: "success"; message: string } | null;

const FK = "profilare:education-formal-edits";
const SK = "profilare:education-self-edits";
const FH = "profilare:education-formal-hidden";
const SH = "profilare:education-self-hidden";
const HK = "profilare:education-hero-edits";
const HV = "profilare:education-hero-visible";
const TK = "profilare:education-timeline-edits";
const GK = "profilare:education-goals-edits";
const CK = "profilare:education-courses-edits";

const load = <T,>(k: string, f: T) => { try { return JSON.parse(localStorage.getItem(k) || "") as T; } catch { return f; } };
const save = <T,>(k: string, v: T) => localStorage.setItem(k, JSON.stringify(v));

export function EducationPage() {
  const { username } = useParams<{ username: string }>();
  const [search, setSearch] = useState("");
  const [fpatch, setFPatch] = useState<Record<string, FPatch>>(() => load(FK, {}));
  const [spatch, setSPatch] = useState<Record<string, SPatch>>(() => load(SK, {}));
  const [hiddenFormal, setHiddenFormal] = useState<Record<string, boolean>>(() => load(FH, {}));
  const [hiddenSelf, setHiddenSelf] = useState<Record<string, boolean>>(() => load(SH, {}));
  const [edit, setEdit] = useState<{ type: "formal" | "self"; slug: string } | null>(null);
  const [toast, setToast] = useState<ToastState>(null);

  const [heroVisible, setHeroVisible] = useState<boolean>(() => load(HV, true));
  const [editingHero, setEditingHero] = useState(false);
  const [hero, setHero] = useState<HeroDraft>(() => load(HK, { name: profileData.name, username: profileData.username, headline: profileData.headline, statement: educationPhilosophy, avatarText: profileData.name.split(" ").map((p) => p[0]?.toUpperCase() || "").slice(0, 2).join("") }));

  const [timelineState, setTimelineState] = useState<string[]>(() => load(TK, educationTimeline));
  const [goalsState, setGoalsState] = useState<string[]>(() => load(GK, futureLearningGoals));
  const [editingTimeline, setEditingTimeline] = useState(false);
  const [editingGoals, setEditingGoals] = useState(false);
  const [coursesState, setCoursesState] = useState<CourseDraft[]>(() => load(CK, coursesAndCerts));
  const [editingCourseIndex, setEditingCourseIndex] = useState<number | null>(null);

  if (!username || username !== profileData.username) return <Navigate to={`/profile/${profileData.username}`} replace />;

  const formal = formalEducation.map((i) => ({ ...i, ...fpatch[i.slug] })).filter((i) => !hiddenFormal[i.slug]);
  const self = selfLearningTopics.map((i) => ({ ...i, ...spatch[i.slug] })).filter((i) => !hiddenSelf[i.slug]);
  const filteredSelf = useMemo(() => { const q = search.trim().toLowerCase(); return !q ? self : self.filter((item) => item.topic.toLowerCase().includes(q) || item.why.toLowerCase().includes(q)); }, [search, self]);

  const formalItem = edit?.type === "formal" ? formal.find((i) => i.slug === edit.slug) || null : null;
  const selfItem = edit?.type === "self" ? self.find((i) => i.slug === edit.slug) || null : null;
  const visibleCourses = coursesState.filter((c) => !c.hidden);
  const editingCourse = editingCourseIndex !== null ? coursesState[editingCourseIndex] || null : null;

  return <main className="px-4 py-8 md:px-8 md:py-12"><div className="mx-auto w-full max-w-6xl">
    <EducationTopNav username={profileData.username} name={profileData.name} search={search} onSearch={setSearch} />

    {heroVisible ? <section className="group relative"><div className="absolute right-3 top-8 z-10 flex gap-2"><button onClick={() => setEditingHero(true)} className="rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button><button onClick={() => setToast({ type: "confirm-delete", message: "Hide Education hero section?", action: "hide-hero" })} className="rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button></div><EducationHero name={hero.name} username={hero.username} headline={hero.headline} statement={hero.statement} avatarText={hero.avatarText} avatarUrl={getGlobalProfileAvatarUrl()} /></section> : <HiddenSection text="Education hero is hidden." onShow={() => { setHeroVisible(true); save(HV, true); setToast({ type: "success", message: "Education hero restored." }); }} />}

    <EditableSectionBlock sectionId="education-formal" label="Formal Education">{formal.length ? <FormalEducationSection username={profileData.username} items={formal} onEdit={(slug) => setEdit({ type: "formal", slug })} onDelete={(slug) => setToast({ type: "confirm-delete", message: "Delete this formal education card?", action: "delete-formal", slug })} /> : <RestoreAll text="All formal education cards are deleted." onRestore={() => { setHiddenFormal({}); save(FH, {}); setToast({ type: "success", message: "Formal education restored." }); }} />}</EditableSectionBlock>
    <EditableSectionBlock sectionId="education-self-learning" label="Self Learning">{filteredSelf.length ? <SelfLearningSection username={profileData.username} items={filteredSelf} onEdit={(slug) => setEdit({ type: "self", slug })} onDelete={(slug) => setToast({ type: "confirm-delete", message: "Delete this self learning card?", action: "delete-self", slug })} /> : <RestoreAll text="All self learning cards are deleted." onRestore={() => { setHiddenSelf({}); save(SH, {}); setToast({ type: "success", message: "Self learning restored." }); }} />}</EditableSectionBlock>
    <EditableSectionBlock sectionId="education-courses" label="Courses & Certifications">{visibleCourses.length ? <CoursesSection items={visibleCourses} onEdit={(idx) => { const target = visibleCourses[idx]; const original = coursesState.findIndex((c) => c.name === target.name && c.provider === target.provider && !c.hidden); if (original >= 0) setEditingCourseIndex(original); }} onDelete={(idx) => { const target = visibleCourses[idx]; const original = coursesState.findIndex((c) => c.name === target.name && c.provider === target.provider && !c.hidden); if (original >= 0) setToast({ type: "confirm-delete", message: "Delete this course card?", action: "delete-course", index: original }); }} /> : <RestoreAll text="All course cards are deleted." onRestore={() => { const restored = coursesState.map((c) => ({ ...c, hidden: false })); setCoursesState(restored); save(CK, restored); setToast({ type: "success", message: "Courses restored." }); }} />}</EditableSectionBlock>
    <EditableSectionBlock sectionId="education-dashboard" label="Learning Dashboard"><LearningDashboard items={currentLearning} /></EditableSectionBlock>
    <EditableSectionBlock sectionId="education-reading-resources" label="Reading Resources"><ReadingResources username={profileData.username} data={resourcesSection} /></EditableSectionBlock>
    <EditableSectionBlock sectionId="education-books-resources" label="Books & Resources"><section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]"><h2 className="text-2xl font-bold">Books & Resources</h2><p className="mt-2 text-sm text-zinc-700">Open the complete curated resources list on a dedicated page.</p><Link to={`/profile/${profileData.username}/education/resources`} className="mt-4 inline-flex rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">View Full Resources List</Link></section></EditableSectionBlock>
    <section className="group relative"><button onClick={() => setEditingTimeline(true)} className="absolute right-3 top-8 z-10 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button><EditableSectionBlock sectionId="education-timeline" label="Education Timeline"><EducationTimeline items={timelineState} /></EditableSectionBlock></section>
    <section className="group relative"><button onClick={() => setEditingGoals(true)} className="absolute right-3 top-8 z-10 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button><EditableSectionBlock sectionId="education-future-goals" label="Future Learning Goals"><FutureLearningGoals items={goalsState} /></EditableSectionBlock></section>
    <EditableSectionBlock sectionId="education-cta" label="Next Step"><EducationCTA username={profileData.username} /></EditableSectionBlock>
  </div>
  <AnimatePresence>
    {formalItem ? <FormalModal item={formalItem} onClose={() => setEdit(null)} onSave={(v) => { const n = { ...fpatch, [formalItem.slug]: v }; setFPatch(n); save(FK, n); setEdit(null); setToast({ type: "success", message: "Formal education updated." }); }} /> : null}
    {selfItem ? <SelfModal item={selfItem} onClose={() => setEdit(null)} onSave={(v) => { const n = { ...spatch, [selfItem.slug]: v }; setSPatch(n); save(SK, n); setEdit(null); setToast({ type: "success", message: "Self learning updated." }); }} /> : null}
    {editingHero ? <HeroModal value={hero} onClose={() => setEditingHero(false)} onSave={(next) => { setHero(next); save(HK, next); setEditingHero(false); setToast({ type: "success", message: "Education hero updated." }); }} /> : null}
    {editingTimeline ? <ListModal title="Edit Education Timeline" value={timelineState} onClose={() => setEditingTimeline(false)} onSave={(next) => { setTimelineState(next); save(TK, next); setEditingTimeline(false); setToast({ type: "success", message: "Education timeline updated." }); }} /> : null}
    {editingGoals ? <ListModal title="Edit Future Learning Goals" value={goalsState} onClose={() => setEditingGoals(false)} onSave={(next) => { setGoalsState(next); save(GK, next); setEditingGoals(false); setToast({ type: "success", message: "Future goals updated." }); }} /> : null}
    {editingCourse ? <CourseModal value={editingCourse} onClose={() => setEditingCourseIndex(null)} onSave={(next) => { const copy = [...coursesState]; copy[editingCourseIndex!] = { ...copy[editingCourseIndex!], ...next }; setCoursesState(copy); save(CK, copy); setEditingCourseIndex(null); setToast({ type: "success", message: "Course updated." }); }} /> : null}
    {toast ? <Toast toast={toast} onClose={() => setToast(null)} onConfirm={() => { if (toast.type !== "confirm-delete") return; if (toast.action === "hide-hero") { setHeroVisible(false); save(HV, false); setToast({ type: "success", message: "Education hero hidden." }); return; } if (toast.action === "delete-formal" && toast.slug) { const next = { ...hiddenFormal, [toast.slug]: true }; setHiddenFormal(next); save(FH, next); setToast({ type: "success", message: "Formal education card deleted." }); return; } if (toast.action === "delete-self" && toast.slug) { const next = { ...hiddenSelf, [toast.slug]: true }; setHiddenSelf(next); save(SH, next); setToast({ type: "success", message: "Self learning card deleted." }); return; } if (toast.action === "delete-course" && typeof toast.index === "number") { const copy = [...coursesState]; copy[toast.index] = { ...copy[toast.index], hidden: true }; setCoursesState(copy); save(CK, copy); setToast({ type: "success", message: "Course card deleted." }); } }} /> : null}
  </AnimatePresence>
  </main>;
}

function Shell({title,onClose,onSave,children}:{title:string;onClose:()=>void;onSave:()=>void;children:React.ReactNode}){return <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4"><motion.div initial={{y:14,opacity:0}} animate={{y:0,opacity:1}} exit={{y:14,opacity:0}} className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-lg font-bold">{title}</h3><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5"><X className="h-4 w-4" /></button></div><div className="mt-4 grid gap-3 overflow-y-auto pr-1 md:grid-cols-2">{children}</div><button onClick={onSave} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"><Save className="h-4 w-4" />Save</button></motion.div></motion.div>}
const Field=({label,value,onChange}:{label:string;value:string;onChange:(v:string)=>void})=><label><span className="mb-1 block text-xs text-zinc-600">{label}</span><input value={value} onChange={(e)=>onChange(e.target.value)} className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></label>;
function FormalModal({item,onClose,onSave}:{item:FormalEducationItem;onClose:()=>void;onSave:(v:FPatch)=>void}){const [d,setD]=useState<FPatch>({institution:item.institution,degree:item.degree,timeline:item.timeline,story:item.story});return <Shell title="Edit Formal Education Card" onClose={onClose} onSave={()=>onSave(d)}><Field label="Institution" value={d.institution||""} onChange={(v)=>setD(p=>({...p,institution:v}))}/><Field label="Degree" value={d.degree||""} onChange={(v)=>setD(p=>({...p,degree:v}))}/><Field label="Timeline" value={d.timeline||""} onChange={(v)=>setD(p=>({...p,timeline:v}))}/><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Story</label><textarea value={d.story||""} onChange={(e)=>setD(p=>({...p,story:e.target.value}))} className="min-h-24 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div></Shell>}
function SelfModal({item,onClose,onSave}:{item:SelfLearningItem;onClose:()=>void;onSave:(v:SPatch)=>void}){const [d,setD]=useState<SPatch>({topic:item.topic,why:item.why,status:item.status,level:item.level});return <Shell title="Edit Self Learning Card" onClose={onClose} onSave={()=>onSave(d)}><Field label="Topic" value={d.topic||""} onChange={(v)=>setD(p=>({...p,topic:v}))}/><Field label="Status" value={d.status||""} onChange={(v)=>setD(p=>({...p,status:v}))}/><Field label="Level" value={d.level||""} onChange={(v)=>setD(p=>({...p,level:v}))}/><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Why</label><textarea value={d.why||""} onChange={(e)=>setD(p=>({...p,why:e.target.value}))} className="min-h-24 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div></Shell>}
function HeroModal({ value, onClose, onSave }: { value: HeroDraft; onClose: () => void; onSave: (v: HeroDraft) => void }) { const [d, setD] = useState(value); return <Shell title="Edit Education Hero" onClose={onClose} onSave={() => onSave(d)}><Field label="Name" value={d.name} onChange={(v)=>setD(p=>({...p,name:v}))} /><Field label="Username" value={d.username} onChange={(v)=>setD(p=>({...p,username:v}))} /><Field label="Headline" value={d.headline} onChange={(v)=>setD(p=>({...p,headline:v}))} /><Field label="Avatar Text" value={d.avatarText} onChange={(v)=>setD(p=>({...p,avatarText:v.slice(0,3).toUpperCase()}))} /><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Statement</label><textarea value={d.statement} onChange={(e)=>setD(p=>({...p,statement:e.target.value}))} className="min-h-24 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div></Shell>; }
function CourseModal({ value, onClose, onSave }: { value: CourseDraft; onClose: () => void; onSave: (v: CourseDraft) => void }) { const [d, setD] = useState(value); return <Shell title="Edit Course Card" onClose={onClose} onSave={() => onSave({ ...d, skills: d.skills })}><Field label="Provider" value={d.provider} onChange={(v)=>setD(p=>({...p,provider:v}))} /><Field label="Course Name" value={d.name} onChange={(v)=>setD(p=>({...p,name:v}))} /><Field label="Timeline" value={d.timeline} onChange={(v)=>setD(p=>({...p,timeline:v}))} /><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Skills (comma separated)</label><textarea value={d.skills.join(", ")} onChange={(e)=>setD(p=>({...p,skills:e.target.value.split(",").map((s)=>s.trim()).filter(Boolean)}))} className="min-h-24 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div></Shell>; }
function ListModal({ title, value, onClose, onSave }: { title: string; value: string[]; onClose: () => void; onSave: (v: string[]) => void }) { const [text, setText] = useState(value.join("\n")); return <Shell title={title} onClose={onClose} onSave={() => onSave(text.split("\n").map((v)=>v.trim()).filter(Boolean))}><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">One item per line</label><textarea value={text} onChange={(e)=>setText(e.target.value)} className="min-h-44 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div></Shell>; }
function HiddenSection({ text, onShow }: { text: string; onShow: () => void }) { return <section className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center"><p className="text-sm text-zinc-600">{text}</p><button onClick={onShow} className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">Show Section</button></section>; }
function RestoreAll({ text, onRestore }: { text: string; onRestore: () => void }) { return <section className="mt-2 rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center"><p className="text-sm text-zinc-600">{text}</p><button onClick={onRestore} className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">Restore</button></section>; }
function Toast({ toast, onClose, onConfirm }: { toast: ToastState; onClose: () => void; onConfirm: () => void }) { if (!toast) return null; return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="fixed bottom-4 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl"><p className="text-sm text-zinc-800">{toast.message}</p>{toast.type === "confirm-delete" ? <div className="mt-3 flex gap-2"><button onClick={onConfirm} className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">Confirm</button><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Cancel</button></div> : <button onClick={onClose} className="mt-3 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Close</button>}</motion.div>; }




