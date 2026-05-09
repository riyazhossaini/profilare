import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CoursesSection } from "../../components/education/CoursesSection";
import { EducationCTA } from "../../components/education/EducationCTA";
import { EducationHero } from "../../components/education/EducationHero";
import { EducationTimeline } from "../../components/education/EducationTimeline";
import { EducationTopNav } from "../../components/education/EducationTopNav";
import { FormalEducationSection } from "../../components/education/FormalEducationSection";
import { FutureLearningGoals } from "../../components/education/FutureLearningGoals";
import { LearningDashboard } from "../../components/education/LearningDashboard";
import { ReadingResources } from "../../components/education/ReadingResources";
import { SelfLearningSection } from "../../components/education/SelfLearningSection";
import { EditableSectionBlock } from "../../components/EditableSectionBlock";
import { profileData } from "../../data/profile";
import { coursesAndCerts, currentLearning, educationPhilosophy, educationTimeline, formalEducation, futureLearningGoals, resourcesSection, selfLearningTopics } from "../../data/education";

export function EducationPage() {
  const { username } = useParams<{ username: string }>();
  const [search, setSearch] = useState("");

  if (!username || username !== profileData.username) {
    return <Navigate to={`/profile/${profileData.username}`} replace />;
  }

  const filteredSelf = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return selfLearningTopics;
    return selfLearningTopics.filter((item) => item.topic.toLowerCase().includes(q) || item.why.toLowerCase().includes(q));
  }, [search]);

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <EducationTopNav username={profileData.username} name={profileData.name} search={search} onSearch={setSearch} />
        <EducationHero name={profileData.name} username={profileData.username} headline={profileData.headline} statement={educationPhilosophy} />

        <EditableSectionBlock sectionId="education-formal" label="Formal Education">
          <FormalEducationSection username={profileData.username} items={formalEducation} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="education-self-learning" label="Self Learning">
          <SelfLearningSection username={profileData.username} items={filteredSelf} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="education-courses" label="Courses & Certifications">
          <CoursesSection items={coursesAndCerts} />
        </EditableSectionBlock>

        <EditableSectionBlock sectionId="education-dashboard" label="Learning Dashboard">
          <LearningDashboard items={currentLearning} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="education-reading-resources" label="Reading Resources">
          <ReadingResources username={profileData.username} data={resourcesSection} />
        </EditableSectionBlock>

        <EditableSectionBlock sectionId="education-books-resources" label="Books & Resources">
          <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)]">
            <h2 className="text-2xl font-bold">Books & Resources</h2>
            <p className="mt-2 text-sm text-zinc-700">Open the complete curated resources list on a dedicated page.</p>
            <Link to={`/profile/${profileData.username}/education/resources`} className="mt-4 inline-flex rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">View Full Resources List</Link>
          </section>
        </EditableSectionBlock>

        <EditableSectionBlock sectionId="education-timeline" label="Education Timeline">
          <EducationTimeline items={educationTimeline} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="education-future-goals" label="Future Learning Goals">
          <FutureLearningGoals items={futureLearningGoals} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="education-cta" label="Next Step">
          <EducationCTA username={profileData.username} />
        </EditableSectionBlock>
      </div>
    </main>
  );
}
