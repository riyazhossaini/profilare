import { AnimatePresence, motion } from "framer-motion";
import { Camera, Plus, Save, User, X } from "lucide-react";
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
  activeSectionKeys?: string[];
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
  const [addPageModalOpen, setAddPageModalOpen] = useState(false);

  if (!username || username !== activeUsername) {
    return <Navigate to={`/profile/${activeUsername}`} replace />;
  }

  const baseHeader: HeaderDraft = {
    fullName: accountDraft?.fullName || profileData.name,
    username: accountDraft?.username || profileData.username,
    headline: accountDraft?.profileTitle || "",
    bio: accountDraft?.bio || "",
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

  const defaultSectionKeys = useMemo(() => {
    const filtered = profileSections.filter((s) => (sectionKeysFromTemplate.size ? sectionKeysFromTemplate.has(s.key) : true));
    return filtered.map((s) => s.key);
  }, [sectionKeysFromTemplate]);

  const activeSectionKeys = edits.activeSectionKeys && edits.activeSectionKeys.length
    ? edits.activeSectionKeys
    : defaultSectionKeys;

  const sections = useMemo(() => {
    return profileSections
      .filter((s) => activeSectionKeys.includes(s.key))
      .map((section) => {
      const edit = edits.sections?.[section.key];
      if (!edit) return section;
      return {
        ...section,
        title: edit.title,
        description: edit.description,
      } satisfies ProfileSection;
      });
  }, [edits.sections, activeSectionKeys]);

  const addableKeys = ["identity", "skills", "education", "experience", "projects", "content", "contact"];
  const availablePages = profileSections.filter((s) => addableKeys.includes(s.key) && !activeSectionKeys.includes(s.key));

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
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setAddPageModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add New Page
          </button>
        </div>

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
            canRemove={addableKeys.includes(sectionModalKey) && activeSectionKeys.length > 1}
            onRemove={() => {
              if (!addableKeys.includes(sectionModalKey)) return;
              if (activeSectionKeys.length <= 1) return;
              const nextKeys = activeSectionKeys.filter((key) => key !== sectionModalKey);
              const nextEdits = { ...edits, activeSectionKeys: nextKeys };
              setEdits(nextEdits);
              saveEdits(nextEdits);
              setSectionModalKey(null);
            }}
          />
        ) : null}
        {addPageModalOpen ? (
          <AddPageModal
            options={availablePages}
            onClose={() => setAddPageModalOpen(false)}
            onSelect={(key) => {
              const nextKeys = Array.from(new Set([...activeSectionKeys, key]));
              const nextEdits = { ...edits, activeSectionKeys: nextKeys };
              setEdits(nextEdits);
              saveEdits(nextEdits);
              setAddPageModalOpen(false);
            }}
          />
        ) : null}
      </AnimatePresence>
    </main>
  );
}

function AddPageModal({
  options,
  onClose,
  onSelect,
}: {
  options: ProfileSection[];
  onClose: () => void;
  onSelect: (key: string) => void;
}) {
  return (
    <ModalShell onClose={onClose}>
      <h3 className="text-xl font-bold text-zinc-900">Add New Page</h3>
      <p className="mt-1 text-sm text-zinc-600">Choose a page to add to your profile hub.</p>
      <div className="mt-4 grid gap-2">
        {options.length ? options.map((item) => (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-left text-sm transition hover:border-violet-300 hover:bg-violet-50/40"
          >
            <p className="font-semibold text-zinc-900">{item.title}</p>
            <p className="mt-1 text-zinc-600">{item.description}</p>
          </button>
        )) : <p className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">No more pages available to add.</p>}
      </div>
    </ModalShell>
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
  const [uploadError, setUploadError] = useState<string | null>(null);

  const initials = draft.fullName
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

  const handlePhotoUpload = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload an image file.");
      return;
    }
    setUploadError(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setDraft((prev) => ({ ...prev, photoUrl: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <ModalShell onClose={onClose}>
      <h3 className="text-xl font-bold text-zinc-900">Edit Profile Header</h3>
      <div className="mt-4 flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-5">
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-zinc-100">
          {draft.photoUrl ? (
            <img src={draft.photoUrl} alt="Profile avatar preview" className="h-full w-full object-cover" />
          ) : initials ? (
            <span className="text-xl font-semibold text-zinc-700">{initials}</span>
          ) : (
            <User className="h-8 w-8 text-zinc-500" />
          )}
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100">
          <Camera className="h-4 w-4" />
          Upload Avatar
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handlePhotoUpload(e.target.files?.[0])}
          />
        </label>
        {uploadError ? <p className="text-xs text-rose-600">{uploadError}</p> : null}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Field label="Full Name" value={draft.fullName} onChange={(v) => setDraft((p) => ({ ...p, fullName: v }))} />
        <Field label="Username" value={draft.username} onChange={(v) => setDraft((p) => ({ ...p, username: v }))} />
        <Field label="Headline" value={draft.headline} onChange={(v) => setDraft((p) => ({ ...p, headline: v }))} />
        <Field label="Location" value={draft.location} onChange={(v) => setDraft((p) => ({ ...p, location: v }))} />
        <Field label="Profile Photo URL (optional)" value={draft.photoUrl} onChange={(v) => setDraft((p) => ({ ...p, photoUrl: v }))} />
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
  onRemove,
  canRemove,
}: {
  section: ProfileSection;
  onClose: () => void;
  onSave: (next: SectionDraft) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const [title, setTitle] = useState(section.title);
  const [description, setDescription] = useState(section.description.replace(" ->", ""));
  const [confirmingRemove, setConfirmingRemove] = useState(false);
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
      {canRemove ? (
        <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50/60 p-3">
          <p className="text-xs text-rose-700">Remove this page from your profile hub.</p>
          <button onClick={() => setConfirmingRemove(true)} className="mt-2 rounded-full border border-rose-300 bg-white px-3 py-1.5 text-xs font-semibold text-rose-700">Remove Page</button>
        </div>
      ) : (
        <p className="mt-4 text-xs text-zinc-500">This page cannot be removed from here.</p>
      )}
      <AnimatePresence>
        {confirmingRemove ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-4 left-1/2 z-[70] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl"
          >
            <p className="text-sm text-zinc-800">Do you want to remove this page from your profile?</p>
            <div className="mt-3 flex items-center gap-2">
              <button onClick={onRemove} className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">Confirm</button>
              <button onClick={() => setConfirmingRemove(false)} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Cancel</button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
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
