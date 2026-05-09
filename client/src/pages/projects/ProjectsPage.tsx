import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { CollaborationSection } from "../../components/projects/CollaborationSection";
import { ExperimentalIdeasSection } from "../../components/projects/ExperimentalIdeasSection";
import { FeaturedProjects } from "../../components/projects/FeaturedProjects";
import { FutureVisionSection } from "../../components/projects/FutureVisionSection";
import { ProjectGrid } from "../../components/projects/ProjectGrid";
import { ProjectTimeline } from "../../components/projects/ProjectTimeline";
import { ProjectsCTA } from "../../components/projects/ProjectsCTA";
import { ProjectsCurrentFocus } from "../../components/projects/ProjectsCurrentFocus";
import { ProjectsHero } from "../../components/projects/ProjectsHero";
import { ProjectsTopNav } from "../../components/projects/ProjectsTopNav";
import { StartupProjectsSection } from "../../components/projects/StartupProjectsSection";
import { EditableSectionBlock } from "../../components/EditableSectionBlock";
import { profileData } from "../../data/profile";
import { collaboration, currentProjectFocus, experimentalIdeas, featuredProjects, futureVision, projectTimeline, projects, projectsPhilosophy, startupProjects } from "../../data/projects";

export function ProjectsPage() {
  const { username } = useParams<{ username: string }>();
  const [search, setSearch] = useState("");

  if (!username || username !== profileData.username) return <Navigate to={`/profile/${profileData.username}`} replace />;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter((p) => !q || p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [search]);

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <ProjectsTopNav username={profileData.username} name={profileData.name} search={search} onSearch={setSearch} />
        <ProjectsHero name={profileData.name} username={profileData.username} headline={profileData.headline} statement={projectsPhilosophy} />
        <EditableSectionBlock sectionId="projects-featured" label="Featured Projects">
          <FeaturedProjects username={profileData.username} items={featuredProjects} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="projects-grid" label="Project Grid">
          <ProjectGrid username={profileData.username} items={filtered} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="projects-startup" label="Startup Projects">
          <StartupProjectsSection username={profileData.username} items={startupProjects} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="projects-experimental" label="Experimental Ideas">
          <ExperimentalIdeasSection username={profileData.username} items={experimentalIdeas} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="projects-timeline" label="Project Timeline">
          <ProjectTimeline items={projectTimeline} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="projects-collaboration" label="Collaboration">
          <CollaborationSection data={collaboration} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="projects-current-focus" label="Current Focus">
          <ProjectsCurrentFocus items={currentProjectFocus} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="projects-future-vision" label="Future Vision">
          <FutureVisionSection data={futureVision} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="projects-cta" label="Next Step">
          <ProjectsCTA username={profileData.username} />
        </EditableSectionBlock>
      </div>
    </main>
  );
}
