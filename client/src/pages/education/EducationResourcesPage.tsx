import { Pencil, Save, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { EducationTopNav } from "../../components/education/EducationTopNav";
import { resourcesSection } from "../../data/education";
import { profileData } from "../../data/profile";

type ResourceGroup = { title: string; id: string; items: string[]; hidden?: boolean };
type ToastState =
  | { type: "success"; message: string }
  | { type: "confirm-delete"; message: string; action: "delete-group" | "delete-item" | "hide-hero"; id?: string; index?: number };

const GROUPS_KEY = "profilare:education-resources:groups";
const HERO_KEY = "profilare:education-resources:hero-visible";

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function EducationResourcesPage() {
  const { username } = useParams<{ username: string }>();
  const { hash } = useLocation();
  const initialGroups = useMemo<ResourceGroup[]>(
    () => [
      { title: "Books", id: "books", items: resourcesSection.books },
      { title: "Websites", id: "websites", items: resourcesSection.websites },
      { title: "YouTube Channels", id: "youtube", items: resourcesSection.youtube },
      { title: "Influential Thinkers", id: "thinkers", items: resourcesSection.thinkers },
      { title: "Podcasts", id: "podcasts", items: resourcesSection.podcasts },
    ],
    [],
  );

  const [groups, setGroups] = useState<ResourceGroup[]>(() => load<ResourceGroup[]>(GROUPS_KEY, initialGroups));
  const [heroVisible, setHeroVisible] = useState<boolean>(() => load<boolean>(HERO_KEY, true));
  const [toast, setToast] = useState<ToastState | null>(null);
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  if (!username || username !== profileData.username) return <Navigate to={`/profile/${profileData.username}`} replace />;

  const selectedId = hash.replace("#", "").trim();
  const visibleGroups = (selectedId ? groups.filter((group) => group.id === selectedId) : groups).filter((group) => !group.hidden);

  useEffect(() => {
    if (!toast || toast.type !== "success") return;
    const timer = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const persistGroups = (next: ResourceGroup[]) => {
    setGroups(next);
    save(GROUPS_KEY, next);
  };

  const onConfirmDelete = () => {
    if (!toast || toast.type !== "confirm-delete") return;
    if (toast.action === "hide-hero") {
      setHeroVisible(false);
      save(HERO_KEY, false);
      setToast({ type: "success", message: "Hero section hidden." });
      return;
    }
    if (!toast.id) return;
    if (toast.action === "delete-group") {
      persistGroups(groups.map((group) => (group.id === toast.id ? { ...group, hidden: true } : group)));
      setToast({ type: "success", message: "Group deleted." });
      return;
    }
    if (toast.action === "delete-item" && typeof toast.index === "number") {
      persistGroups(groups.map((group) => (group.id === toast.id ? { ...group, items: group.items.filter((_, i) => i !== toast.index) } : group)));
      setToast({ type: "success", message: "Item deleted." });
    }
  };

  const hiddenCount = groups.filter((group) => group.hidden).length;

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <EducationTopNav username={profileData.username} name={profileData.name} search="" onSearch={() => undefined} />
        {heroVisible ? (
          <section className="group relative mt-5 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_54px_-34px_rgba(79,70,229,0.55)]">
            <div className="absolute right-3 top-3">
              <button
                onClick={() => setToast({ type: "confirm-delete", message: "Hide resources hero section?", action: "hide-hero" })}
                className="rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <h1 className="text-3xl font-extrabold text-zinc-900">Full Learning Resources</h1>
            <p className="mt-2 text-zinc-700">A complete list of books, websites, channels, thinkers, and podcasts that shape my learning journey.</p>
          </section>
        ) : (
          <section className="mt-5 rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-6 text-center">
            <p className="text-sm text-zinc-600">Resources hero is hidden.</p>
            <button
              onClick={() => {
                setHeroVisible(true);
                save(HERO_KEY, true);
                setToast({ type: "success", message: "Hero section restored." });
              }}
              className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700"
            >
              Restore Hero
            </button>
          </section>
        )}

        {hiddenCount > 0 ? (
          <section className="mt-4 rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-4 text-center">
            <p className="text-sm text-zinc-600">{hiddenCount} resource group(s) deleted.</p>
            <button
              onClick={() => {
                const restored = groups.map((group) => ({ ...group, hidden: false }));
                persistGroups(restored);
                setToast({ type: "success", message: "All groups restored." });
              }}
              className="mt-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700"
            >
              Restore All Groups
            </button>
          </section>
        ) : null}

        <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleGroups.map((group) => (
            <article id={group.id} key={group.id} className="group relative rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
              <div className="absolute right-3 top-3 z-10 flex gap-2">
                <button
                  onClick={() => {
                    setEditingGroupId(group.id);
                    setDraft(group.items.join("\n"));
                  }}
                  className="rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setToast({ type: "confirm-delete", message: `Delete ${group.title} group?`, action: "delete-group", id: group.id })}
                  className="rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <h2 className="text-lg font-bold text-violet-700">{group.title}</h2>
              <div className="mt-3 space-y-2">
                {group.items.map((item, index) => (
                  <p key={`${group.id}-${item}-${index}`} className="group/item rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">
                    {item}
                    <button
                      onClick={() => setToast({ type: "confirm-delete", message: "Delete this item?", action: "delete-item", id: group.id, index })}
                      className="ml-2 hidden text-rose-600 group-hover/item:inline"
                    >
                      <Trash2 className="inline h-3 w-3" />
                    </button>
                  </p>
                ))}
              </div>
            </article>
          ))}
        </section>

        {editingGroupId ? (
          <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-6">
              <h3 className="text-lg font-bold text-zinc-900">Edit Group Items</h3>
              <p className="mt-1 text-sm text-zinc-600">One item per line.</p>
              <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={12} className="mt-4 w-full rounded-2xl border border-zinc-200 p-3 text-sm text-zinc-800 outline-none ring-violet-300 focus:ring-2" />
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setEditingGroupId(null)} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700"><X className="h-4 w-4" />Cancel</button>
                <button
                  onClick={() => {
                    const nextItems = draft.split("\n").map((v) => v.trim()).filter(Boolean);
                    persistGroups(groups.map((group) => (group.id === editingGroupId ? { ...group, items: nextItems } : group)));
                    setEditingGroupId(null);
                    setToast({ type: "success", message: "Group updated." });
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  <Save className="h-4 w-4" />
                  Save
                </button>
              </div>
            </div>
          </section>
        ) : null}

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
      </div>
    </main>
  );
}
