import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Save, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { CurrentLearningSection } from "../../components/skills/CurrentLearningSection";
import { SkillCategorySection } from "../../components/skills/SkillCategorySection";
import { SkillCTA } from "../../components/skills/SkillCTA";
import { SkillsAchievements } from "../../components/skills/SkillsAchievements";
import { SkillsHero } from "../../components/skills/SkillsHero";
import { SkillsTopNav } from "../../components/skills/SkillsTopNav";
import { EditableSectionBlock } from "../../components/EditableSectionBlock";
import { profileData } from "../../data/profile";
import { getGlobalProfileAvatarUrl } from "../../lib/profileAvatar";
import { achievements, currentLearning, skillCategories, skillsPhilosophy, type Skill } from "../../data/skills";

type SkillPatch = { name?: string; summary?: string; level?: Skill["level"]; progress?: number; learningSince?: string; currentUsage?: string };
type LearningPatch = { name?: string; progress?: number; weeklyGoal?: string; status?: string };
type HeroDraft = { name: string; username: string; headline: string; statement: string; avatarText: string };
type ToastState =
  | { type: "confirm-delete"; message: string; action: "hide-hero" | "delete-skill" | "delete-learning" | "delete-achievement"; slug?: string; name?: string; index?: number }
  | { type: "success"; message: string }
  | null;

const SKILL_KEY = "profilare:skills-card-edits";
const LEARNING_KEY = "profilare:skills-learning-card-edits";
const SKILL_HIDDEN_KEY = "profilare:skills-hidden";
const LEARNING_HIDDEN_KEY = "profilare:skills-learning-hidden";
const ACHIEVEMENTS_KEY = "profilare:skills-achievements-edits";
const HERO_KEY = "profilare:skills-hero-edits";
const HERO_VISIBLE_KEY = "profilare:skills-hero-visible";

function load<T>(key: string, fallback: T): T { if (typeof window === "undefined") return fallback; try { const raw = window.localStorage.getItem(key); if (!raw) return fallback; return JSON.parse(raw) as T; } catch { return fallback; } }
function save<T>(key: string, value: T) { if (typeof window === "undefined") return; window.localStorage.setItem(key, JSON.stringify(value)); }

export function SkillsPage() {
  const { username } = useParams<{ username: string }>();
  const [search, setSearch] = useState("");
  const [skillPatches, setSkillPatches] = useState<Record<string, SkillPatch>>(() => load(SKILL_KEY, {}));
  const [learningPatches, setLearningPatches] = useState<Record<string, LearningPatch>>(() => load(LEARNING_KEY, {}));
  const [hiddenSkills, setHiddenSkills] = useState<Record<string, boolean>>(() => load(SKILL_HIDDEN_KEY, {}));
  const [hiddenLearning, setHiddenLearning] = useState<Record<string, boolean>>(() => load(LEARNING_HIDDEN_KEY, {}));
  const [editingSkillSlug, setEditingSkillSlug] = useState<string | null>(null);
  const [editingLearningName, setEditingLearningName] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>(null);

  const [heroVisible, setHeroVisible] = useState<boolean>(() => load(HERO_VISIBLE_KEY, true));
  const [editingHero, setEditingHero] = useState(false);
  const [hero, setHero] = useState<HeroDraft>(() => load(HERO_KEY, { name: profileData.name, username: profileData.username, headline: profileData.headline, statement: skillsPhilosophy, avatarText: profileData.name.split(" ").map((v) => v[0]?.toUpperCase() || "").slice(0, 2).join("") }));

  const [achievementsState, setAchievementsState] = useState<string[]>(() => load(ACHIEVEMENTS_KEY, achievements));
  const [editingAchievementIndex, setEditingAchievementIndex] = useState<number | null>(null);

  if (!username || username !== profileData.username) {
    return <Navigate to={`/profile/${profileData.username}`} replace />;
  }

  const mergedCategories = useMemo(() =>
    skillCategories.map((category) => ({
      ...category,
      skills: category.skills
        .map((skill) => {
          const patch = skillPatches[skill.slug] || {};
          return {
            ...skill,
            name: patch.name ?? skill.name,
            summary: patch.summary ?? skill.summary,
            level: patch.level ?? skill.level,
            progress: patch.progress ?? skill.progress,
            learningSince: patch.learningSince ?? skill.learningSince,
            currentUsage: patch.currentUsage ?? skill.currentUsage,
          };
        })
        .filter((skill) => !hiddenSkills[skill.slug]),
    })), [skillPatches, hiddenSkills]);

  const mergedLearning = useMemo(() =>
    currentLearning
      .map((item) => {
        const patch = learningPatches[item.name] || {};
        return {
          ...item,
          name: patch.name ?? item.name,
          progress: patch.progress ?? item.progress,
          weeklyGoal: patch.weeklyGoal ?? item.weeklyGoal,
          status: patch.status ?? item.status,
        };
      })
      .filter((item) => !hiddenLearning[item.name]),
    [learningPatches, hiddenLearning]);

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return mergedCategories;
    return mergedCategories
      .map((category) => ({ ...category, skills: category.skills.filter((skill) => skill.name.toLowerCase().includes(query) || skill.summary.toLowerCase().includes(query)) }))
      .filter((category) => category.skills.length > 0);
  }, [search, mergedCategories]);

  const editingSkill = editingSkillSlug ? mergedCategories.flatMap((category) => category.skills).find((skill) => skill.slug === editingSkillSlug) || null : null;
  const editingLearning = editingLearningName ? mergedLearning.find((item) => item.name === editingLearningName) || null : null;

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <SkillsTopNav username={profileData.username} name={profileData.name} search={search} onSearch={setSearch} />

        {heroVisible ? (
          <section className="group relative">
            <div className="absolute right-3 top-8 z-10 flex gap-2">
              <button onClick={() => setEditingHero(true)} className="rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => setToast({ type: "confirm-delete", message: "Hide Skills hero section?", action: "hide-hero" })} className="rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
            <SkillsHero name={hero.name} username={hero.username} headline={hero.headline} statement={hero.statement} avatarText={hero.avatarText} avatarUrl={getGlobalProfileAvatarUrl()} />
          </section>
        ) : (
          <HiddenSection text="Skills hero is hidden." onShow={() => { setHeroVisible(true); save(HERO_VISIBLE_KEY, true); setToast({ type: "success", message: "Skills hero restored." }); }} />
        )}

        {filteredCategories.map((category) => (
          <EditableSectionBlock key={category.key} sectionId={`skills-category-${category.key}`} label={category.title}>
            {category.skills.length ? (
              <SkillCategorySection username={profileData.username} category={category} onEdit={setEditingSkillSlug} onDelete={(slug) => setToast({ type: "confirm-delete", message: "Delete this skill card?", action: "delete-skill", slug })} />
            ) : (
              <RestoreAll text={`All ${category.title} cards are deleted.`} onRestore={() => { setHiddenSkills({}); save(SKILL_HIDDEN_KEY, {}); setToast({ type: "success", message: "Skills restored." }); }} />
            )}
          </EditableSectionBlock>
        ))}

        <EditableSectionBlock sectionId="skills-achievements" label="Achievements">
          {achievementsState.length ? (
            <SkillsAchievements items={achievementsState} onEdit={(index) => setEditingAchievementIndex(index)} onDelete={(index) => setToast({ type: "confirm-delete", message: "Delete this achievement?", action: "delete-achievement", index })} />
          ) : (
            <RestoreAll text="All achievements are deleted." onRestore={() => { setAchievementsState(achievements); save(ACHIEVEMENTS_KEY, achievements); setToast({ type: "success", message: "Achievements restored." }); }} />
          )}
        </EditableSectionBlock>

        <EditableSectionBlock sectionId="skills-current-learning" label="Current Learning">
          {mergedLearning.length ? (
            <CurrentLearningSection items={mergedLearning} onEdit={setEditingLearningName} onDelete={(name) => setToast({ type: "confirm-delete", message: "Delete this learning card?", action: "delete-learning", name })} />
          ) : (
            <RestoreAll text="All current learning cards are deleted." onRestore={() => { setHiddenLearning({}); save(LEARNING_HIDDEN_KEY, {}); setToast({ type: "success", message: "Current learning restored." }); }} />
          )}
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="skills-cta" label="Next Step">
          <SkillCTA username={profileData.username} />
        </EditableSectionBlock>
      </div>

      <AnimatePresence>
        {editingSkill ? <SkillCardModal value={editingSkill} onClose={() => setEditingSkillSlug(null)} onSave={(next) => { const updated = { ...skillPatches, [editingSkill.slug]: next }; setSkillPatches(updated); save(SKILL_KEY, updated); setEditingSkillSlug(null); setToast({ type: "success", message: "Skill updated." }); }} /> : null}
        {editingLearning ? <LearningCardModal value={editingLearning} onClose={() => setEditingLearningName(null)} onSave={(next) => { const updated = { ...learningPatches, [editingLearning.name]: next }; setLearningPatches(updated); save(LEARNING_KEY, updated); setEditingLearningName(null); setToast({ type: "success", message: "Learning card updated." }); }} /> : null}
        {editingHero ? <HeroModal value={hero} onClose={() => setEditingHero(false)} onSave={(next) => { setHero(next); save(HERO_KEY, next); setEditingHero(false); setToast({ type: "success", message: "Skills hero updated." }); }} /> : null}
        {editingAchievementIndex !== null ? <TextModal title="Edit Achievement" value={achievementsState[editingAchievementIndex] || ""} onClose={() => setEditingAchievementIndex(null)} onSave={(next) => { const copy = [...achievementsState]; copy[editingAchievementIndex] = next; setAchievementsState(copy); save(ACHIEVEMENTS_KEY, copy); setEditingAchievementIndex(null); setToast({ type: "success", message: "Achievement updated." }); }} /> : null}
        {toast ? <Toast toast={toast} onClose={() => setToast(null)} onConfirm={() => {
          if (toast.type !== "confirm-delete") return;
          if (toast.action === "hide-hero") { setHeroVisible(false); save(HERO_VISIBLE_KEY, false); setToast({ type: "success", message: "Skills hero hidden." }); return; }
          if (toast.action === "delete-skill" && toast.slug) { const next = { ...hiddenSkills, [toast.slug]: true }; setHiddenSkills(next); save(SKILL_HIDDEN_KEY, next); setToast({ type: "success", message: "Skill card deleted." }); return; }
          if (toast.action === "delete-learning" && toast.name) { const next = { ...hiddenLearning, [toast.name]: true }; setHiddenLearning(next); save(LEARNING_HIDDEN_KEY, next); setToast({ type: "success", message: "Learning card deleted." }); return; }
          if (toast.action === "delete-achievement" && typeof toast.index === "number") { const copy = achievementsState.filter((_, i) => i !== toast.index); setAchievementsState(copy); save(ACHIEVEMENTS_KEY, copy); setToast({ type: "success", message: "Achievement deleted." }); }
        }} /> : null}
      </AnimatePresence>
    </main>
  );
}

function SkillCardModal({ value, onClose, onSave }: { value: Skill; onClose: () => void; onSave: (next: SkillPatch) => void }) {
  const [draft, setDraft] = useState<SkillPatch>({ name: value.name, summary: value.summary, level: value.level, progress: value.progress, learningSince: value.learningSince, currentUsage: value.currentUsage });
  return <ModalShell title="Edit Skill Card" onClose={onClose} onSave={() => onSave(draft)}><Field label="Name" value={draft.name || ""} onChange={(v) => setDraft((p) => ({ ...p, name: v }))} /><Field label="Level" value={draft.level || ""} onChange={(v) => setDraft((p) => ({ ...p, level: v as Skill["level"] }))} /><Field label="Progress (0-100)" value={String(draft.progress ?? "")} onChange={(v) => setDraft((p) => ({ ...p, progress: Number(v) || 0 }))} /><Field label="Learning Since" value={draft.learningSince || ""} onChange={(v) => setDraft((p) => ({ ...p, learningSince: v }))} /><Field label="Current Usage" value={draft.currentUsage || ""} onChange={(v) => setDraft((p) => ({ ...p, currentUsage: v }))} /><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Summary</label><textarea value={draft.summary || ""} onChange={(e) => setDraft((p) => ({ ...p, summary: e.target.value }))} className="min-h-24 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" /></div></ModalShell>;
}

function LearningCardModal({ value, onClose, onSave }: { value: { name: string; progress: number; weeklyGoal: string; status: string }; onClose: () => void; onSave: (next: LearningPatch) => void }) {
  const [draft, setDraft] = useState<LearningPatch>({ name: value.name, progress: value.progress, weeklyGoal: value.weeklyGoal, status: value.status });
  return <ModalShell title="Edit Learning Card" onClose={onClose} onSave={() => onSave(draft)}><Field label="Name" value={draft.name || ""} onChange={(v) => setDraft((p) => ({ ...p, name: v }))} /><Field label="Progress (0-100)" value={String(draft.progress ?? "")} onChange={(v) => setDraft((p) => ({ ...p, progress: Number(v) || 0 }))} /><Field label="Weekly Goal" value={draft.weeklyGoal || ""} onChange={(v) => setDraft((p) => ({ ...p, weeklyGoal: v }))} /><Field label="Status" value={draft.status || ""} onChange={(v) => setDraft((p) => ({ ...p, status: v }))} /></ModalShell>;
}

function HeroModal({ value, onClose, onSave }: { value: HeroDraft; onClose: () => void; onSave: (next: HeroDraft) => void }) {
  const [d, setD] = useState(value);
  return <ModalShell title="Edit Skills Hero" onClose={onClose} onSave={() => onSave(d)}><Field label="Name" value={d.name} onChange={(v) => setD((p) => ({ ...p, name: v }))} /><Field label="Username" value={d.username} onChange={(v) => setD((p) => ({ ...p, username: v }))} /><Field label="Headline" value={d.headline} onChange={(v) => setD((p) => ({ ...p, headline: v }))} /><Field label="Avatar Text" value={d.avatarText} onChange={(v) => setD((p) => ({ ...p, avatarText: v.slice(0, 3).toUpperCase() }))} /><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Statement</label><textarea value={d.statement} onChange={(e) => setD((p) => ({ ...p, statement: e.target.value }))} className="min-h-24 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" /></div></ModalShell>;
}

function TextModal({ title, value, onClose, onSave }: { title: string; value: string; onClose: () => void; onSave: (v: string) => void }) {
  const [text, setText] = useState(value);
  return <ModalShell title={title} onClose={onClose} onSave={() => onSave(text)}><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Text</label><textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-24 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" /></div></ModalShell>;
}

function ModalShell({ title, onClose, onSave, children }: { title: string; onClose: () => void; onSave: () => void; children: React.ReactNode }) {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4"><motion.div initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }} className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-lg font-bold text-zinc-900">{title}</h3><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5 text-zinc-700"><X className="h-4 w-4" /></button></div><div className="mt-4 grid gap-3 overflow-y-auto pr-1 md:grid-cols-2">{children}</div><button onClick={onSave} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"><Save className="h-4 w-4" />Save</button></motion.div></motion.div>;
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) { return <label><span className="mb-1 block text-xs text-zinc-600">{label}</span><input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" /></label>; }
function HiddenSection({ text, onShow }: { text: string; onShow: () => void }) { return <section className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center"><p className="text-sm text-zinc-600">{text}</p><button onClick={onShow} className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">Show Section</button></section>; }
function RestoreAll({ text, onRestore }: { text: string; onRestore: () => void }) { return <section className="mt-2 rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center"><p className="text-sm text-zinc-600">{text}</p><button onClick={onRestore} className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">Restore</button></section>; }
function Toast({ toast, onClose, onConfirm }: { toast: ToastState; onClose: () => void; onConfirm: () => void }) { if (!toast) return null; return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="fixed bottom-4 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl"><p className="text-sm text-zinc-800">{toast.message}</p>{toast.type === "confirm-delete" ? <div className="mt-3 flex gap-2"><button onClick={onConfirm} className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">Confirm</button><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Cancel</button></div> : <button onClick={onClose} className="mt-3 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Close</button>}</motion.div>; }



