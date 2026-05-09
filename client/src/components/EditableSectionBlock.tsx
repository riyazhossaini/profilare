import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Save, X } from "lucide-react";
import { useMemo, useState } from "react";

type EditableSectionBlockProps = {
  sectionId: string;
  label: string;
  children: React.ReactNode;
};

type SectionEditRecord = {
  title?: string;
  note?: string;
};

const STORAGE_KEY = "profilare:full-page-section-edits";

function readStore(): Record<string, SectionEditRecord> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, SectionEditRecord>;
  } catch {
    return {};
  }
}

function writeStore(data: Record<string, SectionEditRecord>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function EditableSectionBlock({ sectionId, label, children }: EditableSectionBlockProps) {
  const [open, setOpen] = useState(false);
  const [store, setStore] = useState<Record<string, SectionEditRecord>>(readStore);

  const current = store[sectionId] || {};
  const displayLabel = current.title?.trim() || label;

  const [draftTitle, setDraftTitle] = useState(displayLabel);
  const [draftNote, setDraftNote] = useState(current.note || "");

  const helperText = useMemo(() => current.note?.trim() || "", [current.note]);

  return (
    <section className="group relative">
      <button
        onClick={() => {
          setDraftTitle(displayLabel);
          setDraftNote(current.note || "");
          setOpen(true);
        }}
        className="absolute right-3 top-3 z-10 rounded-full border border-zinc-200 bg-white p-1.5 text-zinc-700 opacity-0 transition group-hover:opacity-100"
      >
        <Pencil className="h-3.5 w-3.5" />
      </button>

      {helperText ? <p className="mb-2 text-xs text-zinc-500">{helperText}</p> : null}

      {children}

      <AnimatePresence>
        {open ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4">
            <motion.div initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }} className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-zinc-900">Edit {label}</h3>
                <button onClick={() => setOpen(false)} className="rounded-full border border-zinc-200 bg-white p-1.5 text-zinc-700">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 grid gap-3">
                <label>
                  <span className="mb-1 block text-xs text-zinc-600">Section Title</span>
                  <input value={draftTitle} onChange={(e) => setDraftTitle(e.target.value)} className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" />
                </label>
                <label>
                  <span className="mb-1 block text-xs text-zinc-600">Section Note</span>
                  <textarea value={draftNote} onChange={(e) => setDraftNote(e.target.value)} className="min-h-20 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6C4DFF]/45" />
                </label>
              </div>
              <button
                onClick={() => {
                  const next = { ...store, [sectionId]: { title: draftTitle, note: draftNote } };
                  setStore(next);
                  writeStore(next);
                  setOpen(false);
                }}
                className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"
              >
                <Save className="h-4 w-4" />
                Save
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
