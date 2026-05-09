import { BarChart3, Briefcase, Bug, Cpu, Flag, FlaskConical, Lightbulb, MessageSquare, Rocket, Users, type LucideIcon } from "lucide-react";

export type ExperienceItem = {
  slug: string;
  role: string;
  org: string;
  timeline: string;
  category: "Work" | "Startup" | "Freelance" | "Project" | "Leadership" | "Experiment" | "Journey";
  status: "Building" | "Active" | "Completed";
  short: string;
  impact: string;
  skills: string[];
  problem: string;
  whyStarted: string;
  responsibilities: string[];
  challenges: string[];
  achievements: string[];
  reflection: string;
  related: string[];
  icon: LucideIcon;
};

export const experiencePhilosophy =
  "I believe experience is built by creating, experimenting, solving problems, and continuously growing.";

export const experienceOverview = {
  areas: "Product building, startup execution, systems thinking, communication",
  strengths: "Zero-to-one building, design-led execution, strategic iteration",
  focus: "AI systems, product architecture, startup strategy",
  industries: ["Technology", "Printing", "Product Design", "AI", "Startups"],
  favoriteWork: "Building products from idea to execution.",
};

export const timelineItems = [
  {
    year: "2019",
    title: "Family business exposure",
    story: "Learned responsibility, operations, and customer understanding.",
    skills: ["Ownership", "Execution"],
    achievement: "Built discipline in real-world workflows.",
    slug: "family-business-journey",
  },
  {
    year: "2021",
    title: "Technology learning phase",
    story: "Started learning design and development through project work.",
    skills: ["Frontend", "Design"],
    achievement: "Shipped first usable product prototypes.",
    slug: "tech-learning-phase",
  },
  {
    year: "2023",
    title: "Startup experimentation",
    story: "Began building startup concepts and validation loops.",
    skills: ["Startup Thinking", "Market Research"],
    achievement: "Validated product directions with real users.",
    slug: "startup-experimentation",
  },
  {
    year: "2025",
    title: "AI product exploration",
    story: "Integrated AI into workflows and product experiences.",
    skills: ["AI", "Product Architecture"],
    achievement: "Built practical AI-powered features.",
    slug: "ai-product-exploration",
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    slug: "printeor",
    role: "Founder",
    org: "Printeor",
    timeline: "2025 - Present",
    category: "Startup",
    status: "Building",
    short: "Identity-first profile platform focused on personal growth storytelling.",
    impact: "Designed and shipped a multi-section builder journey platform.",
    skills: ["Product Design", "Startup Strategy", "React", "Communication"],
    problem: "Most profile pages are shallow and don’t capture real identity or growth.",
    whyStarted: "Wanted a platform that tells the full builder story, not just links and titles.",
    responsibilities: ["Product vision and prioritization", "UI architecture", "Story structure design", "Feature implementation"],
    challenges: ["Balancing depth with clean UX", "Keeping structure without feeling rigid", "Avoiding generic profile templates"],
    achievements: ["Shipped profile hub + deep section routes", "Built scalable component system", "Created story-driven identity and skills flows"],
    reflection: "This experience taught me to combine emotional storytelling with product structure.",
    related: ["ai-messaging-platform", "productivity-workspace"],
    icon: Rocket,
  },
  {
    slug: "ai-messaging-platform",
    role: "Product Builder",
    org: "AI Messaging Platform",
    timeline: "2025",
    category: "Startup",
    status: "Active",
    short: "Conversation workflows powered by AI for faster support and response systems.",
    impact: "Mapped high-value message flows and built AI-assisted response patterns.",
    skills: ["AI", "System Thinking", "Prompt Design", "UX"],
    problem: "Manual communication workflows were slow and inconsistent.",
    whyStarted: "Wanted to make communication faster without losing quality.",
    responsibilities: ["Conversation architecture", "Prompt logic", "Flow testing", "Usability checks"],
    challenges: ["Maintaining response quality", "Handling edge cases", "Balancing automation with human tone"],
    achievements: ["Designed reusable response patterns", "Improved response speed in test workflows"],
    reflection: "AI is powerful when grounded in real user communication needs.",
    related: ["printeor", "ai-bug-detection-startup"],
    icon: MessageSquare,
  },
  {
    slug: "productivity-workspace",
    role: "Product Experiment Lead",
    org: "Productivity Workspace",
    timeline: "2024 - 2025",
    category: "Project",
    status: "Completed",
    short: "Experimental workspace concept for focus, planning, and execution routines.",
    impact: "Translated personal productivity methods into a productized framework.",
    skills: ["UX", "Systems Design", "Behavior Design"],
    problem: "People struggle with consistency across planning and doing.",
    whyStarted: "Wanted to build a system that supports daily execution loops.",
    responsibilities: ["Workflow modeling", "Interaction design", "Prototype testing"],
    challenges: ["Avoiding feature overload", "Designing for behavior, not novelty"],
    achievements: ["Created structured execution loops", "Validated usability with iterative prototypes"],
    reflection: "Simple systems with strong habits outperform complex tools.",
    related: ["printeor"],
    icon: BarChart3,
  },
  {
    slug: "ai-bug-detection-startup",
    role: "Startup Explorer",
    org: "AI Bug Detection Startup",
    timeline: "2026",
    category: "Experiment",
    status: "Building",
    short: "Concept for identifying software issues early using intelligent signal detection.",
    impact: "Researched architecture and defined early MVP scope.",
    skills: ["AI Systems", "Technical Strategy", "Problem Framing"],
    problem: "Teams lose time finding issues late in development cycles.",
    whyStarted: "Wanted to reduce debugging friction through smarter detection systems.",
    responsibilities: ["Market problem analysis", "MVP architecture", "Feasibility exploration"],
    challenges: ["Data quality assumptions", "Generalization across codebases"],
    achievements: ["Built concept architecture", "Defined validation hypothesis"],
    reflection: "Big ideas require patient validation and clear technical constraints.",
    related: ["ai-messaging-platform"],
    icon: Bug,
  },
  {
    slug: "freelance-product-work",
    role: "Freelance Product Designer",
    org: "Independent",
    timeline: "2023 - 2024",
    category: "Freelance",
    status: "Completed",
    short: "Worked on small product and design engagements for early-stage builders.",
    impact: "Helped clients clarify product direction and interface decisions.",
    skills: ["Client Communication", "UX", "Delivery"],
    problem: "Founders often lack clarity in early product positioning.",
    whyStarted: "Wanted real user-facing constraints and practical execution exposure.",
    responsibilities: ["Discovery calls", "Wireframes", "Feedback iteration"],
    challenges: ["Scope management", "Tight timelines"],
    achievements: ["Delivered fast concept-to-interface cycles"],
    reflection: "Freelance work sharpened communication and prioritization skills.",
    related: ["productivity-workspace"],
    icon: Briefcase,
  },
];

export const startupItems = experienceItems.filter((i) => i.category === "Startup" || i.category === "Experiment");
export const personalProjects = experienceItems.filter((i) => i.category === "Project" || i.category === "Journey");

export const leadership = {
  style: "Calm, systems-driven, and ownership-oriented.",
  responsibilityAreas: ["Product direction", "Execution quality", "Decision clarity", "Team alignment"],
  collaboration: "I prefer clear async communication and fast feedback loops.",
  decisionMaking: "Evidence + intuition + long-term tradeoff awareness.",
  problemSolving: "Break problems into constraints, test quickly, iterate intentionally.",
};

export const skillsFromExperience = [
  { exp: "Printeor", skills: ["Product Design", "Business Thinking", "System Architecture", "Communication", "Startup Execution"] },
  { exp: "AI Messaging Platform", skills: ["AI", "Prompt Design", "UX", "Workflow Design"] },
  { exp: "Productivity Workspace", skills: ["Behavior Design", "Product Thinking", "Research"] },
];

export const currentFocus = ["Building AI systems", "Product architecture", "Startup strategy", "Learning communication"];

export const stats = [
  { label: "Projects built", value: "14+" },
  { label: "Ideas explored", value: "40+" },
  { label: "Years learning", value: "6+" },
  { label: "Products designed", value: "20+" },
  { label: "Technologies learned", value: "15+" },
];

export const lessons = [
  { title: "Overbuilding early", lesson: "Start small, validate faster." },
  { title: "Lack of prioritization", lesson: "Clear scope is a superpower." },
  { title: "Communication gaps", lesson: "Strong updates prevent silent drift." },
];

export const futureDirection = {
  nextExperiences: ["AI-native product leadership", "Cross-functional startup execution", "Hardware + software exploration"],
  career: "Builder-founder path focused on meaningful products.",
  startupGoals: "Launch durable products with strong user value and sustainable growth.",
  longTerm: "Become a founder known for thoughtful systems and high-quality execution.",
};

export const experienceFilters = ["All", "Work Experience", "Startup Experience", "Projects", "Freelance", "Leadership", "Experiments", "Personal Journey"];
