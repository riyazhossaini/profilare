import { AnimatePresence, motion } from "framer-motion";
import { Check, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { templateCategories, templates, type TemplateCategory } from "../data/templates";

function TemplatePreviewMockup({ sections }: { sections: string[] }) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-[0_22px_40px_-34px_rgba(45,33,94,0.4)]">
      <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-b from-[#6C4DFF] to-[#9a8aff]" />
      <div className="mx-auto mt-3 h-2.5 w-24 rounded bg-zinc-800/80" />
      <div className="mx-auto mt-2 h-2 w-16 rounded bg-zinc-400/70" />
      <div className="mt-4 grid grid-cols-2 gap-2">
        {sections.slice(0, 5).map((s) => (
          <div key={s} className="rounded-lg border border-zinc-100 bg-zinc-50 px-2.5 py-1.5 text-center text-[10px] font-semibold text-zinc-700">
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TemplatesPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<TemplateCategory>("All");
  const [selectedId, setSelectedId] = useState<string>("");
  const [previewId, setPreviewId] = useState<string>("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return templates.filter((t) => {
      const categoryOk = category === "All" || t.categories.includes(category);
      const queryOk = !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.sections.join(" ").toLowerCase().includes(q);
      return categoryOk && queryOk;
    });
  }, [category, query]);

  const previewTemplate = templates.find((t) => t.id === previewId);

  return (
    <main className="px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto w-full max-w-7xl">
        <header className="glass-card rounded-3xl p-6 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-5xl">Choose Your Template</h1>
            <Link to="/" className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700">
              Back
            </Link>
          </div>
          <p className="mt-2 text-zinc-600">Beautiful profile structures with premium clean aesthetics.</p>
          <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <label className="relative block w-full max-w-md">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search templates"
                className="w-full rounded-full border border-zinc-200 bg-white px-9 py-2.5 text-sm outline-none focus:border-[#6C4DFF]/50"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              {templateCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    category === c ? "bg-[#6C4DFF] text-white" : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((t) => {
            const selected = selectedId === t.id;
            return (
              <motion.article
                key={t.id}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`glass-card rounded-3xl p-5 transition ${
                  selected ? "ring-2 ring-[#6C4DFF]/35" : ""
                }`}
              >
                <TemplatePreviewMockup sections={t.sections} />
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900">{t.name}</h3>
                    <p className="mt-1 text-sm text-zinc-600">{t.description}</p>
                  </div>
                  {selected ? (
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#6C4DFF] text-white">
                      <Check className="h-4 w-4" />
                    </span>
                  ) : null}
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {t.sections.map((s) => (
                    <span key={`${t.id}-${s}`} className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11px] text-zinc-600">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => setPreviewId(t.id)} className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700">
                    Preview
                  </button>
                  <button
                    onClick={() => setSelectedId(t.id)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold ${
                      selected ? "bg-zinc-900 text-white" : "bg-[#6C4DFF] text-white"
                    }`}
                  >
                    {selected ? "Selected" : "Use Template"}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </section>

        <section className="mt-8 rounded-3xl glass-card p-6 text-center">
          <button
            disabled={!selectedId}
            onClick={() => {
              if (!selectedId) return;
              localStorage.setItem("profilare:selectedTemplate", selectedId);
              navigate(`/create-account?template=${selectedId}`);
            }}
            className={`rounded-full px-7 py-3 text-sm font-semibold transition ${
              selectedId ? "bg-[#6C4DFF] text-white hover:scale-[1.02]" : "cursor-not-allowed bg-zinc-200 text-zinc-500"
            }`}
          >
            Continue with selected template
          </button>
        </section>
      </div>

      <AnimatePresence>
        {previewTemplate ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} className="w-full max-w-3xl rounded-3xl bg-[#fbfafc] p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-zinc-900">{previewTemplate.name}</h3>
                  <p className="mt-1 text-sm text-zinc-600">{previewTemplate.description}</p>
                </div>
                <button onClick={() => setPreviewId("")} className="rounded-full border border-zinc-200 bg-white p-2 text-zinc-700">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-6 grid gap-6 md:grid-cols-[240px_1fr]">
                <TemplatePreviewMockup sections={previewTemplate.sections} />
                <div>
                  <p className="text-sm text-zinc-700">Included Sections</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {previewTemplate.sections.map((s) => (
                      <span key={`preview-${s}`} className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600">
                        {s}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedId(previewTemplate.id);
                      setPreviewId("");
                    }}
                    className="mt-6 rounded-full bg-[#6C4DFF] px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    Use This Template
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
