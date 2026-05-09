import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { CurrentLearningSection } from "../../components/skills/CurrentLearningSection";
import { SkillCategorySection } from "../../components/skills/SkillCategorySection";
import { SkillCTA } from "../../components/skills/SkillCTA";
import { SkillsAchievements } from "../../components/skills/SkillsAchievements";
import { SkillsHero } from "../../components/skills/SkillsHero";
import { SkillsTopNav } from "../../components/skills/SkillsTopNav";
import { EditableSectionBlock } from "../../components/EditableSectionBlock";
import { profileData } from "../../data/profile";
import { achievements, currentLearning, skillCategories, skillsPhilosophy } from "../../data/skills";

export function SkillsPage() {
  const { username } = useParams<{ username: string }>();
  const [search, setSearch] = useState("");

  if (!username || username !== profileData.username) {
    return <Navigate to={`/profile/${profileData.username}`} replace />;
  }

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return skillCategories;
    return skillCategories
      .map((category) => ({
        ...category,
        skills: category.skills.filter((skill) => skill.name.toLowerCase().includes(query) || skill.summary.toLowerCase().includes(query)),
      }))
      .filter((category) => category.skills.length > 0);
  }, [search]);

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <SkillsTopNav username={profileData.username} name={profileData.name} search={search} onSearch={setSearch} />

        <SkillsHero
          name={profileData.name}
          username={profileData.username}
          headline={profileData.headline}
          statement={skillsPhilosophy}
        />

        {filteredCategories.map((category) => (
          <EditableSectionBlock key={category.key} sectionId={`skills-category-${category.key}`} label={category.title}>
            <SkillCategorySection username={profileData.username} category={category} />
          </EditableSectionBlock>
        ))}

        <EditableSectionBlock sectionId="skills-achievements" label="Achievements">
          <SkillsAchievements items={achievements} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="skills-current-learning" label="Current Learning">
          <CurrentLearningSection items={currentLearning} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="skills-cta" label="Next Step">
          <SkillCTA username={profileData.username} />
        </EditableSectionBlock>
      </div>
    </main>
  );
}
