import { AnimatePresence, motion } from "framer-motion";
import { Save, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ProfileHeader } from "../components/ProfileHeader";
import { SectionGrid } from "../components/SectionGrid";
import { getAccountProfileDraft, getTemplateSections } from "../data/accountProfile";
import { profileData, profileSections, type ProfileSection } from "../data/profile";

type HeaderDraft = {
  fullName: string;
  username: string;
  headline: string;
  bio: string;
  location: string;
  photoUrl: string;
};

type SectionDraft = {
  title: string;
  description: string;
};

const PROFILE_EDIT_KEY = "profilare:profile-hub-edits";

type PersistedEdits = {
  header?: Partial<HeaderDraft>;
  sections?: Record<string, SectionDraft>;
};

function loadEdits(): PersistedEdits {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(PROFILE_EDIT_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as PersistedEdits;
  } catch {
    return {};
  }
}

function saveEdits(next: PersistedEdits) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROFILE_EDIT_KEY, JSON.stringify(next));
}

export function ProfileHubPage() {
  const { username } = useParams<{ username: string }>();
  const accountDraft = getAccountProfileDraft();
  const activeUsername = accountDraft?.username || profileData.username;

  const [edits, setEdits] = useState<PersistedEdits>(loadEdits);
  const [headerModalOpen, setHeaderModalOpen] = useState(false);
  const [sectionModalKey, setSectionModalKey] = useState<string | null>(null);

  if (!username || username !== activeUsername) {
    return <Navigate to={`/profile/${activeUsername}`} replace />;
  }

  const baseHeader: HeaderDraft = {
    fullName: accountDraft?.fullName || profileData.name,
    username: accountDraft?.username || profileData.username,
    headline: accountDraft?.profileTitle || profileData.headline,
    bio: accountDraft?.bio || "Add your story, focus, and goals.",
    location: accountDraft?.location || profileData.location || "",
    photoUrl: "",
  };

  const currentHeader: HeaderDraft = {
    ...baseHeader,
    ...edits.header,
  };

  const templateSections = getTemplateSections(accountDraft?.templateId || "");
  const sectionKeysFromTemplate = new Set(
    templateSections
      .map((s) => s.toLowerCase())
      .map((s) =>
        s === "identity"
          ? "identity"
          : s === "skills"
            ? "skills"
            : s === "education"
              ? "education"
              : s === "experience"
                ? "experience"
                : s === "projects"
                  ? "projects"
                  : s === "content"
                    ? "content"
                    : s === "links"
                      ? "links"
                      : s === "contact"
                        ? "contact"
                        : s === "mission"
                          ? "identity"
                          : "",
      )
      .filter(Boolean),
  );

  const sections = useMemo(() => {
    const filtered = profileSections.filter((s) => (sectionKeysFromTemplate.size ? sectionKeysFromTemplate.has(s.key) : true));
    return filtered.map((section) => {
      const edit = edits.sections?.[section.key];
      if (!edit) return section;
      return {
        ...section,
        title: edit.title,
        description: edit.description,
      } satisfies ProfileSection;
    });
  }, [edits.sections, sectionKeysFromTemplate]);

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <ProfileHeader
          name={currentHeader.fullName}
          username={currentHeader.username}
          headline={currentHeader.headline}
          location={currentHeader.location}
          bio={currentHeader.bio}
          photoUrl={currentHeader.photoUrl}
          onEdit={() => setHeaderModalOpen(true)}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-zinc-600 md:text-base"
        >
          A personal gateway into story, identity, work, growth, and social presence. Choose a section to open the full page.
        </motion.p>

        <SectionGrid username={activeUsername} sections={sections} onEditSection={(key) => setSectionModalKey(key)} />
      </div>

      <AnimatePresence>
        {headerModalOpen ? (
          <HeaderEditModal
            value={currentHeader}
            onClose={() => setHeaderModalOpen(false)}
            onSave={(next) => {
              const nextEdits = { ...edits, header: next };
              setEdits(nextEdits);
              saveEdits(nextEdits);
              setHeaderModalOpen(false);
            }}
          />
        ) : null}
        {sectionModalKey ? (
          <SectionEditModal
            section={sections.find((s) => s.key === sectionModalKey)!}
            onClose={() => setSectionModalKey(null)}
            onSave={(next) => {
              const nextEdits = {
                ...edits,
                sections: {
                  ...(edits.sections || {}),
                  [sectionModalKey]: next,
                },
              };
              setEdits(nextEdits);
              saveEdits(nextEdits);
              setSectionModalKey(null);
            }}
          />
        ) : null}
      </AnimatePresence>
    </main>
  );
}

function ModalShell({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4">
      <motion.div initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }} className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl">
        <button onClick={onClose} className="mb-3 rounded-full border border-zinc-200 bg-white p-1.5 text-zinc-700">
          <X className="h-4 w-4" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}

function HeaderEditModal({
  value,
  onClose,
  onSave,
}: {
  value: HeaderDraft;
  onClose: () => void;
  onSave: (next: HeaderDraft) => void;
}) {
  const [draft, setDraft] = useState<HeaderDraft>(value);
  return (
    <ModalShell onClose={onClose}>
      <h3 className="text-xl font-bold text-zinc-900">Edit Profile Header</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Field label="Full Name" value={draft.fullName} onChange={(v) => setDraft((p) => ({ ...p, fullName: v }))} />
        <Field label="Username" value={draft.username} onChange={(v) => setDraft((p) => ({ ...p, username: v }))} />
        <Field label="Headline" value={draft.headline} onChange={(v) => setDraft((p) => ({ ...p, headline: v }))} />
        <Field label="Location" value={draft.location} onChange={(v) => setDraft((p) => ({ ...p, location: v }))} />
        <Field label="Profile Photo URL" value={draft.photoUrl} onChange={(v) => setDraft((p) => ({ ...p, photoUrl: v }))} />
        <div className="md:col-span-2">
          <label className="mb-1 block text-xs text-zinc-600">Bio</label>
          <textarea value={draft.bio} onChange={(e) => setDraft((p) => ({ ...p, bio: e.target.value }))} className="min-h-24 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" />
        </div>
      </div>
      <button onClick={() => onSave(draft)} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white">
        <Save className="h-4 w-4" />
        Save
      </button>
    </ModalShell>
  );
}

function SectionEditModal({
  section,
  onClose,
  onSave,
}: {
  section: ProfileSection;
  onClose: () => void;
  onSave: (next: SectionDraft) => void;
}) {
  const [title, setTitle] = useState(section.title);
  const [description, setDescription] = useState(section.description.replace(" ->", ""));
  return (
    <ModalShell onClose={onClose}>
      <h3 className="text-xl font-bold text-zinc-900">Edit {section.title} Card</h3>
      <div className="mt-4 grid gap-3">
        <Field label="Card Title" value={title} onChange={setTitle} />
        <div>
          <label className="mb-1 block text-xs text-zinc-600">Card Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-24 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" />
        </div>
      </div>
      <button onClick={() => onSave({ title, description })} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white">
        <Save className="h-4 w-4" />
        Save
      </button>
    </ModalShell>
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
