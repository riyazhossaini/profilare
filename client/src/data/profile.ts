import { BookOpen, Briefcase, Fingerprint, FolderKanban, GraduationCap, Handshake, Link2, Mail, type LucideIcon } from "lucide-react";

export type ProfileSection = {
  key: string;
  title: string;
  description: string;
  icon: LucideIcon;
  intro: string;
  sampleHeading: string;
  sampleBody: string;
};

export const profileData = {
  name: "Riyaz Hossaini",
  username: "riyaz",
  headline: "Founder · Builder · AI Learner",
  location: "Kolkata, India",
};

if (typeof window !== "undefined") {
  try {
    const raw = window.localStorage.getItem("profilare:account-profile");
    if (raw) {
      const draft = JSON.parse(raw) as {
        fullName?: string;
        username?: string;
        profileTitle?: string;
        location?: string;
      };
      if (draft.fullName) profileData.name = draft.fullName;
      if (draft.username) profileData.username = draft.username;
      if (draft.profileTitle) profileData.headline = draft.profileTitle;
      if (draft.location) profileData.location = draft.location;
    }
  } catch {
    // ignore malformed local draft
  }
}

export const profileSections: ProfileSection[] = [
  {
    key: "identity",
    title: "Identity",
    description: "Story, values, mission, mindset, and life direction",
    icon: Fingerprint,
    intro: "How this person sees the world, what they value, and what they are here to build.",
    sampleHeading: "Identity map",
    sampleBody: "Use this space to describe roles, interests, values, and long-term vision in detail.",
  },
  {
    key: "skills",
    title: "Skills",
    description: "Technical, business, creative, and communication skills",
    icon: Handshake,
    intro: "A structured view of capabilities and where those skills are applied.",
    sampleHeading: "Skill journey",
    sampleBody: "This section can explain how each skill was learned and used in real projects.",
  },
  {
    key: "education",
    title: "Education",
    description: "Formal education and self-learning journey",
    icon: GraduationCap,
    intro: "Learning path across school, certifications, and independent growth.",
    sampleHeading: "Learning timeline",
    sampleBody: "Great place for degrees, certificates, and self-led tracks in AI, business, and product.",
  },
  {
    key: "experience",
    title: "Experience",
    description: "Work, startup, freelance, and personal work experience",
    icon: Briefcase,
    intro: "Hands-on roles and real-world execution across different environments.",
    sampleHeading: "Experience highlights",
    sampleBody: "Add role summaries, impact snapshots, and key responsibilities over time.",
  },
  {
    key: "projects",
    title: "Projects",
    description: "Ideas, startups, products, and case studies",
    icon: FolderKanban,
    intro: "A portfolio of what is being built, launched, or explored.",
    sampleHeading: "Project showcase",
    sampleBody: "Include project context, status, links, and case-study style breakdowns.",
  },
  {
    key: "content",
    title: "Content",
    description: "Articles, notes, posts, and public thinking",
    icon: BookOpen,
    intro: "Writing and publishing footprint that reflects ideas and thought process.",
    sampleHeading: "Public writing",
    sampleBody: "Use this section for essays, social posts, and short reflections.",
  },
  {
    key: "links",
    title: "Links",
    description: "Platforms, communities, and external profile links",
    icon: Link2,
    intro: "Where to follow and connect across the web.",
    sampleHeading: "Profile network",
    sampleBody: "Link X, LinkedIn, GitHub, Medium, website, YouTube, and Instagram here.",
  },
  {
    key: "contact",
    title: "Contact",
    description: "Message, collaboration requests, and business inquiries",
    icon: Mail,
    intro: "Simple ways to reach out for meaningful conversations and opportunities.",
    sampleHeading: "Open to connect",
    sampleBody: "Add email, inquiry forms, and preferred response channels for collaborations.",
  },
];
