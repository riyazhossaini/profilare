import { AnimatePresence, motion } from "framer-motion";
import { Camera, Save, Trash2, User, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { EditableSectionBlock } from "../../components/EditableSectionBlock";
import { LinksCTA, LinksGrid, LinksHero, LinksTopNav, StartupLinksSection } from "../../components/links/LinksSections";
import { linksCta, linksIdentityStatement, mainLinks, startupLinks, type PlatformLink } from "../../data/links";
import { getAccountProfileDraft } from "../../data/accountProfile";
import { profileData } from "../../data/profile";
import { getGlobalProfileAvatarUrl } from "../../lib/profileAvatar";

const MAIN_KEY = "profilare:links-main-edits";
const STARTUP_KEY = "profilare:links-startup-edits";
const HERO_KEY = "profilare:links-hero-edits";
const MAIN_HIDDEN_KEY = "profilare:links-main-hidden";
const STARTUP_HIDDEN_KEY = "profilare:links-startup-hidden";

type StartupLink = {
  name: string;
  tagline: string;
  stage: string;
  category: string;
  url: string;
  logo?: string;
};

type HeroDraft = {
  name: string;
  username: string;
  headline: string;
  statement: string;
  avatarText: string;
};

type ToastState =
  | { type: "success"; message: string }
  | { type: "confirm-delete"; message: string; action: "delete-main" | "delete-startup"; index: number };

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

export function LinksPage() {
  const { username } = useParams<{ username: string }>();
  const draft = getAccountProfileDraft();
  const routeUsername = username || draft?.username || profileData.username;
  const isAccountHolder = routeUsername === profileData.username;
  const displayName = draft?.fullName || profileData.name;
  const displayHeadline = draft?.profileTitle || profileData.headline;

  const [search, setSearch] = useState("");
  const [mainItems, setMainItems] = useState<PlatformLink[]>(() => load(MAIN_KEY, mainLinks.map((i) => ({ ...i }))));
  const [startupItems, setStartupItems] = useState<StartupLink[]>(() =>
    load(
      STARTUP_KEY,
      startupLinks.map((i) => ({ name: i.name, tagline: i.tagline, stage: i.stage, category: i.category, url: i.url, logo: "" })),
    ),
  );
  const [editingMain, setEditingMain] = useState<number | null>(null);
  const [editingStartup, setEditingStartup] = useState<number | null>(null);
  const [editingHero, setEditingHero] = useState(false);
  const [mainHidden, setMainHidden] = useState<boolean[]>(() => load(MAIN_HIDDEN_KEY, mainLinks.map(() => false)));
  const [startupHidden, setStartupHidden] = useState<boolean[]>(() => load(STARTUP_HIDDEN_KEY, startupLinks.map(() => false)));
  const [toast, setToast] = useState<ToastState | null>(null);

  const heroDefault: HeroDraft = {
    name: displayName,
    username: routeUsername,
    headline: displayHeadline,
    statement: linksIdentityStatement,
    avatarText: displayName
      .split(" ")
      .map((part) => part[0]?.toUpperCase() || "")
      .slice(0, 2)
      .join(""),
  };
  const [hero, setHero] = useState<HeroDraft>(() => load(HERO_KEY, heroDefault));

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return mainItems
      .map((item, index) => ({ item, index }))
      .filter(({ index }) => !mainHidden[index])
      .filter(
        ({ item }) =>
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.handle.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q),
      );
  }, [mainItems, search, mainHidden]);

  const visibleStartup = useMemo(
    () => startupItems.map((item, index) => ({ item, index })).filter(({ index }) => !startupHidden[index]),
    [startupItems, startupHidden],
  );

  const onConfirmDelete = () => {
    if (!toast || toast.type !== "confirm-delete") return;
    if (toast.action === "delete-main") {
      const next = [...mainHidden];
      next[toast.index] = true;
      setMainHidden(next);
      save(MAIN_HIDDEN_KEY, next);
      setToast({ type: "success", message: "Link card deleted." });
      return;
    }
    const next = [...startupHidden];
    next[toast.index] = true;
    setStartupHidden(next);
    save(STARTUP_HIDDEN_KEY, next);
    setToast({ type: "success", message: "Startup card deleted." });
  };

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <LinksTopNav
          username={routeUsername}
          name={displayName}
          search={search}
          onSearch={setSearch}
          activeFilter="All"
          onFilter={() => undefined}
          filters={[]}
          showFilters={false}
        />

        <LinksHero
          name={hero.name}
          username={hero.username}
          headline={hero.headline}
          statement={hero.statement}
          avatarText={hero.avatarText}
          avatarUrl={getGlobalProfileAvatarUrl()}
          onEdit={isAccountHolder ? () => setEditingHero(true) : undefined}
        />

        <EditableSectionBlock sectionId="links-grid" label="Main Links">
          {filtered.length ? (
            <LinksGrid
              items={filtered.map(({ item }) => item)}
              onEdit={isAccountHolder ? (filteredIndex) => {
                const mapped = filtered[filteredIndex];
                if (mapped) setEditingMain(mapped.index);
              } : undefined}
              onDelete={isAccountHolder ? (filteredIndex) => {
                const mapped = filtered[filteredIndex];
                if (mapped) setToast({ type: "confirm-delete", message: "Delete this link card?", action: "delete-main", index: mapped.index });
              } : undefined}
            />
          ) : (
            <section className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
              <p className="text-sm text-zinc-600">All main link cards are deleted.</p>
              <button onClick={() => { const next = mainHidden.map(() => false); setMainHidden(next); save(MAIN_HIDDEN_KEY, next); setToast({ type: "success", message: "Main links restored." }); }} className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">Restore Main Links</button>
            </section>
          )}
        </EditableSectionBlock>

        <EditableSectionBlock sectionId="links-startup" label="Startup Links">
          {visibleStartup.length ? (
            <StartupLinksSection
              items={visibleStartup.map(({ item }) => ({ ...item }))}
              onEdit={isAccountHolder ? (visibleIndex) => {
                const mapped = visibleStartup[visibleIndex];
                if (mapped) setEditingStartup(mapped.index);
              } : undefined}
              onDelete={isAccountHolder ? (visibleIndex) => {
                const mapped = visibleStartup[visibleIndex];
                if (mapped) setToast({ type: "confirm-delete", message: "Delete this startup card?", action: "delete-startup", index: mapped.index });
              } : undefined}
            />
          ) : (
            <section className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
              <p className="text-sm text-zinc-600">All startup cards are deleted.</p>
              <button onClick={() => { const next = startupHidden.map(() => false); setStartupHidden(next); save(STARTUP_HIDDEN_KEY, next); setToast({ type: "success", message: "Startup links restored." }); }} className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">Restore Startup Links</button>
            </section>
          )}
        </EditableSectionBlock>

        <EditableSectionBlock sectionId="links-cta" label="Contact & CTA">
          <LinksCTA username={routeUsername} items={linksCta.map((item) => ({ ...item }))} />
        </EditableSectionBlock>
      </div>

      <AnimatePresence>
        {editingMain !== null ? (
          <MainLinkModal
            value={mainItems[editingMain]}
            onClose={() => setEditingMain(null)}
            onSave={(next) => {
              const copy = [...mainItems];
              copy[editingMain] = next;
              setMainItems(copy);
              save(MAIN_KEY, copy);
              setEditingMain(null);
            }}
          />
        ) : null}
        {editingStartup !== null ? (
          <StartupLinkModal
            value={startupItems[editingStartup]}
            onClose={() => setEditingStartup(null)}
            onSave={(next) => {
              const copy = [...startupItems];
              copy[editingStartup] = next;
              setStartupItems(copy);
              save(STARTUP_KEY, copy);
              setEditingStartup(null);
            }}
          />
        ) : null}
        {editingHero ? (
          <HeroModal
            value={hero}
            onClose={() => setEditingHero(false)}
            onSave={(next) => {
              setHero(next);
              save(HERO_KEY, next);
              setEditingHero(false);
            }}
          />
        ) : null}
      </AnimatePresence>
      {toast ? (
        <section className="fixed bottom-5 right-5 z-50">
          {toast.type === "success" ? (
            <div className="rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-700 shadow-lg">{toast.message}</div>
          ) : (
            <div className="w-[320px] rounded-2xl border border-zinc-200 bg-white p-4 shadow-lg">
              <p className="text-sm font-medium text-zinc-800">{toast.message}</p>
              <div className="mt-3 flex justify-end gap-2">
                <button onClick={() => setToast(null)} className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-600">Cancel</button>
                <button onClick={onConfirmDelete} className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700">Delete</button>
              </div>
            </div>
          )}
        </section>
      ) : null}
    </main>
  );
}

function MainLinkModal({
  value,
  onClose,
  onSave,
}: {
  value: PlatformLink;
  onClose: () => void;
  onSave: (next: PlatformLink) => void;
}) {
  const [draft, setDraft] = useState(value);
  return (
    <ModalShell title="Edit Link Card" onClose={onClose} onSave={() => onSave(draft)}>
      <Field label="Platform Name" value={draft.name} onChange={(v) => setDraft((p) => ({ ...p, name: v }))} />
      <Field label="Handle" value={draft.handle} onChange={(v) => setDraft((p) => ({ ...p, handle: v }))} />
      <Field label="Metric Text" value={draft.metric || ""} onChange={(v) => setDraft((p) => ({ ...p, metric: v }))} />
      <Field label="Platform URL" value={draft.url} onChange={(v) => setDraft((p) => ({ ...p, url: v }))} />
      <Field label="Logo URL" value={draft.logo || ""} onChange={(v) => setDraft((p) => ({ ...p, logo: v }))} />
      <div className="md:col-span-2">
        <label className="mb-1 block text-xs text-zinc-600">Description</label>
        <textarea value={draft.description} onChange={(e) => setDraft((p) => ({ ...p, description: e.target.value }))} className="min-h-24 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" />
      </div>
    </ModalShell>
  );
}

function StartupLinkModal({
  value,
  onClose,
  onSave,
}: {
  value: StartupLink;
  onClose: () => void;
  onSave: (next: StartupLink) => void;
}) {
  const [draft, setDraft] = useState(value);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const initials = draft.name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
  const onUploadLogo = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload an image file.");
      return;
    }
    setUploadError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setDraft((p) => ({ ...p, logo: result }));
    };
    reader.readAsDataURL(file);
  };
  return (
    <ModalShell title="Edit Startup Card" onClose={onClose} onSave={() => onSave(draft)}>
      <div className="md:col-span-2 flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-5">
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-zinc-100">
          {draft.logo ? (
            <img src={draft.logo} alt={`${draft.name} logo preview`} className="h-full w-full object-cover" />
          ) : initials ? (
            <span className="text-xl font-semibold text-zinc-700">{initials}</span>
          ) : (
            <User className="h-8 w-8 text-zinc-500" />
          )}
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100">
          <Camera className="h-4 w-4" />
          Upload Logo
          <input type="file" accept="image/*" className="hidden" onChange={(e) => onUploadLogo(e.target.files?.[0])} />
        </label>
        {uploadError ? <p className="text-xs font-medium text-rose-600">{uploadError}</p> : null}
      </div>
      <Field label="Logo URL" value={draft.logo || ""} onChange={(v) => setDraft((p) => ({ ...p, logo: v }))} />
      <Field label="Startup Name" value={draft.name} onChange={(v) => setDraft((p) => ({ ...p, name: v }))} />
      <Field label="Tagline" value={draft.tagline} onChange={(v) => setDraft((p) => ({ ...p, tagline: v }))} />
      <Field label="Category" value={draft.category} onChange={(v) => setDraft((p) => ({ ...p, category: v }))} />
      <Field label="URL" value={draft.url} onChange={(v) => setDraft((p) => ({ ...p, url: v }))} />
    </ModalShell>
  );
}

function HeroModal({
  value,
  onClose,
  onSave,
}: {
  value: HeroDraft;
  onClose: () => void;
  onSave: (next: HeroDraft) => void;
}) {
  const [draft, setDraft] = useState(value);
  return (
    <ModalShell title="Edit Profile Header" onClose={onClose} onSave={() => onSave(draft)}>
      <Field label="Name" value={draft.name} onChange={(v) => setDraft((p) => ({ ...p, name: v }))} />
      <Field label="Username" value={draft.username} onChange={(v) => setDraft((p) => ({ ...p, username: v }))} />
      <Field label="Headline" value={draft.headline} onChange={(v) => setDraft((p) => ({ ...p, headline: v }))} />
      <Field label="Avatar Text" value={draft.avatarText} onChange={(v) => setDraft((p) => ({ ...p, avatarText: v.slice(0, 3).toUpperCase() }))} />
      <div className="md:col-span-2">
        <label className="mb-1 block text-xs text-zinc-600">Statement</label>
        <textarea value={draft.statement} onChange={(e) => setDraft((p) => ({ ...p, statement: e.target.value }))} className="min-h-24 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" />
      </div>
    </ModalShell>
  );
}

function ModalShell({
  title,
  onClose,
  onSave,
  children,
}: {
  title: string;
  onClose: () => void;
  onSave: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4">
      <motion.div initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }} className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-zinc-900">{title}</h3>
          <button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5 text-zinc-700">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">{children}</div>
        <button onClick={onSave} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white">
          <Save className="h-4 w-4" />
          Save
        </button>
      </motion.div>
    </motion.div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label>
      <span className="mb-1 block text-xs text-zinc-600">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" />
    </label>
  );
}
