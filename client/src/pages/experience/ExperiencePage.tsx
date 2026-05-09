import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { CurrentFocusSection } from "../../components/experience/CurrentFocusSection";
import { ExperienceCardsSection } from "../../components/experience/ExperienceCardsSection";
import { ExperienceCTA } from "../../components/experience/ExperienceCTA";
import { ExperienceHero } from "../../components/experience/ExperienceHero";
import { ExperienceTimeline } from "../../components/experience/ExperienceTimeline";
import { ExperienceTopNav } from "../../components/experience/ExperienceTopNav";
import { PersonalProjectsSection } from "../../components/experience/PersonalProjectsSection";
import { StartupExperienceSection } from "../../components/experience/StartupExperienceSection";
import { EditableSectionBlock } from "../../components/EditableSectionBlock";
import { profileData } from "../../data/profile";
import {
  currentFocus,
  experienceItems,
  experiencePhilosophy,
  personalProjects,
  startupItems,
  timelineItems,
} from "../../data/experience";

export function ExperiencePage() {
  const { username } = useParams<{ username: string }>();
  const [search, setSearch] = useState("");

  if (!username || username !== profileData.username) return <Navigate to={`/profile/${profileData.username}`} replace />;

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return experienceItems.filter((item) => !q || item.role.toLowerCase().includes(q) || item.org.toLowerCase().includes(q) || item.short.toLowerCase().includes(q));
  }, [search]);

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <ExperienceTopNav username={profileData.username} name={profileData.name} search={search} onSearch={setSearch} />
        <ExperienceHero name={profileData.name} username={profileData.username} headline={profileData.headline} statement={experiencePhilosophy} />
        <EditableSectionBlock sectionId="experience-timeline" label="Experience Timeline">
          <ExperienceTimeline username={profileData.username} items={timelineItems} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="experience-cards" label="Experience Cards">
          <ExperienceCardsSection username={profileData.username} items={filteredItems} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="experience-startup" label="Startup Experience">
          <StartupExperienceSection username={profileData.username} items={startupItems} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="experience-personal-projects" label="Personal Projects">
          <PersonalProjectsSection username={profileData.username} items={personalProjects} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="experience-current-focus" label="Current Focus">
          <CurrentFocusSection items={currentFocus} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="experience-cta" label="Next Step">
          <ExperienceCTA username={profileData.username} />
        </EditableSectionBlock>
      </div>
    </main>
  );
}
