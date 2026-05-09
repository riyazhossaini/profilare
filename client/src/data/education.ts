import { BookOpen, Bot, Brain, Briefcase, Building2, Cpu, GraduationCap, Handshake, Languages, Lightbulb, MessageSquare, Palette, Rocket, type LucideIcon } from "lucide-react";

export type FormalEducationItem = {
  slug: string;
  institution: string;
  degree: string;
  timeline: string;
  story: string;
  skills: string[];
  experiences: string[];
  reflection: string;
  milestones: string[];
};

export type SelfLearningItem = {
  slug: string;
  topic: string;
  icon: LucideIcon;
  why: string;
  status: string;
  level: string;
  resources: string[];
  philosophy: string;
  timeline: Array<{ phase: string; detail: string }>;
  applications: string[];
  futureVision: string;
};

export const educationPhilosophy =
  "I believe education is not limited to institutions. Learning is a lifelong process of curiosity, exploration, and creation.";

export const educationOverview = {
  fields: "AI, Product Design, Startups, Communication, Technology",
  current: "AI systems, product architecture, startup strategy",
  style: "Project-based self learning",
  methods: ["Building projects", "Reading", "Research", "Observation", "Practice"],
  philosophy: "I focus on understanding systems deeply instead of memorizing information.",
};

export const formalEducation: FormalEducationItem[] = [
  {
    slug: "st-michaels-school",
    institution: "St. Michael's School",
    degree: "Higher Secondary",
    timeline: "2018 - 2022",
    story: "This stage built discipline, curiosity, and communication habits beyond academics.",
    skills: ["Consistency", "Presentation", "Structured learning"],
    experiences: ["Led small student projects", "Participated in debate and writing"],
    reflection: "School taught me that learning style matters as much as syllabus.",
    milestones: ["First public presentation", "Started writing notes", "Built self-learning routine"],
  },
  {
    slug: "city-college",
    institution: "City College",
    degree: "Undergraduate Studies",
    timeline: "2022 - Present",
    story: "College expanded exposure to people, ideas, and independent thinking.",
    skills: ["Critical thinking", "Collaboration", "Problem solving"],
    experiences: ["Worked on practical assignments", "Explored startup and product thinking"],
    reflection: "I learned to connect theory with real-world outcomes.",
    milestones: ["Started product experiments", "Shifted to project-first learning", "Built portfolio systems"],
  },
];

export const selfLearningTopics: SelfLearningItem[] = [
  {
    slug: "artificial-intelligence",
    topic: "Artificial Intelligence",
    icon: Bot,
    why: "To understand intelligent systems and build useful AI-driven products.",
    status: "Active",
    level: "Intermediate",
    resources: ["OpenAI docs", "AI builder communities", "Project experiments"],
    philosophy: "Learn by building practical AI workflows, not only consuming content.",
    timeline: [
      { phase: "Started learning", detail: "Explored prompts, models, and AI tools." },
      { phase: "Milestones", detail: "Built AI features into product flows." },
      { phase: "Current stage", detail: "Focusing on architecture and reliability." },
      { phase: "Future goals", detail: "Build production-grade AI systems." },
    ],
    applications: ["AI profile writing helper", "Workflow assistants", "Idea validation tools"],
    futureVision: "Create human-centered AI products that improve learning and work.",
  },
  {
    slug: "product-design",
    topic: "Product Design",
    icon: Palette,
    why: "To shape meaningful experiences from user problem to interface.",
    status: "Active",
    level: "Intermediate",
    resources: ["Figma practice", "UX case studies", "Design critiques"],
    philosophy: "Design should simplify decisions and reduce user friction.",
    timeline: [
      { phase: "Started learning", detail: "Learned UX fundamentals and design hierarchy." },
      { phase: "Milestones", detail: "Designed complete profile and skills systems." },
      { phase: "Current stage", detail: "Improving systems-level design thinking." },
      { phase: "Future goals", detail: "Master AI-native product design." },
    ],
    applications: ["Profile hub architecture", "Card systems", "Story-first page design"],
    futureVision: "Design products that feel clear, calm, and deeply useful.",
  },
  {
    slug: "startups",
    topic: "Startups",
    icon: Rocket,
    why: "To learn execution under uncertainty and create real value.",
    status: "Active",
    level: "Intermediate",
    resources: ["Founder essays", "Case studies", "Startup podcasts"],
    philosophy: "Build fast, learn honestly, iterate with purpose.",
    timeline: [
      { phase: "Started learning", detail: "Studied startup journeys and product launches." },
      { phase: "Milestones", detail: "Tested ideas through mini product experiments." },
      { phase: "Current stage", detail: "Developing stronger strategy and execution loops." },
      { phase: "Future goals", detail: "Launch scalable and sustainable ventures." },
    ],
    applications: ["Opportunity framing", "Roadmap decisions", "Positioning"],
    futureVision: "Become a founder who ships thoughtful products consistently.",
  },
  {
    slug: "technology",
    topic: "Technology",
    icon: Cpu,
    why: "To build directly and convert ideas into functional systems.",
    status: "Active",
    level: "Intermediate",
    resources: ["Documentation", "Open-source repos", "Hands-on coding"],
    philosophy: "Technical depth creates creative freedom.",
    timeline: [
      { phase: "Started learning", detail: "Learned frontend and tool fundamentals." },
      { phase: "Milestones", detail: "Built multi-page personal platform." },
      { phase: "Current stage", detail: "Strengthening architecture decisions." },
      { phase: "Future goals", detail: "Build robust full-stack systems." },
    ],
    applications: ["Profilare pages", "UI components", "Feature prototyping"],
    futureVision: "Build reliable technology platforms for modern creators.",
  },
  { slug: "business", topic: "Business", icon: Briefcase, why: "To understand value, markets, and long-term decisions.", status: "In Progress", level: "Beginner", resources: ["Business books", "Market analysis", "Founder strategy talks"], philosophy: "Business thinking sharpens product choices.", timeline: [{ phase: "Started learning", detail: "Learned positioning and market basics." }, { phase: "Milestones", detail: "Applied frameworks to product decisions." }, { phase: "Current stage", detail: "Improving strategic judgment." }, { phase: "Future goals", detail: "Develop stronger founder-level business depth." }], applications: ["Product prioritization", "Messaging"], futureVision: "Align product craft with business sustainability." },
  { slug: "english-writing", topic: "English Writing", icon: MessageSquare, why: "To communicate ideas clearly and globally.", status: "Active", level: "Intermediate", resources: ["Daily writing", "Editing loops", "Public notes"], philosophy: "Write to clarify thinking and share value.", timeline: [{ phase: "Started learning", detail: "Built daily writing habit." }, { phase: "Milestones", detail: "Published structured reflections." }, { phase: "Current stage", detail: "Improving precision and tone." }, { phase: "Future goals", detail: "Reach advanced persuasive clarity." }], applications: ["Product copy", "Public thinking"], futureVision: "Use writing as a leadership and teaching tool." },
  { slug: "communication", topic: "Communication", icon: Handshake, why: "To collaborate better and lead with clarity.", status: "In Progress", level: "Intermediate", resources: ["Framework practice", "Feedback sessions"], philosophy: "Clear communication reduces friction and improves execution.", timeline: [{ phase: "Started learning", detail: "Focused on concise explanation." }, { phase: "Milestones", detail: "Improved async updates and notes." }, { phase: "Current stage", detail: "Developing stronger verbal clarity." }, { phase: "Future goals", detail: "Lead discussions with better influence." }], applications: ["Team updates", "Strategy articulation"], futureVision: "Build communication that drives alignment quickly." },
  { slug: "hardware", topic: "Hardware", icon: Cpu, why: "To understand physical systems beyond software.", status: "Early Stage", level: "Beginner", resources: ["Intro electronics", "Hardware explainers"], philosophy: "Learning hardware expands builder perspective.", timeline: [{ phase: "Started learning", detail: "Explored hardware fundamentals." }, { phase: "Milestones", detail: "Mapped first learning framework." }, { phase: "Current stage", detail: "Foundational exploration." }, { phase: "Future goals", detail: "Build first hardware-linked prototype." }], applications: ["Future product research"], futureVision: "Bridge software and hardware for real-world systems." },
  { slug: "economics", topic: "Economics", icon: Brain, why: "To think better about incentives and long-term outcomes.", status: "Early Stage", level: "Beginner", resources: ["Economics primers", "Market podcasts"], philosophy: "Economics improves decision quality under constraints.", timeline: [{ phase: "Started learning", detail: "Learned incentive and market basics." }, { phase: "Milestones", detail: "Applied to product strategy notes." }, { phase: "Current stage", detail: "Building foundational understanding." }, { phase: "Future goals", detail: "Use economics in founder decisions." }], applications: ["Strategy framing", "Trade-off analysis"], futureVision: "Make sharper strategic decisions at scale." },
];

export const coursesAndCerts = [
  { provider: "Coursera", name: "AI for Everyone", timeline: "2025", skills: ["AI foundations", "Product thinking"] },
  { provider: "Udemy", name: "React + Tailwind Bootcamp", timeline: "2024", skills: ["React", "UI development"] },
  { provider: "Google", name: "UX Design Workshop", timeline: "2025", skills: ["UX process", "Research"] },
  { provider: "Y Combinator Library", name: "Startup School Modules", timeline: "2025", skills: ["Startup strategy", "Execution"] },
];

export const currentLearning = [
  { topic: "AI systems", progress: 78, weeklyGoal: "4 deep sessions" },
  { topic: "Product architecture", progress: 70, weeklyGoal: "3 architecture drills" },
  { topic: "Communication", progress: 66, weeklyGoal: "3 practice sessions" },
  { topic: "Hardware systems", progress: 36, weeklyGoal: "3 lessons" },
  { topic: "Startup strategy", progress: 68, weeklyGoal: "2 market analyses" },
];

export const knowledgeNodes = ["AI", "Programming", "Mathematics", "Product Design", "Business", "Psychology", "Communication"];
export const knowledgeEdges: Array<[string, string]> = [
  ["AI", "Programming"],
  ["AI", "Mathematics"],
  ["AI", "Product Design"],
  ["AI", "Business"],
  ["Business", "Psychology"],
  ["Communication", "Business"],
];

export const educationTimeline = [
  "School years",
  "Discovering technology",
  "Learning startups",
  "Building projects",
  "Learning AI",
  "Expanding into hardware and economics",
];

export const futureLearningGoals = ["Robotics", "Advanced AI systems", "Economics", "Hardware engineering"];

export const resourcesSection = {
  books: ["Atomic Habits", "The Lean Startup", "Design of Everyday Things"],
  websites: ["OpenAI Docs", "YC Library", "A16Z"],
  youtube: ["Two Minute Papers", "Fireship", "Y Combinator"],
  thinkers: ["Paul Graham", "Naval Ravikant", "Don Norman"],
  podcasts: ["Acquired", "Lenny's Podcast"],
};
