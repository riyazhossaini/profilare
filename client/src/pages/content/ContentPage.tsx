import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Save, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AudienceInteraction } from "../../components/content/AudienceInteraction";
import { ContentCurrentFocus, ContentCTA } from "../../components/content/ContentFooterSections";
import { ContentGrid } from "../../components/content/ContentGrid";
import { ContentHero } from "../../components/content/ContentHero";
import { ContentTopNav } from "../../components/content/ContentTopNav";
import { DraftIdeasSection } from "../../components/content/DraftIdeasSection";
import { FeaturedContent } from "../../components/content/FeaturedContent";
import { JournalSection } from "../../components/content/JournalSection";
import { MediaContentSection } from "../../components/content/MediaContentSection";
import { ThoughtsSection } from "../../components/content/ThoughtsSection";
import { WritingCategories } from "../../components/content/WritingCategories";
import { EditableSectionBlock } from "../../components/EditableSectionBlock";
import { audience, contentCurrentFocus, contentItems, contentPhilosophy, draftIdeas, journalNotes, mediaContent, microThoughts, writingCategories, type ContentItem } from "../../data/content";
import { profileData } from "../../data/profile";
import { getGlobalProfileAvatarUrl } from "../../lib/profileAvatar";

type CPatch = { title?: string; summary?: string; category?: ContentItem["category"]; readingTime?: string; date?: string };
type WritingCategoryDraft = { name: string; count: number; description: string; icon: (typeof writingCategories)[number]["icon"]; hidden?: boolean };
type MediaDraft = (typeof mediaContent)[number] & { hidden?: boolean };
type AudienceDraft = { newsletter: string; collaboration: string; discussion: string; hidden?: Record<"newsletter" | "collaboration" | "discussion", boolean> };
type HeroDraft = { name: string; username: string; headline: string; statement: string; avatarText: string };
type ToastState =
  | { type: "confirm-delete"; message: string; action: "hide-hero" | "delete-content" | "delete-writing-category" | "delete-media" | "delete-audience-field" | "delete-focus"; slug?: string; index?: number; field?: "newsletter" | "collaboration" | "discussion" }
  | { type: "success"; message: string }
  | null;

const CK = "profilare:content-card-edits";
const HK = "profilare:content-hero-edits";
const HV = "profilare:content-hero-visible";
const CH = "profilare:content-card-hidden";
const WK = "profilare:content-writing-categories-edits";
const MK = "profilare:content-media-edits";
const AK = "profilare:content-audience-edits";
const FK = "profilare:content-current-focus-edits";
const load = <T,>(k: string, f: T) => { try { return JSON.parse(localStorage.getItem(k) || "") as T; } catch { return f; } };
const save = <T,>(k: string, v: T) => localStorage.setItem(k, JSON.stringify(v));

export function ContentPage() {
  const { username } = useParams<{ username: string }>();
  const [search, setSearch] = useState("");
  const [patches, setPatches] = useState<Record<string, CPatch>>(() => load(CK, {}));
  const [hiddenCards, setHiddenCards] = useState<Record<string, boolean>>(() => load(CH, {}));
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>(null);
  const [heroVisible, setHeroVisible] = useState<boolean>(() => load(HV, true));
  const [editingHero, setEditingHero] = useState(false);
  const [hero, setHero] = useState<HeroDraft>(() => load(HK, { name: profileData.name, username: profileData.username, headline: profileData.headline, statement: contentPhilosophy, avatarText: profileData.name.split(" ").map((p) => p[0]?.toUpperCase() || "").slice(0, 2).join("") }));
  const [writingCategoriesState, setWritingCategoriesState] = useState<WritingCategoryDraft[]>(() => load(WK, writingCategories));
  const [editingWritingCategoryIndex, setEditingWritingCategoryIndex] = useState<number | null>(null);
  const [mediaState, setMediaState] = useState<MediaDraft[]>(() => load(MK, mediaContent));
  const [editingMediaIndex, setEditingMediaIndex] = useState<number | null>(null);
  const [audienceState, setAudienceState] = useState<AudienceDraft>(() => load(AK, { ...audience, hidden: { newsletter: false, collaboration: false, discussion: false } }));
  const [editingAudienceField, setEditingAudienceField] = useState<"newsletter" | "collaboration" | "discussion" | null>(null);
  const [focusState, setFocusState] = useState<string[]>(() => load(FK, contentCurrentFocus));
  const [editingFocusIndex, setEditingFocusIndex] = useState<number | null>(null);

  if (!username || username !== profileData.username) return <Navigate to={`/profile/${profileData.username}`} replace />;

  const merged = contentItems.map((i) => ({ ...i, ...patches[i.slug] })).filter((i) => !hiddenCards[i.slug]);
  const filtered = useMemo(() => { const q = search.trim().toLowerCase(); return merged.filter((item) => !q || item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q) || item.tags.join(" ").toLowerCase().includes(q)); }, [search, merged]);
  const featured = merged.slice(0, 2);
  const editing = merged.find((i) => i.slug === editingSlug) || null;
  const visibleWritingCategories = writingCategoriesState.filter((item) => !item.hidden);
  const editingWritingCategory = editingWritingCategoryIndex !== null ? writingCategoriesState[editingWritingCategoryIndex] || null : null;
  const visibleMedia = mediaState.filter((item) => !item.hidden);
  const editingMedia = editingMediaIndex !== null ? mediaState[editingMediaIndex] || null : null;
  const visibleAudience = {
    newsletter: audienceState.hidden?.newsletter ? "" : audienceState.newsletter,
    collaboration: audienceState.hidden?.collaboration ? "" : audienceState.collaboration,
    discussion: audienceState.hidden?.discussion ? "" : audienceState.discussion,
  };

  return <main className="px-4 py-8 md:px-8 md:py-12"><div className="mx-auto w-full max-w-6xl">
    <ContentTopNav username={profileData.username} name={profileData.name} search={search} onSearch={setSearch} />

    {heroVisible ? <section className="group relative"><div className="absolute right-3 top-8 z-10 flex gap-2"><button onClick={() => setEditingHero(true)} className="rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button><button onClick={() => setToast({ type: "confirm-delete", message: "Hide Content hero section?", action: "hide-hero" })} className="rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button></div><ContentHero name={hero.name} username={hero.username} headline={hero.headline} statement={hero.statement} avatarText={hero.avatarText} avatarUrl={getGlobalProfileAvatarUrl()} stats={[{ label: "Published", value: String(contentItems.length) }, { label: "Writing Streak", value: "29 days" }, { label: "Main Topics", value: "7" }, { label: "Most Active", value: "Articles" }, { label: "Reads", value: String(contentItems.reduce((a, b) => a + b.views, 0)) }]} /></section> : <HiddenSection onShow={() => { setHeroVisible(true); save(HV, true); setToast({ type: "success", message: "Content hero restored." }); }} text="Content hero is hidden." />}

    <EditableSectionBlock sectionId="content-featured" label="Featured Content"><FeaturedContent username={profileData.username} items={featured} onEdit={setEditingSlug} onDelete={(slug) => setToast({ type: "confirm-delete", message: "Delete this content card?", action: "delete-content", slug })} /></EditableSectionBlock>
    <EditableSectionBlock sectionId="content-grid" label="Content Grid">{filtered.length ? <ContentGrid username={profileData.username} items={filtered} onEdit={setEditingSlug} onDelete={(slug) => setToast({ type: "confirm-delete", message: "Delete this content card?", action: "delete-content", slug })} /> : <RestoreAll text="All content cards are deleted." onRestore={() => { setHiddenCards({}); save(CH, {}); setToast({ type: "success", message: "Content cards restored." }); }} />}</EditableSectionBlock>
    <EditableSectionBlock sectionId="content-writing-categories" label="Writing Categories">{visibleWritingCategories.length ? <WritingCategories items={visibleWritingCategories} onEdit={(idx) => { const target = visibleWritingCategories[idx]; const original = writingCategoriesState.findIndex((item) => item.name === target.name && item.description === target.description && !item.hidden); if (original >= 0) setEditingWritingCategoryIndex(original); }} onDelete={(idx) => { const target = visibleWritingCategories[idx]; const original = writingCategoriesState.findIndex((item) => item.name === target.name && item.description === target.description && !item.hidden); if (original >= 0) setToast({ type: "confirm-delete", message: "Delete this writing category card?", action: "delete-writing-category", index: original }); }} /> : <RestoreAll text="All writing categories are deleted." onRestore={() => { const restored = writingCategoriesState.map((item) => ({ ...item, hidden: false })); setWritingCategoriesState(restored); save(WK, restored); setToast({ type: "success", message: "Writing categories restored." }); }} />}</EditableSectionBlock>
    <EditableSectionBlock sectionId="content-thoughts" label="Thoughts"><ThoughtsSection username={profileData.username} items={microThoughts} /></EditableSectionBlock>
    <EditableSectionBlock sectionId="content-journal" label="Journal"><JournalSection username={profileData.username} items={journalNotes} /></EditableSectionBlock>
    <EditableSectionBlock sectionId="content-media" label="Media">{visibleMedia.length ? <MediaContentSection items={visibleMedia} onEdit={(idx) => { const target = visibleMedia[idx]; const original = mediaState.findIndex((item) => item.slug === target.slug && !item.hidden); if (original >= 0) setEditingMediaIndex(original); }} onDelete={(idx) => { const target = visibleMedia[idx]; const original = mediaState.findIndex((item) => item.slug === target.slug && !item.hidden); if (original >= 0) setToast({ type: "confirm-delete", message: "Delete this media card?", action: "delete-media", index: original }); }} /> : <RestoreAll text="All media cards are deleted." onRestore={() => { const restored = mediaState.map((item) => ({ ...item, hidden: false })); setMediaState(restored); save(MK, restored); setToast({ type: "success", message: "Media cards restored." }); }} />}</EditableSectionBlock>
    <EditableSectionBlock sectionId="content-drafts" label="Draft Ideas"><DraftIdeasSection username={profileData.username} items={draftIdeas} /></EditableSectionBlock>
    <EditableSectionBlock sectionId="content-audience" label="Audience"><AudienceInteraction data={visibleAudience} onEdit={(field) => setEditingAudienceField(field)} onDelete={(field) => setToast({ type: "confirm-delete", message: `Delete ${field} line?`, action: "delete-audience-field", field })} /></EditableSectionBlock>
    <EditableSectionBlock sectionId="content-current-focus" label="Current Focus">{focusState.length ? <ContentCurrentFocus items={focusState} onEdit={(index) => setEditingFocusIndex(index)} onDelete={(index) => setToast({ type: "confirm-delete", message: "Delete this focus item?", action: "delete-focus", index })} /> : <RestoreAll text="All focus items are deleted." onRestore={() => { setFocusState(contentCurrentFocus); save(FK, contentCurrentFocus); setToast({ type: "success", message: "Current focus restored." }); }} />}</EditableSectionBlock>
    <EditableSectionBlock sectionId="content-cta" label="Next Step"><ContentCTA username={profileData.username} /></EditableSectionBlock>
  </div>
  <AnimatePresence>
    {editing ? <EditModal item={editing} onClose={() => setEditingSlug(null)} onSave={(v) => { const n = { ...patches, [editing.slug]: v }; setPatches(n); save(CK, n); setEditingSlug(null); setToast({ type: "success", message: "Content card updated." }); }} /> : null}
    {editingHero ? <HeroEditModal value={hero} onClose={() => setEditingHero(false)} onSave={(next) => { setHero(next); save(HK, next); setEditingHero(false); setToast({ type: "success", message: "Content hero updated." }); }} /> : null}
    {editingWritingCategory ? <WritingCategoryEditModal value={editingWritingCategory} onClose={() => setEditingWritingCategoryIndex(null)} onSave={(next) => { const copy = [...writingCategoriesState]; copy[editingWritingCategoryIndex!] = { ...copy[editingWritingCategoryIndex!], ...next }; setWritingCategoriesState(copy); save(WK, copy); setEditingWritingCategoryIndex(null); setToast({ type: "success", message: "Writing category updated." }); }} /> : null}
    {editingMedia ? <MediaEditModal value={editingMedia} onClose={() => setEditingMediaIndex(null)} onSave={(next) => { const copy = [...mediaState]; copy[editingMediaIndex!] = { ...copy[editingMediaIndex!], ...next }; setMediaState(copy); save(MK, copy); setEditingMediaIndex(null); setToast({ type: "success", message: "Media card updated." }); }} /> : null}
    {editingAudienceField ? <TextFieldModal title={`Edit ${editingAudienceField}`} label={editingAudienceField} value={audienceState[editingAudienceField]} onClose={() => setEditingAudienceField(null)} onSave={(next) => { const updated = { ...audienceState, [editingAudienceField]: next, hidden: { ...(audienceState.hidden || { newsletter: false, collaboration: false, discussion: false }), [editingAudienceField]: false } }; setAudienceState(updated); save(AK, updated); setEditingAudienceField(null); setToast({ type: "success", message: "Audience field updated." }); }} /> : null}
    {editingFocusIndex !== null ? <TextFieldModal title="Edit Focus Item" label="Focus" value={focusState[editingFocusIndex] || ""} onClose={() => setEditingFocusIndex(null)} onSave={(next) => { const copy = [...focusState]; copy[editingFocusIndex] = next; setFocusState(copy); save(FK, copy); setEditingFocusIndex(null); setToast({ type: "success", message: "Focus item updated." }); }} /> : null}
    {toast ? <Toast toast={toast} onClose={() => setToast(null)} onConfirm={() => { if (toast.type !== "confirm-delete") return; if (toast.action === "hide-hero") { setHeroVisible(false); save(HV, false); setToast({ type: "success", message: "Content hero hidden." }); return; } if (toast.action === "delete-content" && toast.slug) { const next = { ...hiddenCards, [toast.slug]: true }; setHiddenCards(next); save(CH, next); setToast({ type: "success", message: "Content card deleted." }); return; } if (toast.action === "delete-writing-category" && typeof toast.index === "number") { const copy = [...writingCategoriesState]; copy[toast.index] = { ...copy[toast.index], hidden: true }; setWritingCategoriesState(copy); save(WK, copy); setToast({ type: "success", message: "Writing category card deleted." }); return; } if (toast.action === "delete-media" && typeof toast.index === "number") { const copy = [...mediaState]; copy[toast.index] = { ...copy[toast.index], hidden: true }; setMediaState(copy); save(MK, copy); setToast({ type: "success", message: "Media card deleted." }); return; } if (toast.action === "delete-audience-field" && toast.field) { const updated = { ...audienceState, hidden: { ...(audienceState.hidden || { newsletter: false, collaboration: false, discussion: false }), [toast.field]: true } }; setAudienceState(updated); save(AK, updated); setToast({ type: "success", message: "Audience line deleted." }); return; } if (toast.action === "delete-focus" && typeof toast.index === "number") { const copy = focusState.filter((_, i) => i !== toast.index); setFocusState(copy); save(FK, copy); setToast({ type: "success", message: "Focus item deleted." }); } }} /> : null}
  </AnimatePresence>
  </main>;
}

function EditModal({ item, onClose, onSave }: { item: ContentItem; onClose: () => void; onSave: (v: CPatch) => void }) {
  const [d, setD] = useState<CPatch>({ title: item.title, summary: item.summary, category: item.category, readingTime: item.readingTime, date: item.date });
  return <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4"><motion.div initial={{y:14,opacity:0}} animate={{y:0,opacity:1}} exit={{y:14,opacity:0}} className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-lg font-bold">Edit Content Card</h3><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5"><X className="h-4 w-4" /></button></div><div className="mt-4 grid gap-3 md:grid-cols-2"><Field label="Title" value={d.title||""} onChange={(v)=>setD(p=>({...p,title:v}))} /><Field label="Category" value={d.category||""} onChange={(v)=>setD(p=>({...p,category:v as ContentItem["category"]}))} /><Field label="Date" value={d.date||""} onChange={(v)=>setD(p=>({...p,date:v}))} /><Field label="Reading Time" value={d.readingTime||""} onChange={(v)=>setD(p=>({...p,readingTime:v}))} /><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Summary</label><textarea value={d.summary||""} onChange={(e)=>setD(p=>({...p,summary:e.target.value}))} className="min-h-24 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div></div><button onClick={()=>onSave(d)} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"><Save className="h-4 w-4" />Save</button></motion.div></motion.div>;
}

function HeroEditModal({ value, onClose, onSave }: { value: HeroDraft; onClose: () => void; onSave: (v: HeroDraft) => void }) {
  const [d, setD] = useState(value);
  return <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4"><motion.div initial={{y:14,opacity:0}} animate={{y:0,opacity:1}} exit={{y:14,opacity:0}} className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-lg font-bold">Edit Content Hero</h3><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5"><X className="h-4 w-4" /></button></div><div className="mt-4 grid gap-3 md:grid-cols-2"><Field label="Name" value={d.name} onChange={(v)=>setD(p=>({...p,name:v}))} /><Field label="Username" value={d.username} onChange={(v)=>setD(p=>({...p,username:v}))} /><Field label="Headline" value={d.headline} onChange={(v)=>setD(p=>({...p,headline:v}))} /><Field label="Avatar Text" value={d.avatarText} onChange={(v)=>setD(p=>({...p,avatarText:v.slice(0,3).toUpperCase()}))} /><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Statement</label><textarea value={d.statement} onChange={(e)=>setD(p=>({...p,statement:e.target.value}))} className="min-h-24 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div></div><button onClick={()=>onSave(d)} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"><Save className="h-4 w-4" />Save</button></motion.div></motion.div>;
}

function WritingCategoryEditModal({ value, onClose, onSave }: { value: WritingCategoryDraft; onClose: () => void; onSave: (v: Pick<WritingCategoryDraft, "name" | "count" | "description">) => void }) {
  const [name, setName] = useState(value.name);
  const [count, setCount] = useState(String(value.count));
  const [description, setDescription] = useState(value.description);
  return <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4"><motion.div initial={{y:14,opacity:0}} animate={{y:0,opacity:1}} exit={{y:14,opacity:0}} className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-lg font-bold">Edit Writing Category</h3><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5"><X className="h-4 w-4" /></button></div><div className="mt-4 grid gap-3 md:grid-cols-2"><Field label="Name" value={name} onChange={setName} /><Field label="Posts Count" value={count} onChange={setCount} /><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Description</label><textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="min-h-24 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div></div><button onClick={()=>onSave({ name, count: Math.max(0, Number(count) || 0), description })} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"><Save className="h-4 w-4" />Save</button></motion.div></motion.div>;
}

function MediaEditModal({ value, onClose, onSave }: { value: MediaDraft; onClose: () => void; onSave: (v: Omit<MediaDraft, "hidden" | "icon">) => void }) {
  const [d, setD] = useState(value);
  return <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4"><motion.div initial={{y:14,opacity:0}} animate={{y:0,opacity:1}} exit={{y:14,opacity:0}} className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-lg font-bold">Edit Media Card</h3><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5"><X className="h-4 w-4" /></button></div><div className="mt-4 grid gap-3 md:grid-cols-2"><Field label="Type" value={d.type} onChange={(v)=>setD(p=>({...p,type:v}))} /><Field label="Status" value={d.status} onChange={(v)=>setD(p=>({...p,status:v}))} /><Field label="Title" value={d.title} onChange={(v)=>setD(p=>({...p,title:v}))} /><Field label="Date" value={d.date} onChange={(v)=>setD(p=>({...p,date:v}))} /><Field label="Duration" value={d.duration} onChange={(v)=>setD(p=>({...p,duration:v}))} /><Field label="Platform" value={d.platform} onChange={(v)=>setD(p=>({...p,platform:v}))} /><Field label="External URL" value={d.externalUrl} onChange={(v)=>setD(p=>({...p,externalUrl:v}))} /><Field label="Views" value={String(d.views)} onChange={(v)=>setD(p=>({...p,views:Number(v)||0}))} /><Field label="Saves" value={String(d.saves)} onChange={(v)=>setD(p=>({...p,saves:Number(v)||0}))} /><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Tags (comma separated)</label><textarea value={d.tags.join(", ")} onChange={(e)=>setD(p=>({...p,tags:e.target.value.split(",").map((s)=>s.trim()).filter(Boolean)}))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Summary</label><textarea value={d.summary} onChange={(e)=>setD(p=>({...p,summary:e.target.value}))} className="min-h-24 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div></div><button onClick={()=>onSave({ ...d })} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"><Save className="h-4 w-4" />Save</button></motion.div></motion.div>;
}

function TextFieldModal({ title, label, value, onClose, onSave }: { title: string; label: string; value: string; onClose: () => void; onSave: (v: string) => void }) {
  const [text, setText] = useState(value);
  return <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4"><motion.div initial={{y:14,opacity:0}} animate={{y:0,opacity:1}} exit={{y:14,opacity:0}} className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-lg font-bold">{title}</h3><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5"><X className="h-4 w-4" /></button></div><div className="mt-4"><label className="mb-1 block text-xs text-zinc-600">{label}</label><textarea value={text} onChange={(e)=>setText(e.target.value)} className="min-h-24 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div><button onClick={()=>onSave(text)} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"><Save className="h-4 w-4" />Save</button></motion.div></motion.div>;
}

const Field=({label,value,onChange}:{label:string;value:string;onChange:(v:string)=>void})=><label><span className="mb-1 block text-xs text-zinc-600">{label}</span><input value={value} onChange={(e)=>onChange(e.target.value)} className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></label>;
function HiddenSection({ text, onShow }: { text: string; onShow: () => void }) { return <section className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center"><p className="text-sm text-zinc-600">{text}</p><button onClick={onShow} className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">Show Section</button></section>; }
function RestoreAll({ text, onRestore }: { text: string; onRestore: () => void }) { return <section className="mt-2 rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center"><p className="text-sm text-zinc-600">{text}</p><button onClick={onRestore} className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">Restore</button></section>; }
function Toast({ toast, onClose, onConfirm }: { toast: ToastState; onClose: () => void; onConfirm: () => void }) { if (!toast) return null; return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="fixed bottom-4 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl"><p className="text-sm text-zinc-800">{toast.message}</p>{toast.type === "confirm-delete" ? <div className="mt-3 flex gap-2"><button onClick={onConfirm} className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">Confirm</button><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Cancel</button></div> : <button onClick={onClose} className="mt-3 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Close</button>}</motion.div>; }



