import { Brain, CheckCircle2, Compass, Lightbulb, Rocket, ShieldCheck } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";
import { AboutCTA } from "../components/about/AboutCTA";
import { AboutHero } from "../components/about/AboutHero";
import { AboutSummaryCard } from "../components/about/AboutSummaryCard";
import { AboutTopNav } from "../components/about/AboutTopNav";
import { CurrentFocus } from "../components/about/CurrentFocus";
import { MissionVisionCards } from "../components/about/MissionVisionCards";
import { PersonalFacts } from "../components/about/PersonalFacts";
import { StoryTimeline } from "../components/about/StoryTimeline";
import { ValuesGrid } from "../components/about/ValuesGrid";
import { BeliefCards } from "../components/identity/BeliefCards";
import { IdentityOverview } from "../components/identity/IdentityOverview";
import { IdentityTimeline } from "../components/identity/IdentityTimeline";
import { InterestCards } from "../components/identity/InterestCards";
import { MissionCard } from "../components/identity/MissionCard";
import { PersonalityGrid } from "../components/identity/PersonalityGrid";
import { RelatedProfileLinks } from "../components/identity/RelatedProfileLinks";
import { RoleCards } from "../components/identity/RoleCards";
import { ValueCards } from "../components/identity/ValueCards";
import { VisionCard } from "../components/identity/VisionCard";
import {
  beliefItems,
  identityOverview,
  identityTimeline,
  interestItems,
  personalityTraits,
  roleItems,
  valueItems,
} from "../data/identity";
import { profileData } from "../data/profile";

export function AboutPage() {
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
      label: "What I’m learning",
      text: "I am deeply learning AI, product design, communication, and business so I can build with more clarity and depth.",
    },
    {
      label: "What I’m building",
      text: "I am building products and startup ideas focused on real-world usefulness, creator growth, and modern workflows.",
    },
    {
      label: "What I believe",
      text: "I believe consistent learning, clear thinking, and honest execution can create extraordinary outcomes over time.",
    },
  ];

  const storyPoints = [
    {
      title: "Where I started",
      text: "I started by exploring different fields with one question: how can I build work that genuinely helps people?",
    },
    {
      title: "What changed my thinking",
      text: "Seeing how products can shape behavior made me shift from consuming ideas to creating useful systems.",
    },
    {
      title: "Why I started building",
      text: "Building gave me a way to combine learning with action, and to grow through real feedback from real users.",
    },
    {
      title: "What I’m working on now",
      text: "I am focused on AI-driven product ideas, startup execution, writing better, and becoming stronger at product decisions.",
    },
    {
      title: "Where I want to go next",
      text: "I want to become a dependable builder who creates impactful products that improve how people learn, work, and grow.",
    },
  ];

  const values = [
    { title: "Curiosity", description: "I ask better questions before jumping to solutions.", icon: Brain },
    { title: "Discipline", description: "I prioritize consistency over short bursts of motivation.", icon: CheckCircle2 },
    { title: "Creativity", description: "I look for original yet practical ways to solve problems.", icon: Lightbulb },
    { title: "Responsibility", description: "I take ownership of outcomes, not just effort.", icon: ShieldCheck },
    { title: "Long-term thinking", description: "I optimize for compounding growth and durable value.", icon: Compass },
    { title: "Execution", description: "I convert ideas into shipped work with clarity and speed.", icon: Rocket },
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
          statement="I’m learning technology, business, design, and communication to build useful products for the future."
        />
        <AboutSummaryCard items={summaryItems} />
        <StoryTimeline points={storyPoints} />
        <MissionVisionCards
          mission="To learn deeply, build useful products, and solve real-world problems through technology."
          vision="To become a strong builder who creates products that help people work, learn, and grow better."
        />
        <ValuesGrid values={values} />
        <CurrentFocus focusItems={focusItems} />
        <PersonalFacts facts={facts} />

        <section id="identity" className="pt-2">
          <h2 className="mt-6 text-center text-2xl font-extrabold tracking-tight text-zinc-900 md:text-3xl">Identity Deep Dive</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-zinc-600 md:text-base">
            Roles, interests, values, and direction in one connected identity story.
          </p>
        </section>
        <IdentityOverview items={identityOverview} />
        <RoleCards routePrefix={`/profile/${profileData.username}/identity/role`} items={roleItems} />
        <InterestCards routePrefix={`/profile/${profileData.username}/identity/interest`} items={interestItems} />
        <ValueCards routePrefix={`/profile/${profileData.username}/identity/value`} items={valueItems} />
        <PersonalityGrid traits={personalityTraits} />
        <MissionCard
          mission="To learn deeply, build useful products, and become a stronger founder."
          doingNow="Building consistently while improving AI, communication, and product depth."
          whyMatters="Strong fundamentals now create larger impact later."
          nextMilestone="Ship a complete product case study with measurable user value."
        />
        <VisionCard
          vision="To build technology products that help people learn, work, create, and grow better."
          direction="Build identity-first, human-centered technology platforms."
          impact="Enable individuals to become more capable and confident through better tools."
          problems="Fragmented learning, unclear digital identity, and low-quality productivity systems."
          become="A founder-builder with deep character, clear thinking, and world-class execution."
        />
        <BeliefCards beliefs={beliefItems} />
        <IdentityTimeline items={identityTimeline} />
        <RelatedProfileLinks username={profileData.username} />

        <AboutCTA username={profileData.username} />
      </div>
    </main>
  );
}
