import { Navigate, useParams } from "react-router-dom";
import { AboutHero } from "../components/about/AboutHero";
import { AboutSummaryCard } from "../components/about/AboutSummaryCard";
import { AboutTopNav } from "../components/about/AboutTopNav";
import { CurrentFocus } from "../components/about/CurrentFocus";
import { PersonalFacts } from "../components/about/PersonalFacts";
import { BeliefCards } from "../components/identity/BeliefCards";
import { IdentityTimeline } from "../components/identity/IdentityTimeline";
import { InterestCards } from "../components/identity/InterestCards";
import { MissionCard } from "../components/identity/MissionCard";
import { PersonalityGrid } from "../components/identity/PersonalityGrid";
import { RelatedProfileLinks } from "../components/identity/RelatedProfileLinks";
import { RoleCards } from "../components/identity/RoleCards";
import { ValueCards } from "../components/identity/ValueCards";
import { VisionCard } from "../components/identity/VisionCard";
import { EditableSectionBlock } from "../components/EditableSectionBlock";
import { beliefItems, identityStatement, identityTimeline, interestItems, personalityTraits, roleItems, valueItems } from "../data/identity";
import { profileData } from "../data/profile";

export function IdentityPage() {
  const { username } = useParams<{ username: string }>();

  if (!username || username !== profileData.username) {
    return <Navigate to={`/profile/${profileData.username}`} replace />;
  }

  const summaryItems = [
    {
      label: "Who I am",
      text: "I am a curious builder who cares about meaningful work, thoughtful execution, and steady long-term growth.",
    },
    {
      label: "What I do",
      text: "I work across product, technology, and storytelling to turn ideas into practical digital experiences.",
    },
    {
      label: "What I'm learning",
      text: "I am deeply learning AI, product design, communication, and business so I can build with more clarity and depth.",
    },
    {
      label: "What I'm building",
      text: "I am building products and startup ideas focused on real-world usefulness, creator growth, and modern workflows.",
    },
    {
      label: "What I believe",
      text: "I believe consistent learning, clear thinking, and honest execution can create extraordinary outcomes over time.",
    },
  ];

  const focusItems = ["Learning AI", "Building startups", "Product design", "English writing", "Business thinking", "Self-growth"];

  const facts = [
    { label: "Location", value: "Kolkata, India" },
    { label: "Role", value: "Founder · Builder · AI Learner" },
    { label: "Interests", value: "AI, Startups, Design" },
    { label: "Favorite topics", value: "Product strategy, behavior, learning systems" },
    { label: "Working style", value: "Calm, focused, iterative, outcome-driven" },
    { label: "Goal", value: "Build products that create real personal and professional growth" },
  ];

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <AboutTopNav username={profileData.username} name={profileData.name} />
        <AboutHero
          name={profileData.name}
          username={profileData.username}
          headline={profileData.headline}
          location={profileData.location}
          statement={identityStatement}
        />
        <AboutSummaryCard items={summaryItems} />
        <CurrentFocus focusItems={focusItems} />
        <PersonalFacts facts={facts} />

        <section className="pt-2">
          <h2 className="mt-6 text-center text-2xl font-extrabold tracking-tight text-zinc-900 md:text-3xl">Identity Deep Dive</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-zinc-600 md:text-base">
            Roles, interests, values, and direction in one connected identity story.
          </p>
        </section>

        <EditableSectionBlock sectionId="identity-role-cards" label="Roles">
          <RoleCards routePrefix={`/profile/${profileData.username}/identity/role`} items={roleItems} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="identity-interest-cards" label="Interests">
          <InterestCards routePrefix={`/profile/${profileData.username}/identity/interest`} items={interestItems} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="identity-value-cards" label="Values">
          <ValueCards routePrefix={`/profile/${profileData.username}/identity/value`} items={valueItems} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="identity-personality" label="Personality">
          <PersonalityGrid traits={personalityTraits} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="identity-mission" label="Mission">
          <MissionCard
            mission="To learn deeply, build useful products, and become a stronger founder."
            doingNow="Building consistently while improving AI, communication, and product depth."
            whyMatters="Strong fundamentals now create larger impact later."
            nextMilestone="Ship a complete product case study with measurable user value."
          />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="identity-vision" label="Vision">
          <VisionCard
            vision="To build technology products that help people learn, work, create, and grow better."
            direction="Build identity-first, human-centered technology platforms."
            impact="Enable individuals to become more capable and confident through better tools."
            problems="Fragmented learning, unclear digital identity, and low-quality productivity systems."
            become="A founder-builder with deep character, clear thinking, and world-class execution."
          />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="identity-beliefs" label="Beliefs">
          <BeliefCards beliefs={beliefItems} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="identity-timeline" label="Timeline">
          <IdentityTimeline items={identityTimeline} />
        </EditableSectionBlock>
        <EditableSectionBlock sectionId="identity-related-links" label="Related Links">
          <RelatedProfileLinks username={profileData.username} />
        </EditableSectionBlock>
      </div>
    </main>
  );
}
