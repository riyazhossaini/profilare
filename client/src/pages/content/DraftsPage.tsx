import { Navigate, useParams } from "react-router-dom";
import { ContentTopNav } from "../../components/content/ContentTopNav";
import { draftIdeas } from "../../data/content";
import { profileData } from "../../data/profile";

export function DraftsPage() {
  const { username } = useParams<{ username: string }>();
  if (!username || username !== profileData.username) return <Navigate to={`/profile/${profileData.username}`} replace />;

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <ContentTopNav username={profileData.username} name={profileData.name} search="" onSearch={() => undefined} />
        <section className="mt-5 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_54px_-34px_rgba(79,70,229,0.55)]">
          <h1 className="text-3xl font-extrabold text-zinc-900">Drafts & Future Ideas</h1>
          <p className="mt-2 text-zinc-700">A full list of upcoming writing concepts, future essays, and idea experiments in progress.</p>
        </section>
        <section className="mt-6 space-y-3">
          {draftIdeas.map((idea) => (
            <p key={idea} className="rounded-xl border border-violet-100 bg-white px-4 py-3 text-sm text-zinc-700 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
              {idea}
            </p>
          ))}
        </section>
      </div>
    </main>
  );
}
