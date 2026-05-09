export type TemplateCategory =
  | "All"
  | "Full Profile"
  | "Minimal"
  | "Creator"
  | "Student"
  | "Founder"
  | "Portfolio"
  | "Link Page";

export type TemplateItem = {
  id: string;
  name: string;
  description: string;
  categories: TemplateCategory[];
  sections: string[];
};

export const templateCategories: TemplateCategory[] = [
  "All",
  "Full Profile",
  "Minimal",
  "Creator",
  "Student",
  "Founder",
  "Portfolio",
  "Link Page",
];

export const templates: TemplateItem[] = [
  {
    id: "complete-identity",
    name: "Complete Identity Template",
    description: "A full structured identity architecture for people who want complete profile depth.",
    categories: ["Full Profile"],
    sections: ["Identity", "Skills", "Education", "Experience", "Projects", "Content", "Links", "Contact"],
  },
  {
    id: "minimal-link",
    name: "Minimal Link Template",
    description: "A clean and focused profile for quick social identity and links.",
    categories: ["Minimal", "Link Page"],
    sections: ["Identity", "Links"],
  },
  {
    id: "student-profile",
    name: "Student Profile Template",
    description: "Perfect for students sharing growth, learning, and project proof.",
    categories: ["Student"],
    sections: ["Identity", "Education", "Skills", "Projects", "Contact"],
  },
  {
    id: "founder-template",
    name: "Founder Template",
    description: "Founder-focused narrative around mission, execution, and startup direction.",
    categories: ["Founder"],
    sections: ["Identity", "Mission", "Experience", "Projects", "Links", "Contact"],
  },
  {
    id: "creator-template",
    name: "Creator Template",
    description: "Content-first digital identity for creators, writers, and public thinkers.",
    categories: ["Creator"],
    sections: ["Identity", "Content", "Links", "Contact"],
  },
  {
    id: "portfolio-template",
    name: "Portfolio Template",
    description: "A polished profile for showcasing projects, capabilities, and work context.",
    categories: ["Portfolio"],
    sections: ["Identity", "Skills", "Projects", "Experience", "Contact"],
  },
  {
    id: "simple-contact",
    name: "Simple Contact Template",
    description: "Simple profile for personal identity and direct communication.",
    categories: ["Minimal"],
    sections: ["Identity", "Contact"],
  },
  {
    id: "professional-cv",
    name: "Professional CV Template",
    description: "Professional profile with stronger resume-style structure and clarity.",
    categories: ["Portfolio", "Full Profile"],
    sections: ["Identity", "Education", "Experience", "Skills", "Contact"],
  },
];

