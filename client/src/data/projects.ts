import { Bot, Briefcase, Cpu, Lightbulb, Package, Palette, Rocket, Smartphone, type LucideIcon } from "lucide-react";

export type ProjectItem = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  timeline: string;
  status: "Building" | "Concept" | "Active" | "Research" | "Completed";
  industry: string;
  summary: string;
  goal: string;
  tech: string[];
  links: { caseStudy?: string; demo?: string; github?: string };
  icon: LucideIcon;
  about: string;
  problem: string;
  users: string;
  vision: string;
  story: string;
  features: string[];
  design: { colors: string[]; typography: string; philosophy: string; brand: string };
  challenges: string[];
  lessons: string[];
  roadmap: string[];
  related: string[];
};

export const projectsPhilosophy = "I build projects to explore ideas, solve problems, and turn imagination into reality.";

export const projectsOverview = {
  categories: "Startups, AI Products, Design Concepts, Experiments",
  focus: "AI systems, product architecture, startup building, design systems",
  industries: ["AI", "Printing", "Productivity", "Communication", "Design"],
  strengths: "Idea-to-MVP execution, product systems, narrative-driven UX",
  philosophy: "Technology should help people work, create, and grow better.",
};

export const projects: ProjectItem[] = [
  {
    slug: "printeor",
    title: "Printeor",
    tagline: "Design-to-production platform for printing and packaging.",
    category: "Startup",
    timeline: "2025 - Present",
    status: "Building",
    industry: "Printing + AI",
    summary: "A platform that bridges creative design and real-world production workflows.",
    goal: "Reduce friction between design intent and production execution.",
    tech: ["React", "Tailwind CSS", "Node.js", "PostgreSQL", "AI"],
    links: { caseStudy: "#", demo: "#", github: "#" },
    icon: Package,
    about: "Printeor helps creators and businesses move from idea to printed product with clarity.",
    problem: "Design handoff to production is fragmented and error-prone.",
    users: "Designers, print operators, packaging teams.",
    vision: "A smart, collaborative printing ecosystem.",
    story: "Started from seeing repeated production errors and unclear communication loops.",
    features: ["Design spec workflows", "Production-ready checklists", "AI-assisted quality suggestions"],
    design: { colors: ["#6D28D9", "#F5EAD7", "#111827"], typography: "Modern geometric sans", philosophy: "Clarity-first interface", brand: "Practical, calm, professional" },
    challenges: ["Domain complexity", "Workflow variability", "Integration constraints"],
    lessons: ["Solve operations pain, not just UI pain", "System thinking is critical"],
    roadmap: ["MVP stabilization", "Team collaboration features", "Predictive quality insights"],
    related: ["offer-platform", "ai-workspace"],
  },
  {
    slug: "ai-messaging-platform",
    title: "AI Messaging Platform",
    tagline: "AI-powered communication workflows for faster responses.",
    category: "AI Project",
    timeline: "2025",
    status: "Active",
    industry: "Communication",
    summary: "Structured AI messaging system for support, updates, and customer communication.",
    goal: "Improve speed and consistency without losing human tone.",
    tech: ["AI", "Prompt Engineering", "React", "Node.js"],
    links: { caseStudy: "#", demo: "#" },
    icon: Bot,
    about: "Built to streamline repetitive communication loops across teams.",
    problem: "Manual response drafting slows operations and creates inconsistency.",
    users: "Startup teams, support ops, solo builders.",
    vision: "Human-aware communication systems with AI acceleration.",
    story: "Inspired by repeated communication bottlenecks in startup operations.",
    features: ["Prompt templates", "Tone guardrails", "Context-aware drafts"],
    design: { colors: ["#4F46E5", "#F8F5EE", "#0F172A"], typography: "Readable utility sans", philosophy: "Fast and context-rich", brand: "Smart but human" },
    challenges: ["Tone consistency", "Edge-case responses"],
    lessons: ["Workflow context matters more than raw AI capability"],
    roadmap: ["Multi-channel support", "AI memory", "Conversation analytics"],
    related: ["ai-bug-detection-startup", "ai-workspace"],
  },
  {
    slug: "ai-workspace",
    title: "AI Workspace",
    tagline: "A productivity workspace combining planning, execution, and AI support.",
    category: "Product",
    timeline: "2024 - 2025",
    status: "Concept",
    industry: "Productivity",
    summary: "Conceptual product where AI supports focus, planning, and output cycles.",
    goal: "Help builders stay consistent and organized.",
    tech: ["React", "Design Systems", "AI"],
    links: { caseStudy: "#" },
    icon: Briefcase,
    about: "Workspace concept to align thought, planning, and action.",
    problem: "People lose momentum between planning and doing.",
    users: "Founders, creators, independent professionals.",
    vision: "Personal operating system for builders.",
    story: "Emerged from productivity experiments and habit loops.",
    features: ["Goal-linked task system", "AI planning prompts", "Focus workflow views"],
    design: { colors: ["#7C3AED", "#EFE8DA", "#1F2937"], typography: "Calm sans", philosophy: "Reduce noise, increase action", brand: "Focused and intentional" },
    challenges: ["Avoiding complexity", "Behavior design"],
    lessons: ["Simple loops win over feature overload"],
    roadmap: ["Behavioral feedback loops", "Personal analytics"],
    related: ["printeor"],
  },
  {
    slug: "ontab",
    title: "ONTAB",
    tagline: "Smart context panel concept for faster decision workflows.",
    category: "Design Concept",
    timeline: "2026",
    status: "Research",
    industry: "Design + Productivity",
    summary: "A concept for reducing context-switching overhead in digital work.",
    goal: "Keep high-value context available at the point of action.",
    tech: ["UX", "System Architecture", "Prototype Design"],
    links: { caseStudy: "#" },
    icon: Smartphone,
    about: "ONTAB is a futuristic interaction concept focused on cognitive flow.",
    problem: "Frequent context switching reduces quality and speed.",
    users: "Knowledge workers, product teams.",
    vision: "Context-aware interfaces that think with users.",
    story: "Inspired by frustration with scattered tools and tab overload.",
    features: ["Context memory", "Inline knowledge panel", "Decision shortcuts"],
    design: { colors: ["#5B21B6", "#FFF8EE", "#111827"], typography: "Precision sans", philosophy: "Cognitive load reduction", brand: "Future minimal" },
    challenges: ["Interaction complexity", "Adoption behavior"],
    lessons: ["Great concepts require ruthless simplification"],
    roadmap: ["Interaction prototype", "Workflow testing"],
    related: ["ai-workspace"],
  },
  {
    slug: "offer-platform",
    title: "Offer Platform",
    tagline: "A platform for offer design, positioning, and conversion clarity.",
    category: "Startup",
    timeline: "2025",
    status: "Concept",
    industry: "Business",
    summary: "Tooling for creators and founders to structure offers with strategic clarity.",
    goal: "Increase conversion through better offer design.",
    tech: ["Product Strategy", "UI/UX", "React"],
    links: { demo: "#" },
    icon: Lightbulb,
    about: "Offer platform focused on positioning and communication quality.",
    problem: "Most founders struggle to express value clearly.",
    users: "Founders, consultants, creators.",
    vision: "A strategic offer engine for independent builders.",
    story: "Observed repeated messaging confusion in early-stage ventures.",
    features: ["Offer framework builder", "Positioning prompts", "Conversion checkpoints"],
    design: { colors: ["#6D28D9", "#F9F4E8", "#0B1220"], typography: "Bold modern sans", philosophy: "Strategy-first UI", brand: "Clarity and confidence" },
    challenges: ["Abstract strategy to practical UI", "Outcome measurement"],
    lessons: ["Positioning is a product problem too"],
    roadmap: ["Template marketplace", "Offer analytics"],
    related: ["printeor", "ai-messaging-platform"],
  },
  {
    slug: "ai-bug-detection-startup",
    title: "AI Bug Detection Startup",
    tagline: "Early detection of software issues through intelligent signal analysis.",
    category: "AI Project",
    timeline: "2026",
    status: "Research",
    industry: "AI + Developer Tools",
    summary: "Research-stage startup idea for proactive bug detection pipelines.",
    goal: "Help teams catch critical issues earlier.",
    tech: ["AI Infrastructure", "System Architecture", "Developer Tooling"],
    links: { caseStudy: "#" },
    icon: Cpu,
    about: "Concept around predictive detection patterns in development cycles.",
    problem: "Late bug detection causes costly regressions.",
    users: "Engineering teams, startups.",
    vision: "Shift quality left with intelligent detection systems.",
    story: "Started from repeated debugging bottlenecks across product cycles.",
    features: ["Risk scoring", "Signal aggregation", "Issue prediction"],
    design: { colors: ["#4338CA", "#F7F1E3", "#111827"], typography: "Technical sans", philosophy: "Precision over noise", brand: "Reliable intelligence" },
    challenges: ["Signal quality", "False positives", "Cross-codebase applicability"],
    lessons: ["Infrastructure depth is non-negotiable for AI reliability"],
    roadmap: ["Dataset design", "Prototype scoring model", "Early pilot"],
    related: ["ai-messaging-platform"],
  },
];

export const featuredProjects = projects.slice(0, 3);
export const startupProjects = projects.filter((p) => p.category === "Startup" || p.category === "AI Project");
export const experimentalIdeas = projects.filter((p) => p.status === "Concept" || p.status === "Research");

export const technologyMapNodes = ["AI", "React", "Tailwind CSS", "Product Design", "UI/UX", "System Architecture", "Backend Systems", "Hardware Concepts"];
export const technologyMapEdges: Array<[string, string]> = [
  ["AI", "System Architecture"],
  ["AI", "Product Design"],
  ["React", "UI/UX"],
  ["Tailwind CSS", "UI/UX"],
  ["Backend Systems", "System Architecture"],
  ["Product Design", "UI/UX"],
  ["System Architecture", "Hardware Concepts"],
];

export const projectTimeline = [
  "First idea explorations",
  "Early experiments",
  "MVP creation",
  "Design iterations",
  "Product evolution",
  "Future roadmap expansion",
];

export const collaboration = {
  open: "Open to collaborations with builders, designers, and product-minded engineers.",
  lookingFor: ["AI engineers", "Product strategists", "Design collaborators"],
  contributions: "Interested in community-led product development and practical open-source tools.",
};

export const currentProjectFocus = ["Printeor execution", "AI product flows", "Startup systems", "Design systems evolution"];

export const futureVision = {
  products: ["AI-native builder tools", "Smart collaboration products", "Learning and work ecosystems"],
  ambitions: "Build a connected ecosystem of products that compound user growth.",
  explore: ["AI infrastructure", "Hardware-linked interfaces", "Behavior systems"],
  ecosystem: "A founder-led product universe focused on meaningful progress.",
};

export const projectFilters = ["All", "Startups", "Products", "AI Projects", "Design Concepts", "Experiments", "Active", "Completed", "Future Ideas"];
