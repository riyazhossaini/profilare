import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Save, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AboutHero } from "../components/about/AboutHero";
import { AboutSummaryCard } from "../components/about/AboutSummaryCard";
import { AboutTopNav } from "../components/about/AboutTopNav";
import { CurrentFocus } from "../components/about/CurrentFocus";
import { PersonalFacts } from "../components/about/PersonalFacts";
import { EditableSectionBlock } from "../components/EditableSectionBlock";
import { BeliefCards } from "../components/identity/BeliefCards";
import { IdentityTimeline } from "../components/identity/IdentityTimeline";
import { InterestCards } from "../components/identity/InterestCards";
import { MissionCard } from "../components/identity/MissionCard";
import { PersonalityGrid } from "../components/identity/PersonalityGrid";
import { RelatedProfileLinks } from "../components/identity/RelatedProfileLinks";
import { RoleCards } from "../components/identity/RoleCards";
import { ValueCards } from "../components/identity/ValueCards";
import { VisionCard } from "../components/identity/VisionCard";
import { beliefItems, identityStatement, identityTimeline, interestItems, personalityTraits, roleItems, valueItems, type IdentityDetailItem } from "../data/identity";
import { profileData } from "../data/profile";
import { getGlobalProfileAvatarUrl } from "../lib/profileAvatar";

type IdentityPatch = { name?: string; short?: string };
type RoleDetailPatch = {
  name?: string;
  short?: string;
  why?: string;
  start?: string;
  meaning?: string;
  build?: string;
  future?: string;
};
type InterestDetailPatch = {
  name?: string;
  short?: string;
  why?: string;
  start?: string;
  meaning?: string;
  build?: string;
  future?: string;
};
type ValueDetailPatch = {
  name?: string;
  short?: string;
  why?: string;
  start?: string;
  meaning?: string;
  build?: string;
  future?: string;
};
type HeroDraft = { name: string; username: string; headline: string; location: string; statement: string; avatarText: string };
type SummaryItemDraft = { label: string; text: string; hidden?: boolean };
type PersonalFactDraft = { label: string; value: string; hidden?: boolean };
type PersonalityTraitDraft = { name: string; text: string; level: number; hidden?: boolean };
type MissionDraft = { mission: string; doingNow: string; whyMatters: string; nextMilestone: string };
type VisionDraft = { vision: string; direction: string; impact: string; problems: string; become: string };
type BeliefDraft = { text: string; hidden?: boolean };
type TimelineDraft = { text: string; hidden?: boolean };

type ToastState =
  | { type: "confirm-delete"; message: string; action: "hide-hero" | "hide-summary-section" | "delete-summary" | "hide-current-focus-section" | "delete-current-focus" | "hide-personal-facts-section" | "delete-personal-fact" | "hide-roles-section" | "delete-role" | "hide-interests-section" | "delete-interest" | "hide-values-section" | "delete-value" | "hide-personality-section" | "delete-personality-trait" | "hide-mission-section" | "hide-vision-section" | "hide-beliefs-section" | "delete-belief" | "hide-timeline-section" | "delete-timeline"; index?: number; slug?: string }
  | { type: "success"; message: string }
  | null;

const IDENTITY_KEY = "profilare:identity-card-edits";
const IDENTITY_HERO_KEY = "profilare:identity-hero-edits";
const IDENTITY_HERO_VISIBLE_KEY = "profilare:identity-hero-visible";
const IDENTITY_SUMMARY_KEY = "profilare:identity-summary-edits";
const IDENTITY_SUMMARY_VISIBLE_KEY = "profilare:identity-summary-visible";
const IDENTITY_CURRENT_FOCUS_KEY = "profilare:identity-current-focus-edits";
const IDENTITY_CURRENT_FOCUS_VISIBLE_KEY = "profilare:identity-current-focus-visible";
const IDENTITY_PERSONAL_FACTS_KEY = "profilare:identity-personal-facts-edits";
const IDENTITY_PERSONAL_FACTS_VISIBLE_KEY = "profilare:identity-personal-facts-visible";
const IDENTITY_ROLE_DETAILS_KEY = "profilare:identity-role-detail-edits";
const IDENTITY_ROLE_HIDDEN_KEY = "profilare:identity-role-hidden";
const IDENTITY_ROLE_SECTION_VISIBLE_KEY = "profilare:identity-role-section-visible";
const IDENTITY_INTEREST_DETAILS_KEY = "profilare:identity-interest-detail-edits";
const IDENTITY_INTEREST_HIDDEN_KEY = "profilare:identity-interest-hidden";
const IDENTITY_INTEREST_SECTION_VISIBLE_KEY = "profilare:identity-interest-section-visible";
const IDENTITY_VALUE_DETAILS_KEY = "profilare:identity-value-detail-edits";
const IDENTITY_VALUE_HIDDEN_KEY = "profilare:identity-value-hidden";
const IDENTITY_VALUE_SECTION_VISIBLE_KEY = "profilare:identity-value-section-visible";
const IDENTITY_PERSONALITY_KEY = "profilare:identity-personality-edits";
const IDENTITY_PERSONALITY_VISIBLE_KEY = "profilare:identity-personality-visible";
const IDENTITY_MISSION_KEY = "profilare:identity-mission-edits";
const IDENTITY_MISSION_VISIBLE_KEY = "profilare:identity-mission-visible";
const IDENTITY_VISION_KEY = "profilare:identity-vision-edits";
const IDENTITY_VISION_VISIBLE_KEY = "profilare:identity-vision-visible";
const IDENTITY_BELIEFS_KEY = "profilare:identity-beliefs-edits";
const IDENTITY_BELIEFS_VISIBLE_KEY = "profilare:identity-beliefs-visible";
const IDENTITY_TIMELINE_KEY = "profilare:identity-timeline-edits";
const IDENTITY_TIMELINE_VISIBLE_KEY = "profilare:identity-timeline-visible";

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function IdentityPage() {
  const { username } = useParams<{ username: string }>();
  const [patches, setPatches] = useState<Record<string, IdentityPatch>>(() => load(IDENTITY_KEY, {}));
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editingRoleSlug, setEditingRoleSlug] = useState<string | null>(null);
  const [editingInterestSlug, setEditingInterestSlug] = useState<string | null>(null);
  const [editingValueSlug, setEditingValueSlug] = useState<string | null>(null);
  const [editingHero, setEditingHero] = useState(false);
  const [editingSummaryIndex, setEditingSummaryIndex] = useState<number | null>(null);
  const [toast, setToast] = useState<ToastState>(null);

  const heroDefault: HeroDraft = {
    name: profileData.name,
    username: profileData.username,
    headline: profileData.headline,
    location: profileData.location,
    statement: identityStatement,
    avatarText: profileData.name
      .split(" ")
      .map((p) => p[0]?.toUpperCase() || "")
      .slice(0, 2)
      .join(""),
  };

  const summaryDefault: SummaryItemDraft[] = [
    { label: "Who I am", text: "I am a curious builder who cares about meaningful work, thoughtful execution, and steady long-term growth." },
    { label: "What I do", text: "I work across product, technology, and storytelling to turn ideas into practical digital experiences." },
    { label: "What I'm learning", text: "I am deeply learning AI, product design, communication, and business so I can build with more clarity and depth." },
    { label: "What I'm building", text: "I am building products and startup ideas focused on real-world usefulness, creator growth, and modern workflows." },
    { label: "What I believe", text: "I believe consistent learning, clear thinking, and honest execution can create extraordinary outcomes over time." },
  ];

  const [hero, setHero] = useState<HeroDraft>(() => load(IDENTITY_HERO_KEY, heroDefault));
  const [heroVisible, setHeroVisible] = useState<boolean>(() => load(IDENTITY_HERO_VISIBLE_KEY, true));
  const [summaryItems, setSummaryItems] = useState<SummaryItemDraft[]>(() => load(IDENTITY_SUMMARY_KEY, summaryDefault));
  const [summaryVisible, setSummaryVisible] = useState<boolean>(() => load(IDENTITY_SUMMARY_VISIBLE_KEY, true));
  const [currentFocusItems, setCurrentFocusItems] = useState<string[]>(() =>
    load(IDENTITY_CURRENT_FOCUS_KEY, ["Learning AI", "Building startups", "Product design", "English writing", "Business thinking", "Self-growth"]),
  );
  const [currentFocusVisible, setCurrentFocusVisible] = useState<boolean>(() => load(IDENTITY_CURRENT_FOCUS_VISIBLE_KEY, true));
  const [editingCurrentFocusIndex, setEditingCurrentFocusIndex] = useState<number | null>(null);
  const [personalFactsItems, setPersonalFactsItems] = useState<PersonalFactDraft[]>(() =>
    load(IDENTITY_PERSONAL_FACTS_KEY, [
      { label: "Location", value: "Kolkata, India" },
      { label: "Role", value: "Founder · Builder · AI Learner" },
      { label: "Interests", value: "AI, Startups, Design" },
      { label: "Favorite topics", value: "Product strategy, behavior, learning systems" },
      { label: "Working style", value: "Calm, focused, iterative, outcome-driven" },
      { label: "Goal", value: "Build products that create real personal and professional growth" },
    ]),
  );
  const [personalFactsVisible, setPersonalFactsVisible] = useState<boolean>(() => load(IDENTITY_PERSONAL_FACTS_VISIBLE_KEY, true));
  const [editingPersonalFactIndex, setEditingPersonalFactIndex] = useState<number | null>(null);
  const [roleDetailPatches, setRoleDetailPatches] = useState<Record<string, RoleDetailPatch>>(() => load(IDENTITY_ROLE_DETAILS_KEY, {}));
  const [hiddenRoles, setHiddenRoles] = useState<Record<string, boolean>>(() => load(IDENTITY_ROLE_HIDDEN_KEY, {}));
  const [roleSectionVisible, setRoleSectionVisible] = useState<boolean>(() => load(IDENTITY_ROLE_SECTION_VISIBLE_KEY, true));
  const [interestDetailPatches, setInterestDetailPatches] = useState<Record<string, InterestDetailPatch>>(() => load(IDENTITY_INTEREST_DETAILS_KEY, {}));
  const [hiddenInterests, setHiddenInterests] = useState<Record<string, boolean>>(() => load(IDENTITY_INTEREST_HIDDEN_KEY, {}));
  const [interestSectionVisible, setInterestSectionVisible] = useState<boolean>(() => load(IDENTITY_INTEREST_SECTION_VISIBLE_KEY, true));
  const [valueDetailPatches, setValueDetailPatches] = useState<Record<string, ValueDetailPatch>>(() => load(IDENTITY_VALUE_DETAILS_KEY, {}));
  const [hiddenValues, setHiddenValues] = useState<Record<string, boolean>>(() => load(IDENTITY_VALUE_HIDDEN_KEY, {}));
  const [valueSectionVisible, setValueSectionVisible] = useState<boolean>(() => load(IDENTITY_VALUE_SECTION_VISIBLE_KEY, true));
  const [personalityItems, setPersonalityItems] = useState<PersonalityTraitDraft[]>(() => load(IDENTITY_PERSONALITY_KEY, personalityTraits));
  const [personalityVisible, setPersonalityVisible] = useState<boolean>(() => load(IDENTITY_PERSONALITY_VISIBLE_KEY, true));
  const [editingPersonalityIndex, setEditingPersonalityIndex] = useState<number | null>(null);
  const [missionVisible, setMissionVisible] = useState<boolean>(() => load(IDENTITY_MISSION_VISIBLE_KEY, true));
  const [editingMission, setEditingMission] = useState(false);
  const [missionData, setMissionData] = useState<MissionDraft>(() =>
    load(IDENTITY_MISSION_KEY, {
      mission: "To learn deeply, build useful products, and become a stronger founder.",
      doingNow: "Building consistently while improving AI, communication, and product depth.",
      whyMatters: "Strong fundamentals now create larger impact later.",
      nextMilestone: "Ship a complete product case study with measurable user value.",
    }),
  );
  const [visionVisible, setVisionVisible] = useState<boolean>(() => load(IDENTITY_VISION_VISIBLE_KEY, true));
  const [editingVision, setEditingVision] = useState(false);
  const [visionData, setVisionData] = useState<VisionDraft>(() =>
    load(IDENTITY_VISION_KEY, {
      vision: "To build technology products that help people learn, work, create, and grow better.",
      direction: "Build identity-first, human-centered technology platforms.",
      impact: "Enable individuals to become more capable and confident through better tools.",
      problems: "Fragmented learning, unclear digital identity, and low-quality productivity systems.",
      become: "A founder-builder with deep character, clear thinking, and world-class execution.",
    }),
  );
  const [beliefItemsState, setBeliefItemsState] = useState<BeliefDraft[]>(() => load(IDENTITY_BELIEFS_KEY, beliefItems.map((b) => ({ text: b }))));
  const [beliefsVisible, setBeliefsVisible] = useState<boolean>(() => load(IDENTITY_BELIEFS_VISIBLE_KEY, true));
  const [editingBeliefIndex, setEditingBeliefIndex] = useState<number | null>(null);
  const [timelineItemsState, setTimelineItemsState] = useState<TimelineDraft[]>(() => load(IDENTITY_TIMELINE_KEY, identityTimeline.map((t) => ({ text: t }))));
  const [timelineVisible, setTimelineVisible] = useState<boolean>(() => load(IDENTITY_TIMELINE_VISIBLE_KEY, true));
  const [editingTimelineIndex, setEditingTimelineIndex] = useState<number | null>(null);

  if (!username || username !== profileData.username) {
    return <Navigate to={`/profile/${profileData.username}`} replace />;
  }

  const apply = (items: IdentityDetailItem[]) =>
    items.map((i) => ({ ...i, name: patches[i.slug]?.name ?? i.name, short: patches[i.slug]?.short ?? i.short }));
  const roles = useMemo(
    () =>
      roleItems
        .map((item) => {
          const detailPatch = roleDetailPatches[item.slug] || {};
          return {
            ...item,
            name: detailPatch.name ?? patches[item.slug]?.name ?? item.name,
            short: detailPatch.short ?? patches[item.slug]?.short ?? item.short,
            why: detailPatch.why ?? item.why,
            start: detailPatch.start ?? item.start,
            meaning: detailPatch.meaning ?? item.meaning,
            build: detailPatch.build ?? item.build,
            future: detailPatch.future ?? item.future,
          };
        })
        .filter((item) => !hiddenRoles[item.slug]),
    [patches, roleDetailPatches, hiddenRoles],
  );
  const interests = useMemo(
    () =>
      interestItems
        .map((item) => {
          const detailPatch = interestDetailPatches[item.slug] || {};
          return {
            ...item,
            name: detailPatch.name ?? patches[item.slug]?.name ?? item.name,
            short: detailPatch.short ?? patches[item.slug]?.short ?? item.short,
            why: detailPatch.why ?? item.why,
            start: detailPatch.start ?? item.start,
            meaning: detailPatch.meaning ?? item.meaning,
            build: detailPatch.build ?? item.build,
            future: detailPatch.future ?? item.future,
          };
        })
        .filter((item) => !hiddenInterests[item.slug]),
    [patches, interestDetailPatches, hiddenInterests],
  );
  const values = useMemo(
    () =>
      valueItems
        .map((item) => {
          const detailPatch = valueDetailPatches[item.slug] || {};
          return {
            ...item,
            name: detailPatch.name ?? patches[item.slug]?.name ?? item.name,
            short: detailPatch.short ?? patches[item.slug]?.short ?? item.short,
            why: detailPatch.why ?? item.why,
            start: detailPatch.start ?? item.start,
            meaning: detailPatch.meaning ?? item.meaning,
            build: detailPatch.build ?? item.build,
            future: detailPatch.future ?? item.future,
          };
        })
        .filter((item) => !hiddenValues[item.slug]),
    [patches, valueDetailPatches, hiddenValues],
  );
  const editingItem = [...roles, ...interests, ...values].find((i) => i.slug === editingSlug) || null;
  const editingRoleItem = editingRoleSlug ? roleItems.map((item) => ({ ...item, ...(roleDetailPatches[item.slug] || {}) })).find((i) => i.slug === editingRoleSlug) || null : null;
  const editingInterestItem = editingInterestSlug ? interestItems.map((item) => ({ ...item, ...(interestDetailPatches[item.slug] || {}) })).find((i) => i.slug === editingInterestSlug) || null : null;
  const editingValueItem = editingValueSlug ? valueItems.map((item) => ({ ...item, ...(valueDetailPatches[item.slug] || {}) })).find((i) => i.slug === editingValueSlug) || null : null;

  const visibleSummary = summaryItems.filter((item) => !item.hidden);
  const editingSummaryItem = editingSummaryIndex !== null ? summaryItems[editingSummaryIndex] || null : null;
  const visiblePersonalFacts = personalFactsItems.filter((item) => !item.hidden);
  const editingPersonalFact = editingPersonalFactIndex !== null ? personalFactsItems[editingPersonalFactIndex] || null : null;
  const visiblePersonality = personalityItems.filter((item) => !item.hidden);
  const editingPersonality = editingPersonalityIndex !== null ? personalityItems[editingPersonalityIndex] || null : null;
  const visibleBeliefs = beliefItemsState.filter((item) => !item.hidden);
  const editingBelief = editingBeliefIndex !== null ? beliefItemsState[editingBeliefIndex] || null : null;
  const visibleTimeline = timelineItemsState.filter((item) => !item.hidden);
  const editingTimeline = editingTimelineIndex !== null ? timelineItemsState[editingTimelineIndex] || null : null;

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <AboutTopNav username={profileData.username} name={profileData.name} />

        {heroVisible ? (
          <section className="group relative">
            <div className="absolute right-3 top-8 z-10 flex gap-2">
              <button onClick={() => setEditingHero(true)} className="rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => setToast({ type: "confirm-delete", message: "Hide Identity hero section?", action: "hide-hero" })} className="rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
            <AboutHero name={hero.name} username={hero.username} headline={hero.headline} location={hero.location} statement={hero.statement} avatarText={hero.avatarText} avatarUrl={getGlobalProfileAvatarUrl()} />
          </section>
        ) : (
          <section className="mt-5 rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
            <p className="text-sm text-zinc-600">Identity hero is hidden.</p>
            <button onClick={() => { setHeroVisible(true); save(IDENTITY_HERO_VISIBLE_KEY, true); setToast({ type: "success", message: "Identity hero restored." }); }} className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">Show Hero</button>
          </section>
        )}

        {summaryVisible ? (
          <section className="group relative">
            <button
              onClick={() => setToast({ type: "confirm-delete", message: "Hide About Summary section?", action: "hide-summary-section" })}
              className="absolute right-3 top-9 z-10 rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            {visibleSummary.length ? (
              <AboutSummaryCard
                items={visibleSummary.map((i) => ({ label: i.label, text: i.text }))}
                onEdit={(visibleIndex) => {
                  const target = visibleSummary[visibleIndex];
                  const original = summaryItems.findIndex((item) => item.label === target.label && item.text === target.text && !item.hidden);
                  if (original >= 0) setEditingSummaryIndex(original);
                }}
                onDelete={(visibleIndex) => {
                  const target = visibleSummary[visibleIndex];
                  const original = summaryItems.findIndex((item) => item.label === target.label && item.text === target.text && !item.hidden);
                  if (original >= 0) setToast({ type: "confirm-delete", message: "Delete this About Summary card?", action: "delete-summary", index: original });
                }}
              />
            ) : (
              <section className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
                <p className="text-sm text-zinc-600">All About Summary cards are deleted.</p>
                <button
                  onClick={() => {
                    const restored = summaryItems.map((item) => ({ ...item, hidden: false }));
                    setSummaryItems(restored);
                    save(IDENTITY_SUMMARY_KEY, restored);
                    setToast({ type: "success", message: "About Summary cards restored." });
                  }}
                  className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700"
                >
                  Restore Cards
                </button>
              </section>
            )}
          </section>
        ) : (
          <section className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
            <p className="text-sm text-zinc-600">About Summary section is hidden.</p>
            <button
              onClick={() => {
                setSummaryVisible(true);
                save(IDENTITY_SUMMARY_VISIBLE_KEY, true);
                setToast({ type: "success", message: "About Summary section restored." });
              }}
              className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700"
            >
              Show Section
            </button>
          </section>
        )}

        {currentFocusVisible ? (
          <section className="group relative">
            <button
              onClick={() => setToast({ type: "confirm-delete", message: "Hide Current Focus section?", action: "hide-current-focus-section" })}
              className="absolute right-3 top-9 z-10 rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <CurrentFocus
              focusItems={currentFocusItems}
              onEdit={(index) => setEditingCurrentFocusIndex(index)}
              onDelete={(index) => setToast({ type: "confirm-delete", message: "Delete this focus item?", action: "delete-current-focus", index })}
            />
          </section>
        ) : (
          <section className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
            <p className="text-sm text-zinc-600">Current Focus section is hidden.</p>
            <button
              onClick={() => {
                setCurrentFocusVisible(true);
                save(IDENTITY_CURRENT_FOCUS_VISIBLE_KEY, true);
                setToast({ type: "success", message: "Current Focus section restored." });
              }}
              className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700"
            >
              Show Section
            </button>
          </section>
        )}
        {personalFactsVisible ? (
          <section className="group relative">
            <button
              onClick={() => setToast({ type: "confirm-delete", message: "Hide Personal Facts section?", action: "hide-personal-facts-section" })}
              className="absolute right-3 top-9 z-10 rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            {visiblePersonalFacts.length ? (
              <PersonalFacts
                facts={visiblePersonalFacts.map((i) => ({ label: i.label, value: i.value }))}
                onEdit={(visibleIndex) => {
                  const target = visiblePersonalFacts[visibleIndex];
                  const original = personalFactsItems.findIndex((item) => item.label === target.label && item.value === target.value && !item.hidden);
                  if (original >= 0) setEditingPersonalFactIndex(original);
                }}
                onDelete={(visibleIndex) => {
                  const target = visiblePersonalFacts[visibleIndex];
                  const original = personalFactsItems.findIndex((item) => item.label === target.label && item.value === target.value && !item.hidden);
                  if (original >= 0) setToast({ type: "confirm-delete", message: "Delete this personal fact?", action: "delete-personal-fact", index: original });
                }}
              />
            ) : (
              <section className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
                <p className="text-sm text-zinc-600">All personal facts are deleted.</p>
                <button
                  onClick={() => {
                    const restored = personalFactsItems.map((item) => ({ ...item, hidden: false }));
                    setPersonalFactsItems(restored);
                    save(IDENTITY_PERSONAL_FACTS_KEY, restored);
                    setToast({ type: "success", message: "Personal facts restored." });
                  }}
                  className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700"
                >
                  Restore Facts
                </button>
              </section>
            )}
          </section>
        ) : (
          <section className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
            <p className="text-sm text-zinc-600">Personal Facts section is hidden.</p>
            <button
              onClick={() => {
                setPersonalFactsVisible(true);
                save(IDENTITY_PERSONAL_FACTS_VISIBLE_KEY, true);
                setToast({ type: "success", message: "Personal Facts section restored." });
              }}
              className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700"
            >
              Show Section
            </button>
          </section>
        )}

        <section className="pt-2"><h2 className="mt-6 text-center text-2xl font-extrabold tracking-tight text-zinc-900 md:text-3xl">Identity Deep Dive</h2><p className="mx-auto mt-2 max-w-2xl text-center text-sm text-zinc-600 md:text-base">Roles, interests, values, and direction in one connected identity story.</p></section>
        {roleSectionVisible ? (
          <section className="group relative">
            <button
              onClick={() => setToast({ type: "confirm-delete", message: "Hide Roles section?", action: "hide-roles-section" })}
              className="absolute right-12 top-3 z-10 rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <EditableSectionBlock sectionId="identity-role-cards" label="Roles">
              {roles.length ? (
                <RoleCards
                  routePrefix={`/profile/${profileData.username}/identity/role`}
                  items={roles}
                  onEdit={setEditingRoleSlug}
                  onDelete={(slug) => setToast({ type: "confirm-delete", message: "Delete this role card?", action: "delete-role", slug })}
                />
              ) : (
                <section className="mt-2 rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
                  <p className="text-sm text-zinc-600">All role cards are deleted.</p>
                  <button
                    onClick={() => {
                      setHiddenRoles({});
                      save(IDENTITY_ROLE_HIDDEN_KEY, {});
                      setToast({ type: "success", message: "Role cards restored." });
                    }}
                    className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700"
                  >
                    Restore Cards
                  </button>
                </section>
              )}
            </EditableSectionBlock>
          </section>
        ) : (
          <section className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
            <p className="text-sm text-zinc-600">Roles section is hidden.</p>
            <button
              onClick={() => {
                setRoleSectionVisible(true);
                save(IDENTITY_ROLE_SECTION_VISIBLE_KEY, true);
                setToast({ type: "success", message: "Roles section restored." });
              }}
              className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700"
            >
              Show Section
            </button>
          </section>
        )}
        {interestSectionVisible ? (
          <section className="group relative">
            <button
              onClick={() => setToast({ type: "confirm-delete", message: "Hide Interests section?", action: "hide-interests-section" })}
              className="absolute right-12 top-3 z-10 rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <EditableSectionBlock sectionId="identity-interest-cards" label="Interests">
              {interests.length ? (
                <InterestCards
                  routePrefix={`/profile/${profileData.username}/identity/interest`}
                  items={interests}
                  onEdit={setEditingInterestSlug}
                  onDelete={(slug) => setToast({ type: "confirm-delete", message: "Delete this interest card?", action: "delete-interest", slug })}
                />
              ) : (
                <section className="mt-2 rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
                  <p className="text-sm text-zinc-600">All interest cards are deleted.</p>
                  <button
                    onClick={() => {
                      setHiddenInterests({});
                      save(IDENTITY_INTEREST_HIDDEN_KEY, {});
                      setToast({ type: "success", message: "Interest cards restored." });
                    }}
                    className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700"
                  >
                    Restore Cards
                  </button>
                </section>
              )}
            </EditableSectionBlock>
          </section>
        ) : (
          <section className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
            <p className="text-sm text-zinc-600">Interests section is hidden.</p>
            <button
              onClick={() => {
                setInterestSectionVisible(true);
                save(IDENTITY_INTEREST_SECTION_VISIBLE_KEY, true);
                setToast({ type: "success", message: "Interests section restored." });
              }}
              className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700"
            >
              Show Section
            </button>
          </section>
        )}
        {valueSectionVisible ? (
          <section className="group relative">
            <button
              onClick={() => setToast({ type: "confirm-delete", message: "Hide Values section?", action: "hide-values-section" })}
              className="absolute right-3 top-3 z-10 rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <EditableSectionBlock sectionId="identity-value-cards" label="Values">
              {values.length ? (
                <ValueCards
                  routePrefix={`/profile/${profileData.username}/identity/value`}
                  items={values}
                  onEdit={setEditingValueSlug}
                  onDelete={(slug) => setToast({ type: "confirm-delete", message: "Delete this value card?", action: "delete-value", slug })}
                />
              ) : (
                <section className="mt-2 rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
                  <p className="text-sm text-zinc-600">All value cards are deleted.</p>
                  <button
                    onClick={() => {
                      setHiddenValues({});
                      save(IDENTITY_VALUE_HIDDEN_KEY, {});
                      setToast({ type: "success", message: "Value cards restored." });
                    }}
                    className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700"
                  >
                    Restore Cards
                  </button>
                </section>
              )}
            </EditableSectionBlock>
          </section>
        ) : (
          <section className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
            <p className="text-sm text-zinc-600">Values section is hidden.</p>
            <button
              onClick={() => {
                setValueSectionVisible(true);
                save(IDENTITY_VALUE_SECTION_VISIBLE_KEY, true);
                setToast({ type: "success", message: "Values section restored." });
              }}
              className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700"
            >
              Show Section
            </button>
          </section>
        )}
        {personalityVisible ? (
          <section className="group relative">
            <button
              onClick={() => setToast({ type: "confirm-delete", message: "Hide Personality section?", action: "hide-personality-section" })}
              className="absolute right-3 top-3 z-10 rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <EditableSectionBlock sectionId="identity-personality" label="Personality">
              {visiblePersonality.length ? (
                <PersonalityGrid
                  traits={visiblePersonality}
                  onEdit={(visibleIndex) => {
                    const target = visiblePersonality[visibleIndex];
                    const original = personalityItems.findIndex((item) => item.name === target.name && item.text === target.text && item.level === target.level && !item.hidden);
                    if (original >= 0) setEditingPersonalityIndex(original);
                  }}
                  onDelete={(visibleIndex) => {
                    const target = visiblePersonality[visibleIndex];
                    const original = personalityItems.findIndex((item) => item.name === target.name && item.text === target.text && item.level === target.level && !item.hidden);
                    if (original >= 0) setToast({ type: "confirm-delete", message: "Delete this personality trait?", action: "delete-personality-trait", index: original });
                  }}
                />
              ) : (
                <section className="mt-2 rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
                  <p className="text-sm text-zinc-600">All personality traits are deleted.</p>
                  <button
                    onClick={() => {
                      const restored = personalityItems.map((item) => ({ ...item, hidden: false }));
                      setPersonalityItems(restored);
                      save(IDENTITY_PERSONALITY_KEY, restored);
                      setToast({ type: "success", message: "Personality traits restored." });
                    }}
                    className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700"
                  >
                    Restore Traits
                  </button>
                </section>
              )}
            </EditableSectionBlock>
          </section>
        ) : (
          <section className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
            <p className="text-sm text-zinc-600">Personality section is hidden.</p>
            <button
              onClick={() => {
                setPersonalityVisible(true);
                save(IDENTITY_PERSONALITY_VISIBLE_KEY, true);
                setToast({ type: "success", message: "Personality section restored." });
              }}
              className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700"
            >
              Show Section
            </button>
          </section>
        )}
        {missionVisible ? (
          <section className="group relative">
            <div className="absolute right-3 top-3 z-10 flex gap-2 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
              <button onClick={() => setEditingMission(true)} className="rounded-full border border-zinc-200 bg-white p-2 text-zinc-700">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => setToast({ type: "confirm-delete", message: "Hide Mission section?", action: "hide-mission-section" })} className="rounded-full border border-rose-200 bg-white p-2 text-rose-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <EditableSectionBlock sectionId="identity-mission" label="Mission">
              <MissionCard mission={missionData.mission} doingNow={missionData.doingNow} whyMatters={missionData.whyMatters} nextMilestone={missionData.nextMilestone} />
            </EditableSectionBlock>
          </section>
        ) : (
          <section className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
            <p className="text-sm text-zinc-600">Mission section is hidden.</p>
            <button
              onClick={() => {
                setMissionVisible(true);
                save(IDENTITY_MISSION_VISIBLE_KEY, true);
                setToast({ type: "success", message: "Mission section restored." });
              }}
              className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700"
            >
              Show Section
            </button>
          </section>
        )}
        {visionVisible ? (
          <section className="group relative">
            <div className="absolute right-3 top-3 z-10 flex gap-2 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
              <button onClick={() => setEditingVision(true)} className="rounded-full border border-zinc-200 bg-white p-2 text-zinc-700">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => setToast({ type: "confirm-delete", message: "Hide Vision section?", action: "hide-vision-section" })} className="rounded-full border border-rose-200 bg-white p-2 text-rose-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <EditableSectionBlock sectionId="identity-vision" label="Vision">
              <VisionCard vision={visionData.vision} direction={visionData.direction} impact={visionData.impact} problems={visionData.problems} become={visionData.become} />
            </EditableSectionBlock>
          </section>
        ) : (
          <section className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
            <p className="text-sm text-zinc-600">Vision section is hidden.</p>
            <button
              onClick={() => {
                setVisionVisible(true);
                save(IDENTITY_VISION_VISIBLE_KEY, true);
                setToast({ type: "success", message: "Vision section restored." });
              }}
              className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700"
            >
              Show Section
            </button>
          </section>
        )}
        {beliefsVisible ? (
          <section className="group relative">
            <button
              onClick={() => setToast({ type: "confirm-delete", message: "Hide Beliefs section?", action: "hide-beliefs-section" })}
              className="absolute right-3 top-3 z-10 rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <EditableSectionBlock sectionId="identity-beliefs" label="Beliefs">
              {visibleBeliefs.length ? (
                <BeliefCards
                  beliefs={visibleBeliefs.map((i) => i.text)}
                  onEdit={(visibleIndex) => {
                    const target = visibleBeliefs[visibleIndex];
                    const original = beliefItemsState.findIndex((item) => item.text === target.text && !item.hidden);
                    if (original >= 0) setEditingBeliefIndex(original);
                  }}
                  onDelete={(visibleIndex) => {
                    const target = visibleBeliefs[visibleIndex];
                    const original = beliefItemsState.findIndex((item) => item.text === target.text && !item.hidden);
                    if (original >= 0) setToast({ type: "confirm-delete", message: "Delete this belief?", action: "delete-belief", index: original });
                  }}
                />
              ) : (
                <section className="mt-2 rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
                  <p className="text-sm text-zinc-600">All beliefs are deleted.</p>
                  <button
                    onClick={() => {
                      const restored = beliefItemsState.map((item) => ({ ...item, hidden: false }));
                      setBeliefItemsState(restored);
                      save(IDENTITY_BELIEFS_KEY, restored);
                      setToast({ type: "success", message: "Beliefs restored." });
                    }}
                    className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700"
                  >
                    Restore Beliefs
                  </button>
                </section>
              )}
            </EditableSectionBlock>
          </section>
        ) : (
          <section className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
            <p className="text-sm text-zinc-600">Beliefs section is hidden.</p>
            <button
              onClick={() => {
                setBeliefsVisible(true);
                save(IDENTITY_BELIEFS_VISIBLE_KEY, true);
                setToast({ type: "success", message: "Beliefs section restored." });
              }}
              className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700"
            >
              Show Section
            </button>
          </section>
        )}
        {timelineVisible ? (
          <section className="group relative">
            <button
              onClick={() => setToast({ type: "confirm-delete", message: "Hide Timeline section?", action: "hide-timeline-section" })}
              className="absolute right-3 top-3 z-10 rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <EditableSectionBlock sectionId="identity-timeline" label="Timeline">
              {visibleTimeline.length ? (
                <IdentityTimeline
                  items={visibleTimeline.map((i) => i.text)}
                  onEdit={(visibleIndex) => {
                    const target = visibleTimeline[visibleIndex];
                    const original = timelineItemsState.findIndex((item) => item.text === target.text && !item.hidden);
                    if (original >= 0) setEditingTimelineIndex(original);
                  }}
                  onDelete={(visibleIndex) => {
                    const target = visibleTimeline[visibleIndex];
                    const original = timelineItemsState.findIndex((item) => item.text === target.text && !item.hidden);
                    if (original >= 0) setToast({ type: "confirm-delete", message: "Delete this timeline item?", action: "delete-timeline", index: original });
                  }}
                />
              ) : (
                <section className="mt-2 rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
                  <p className="text-sm text-zinc-600">All timeline items are deleted.</p>
                  <button
                    onClick={() => {
                      const restored = timelineItemsState.map((item) => ({ ...item, hidden: false }));
                      setTimelineItemsState(restored);
                      save(IDENTITY_TIMELINE_KEY, restored);
                      setToast({ type: "success", message: "Timeline restored." });
                    }}
                    className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700"
                  >
                    Restore Timeline
                  </button>
                </section>
              )}
            </EditableSectionBlock>
          </section>
        ) : (
          <section className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
            <p className="text-sm text-zinc-600">Timeline section is hidden.</p>
            <button
              onClick={() => {
                setTimelineVisible(true);
                save(IDENTITY_TIMELINE_VISIBLE_KEY, true);
                setToast({ type: "success", message: "Timeline section restored." });
              }}
              className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700"
            >
              Show Section
            </button>
          </section>
        )}
        <EditableSectionBlock sectionId="identity-related-links" label="Related Links"><RelatedProfileLinks username={profileData.username} /></EditableSectionBlock>
      </div>

      <AnimatePresence>
        {editingItem ? <EditModal item={editingItem} onClose={() => setEditingSlug(null)} onSave={(next) => { const updated = { ...patches, [editingItem.slug]: next }; setPatches(updated); save(IDENTITY_KEY, updated); setEditingSlug(null); }} /> : null}
        {editingRoleItem ? <RoleDetailEditModal item={editingRoleItem} onClose={() => setEditingRoleSlug(null)} onSave={(next) => { const updated = { ...roleDetailPatches, [editingRoleItem.slug]: next }; setRoleDetailPatches(updated); save(IDENTITY_ROLE_DETAILS_KEY, updated); setEditingRoleSlug(null); setToast({ type: "success", message: "Role updated." }); }} /> : null}
        {editingInterestItem ? <InterestDetailEditModal item={editingInterestItem} onClose={() => setEditingInterestSlug(null)} onSave={(next) => { const updated = { ...interestDetailPatches, [editingInterestItem.slug]: next }; setInterestDetailPatches(updated); save(IDENTITY_INTEREST_DETAILS_KEY, updated); setEditingInterestSlug(null); setToast({ type: "success", message: "Interest updated." }); }} /> : null}
        {editingValueItem ? <ValueDetailEditModal item={editingValueItem} onClose={() => setEditingValueSlug(null)} onSave={(next) => { const updated = { ...valueDetailPatches, [editingValueItem.slug]: next }; setValueDetailPatches(updated); save(IDENTITY_VALUE_DETAILS_KEY, updated); setEditingValueSlug(null); setToast({ type: "success", message: "Value updated." }); }} /> : null}
        {editingHero ? <HeroEditModal value={hero} onClose={() => setEditingHero(false)} onSave={(next) => { setHero(next); save(IDENTITY_HERO_KEY, next); setEditingHero(false); setToast({ type: "success", message: "Identity hero updated." }); }} /> : null}
        {editingSummaryItem ? <SummaryEditModal value={editingSummaryItem} onClose={() => setEditingSummaryIndex(null)} onSave={(next) => { const copy = [...summaryItems]; copy[editingSummaryIndex!] = { ...copy[editingSummaryIndex!], ...next }; setSummaryItems(copy); save(IDENTITY_SUMMARY_KEY, copy); setEditingSummaryIndex(null); setToast({ type: "success", message: "Summary card updated." }); }} /> : null}
        {editingCurrentFocusIndex !== null ? <CurrentFocusEditModal value={currentFocusItems[editingCurrentFocusIndex] || ""} onClose={() => setEditingCurrentFocusIndex(null)} onSave={(next) => { const copy = [...currentFocusItems]; copy[editingCurrentFocusIndex] = next; setCurrentFocusItems(copy); save(IDENTITY_CURRENT_FOCUS_KEY, copy); setEditingCurrentFocusIndex(null); setToast({ type: "success", message: "Current focus item updated." }); }} /> : null}
        {editingPersonalFact ? <PersonalFactEditModal value={editingPersonalFact} onClose={() => setEditingPersonalFactIndex(null)} onSave={(next) => { const copy = [...personalFactsItems]; copy[editingPersonalFactIndex!] = { ...copy[editingPersonalFactIndex!], ...next }; setPersonalFactsItems(copy); save(IDENTITY_PERSONAL_FACTS_KEY, copy); setEditingPersonalFactIndex(null); setToast({ type: "success", message: "Personal fact updated." }); }} /> : null}
        {editingPersonality ? <PersonalityEditModal value={editingPersonality} onClose={() => setEditingPersonalityIndex(null)} onSave={(next) => { const copy = [...personalityItems]; copy[editingPersonalityIndex!] = { ...copy[editingPersonalityIndex!], ...next }; setPersonalityItems(copy); save(IDENTITY_PERSONALITY_KEY, copy); setEditingPersonalityIndex(null); setToast({ type: "success", message: "Personality trait updated." }); }} /> : null}
        {editingMission ? <MissionEditModal value={missionData} onClose={() => setEditingMission(false)} onSave={(next) => { setMissionData(next); save(IDENTITY_MISSION_KEY, next); setEditingMission(false); setToast({ type: "success", message: "Mission updated." }); }} /> : null}
        {editingVision ? <VisionEditModal value={visionData} onClose={() => setEditingVision(false)} onSave={(next) => { setVisionData(next); save(IDENTITY_VISION_KEY, next); setEditingVision(false); setToast({ type: "success", message: "Vision updated." }); }} /> : null}
        {editingBelief ? <BeliefEditModal value={editingBelief} onClose={() => setEditingBeliefIndex(null)} onSave={(next) => { const copy = [...beliefItemsState]; copy[editingBeliefIndex!] = { ...copy[editingBeliefIndex!], text: next }; setBeliefItemsState(copy); save(IDENTITY_BELIEFS_KEY, copy); setEditingBeliefIndex(null); setToast({ type: "success", message: "Belief updated." }); }} /> : null}
        {editingTimeline ? <TimelineEditModal value={editingTimeline} onClose={() => setEditingTimelineIndex(null)} onSave={(next) => { const copy = [...timelineItemsState]; copy[editingTimelineIndex!] = { ...copy[editingTimelineIndex!], text: next }; setTimelineItemsState(copy); save(IDENTITY_TIMELINE_KEY, copy); setEditingTimelineIndex(null); setToast({ type: "success", message: "Timeline item updated." }); }} /> : null}
        {toast ? <Toast toast={toast} onClose={() => setToast(null)} onConfirm={() => {
          if (toast.type !== "confirm-delete") return;
          if (toast.action === "hide-hero") {
            setHeroVisible(false);
            save(IDENTITY_HERO_VISIBLE_KEY, false);
            setToast({ type: "success", message: "Identity hero hidden." });
            return;
          }
          if (toast.action === "hide-summary-section") {
            setSummaryVisible(false);
            save(IDENTITY_SUMMARY_VISIBLE_KEY, false);
            setToast({ type: "success", message: "About Summary section hidden." });
            return;
          }
          if (toast.action === "hide-current-focus-section") {
            setCurrentFocusVisible(false);
            save(IDENTITY_CURRENT_FOCUS_VISIBLE_KEY, false);
            setToast({ type: "success", message: "Current Focus section hidden." });
            return;
          }
          if (toast.action === "delete-summary" && typeof toast.index === "number") {
            const copy = [...summaryItems];
            copy[toast.index] = { ...copy[toast.index], hidden: true };
            setSummaryItems(copy);
            save(IDENTITY_SUMMARY_KEY, copy);
            setToast({ type: "success", message: "Summary card deleted." });
            return;
          }
          if (toast.action === "delete-current-focus" && typeof toast.index === "number") {
            const copy = currentFocusItems.filter((_, i) => i !== toast.index);
            setCurrentFocusItems(copy);
            save(IDENTITY_CURRENT_FOCUS_KEY, copy);
            setToast({ type: "success", message: "Current focus item deleted." });
            return;
          }
          if (toast.action === "hide-personal-facts-section") {
            setPersonalFactsVisible(false);
            save(IDENTITY_PERSONAL_FACTS_VISIBLE_KEY, false);
            setToast({ type: "success", message: "Personal Facts section hidden." });
            return;
          }
          if (toast.action === "hide-roles-section") {
            setRoleSectionVisible(false);
            save(IDENTITY_ROLE_SECTION_VISIBLE_KEY, false);
            setToast({ type: "success", message: "Roles section hidden." });
            return;
          }
          if (toast.action === "delete-role" && toast.slug) {
            const updated = { ...hiddenRoles, [toast.slug]: true };
            setHiddenRoles(updated);
            save(IDENTITY_ROLE_HIDDEN_KEY, updated);
            setToast({ type: "success", message: "Role card deleted." });
            return;
          }
          if (toast.action === "hide-interests-section") {
            setInterestSectionVisible(false);
            save(IDENTITY_INTEREST_SECTION_VISIBLE_KEY, false);
            setToast({ type: "success", message: "Interests section hidden." });
            return;
          }
          if (toast.action === "delete-interest" && toast.slug) {
            const updated = { ...hiddenInterests, [toast.slug]: true };
            setHiddenInterests(updated);
            save(IDENTITY_INTEREST_HIDDEN_KEY, updated);
            setToast({ type: "success", message: "Interest card deleted." });
            return;
          }
          if (toast.action === "hide-values-section") {
            setValueSectionVisible(false);
            save(IDENTITY_VALUE_SECTION_VISIBLE_KEY, false);
            setToast({ type: "success", message: "Values section hidden." });
            return;
          }
          if (toast.action === "delete-value" && toast.slug) {
            const updated = { ...hiddenValues, [toast.slug]: true };
            setHiddenValues(updated);
            save(IDENTITY_VALUE_HIDDEN_KEY, updated);
            setToast({ type: "success", message: "Value card deleted." });
            return;
          }
          if (toast.action === "hide-personality-section") {
            setPersonalityVisible(false);
            save(IDENTITY_PERSONALITY_VISIBLE_KEY, false);
            setToast({ type: "success", message: "Personality section hidden." });
            return;
          }
          if (toast.action === "delete-personality-trait" && typeof toast.index === "number") {
            const copy = [...personalityItems];
            copy[toast.index] = { ...copy[toast.index], hidden: true };
            setPersonalityItems(copy);
            save(IDENTITY_PERSONALITY_KEY, copy);
            setToast({ type: "success", message: "Personality trait deleted." });
            return;
          }
          if (toast.action === "hide-mission-section") {
            setMissionVisible(false);
            save(IDENTITY_MISSION_VISIBLE_KEY, false);
            setToast({ type: "success", message: "Mission section hidden." });
            return;
          }
          if (toast.action === "hide-vision-section") {
            setVisionVisible(false);
            save(IDENTITY_VISION_VISIBLE_KEY, false);
            setToast({ type: "success", message: "Vision section hidden." });
            return;
          }
          if (toast.action === "hide-beliefs-section") {
            setBeliefsVisible(false);
            save(IDENTITY_BELIEFS_VISIBLE_KEY, false);
            setToast({ type: "success", message: "Beliefs section hidden." });
            return;
          }
          if (toast.action === "delete-belief" && typeof toast.index === "number") {
            const copy = [...beliefItemsState];
            copy[toast.index] = { ...copy[toast.index], hidden: true };
            setBeliefItemsState(copy);
            save(IDENTITY_BELIEFS_KEY, copy);
            setToast({ type: "success", message: "Belief deleted." });
            return;
          }
          if (toast.action === "hide-timeline-section") {
            setTimelineVisible(false);
            save(IDENTITY_TIMELINE_VISIBLE_KEY, false);
            setToast({ type: "success", message: "Timeline section hidden." });
            return;
          }
          if (toast.action === "delete-timeline" && typeof toast.index === "number") {
            const copy = [...timelineItemsState];
            copy[toast.index] = { ...copy[toast.index], hidden: true };
            setTimelineItemsState(copy);
            save(IDENTITY_TIMELINE_KEY, copy);
            setToast({ type: "success", message: "Timeline item deleted." });
            return;
          }
          if (toast.action === "delete-personal-fact" && typeof toast.index === "number") {
            const copy = [...personalFactsItems];
            copy[toast.index] = { ...copy[toast.index], hidden: true };
            setPersonalFactsItems(copy);
            save(IDENTITY_PERSONAL_FACTS_KEY, copy);
            setToast({ type: "success", message: "Personal fact deleted." });
          }
        }} /> : null}
      </AnimatePresence>
    </main>
  );
}

function EditModal({ item, onClose, onSave }: { item: IdentityDetailItem; onClose: () => void; onSave: (v: IdentityPatch) => void }) {
  const [name, setName] = useState(item.name);
  const [short, setShort] = useState(item.short);
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4"><motion.div initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }} className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-lg font-bold">Edit Identity Card</h3><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5"><X className="h-4 w-4" /></button></div><div className="mt-4 grid gap-3"><label><span className="mb-1 block text-xs text-zinc-600">Name</span><input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></label><label><span className="mb-1 block text-xs text-zinc-600">Short</span><textarea value={short} onChange={(e) => setShort(e.target.value)} className="min-h-24 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></label></div><button onClick={() => onSave({ name, short })} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"><Save className="h-4 w-4" />Save</button></motion.div></motion.div>;
}

function HeroEditModal({ value, onClose, onSave }: { value: HeroDraft; onClose: () => void; onSave: (v: HeroDraft) => void }) {
  const [draft, setDraft] = useState(value);
  return <ModalShell title="Edit Identity Hero" onClose={onClose} onSave={() => onSave(draft)}>
    <Field label="Name" value={draft.name} onChange={(v) => setDraft((p) => ({ ...p, name: v }))} />
    <Field label="Username" value={draft.username} onChange={(v) => setDraft((p) => ({ ...p, username: v }))} />
    <Field label="Headline" value={draft.headline} onChange={(v) => setDraft((p) => ({ ...p, headline: v }))} />
    <Field label="Location" value={draft.location} onChange={(v) => setDraft((p) => ({ ...p, location: v }))} />
    <Field label="Avatar Text" value={draft.avatarText} onChange={(v) => setDraft((p) => ({ ...p, avatarText: v.slice(0, 3).toUpperCase() }))} />
    <div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Statement</label><textarea value={draft.statement} onChange={(e) => setDraft((p) => ({ ...p, statement: e.target.value }))} className="min-h-24 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div>
  </ModalShell>;
}

function SummaryEditModal({ value, onClose, onSave }: { value: SummaryItemDraft; onClose: () => void; onSave: (v: Pick<SummaryItemDraft, "label" | "text">) => void }) {
  const [label, setLabel] = useState(value.label);
  const [text, setText] = useState(value.text);
  return <ModalShell title="Edit Summary Card" onClose={onClose} onSave={() => onSave({ label, text })}>
    <Field label="Label" value={label} onChange={setLabel} />
    <div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Text</label><textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-24 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div>
  </ModalShell>;
}

function CurrentFocusEditModal({ value, onClose, onSave }: { value: string; onClose: () => void; onSave: (v: string) => void }) {
  const [text, setText] = useState(value);
  return (
    <ModalShell title="Edit Current Focus Item" onClose={onClose} onSave={() => onSave(text)}>
      <div className="md:col-span-2">
        <Field label="Focus Item" value={text} onChange={setText} />
      </div>
    </ModalShell>
  );
}

function PersonalFactEditModal({ value, onClose, onSave }: { value: PersonalFactDraft; onClose: () => void; onSave: (v: Pick<PersonalFactDraft, "label" | "value">) => void }) {
  const [label, setLabel] = useState(value.label);
  const [factValue, setFactValue] = useState(value.value);
  return (
    <ModalShell title="Edit Personal Fact" onClose={onClose} onSave={() => onSave({ label, value: factValue })}>
      <Field label="Label" value={label} onChange={setLabel} />
      <div className="md:col-span-2">
        <label className="mb-1 block text-xs text-zinc-600">Value</label>
        <textarea value={factValue} onChange={(e) => setFactValue(e.target.value)} className="min-h-24 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
      </div>
    </ModalShell>
  );
}

function PersonalityEditModal({ value, onClose, onSave }: { value: PersonalityTraitDraft; onClose: () => void; onSave: (v: Pick<PersonalityTraitDraft, "name" | "text" | "level">) => void }) {
  const [name, setName] = useState(value.name);
  const [text, setText] = useState(value.text);
  const [level, setLevel] = useState(String(value.level));
  return (
    <ModalShell title="Edit Personality Trait" onClose={onClose} onSave={() => onSave({ name, text, level: Math.max(0, Math.min(100, Number(level) || 0)) })}>
      <Field label="Name" value={name} onChange={setName} />
      <Field label="Level (0-100)" value={level} onChange={setLevel} />
      <div className="md:col-span-2">
        <label className="mb-1 block text-xs text-zinc-600">Description</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-24 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
      </div>
    </ModalShell>
  );
}

function MissionEditModal({ value, onClose, onSave }: { value: MissionDraft; onClose: () => void; onSave: (v: MissionDraft) => void }) {
  const [draft, setDraft] = useState(value);
  return (
    <ModalShell title="Edit Mission" onClose={onClose} onSave={() => onSave(draft)}>
      <div className="md:col-span-2">
        <label className="mb-1 block text-xs text-zinc-600">Current Mission</label>
        <textarea value={draft.mission} onChange={(e) => setDraft((p) => ({ ...p, mission: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
      </div>
      <div className="md:col-span-2">
        <label className="mb-1 block text-xs text-zinc-600">What I’m doing now</label>
        <textarea value={draft.doingNow} onChange={(e) => setDraft((p) => ({ ...p, doingNow: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
      </div>
      <div className="md:col-span-2">
        <label className="mb-1 block text-xs text-zinc-600">Why it matters</label>
        <textarea value={draft.whyMatters} onChange={(e) => setDraft((p) => ({ ...p, whyMatters: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
      </div>
      <div className="md:col-span-2">
        <label className="mb-1 block text-xs text-zinc-600">Next milestone</label>
        <textarea value={draft.nextMilestone} onChange={(e) => setDraft((p) => ({ ...p, nextMilestone: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
      </div>
    </ModalShell>
  );
}

function VisionEditModal({ value, onClose, onSave }: { value: VisionDraft; onClose: () => void; onSave: (v: VisionDraft) => void }) {
  const [draft, setDraft] = useState(value);
  return (
    <ModalShell title="Edit Vision" onClose={onClose} onSave={() => onSave(draft)}>
      <div className="md:col-span-2">
        <label className="mb-1 block text-xs text-zinc-600">Long-term Vision</label>
        <textarea value={draft.vision} onChange={(e) => setDraft((p) => ({ ...p, vision: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
      </div>
      <div className="md:col-span-2">
        <label className="mb-1 block text-xs text-zinc-600">Future direction</label>
        <textarea value={draft.direction} onChange={(e) => setDraft((p) => ({ ...p, direction: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
      </div>
      <div className="md:col-span-2">
        <label className="mb-1 block text-xs text-zinc-600">Type of impact</label>
        <textarea value={draft.impact} onChange={(e) => setDraft((p) => ({ ...p, impact: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
      </div>
      <div className="md:col-span-2">
        <label className="mb-1 block text-xs text-zinc-600">Problems to solve</label>
        <textarea value={draft.problems} onChange={(e) => setDraft((p) => ({ ...p, problems: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
      </div>
      <div className="md:col-span-2">
        <label className="mb-1 block text-xs text-zinc-600">Person to become</label>
        <textarea value={draft.become} onChange={(e) => setDraft((p) => ({ ...p, become: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
      </div>
    </ModalShell>
  );
}

function BeliefEditModal({ value, onClose, onSave }: { value: BeliefDraft; onClose: () => void; onSave: (v: string) => void }) {
  const [text, setText] = useState(value.text);
  return (
    <ModalShell title="Edit Belief" onClose={onClose} onSave={() => onSave(text)}>
      <div className="md:col-span-2">
        <label className="mb-1 block text-xs text-zinc-600">Belief text</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-24 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
      </div>
    </ModalShell>
  );
}

function TimelineEditModal({ value, onClose, onSave }: { value: TimelineDraft; onClose: () => void; onSave: (v: string) => void }) {
  const [text, setText] = useState(value.text);
  return (
    <ModalShell title="Edit Timeline Item" onClose={onClose} onSave={() => onSave(text)}>
      <div className="md:col-span-2">
        <label className="mb-1 block text-xs text-zinc-600">Timeline text</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-24 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
      </div>
    </ModalShell>
  );
}

function RoleDetailEditModal({ item, onClose, onSave }: { item: IdentityDetailItem; onClose: () => void; onSave: (v: RoleDetailPatch) => void }) {
  const [draft, setDraft] = useState<RoleDetailPatch>({
    name: item.name,
    short: item.short,
    why: item.why,
    start: item.start,
    meaning: item.meaning,
    build: item.build,
    future: item.future,
  });
  return (
    <ModalShell title="Edit Role Card + Detail Page" onClose={onClose} onSave={() => onSave(draft)}>
      <Field label="Name" value={draft.name || ""} onChange={(v) => setDraft((p) => ({ ...p, name: v }))} />
      <div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Short</label><textarea value={draft.short || ""} onChange={(e) => setDraft((p) => ({ ...p, short: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div>
      <div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Why I chose this</label><textarea value={draft.why || ""} onChange={(e) => setDraft((p) => ({ ...p, why: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div>
      <div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">How I started</label><textarea value={draft.start || ""} onChange={(e) => setDraft((p) => ({ ...p, start: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div>
      <div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">What it means to me</label><textarea value={draft.meaning || ""} onChange={(e) => setDraft((p) => ({ ...p, meaning: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div>
      <div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">What I am building</label><textarea value={draft.build || ""} onChange={(e) => setDraft((p) => ({ ...p, build: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div>
      <div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Future goal</label><textarea value={draft.future || ""} onChange={(e) => setDraft((p) => ({ ...p, future: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div>
    </ModalShell>
  );
}

function InterestDetailEditModal({ item, onClose, onSave }: { item: IdentityDetailItem; onClose: () => void; onSave: (v: InterestDetailPatch) => void }) {
  const [draft, setDraft] = useState<InterestDetailPatch>({
    name: item.name,
    short: item.short,
    why: item.why,
    start: item.start,
    meaning: item.meaning,
    build: item.build,
    future: item.future,
  });
  return (
    <ModalShell title="Edit Interest Card + Detail Page" onClose={onClose} onSave={() => onSave(draft)}>
      <Field label="Name" value={draft.name || ""} onChange={(v) => setDraft((p) => ({ ...p, name: v }))} />
      <div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Short</label><textarea value={draft.short || ""} onChange={(e) => setDraft((p) => ({ ...p, short: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div>
      <div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Why I chose this</label><textarea value={draft.why || ""} onChange={(e) => setDraft((p) => ({ ...p, why: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div>
      <div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">How I started</label><textarea value={draft.start || ""} onChange={(e) => setDraft((p) => ({ ...p, start: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div>
      <div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">What it means to me</label><textarea value={draft.meaning || ""} onChange={(e) => setDraft((p) => ({ ...p, meaning: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div>
      <div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">What I am building</label><textarea value={draft.build || ""} onChange={(e) => setDraft((p) => ({ ...p, build: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div>
      <div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Future goal</label><textarea value={draft.future || ""} onChange={(e) => setDraft((p) => ({ ...p, future: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div>
    </ModalShell>
  );
}

function ValueDetailEditModal({ item, onClose, onSave }: { item: IdentityDetailItem; onClose: () => void; onSave: (v: ValueDetailPatch) => void }) {
  const [draft, setDraft] = useState<ValueDetailPatch>({
    name: item.name,
    short: item.short,
    why: item.why,
    start: item.start,
    meaning: item.meaning,
    build: item.build,
    future: item.future,
  });
  return (
    <ModalShell title="Edit Value Card + Detail Page" onClose={onClose} onSave={() => onSave(draft)}>
      <Field label="Name" value={draft.name || ""} onChange={(v) => setDraft((p) => ({ ...p, name: v }))} />
      <div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Short</label><textarea value={draft.short || ""} onChange={(e) => setDraft((p) => ({ ...p, short: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div>
      <div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Why I chose this</label><textarea value={draft.why || ""} onChange={(e) => setDraft((p) => ({ ...p, why: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div>
      <div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">How I started</label><textarea value={draft.start || ""} onChange={(e) => setDraft((p) => ({ ...p, start: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div>
      <div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">What it means to me</label><textarea value={draft.meaning || ""} onChange={(e) => setDraft((p) => ({ ...p, meaning: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div>
      <div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">What I am building</label><textarea value={draft.build || ""} onChange={(e) => setDraft((p) => ({ ...p, build: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div>
      <div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Future goal</label><textarea value={draft.future || ""} onChange={(e) => setDraft((p) => ({ ...p, future: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div>
    </ModalShell>
  );
}

function ModalShell({ title, onClose, onSave, children }: { title: string; onClose: () => void; onSave: () => void; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4">
      <motion.div initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }} className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl">
        <div className="flex items-center justify-between"><h3 className="text-lg font-bold">{title}</h3><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5"><X className="h-4 w-4" /></button></div>
        <div className="mt-4 grid gap-3 overflow-y-auto pr-1 md:grid-cols-2">{children}</div>
        <button onClick={onSave} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"><Save className="h-4 w-4" />Save</button>
      </motion.div>
    </motion.div>
  );
}

function Toast({ toast, onClose, onConfirm }: { toast: ToastState; onClose: () => void; onConfirm: () => void }) {
  if (!toast) return null;
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="fixed bottom-4 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl">
      <p className="text-sm text-zinc-800">{toast.message}</p>
      {toast.type === "confirm-delete" ? (
        <div className="mt-3 flex gap-2"><button onClick={onConfirm} className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">Confirm</button><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Cancel</button></div>
      ) : (
        <button onClick={onClose} className="mt-3 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Close</button>
      )}
    </motion.div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return <label><span className="mb-1 block text-xs text-zinc-600">{label}</span><input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></label>;
}

