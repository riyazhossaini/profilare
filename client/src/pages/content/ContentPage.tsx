import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AudienceInteraction } from "../../components/content/AudienceInteraction";
import { ContentCurrentFocus, ContentCTA } from "../../components/content/ContentFooterSections";
import { ContentGrid } from "../../components/content/ContentGrid";
import { ContentHero } from "../../components/content/ContentHero";
import { ContentTopNav } from "../../components/content/ContentTopNav";
import { DraftIdeasSection } from "../../components/content/DraftIdeasSection";
import { FeaturedContent } from "../../components/content/FeaturedContent";
import { JournalSection } from "../../components/content/JournalSection";
import { MediaContentSection } from "../../components/content/MediaContentSection";
import { ThoughtsSection } from "../../components/content/ThoughtsSection";
import { WritingCategories } from "../../components/content/WritingCategories";
import { profileData } from "../../data/profile";
import {
  audience,
  contentCurrentFocus,
  contentItems,
  contentPhilosophy,
  draftIdeas,
  featuredContent,
  journalNotes,
  mediaContent,
  microThoughts,
  writingCategories,
} from "../../data/content";

export function ContentPage() {
  const { username } = useParams<{ username: string }>();
  const [search, setSearch] = useState("");

  if (!username || username !== profileData.username) return <Navigate to={`/profile/${profileData.username}`} replace />;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return contentItems.filter((item) => !q || item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q) || item.tags.join(" ").toLowerCase().includes(q));
  }, [search]);

  const stats = [
    { label: "Published", value: String(contentItems.length) },
    { label: "Writing Streak", value: "29 days" },
    { label: "Main Topics", value: "7" },
    { label: "Most Active", value: "Articles" },
    { label: "Reads", value: String(contentItems.reduce((a, b) => a + b.views, 0)) },
  ];

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <ContentTopNav username={profileData.username} name={profileData.name} search={search} onSearch={setSearch} />
        <ContentHero name={profileData.name} username={profileData.username} headline={profileData.headline} statement={contentPhilosophy} stats={stats} />
        <FeaturedContent username={profileData.username} items={featuredContent} />
        <ContentGrid username={profileData.username} items={filtered} />
        <WritingCategories items={writingCategories} />
        <ThoughtsSection username={profileData.username} items={microThoughts} />
        <JournalSection username={profileData.username} items={journalNotes} />
        <MediaContentSection items={mediaContent} />
        <DraftIdeasSection username={profileData.username} items={draftIdeas} />
        <AudienceInteraction data={audience} />
        <ContentCurrentFocus items={contentCurrentFocus} />
        <ContentCTA username={profileData.username} />
      </div>
    </main>
  );
}

