import { Navigate, useLocation, useParams } from "react-router-dom";
import { EducationTopNav } from "../../components/education/EducationTopNav";
import { resourcesSection } from "../../data/education";
import { profileData } from "../../data/profile";

export function EducationResourcesPage() {
  const { username } = useParams<{ username: string }>();
  const { hash } = useLocation();

  if (!username || username !== profileData.username) return <Navigate to={`/profile/${profileData.username}`} replace />;

  const groups = [
    { title: "Books", id: "books", items: resourcesSection.books },
    { title: "Websites", id: "websites", items: resourcesSection.websites },
    { title: "YouTube Channels", id: "youtube", items: resourcesSection.youtube },
    { title: "Influential Thinkers", id: "thinkers", items: resourcesSection.thinkers },
    { title: "Podcasts", id: "podcasts", items: resourcesSection.podcasts },
  ];

  const selectedId = hash.replace("#", "").trim();
  const visibleGroups = selectedId ? groups.filter((group) => group.id === selectedId) : groups;

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <EducationTopNav username={profileData.username} name={profileData.name} search="" onSearch={() => undefined} />
        <section className="mt-5 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_54px_-34px_rgba(79,70,229,0.55)]">
          <h1 className="text-3xl font-extrabold text-zinc-900">Full Learning Resources</h1>
          <p className="mt-2 text-zinc-700">A complete list of books, websites, channels, thinkers, and podcasts that shape my learning journey.</p>
        </section>
        <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleGroups.map((group) => (
            <article id={group.id} key={group.title} className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
              <h2 className="text-lg font-bold text-violet-700">{group.title}</h2>
              <div className="mt-3 space-y-2">{group.items.map((item) => <p key={item} className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">{item}</p>)}</div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
