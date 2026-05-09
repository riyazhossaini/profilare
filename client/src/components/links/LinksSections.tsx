import { motion } from "framer-motion";
import { ExternalLink, Pencil, Search } from "lucide-react";
import { type ComponentType } from "react";
import { Link } from "react-router-dom";
import { type LinkCategory, type PlatformLink } from "../../data/links";

export function LinksTopNav({
  username,
  name,
  search,
  onSearch,
  activeFilter,
  onFilter,
  filters,
  showFilters = true,
}: {
  username: string;
  name: string;
  search: string;
  onSearch: (v: string) => void;
  activeFilter: LinkCategory | "All";
  onFilter: (v: LinkCategory | "All") => void;
  filters: LinkCategory[];
  showFilters?: boolean;
}) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to={`/profile/${username}`} className="inline-flex rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-zinc-700">
          Back to profile
        </Link>
        <p className="text-sm font-semibold text-zinc-600">{name}</p>
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input value={search} onChange={(e) => onSearch(e.target.value)} placeholder="Search links" className="w-56 rounded-full border border-white/70 bg-white/90 py-2 pl-9 pr-3 text-sm outline-none" />
        </label>
      </div>
      {showFilters ? (
        <div className="flex flex-wrap gap-2">
          <button onClick={() => onFilter("All")} className={`rounded-full px-3 py-1 text-xs font-semibold ${activeFilter === "All" ? "bg-violet-600 text-white" : "border border-violet-200 bg-white text-violet-700"}`}>All</button>
          {filters.map((item) => (
            <button key={item} onClick={() => onFilter(item)} className={`rounded-full px-3 py-1 text-xs font-semibold ${activeFilter === item ? "bg-violet-600 text-white" : "border border-violet-200 bg-white text-violet-700"}`}>
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function LinksHero({
  name,
  username,
  headline,
  statement,
  stats,
  avatarText = "RH",
  onEdit,
}: {
  name: string;
  username: string;
  headline: string;
  statement: string;
  stats?: Array<{ label: string; value: string }>;
  avatarText?: string;
  onEdit?: () => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative mt-5 rounded-3xl border border-white/70 bg-white/75 p-6 text-center shadow-[0_28px_56px_-32px_rgba(79,70,229,0.55)] backdrop-blur md:p-8"
    >
      {onEdit ? (
        <button onClick={onEdit} className="absolute right-4 top-4 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 transition hover:bg-zinc-50">
          <Pencil className="h-4 w-4" />
        </button>
      ) : null}
      <div className="flex flex-col items-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 text-2xl font-bold text-white shadow-xl">
          {avatarText}
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl">{name}</h1>
        <p className="mt-1 text-base font-medium text-zinc-600">@{username}</p>
        <p className="mt-2 text-lg font-semibold text-zinc-800">{headline}</p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-700 md:text-lg">"{statement}"</p>
      </div>
      {stats && stats.length ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-violet-100 bg-white p-3">
              <p className="text-xs text-zinc-500">{item.label}</p>
              <p className="mt-1 text-lg font-bold text-zinc-900">{item.value}</p>
            </div>
          ))}
        </div>
      ) : null}
    </motion.section>
  );
}

export function LinksOverview({ categories, activePlatforms, focus }: { categories: string[]; activePlatforms: string[]; focus: string }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
      <h2 className="text-2xl font-bold">Links Overview</h2>
      <p className="mt-2 text-sm text-zinc-700">Digital focus: {focus}</p>
      <p className="mt-2 text-sm text-zinc-700">Categories: {categories.join(" • ")}</p>
      <p className="mt-2 text-sm text-zinc-700">Most active: {activePlatforms.join(" • ")}</p>
    </section>
  );
}

export function FeaturedLinks({ items }: { items: Array<{ title: string; platform: string; url: string; description: string; cta: string; category: string }> }) {
  return (
    <section className="mt-6">
      <h2 className="text-2xl font-bold">Featured Links</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="rounded-2xl border border-violet-100 bg-white p-4 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
            <p className="text-xs font-semibold text-violet-700">{item.platform}</p>
            <h3 className="mt-1 text-lg font-bold text-zinc-900">{item.title}</h3>
            <p className="mt-2 text-sm text-zinc-700">{item.description}</p>
            <p className="mt-2 text-xs text-zinc-500">{item.category}</p>
            <a href={item.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
              {item.cta}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export function LinkCard({ item, onEdit }: { item: PlatformLink; onEdit?: () => void }) {
  const Icon = item.icon;
  return (
    <article className="group rounded-3xl border border-violet-100/80 bg-gradient-to-br from-white via-white to-violet-50/70 p-5 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-30px_rgba(79,70,229,0.55)]">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-100 bg-white text-violet-700 shadow-sm">
          {item.logo ? (
            <img src={item.logo} alt={`${item.name} logo`} className="h-5 w-5 object-contain" />
          ) : Icon ? (
            <Icon className="h-5 w-5" />
          ) : (
            <span className="h-2 w-2 rounded-full bg-violet-600" />
          )}
        </span>
        {onEdit ? (
          <button
            onClick={onEdit}
            className="rounded-full border border-zinc-200 bg-white p-1.5 text-zinc-700 opacity-0 transition group-hover:opacity-100"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>
      <h3 className="mt-3 text-lg font-extrabold tracking-tight text-zinc-900">{item.name}</h3>
      <p className="mt-0.5 text-xs font-medium text-zinc-500">{item.handle}</p>
      <p className="mt-3 text-sm leading-relaxed text-zinc-700">{item.description}</p>
      {item.metric ? <p className="mt-3 text-xs font-medium text-zinc-500">{item.metric}</p> : null}
      <a href={item.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700 transition group-hover:bg-violet-50">
        Open Platform
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </article>
  );
}

export function LinksGrid({ items, onEdit }: { items: PlatformLink[]; onEdit?: (index: number) => void }) {
  return (
    <section className="mt-6">
      <h2 className="text-2xl font-bold">Main Links</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <LinkCard key={`${item.name}-${item.handle}-${index}`} item={item} onEdit={onEdit ? () => onEdit(index) : undefined} />
        ))}
      </div>
    </section>
  );
}

function SimpleLinkSection({ title, items }: { title: string; items: Array<{ name: string; detail?: string; stat?: string; url: string }> }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.name} className="rounded-xl border border-violet-100 bg-white p-4">
            <h3 className="font-semibold text-zinc-900">{item.name}</h3>
            {item.detail ? <p className="mt-1 text-sm text-zinc-700">{item.detail}</p> : null}
            {item.stat ? <p className="mt-1 text-xs text-zinc-500">{item.stat}</p> : null}
            <a href={item.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-sm font-semibold text-violet-700">Open</a>
          </article>
        ))}
      </div>
    </section>
  );
}

export const SocialSection = ({ items }: { items: PlatformLink[] }) => <LinksGrid items={items} />;
export const DeveloperPlatformsSection = ({ items }: { items: PlatformLink[] }) => <SimpleLinkSection title="Developer & Builder Platforms" items={items.map((i) => ({ name: i.name, detail: i.description, stat: i.metric, url: i.url }))} />;
export const WritingPlatformsSection = ({ items }: { items: Array<{ name: string; detail: string; stat: string; url?: string }> }) => <SimpleLinkSection title="Writing & Content Platforms" items={items.map((i) => ({ ...i, url: i.url || "https://example.com" }))} />;

export function StartupLinksSection({
  items,
  onEdit,
}: {
  items: Array<{ name: string; tagline: string; stage: string; category: string; url: string; icon?: ComponentType<{ className?: string }> }>;
  onEdit?: (index: number) => void;
}) {
  return (
    <section className="mt-8 rounded-3xl border border-violet-100/80 bg-gradient-to-br from-white via-violet-50/40 to-indigo-50/40 p-6 shadow-[0_24px_54px_-34px_rgba(79,70,229,0.55)]">
      <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900">Startup & Product Links</h2>
      <p className="mt-1 text-sm text-zinc-600">Core ventures, active ideas, and future-facing product concepts.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <article
              key={item.name}
              className={`group rounded-2xl border bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-30px_rgba(79,70,229,0.55)] ${
                index === 0 ? "border-violet-300 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.5)]" : "border-violet-100"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-indigo-50 text-violet-700">
                  {Icon ? <Icon className="h-5 w-5" /> : <span className="h-2 w-2 rounded-full bg-violet-600" />}
                </span>
                {onEdit ? (
                  <button onClick={() => onEdit(index)} className="rounded-full border border-zinc-200 bg-white p-1.5 text-zinc-700 opacity-0 transition group-hover:opacity-100">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                ) : null}
              </div>
              <h3 className="mt-3 text-lg font-extrabold tracking-tight text-zinc-900">{item.name}</h3>
              <p className="mt-1 text-sm text-zinc-700">{item.tagline}</p>
              <p className="mt-2 text-xs font-medium text-zinc-500">{item.category}</p>
              <a href={item.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700 transition group-hover:bg-violet-50">
                Explore Startup Journey
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export const CommunitySection = ({ items }: { items: Array<{ name: string; description: string; url: string }> }) => <SimpleLinkSection title="Community & Network" items={items.map((i) => ({ name: i.name, detail: i.description, url: i.url }))} />;
export const IdentityLinksSection = ({ items }: { items: Array<{ label: string; url: string }> }) => <SimpleLinkSection title="Personal Identity Links" items={items.map((i) => ({ name: i.label, url: i.url }))} />;

export function ContactSection({ items, status }: { items: Array<{ label: string; value: string; url: string }>; status: string }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6">
      <h2 className="text-2xl font-bold">Contact & Communication</h2>
      <p className="mt-2 text-sm text-zinc-700">{status}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <a key={item.label} href={item.url} className="rounded-xl border border-violet-100 bg-white p-4">
            <p className="text-xs text-zinc-500">{item.label}</p>
            <p className="font-semibold text-zinc-900">{item.value}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

export function AnalyticsDashboard({ items }: { items: Array<{ label: string; value: string }> }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6">
      <h2 className="text-2xl font-bold">Digital Presence Analytics</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item) => (
          <div key={item.label} className="rounded-xl border border-violet-100 bg-white p-3">
            <p className="text-xs text-zinc-500">{item.label}</p>
            <p className="mt-1 text-base font-bold text-zinc-900">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DigitalPhilosophy({ text }: { text: string }) {
  return (
    <section className="mt-6 rounded-3xl border border-violet-200 bg-gradient-to-br from-white to-violet-50/70 p-6">
      <h2 className="text-2xl font-bold">Online Identity Philosophy</h2>
      <p className="mt-3 text-sm leading-relaxed text-zinc-700">{text}</p>
    </section>
  );
}

export function PlatformVisualization({ items }: { items: Array<{ source: string; targets: string[] }> }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6">
      <h2 className="text-2xl font-bold">Platform Relationships</h2>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.source} className="rounded-xl border border-violet-100 bg-white p-3">
            <p className="font-semibold text-zinc-900">{item.source}</p>
            <p className="mt-1 text-sm text-zinc-700">{item.targets.join(" -> ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export const CurrentFocusSection = ({ items }: { items: string[] }) => <SimpleLinkSection title="Current Online Focus" items={items.map((i) => ({ name: i, url: "https://example.com" }))} />;
export const FutureVisionSection = ({ items }: { items: string[] }) => <SimpleLinkSection title="Future Digital Vision" items={items.map((i) => ({ name: i, url: "https://example.com" }))} />;

export function LinksCTA({ username, items }: { username: string; items: Array<{ label: string; to: string }> }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 text-center">
      <h2 className="text-2xl font-bold">Continue Exploring</h2>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        {items.map((item) => (
          <Link key={item.to} to={`/profile/${username}/${item.to}`} className="rounded-full border border-violet-200 bg-white px-5 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50">
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
