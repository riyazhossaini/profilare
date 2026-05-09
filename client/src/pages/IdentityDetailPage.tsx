import { Navigate, useParams } from "react-router-dom";
import { AboutTopNav } from "../components/about/AboutTopNav";
import { profileData } from "../data/profile";
import { interestItems, roleItems, valueItems } from "../data/identity";

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
  const item = typedGroup.find((entry) => entry.slug === slug);

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
