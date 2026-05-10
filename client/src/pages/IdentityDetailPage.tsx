import { Navigate, useParams } from "react-router-dom";
import { AboutTopNav } from "../components/about/AboutTopNav";
import { interestItems, roleItems, valueItems } from "../data/identity";
import { profileData } from "../data/profile";

type RoleDetailPatch = {
  name?: string;
  short?: string;
  why?: string;
  start?: string;
  meaning?: string;
  build?: string;
  future?: string;
};
type InterestDetailPatch = {
  name?: string;
  short?: string;
  why?: string;
  start?: string;
  meaning?: string;
  build?: string;
  future?: string;
};
type ValueDetailPatch = {
  name?: string;
  short?: string;
  why?: string;
  start?: string;
  meaning?: string;
  build?: string;
  future?: string;
};

const IDENTITY_ROLE_DETAILS_KEY = "profilare:identity-role-detail-edits";
const IDENTITY_ROLE_HIDDEN_KEY = "profilare:identity-role-hidden";
const IDENTITY_INTEREST_DETAILS_KEY = "profilare:identity-interest-detail-edits";
const IDENTITY_INTEREST_HIDDEN_KEY = "profilare:identity-interest-hidden";
const IDENTITY_VALUE_DETAILS_KEY = "profilare:identity-value-detail-edits";
const IDENTITY_VALUE_HIDDEN_KEY = "profilare:identity-value-hidden";

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

const groups = {
  role: roleItems,
  interest: interestItems,
  value: valueItems,
} as const;

type GroupKey = keyof typeof groups;

export function IdentityDetailPage() {
  const { username, detailType, slug } = useParams<{ username: string; detailType: string; slug: string }>();

  if (!username || username !== profileData.username) {
    return <Navigate to={`/profile/${profileData.username}`} replace />;
  }

  if (!detailType || !(detailType in groups)) {
    return <Navigate to={`/profile/${profileData.username}/identity`} replace />;
  }

  const typedGroup = groups[detailType as GroupKey];
  const rolePatches = load<Record<string, RoleDetailPatch>>(IDENTITY_ROLE_DETAILS_KEY, {});
  const hiddenRoles = load<Record<string, boolean>>(IDENTITY_ROLE_HIDDEN_KEY, {});
  const interestPatches = load<Record<string, InterestDetailPatch>>(IDENTITY_INTEREST_DETAILS_KEY, {});
  const hiddenInterests = load<Record<string, boolean>>(IDENTITY_INTEREST_HIDDEN_KEY, {});
  const valuePatches = load<Record<string, ValueDetailPatch>>(IDENTITY_VALUE_DETAILS_KEY, {});
  const hiddenValues = load<Record<string, boolean>>(IDENTITY_VALUE_HIDDEN_KEY, {});
  const mappedGroup =
    detailType === "role"
      ? typedGroup
          .map((entry) => ({ ...entry, ...(rolePatches[entry.slug] || {}) }))
          .filter((entry) => !hiddenRoles[entry.slug])
      : detailType === "interest"
      ? typedGroup
          .map((entry) => ({ ...entry, ...(interestPatches[entry.slug] || {}) }))
          .filter((entry) => !hiddenInterests[entry.slug])
      : detailType === "value"
      ? typedGroup
          .map((entry) => ({ ...entry, ...(valuePatches[entry.slug] || {}) }))
          .filter((entry) => !hiddenValues[entry.slug])
      : typedGroup;

  const item = mappedGroup.find((entry) => entry.slug === slug);

  if (!item) {
    return <Navigate to={`/profile/${profileData.username}/identity`} replace />;
  }

  const Icon = item.icon;

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-4xl">
        <AboutTopNav username={profileData.username} name={profileData.name} />

        <section className="mt-5 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_54px_-34px_rgba(79,70,229,0.55)] md:p-8">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
            <Icon className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl">{item.name}</h1>
          <p className="mt-2 text-base text-zinc-600">{item.short}</p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-violet-100 bg-white p-4"><h2 className="text-sm font-bold uppercase tracking-wide text-violet-700">Why I chose this</h2><p className="mt-2 text-sm text-zinc-700 md:text-base">{item.why}</p></article>
            <article className="rounded-2xl border border-violet-100 bg-white p-4"><h2 className="text-sm font-bold uppercase tracking-wide text-violet-700">How I started</h2><p className="mt-2 text-sm text-zinc-700 md:text-base">{item.start}</p></article>
            <article className="rounded-2xl border border-violet-100 bg-white p-4"><h2 className="text-sm font-bold uppercase tracking-wide text-violet-700">What it means to me</h2><p className="mt-2 text-sm text-zinc-700 md:text-base">{item.meaning}</p></article>
            <article className="rounded-2xl border border-violet-100 bg-white p-4"><h2 className="text-sm font-bold uppercase tracking-wide text-violet-700">What I am building</h2><p className="mt-2 text-sm text-zinc-700 md:text-base">{item.build}</p></article>
          </div>

          <article className="mt-4 rounded-2xl border border-violet-200 bg-gradient-to-br from-white to-violet-50/60 p-4">
            <h2 className="text-sm font-bold uppercase tracking-wide text-violet-700">Future goal</h2>
            <p className="mt-2 text-sm text-zinc-700 md:text-base">{item.future}</p>
          </article>
        </section>
      </div>
    </main>
  );
}
