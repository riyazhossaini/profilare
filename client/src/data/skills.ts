import {
  BarChart3,
  Brain,
  Briefcase,
  Brush,
  Cpu,
  Globe,
  GraduationCap,
  Languages,
  Lightbulb,
  Megaphone,
  Monitor,
  PenTool,
  Rocket,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type Skill = {
  slug: string;
  name: string;
  icon: LucideIcon;
  summary: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  progress: number;
  learningSince: string;
  currentUsage: string;
  personalConnection: string;
  why: string;
  timeline: Array<{ phase: string; detail: string }>;
  resources: string[];
  realWorldUsage: string[];
  futurePlans: string;
  relatedSkills: string[];
};

export type SkillCategory = {
  key: string;
  title: string;
  icon: LucideIcon;
  description: string;
  skills: Skill[];
};

const makeSkill = (skill: Skill): Skill => skill;

export const skillsPhilosophy = "I believe skills are built through curiosity, consistency, and real-world creation.";

export const skillCategories: SkillCategory[] = [
  {
    key: "technical",
    title: "Technical Skills",
    icon: Cpu,
    description: "Core product-building and systems skills.",
    skills: [
      makeSkill({ slug: "artificial-intelligence", name: "AI", icon: Brain, summary: "Learning how AI systems work and how to build useful AI-driven products.", level: "Intermediate", progress: 72, learningSince: "2025", currentUsage: "Used in product experiments and workflow automation.", personalConnection: "AI helps me turn ideas into scalable systems faster.", why: "I was inspired by AI's ability to multiply creative and technical output.", timeline: [{ phase: "Started learning", detail: "Explored prompting, models, and practical AI use cases." }, { phase: "Key milestones", detail: "Built early AI features and integrated API workflows." }, { phase: "Current level", detail: "Intermediate with product-oriented implementation." }, { phase: "Future goals", detail: "Master AI systems thinking and production-quality AI design." }], resources: ["OpenAI docs", "Founders using AI in production", "Project-first practice"], realWorldUsage: ["AI-assisted profile writing systems", "Idea validation workflows", "User support prompt systems"], futurePlans: "Build AI-native products that improve daily learning and work.", relatedSkills: ["Product Design", "System Thinking", "Frontend Development"] }),
      makeSkill({ slug: "product-design", name: "Product Design", icon: PenTool, summary: "Designing useful, intuitive experiences that solve real user problems.", level: "Intermediate", progress: 78, learningSince: "2024", currentUsage: "Used in every product concept and interface decision.", personalConnection: "Design is how I make complex ideas feel simple and human.", why: "I learned design to bridge user needs and product outcomes.", timeline: [{ phase: "Started learning", detail: "Began with UI fundamentals and usability principles." }, { phase: "Key milestones", detail: "Designed complete product flows and visual systems." }, { phase: "Current level", detail: "Confident in UX and interaction framing." }, { phase: "Future goals", detail: "Advance toward AI product design leadership." }], resources: ["Figma practice", "UX case studies", "Live product teardown sessions"], realWorldUsage: ["Profile hub interaction patterns", "Skill journey page structures"], futurePlans: "Design emotionally intelligent product systems with clear utility.", relatedSkills: ["UI/UX", "System Thinking", "Writing"] }),
      makeSkill({ slug: "frontend-development", name: "Frontend Development", icon: Monitor, summary: "Building responsive, modern user interfaces using React ecosystem.", level: "Intermediate", progress: 74, learningSince: "2024", currentUsage: "Used to build fast product prototypes and shipping-ready interfaces.", personalConnection: "Frontend is where product thinking becomes real for users.", why: "I wanted to create directly without waiting on handoffs.", timeline: [{ phase: "Started learning", detail: "Learned React and component architecture basics." }, { phase: "Key milestones", detail: "Shipped multi-page profile platform UI." }, { phase: "Current level", detail: "Strong in reusable components and responsive layouts." }, { phase: "Future goals", detail: "Improve architecture depth and performance patterns." }], resources: ["Official docs", "Build-in-public repos", "Hands-on feature building"], realWorldUsage: ["Profilare hub and section pages", "Interactive skill cards"], futurePlans: "Build polished frontends that scale with product complexity.", relatedSkills: ["React", "Tailwind CSS", "UI/UX"] }),
      makeSkill({ slug: "ui-ux", name: "UI/UX", icon: Brush, summary: "Creating clear interfaces and smooth user journeys.", level: "Intermediate", progress: 70, learningSince: "2024", currentUsage: "Applied to profile card systems and page-level information design.", personalConnection: "Good UX reduces confusion and builds trust instantly.", why: "I wanted users to feel clarity and confidence when using products.", timeline: [{ phase: "Started learning", detail: "Studied layout, hierarchy, and accessibility." }, { phase: "Key milestones", detail: "Designed multi-section storytelling interfaces." }, { phase: "Current level", detail: "Comfortable with practical UX trade-offs." }, { phase: "Future goals", detail: "Strengthen advanced UX research and testing." }], resources: ["Design systems", "User behavior analysis", "Product critiques"], realWorldUsage: ["Navigation and interaction structures", "Section card hierarchy"], futurePlans: "Build cleaner and more adaptive UX flows.", relatedSkills: ["Product Design", "Visual Thinking", "Communication"] }),
      makeSkill({ slug: "system-thinking", name: "System Thinking", icon: BarChart3, summary: "Connecting ideas, constraints, and outcomes into coherent systems.", level: "Intermediate", progress: 68, learningSince: "2025", currentUsage: "Used for roadmap planning and feature prioritization.", personalConnection: "System thinking helps me avoid shallow, short-term decisions.", why: "I needed a way to make better long-term product decisions.", timeline: [{ phase: "Started learning", detail: "Mapped workflows and dependencies across projects." }, { phase: "Key milestones", detail: "Created reusable planning and execution loops." }, { phase: "Current level", detail: "Growing confidence in strategic synthesis." }, { phase: "Future goals", detail: "Apply systems thinking to startup-scale decisions." }], resources: ["Mental model books", "Strategy essays", "Post-project reflection"], realWorldUsage: ["Feature architecture planning", "Learning system design"], futurePlans: "Use systems thinking for product and company-building strategy.", relatedSkills: ["Business", "Product Strategy", "AI"] }),
    ],
  },
  {
    key: "business",
    title: "Business Skills",
    icon: Briefcase,
    description: "Strategic and market-facing thinking skills.",
    skills: [
      makeSkill({ slug: "startup-thinking", name: "Startup Thinking", icon: Rocket, summary: "Building under constraints with speed and focus.", level: "Intermediate", progress: 71, learningSince: "2025", currentUsage: "Applied to product decisions and market experiments.", personalConnection: "Startup thinking keeps me close to real outcomes.", why: "I wanted to learn how ideas survive in real markets.", timeline: [{ phase: "Started learning", detail: "Read founder playbooks and observed startup execution." }, { phase: "Key milestones", detail: "Applied lean validation in small product bets." }, { phase: "Current level", detail: "Comfortable with early-stage decision trade-offs." }, { phase: "Future goals", detail: "Build strong startup execution habits at scale." }], resources: ["Founder essays", "Case studies", "Market testing practice"], realWorldUsage: ["Feature prioritization", "Early traction planning"], futurePlans: "Become stronger in zero-to-one execution.", relatedSkills: ["Product Strategy", "Market Research"] }),
      makeSkill({ slug: "product-strategy", name: "Product Strategy", icon: Lightbulb, summary: "Choosing what to build, for whom, and why now.", level: "Intermediate", progress: 69, learningSince: "2025", currentUsage: "Used in roadmap and positioning decisions.", personalConnection: "Strategy gives direction to effort and reduces waste.", why: "I needed frameworks for clearer decisions.", timeline: [{ phase: "Started learning", detail: "Learned core product-market fit concepts." }, { phase: "Key milestones", detail: "Connected user needs with roadmap choices." }, { phase: "Current level", detail: "Growing confidence in strategic prioritization." }, { phase: "Future goals", detail: "Master product strategy for long-term bets." }], resources: ["Product books", "Startup teardown videos"], realWorldUsage: ["Skill page planning", "Section roadmap planning"], futurePlans: "Build strategic clarity into every product cycle.", relatedSkills: ["System Thinking", "Branding"] }),
      makeSkill({ slug: "market-research", name: "Market Research", icon: Globe, summary: "Understanding users, categories, and opportunity gaps.", level: "Beginner", progress: 58, learningSince: "2025", currentUsage: "Used for positioning and user understanding.", personalConnection: "Research helps me build with context, not assumptions.", why: "I wanted to reduce blind spots before building.", timeline: [{ phase: "Started learning", detail: "Studied user interviews and competitive analysis." }, { phase: "Key milestones", detail: "Created structured market notes for product ideas." }, { phase: "Current level", detail: "Early but improving." }, { phase: "Future goals", detail: "Build stronger user insight systems." }], resources: ["Public interviews", "Competitive landscape mapping"], realWorldUsage: ["Persona shaping", "Opportunity framing"], futurePlans: "Make research a default part of product cycles.", relatedSkills: ["Startup Thinking", "Branding"] }),
      makeSkill({ slug: "branding", name: "Branding", icon: Sparkles, summary: "Crafting positioning and identity that feels clear and memorable.", level: "Beginner", progress: 56, learningSince: "2025", currentUsage: "Used in product tone and message consistency.", personalConnection: "Branding helps products feel intentional.", why: "I wanted product communication to feel cohesive.", timeline: [{ phase: "Started learning", detail: "Studied brand voice and category narratives." }, { phase: "Key milestones", detail: "Defined identity language for project pages." }, { phase: "Current level", detail: "Foundational and evolving." }, { phase: "Future goals", detail: "Build stronger narrative-brand systems." }], resources: ["Brand case studies", "Copy frameworks"], realWorldUsage: ["Profile messaging", "Section narrative consistency"], futurePlans: "Develop stronger strategic brand thinking.", relatedSkills: ["Writing", "Product Strategy"] }),
    ],
  },
  {
    key: "creative",
    title: "Creative Skills",
    icon: Brush,
    description: "Narrative and visual expression skills.",
    skills: [
      makeSkill({ slug: "writing", name: "Writing", icon: PenTool, summary: "Turning ideas into clear and usable language.", level: "Intermediate", progress: 73, learningSince: "2024", currentUsage: "Used in product copy, notes, and public posts.", personalConnection: "Writing sharpens my thinking and communication.", why: "I needed a better way to explain and influence.", timeline: [{ phase: "Started learning", detail: "Wrote short daily notes." }, { phase: "Key milestones", detail: "Published structured project writeups." }, { phase: "Current level", detail: "Consistent and improving." }, { phase: "Future goals", detail: "Write with stronger clarity and voice." }], resources: ["Writing in public", "Editing loops"], realWorldUsage: ["Profile story sections", "Skill detail narratives"], futurePlans: "Use writing to build trust and thought leadership.", relatedSkills: ["Communication", "Public Thinking"] }),
      makeSkill({ slug: "storytelling", name: "Storytelling", icon: Megaphone, summary: "Framing ideas in emotionally resonant, memorable ways.", level: "Beginner", progress: 60, learningSince: "2025", currentUsage: "Used in identity and portfolio narratives.", personalConnection: "Storytelling helps people connect with meaning, not just facts.", why: "I wanted products and ideas to feel human.", timeline: [{ phase: "Started learning", detail: "Studied narrative structures." }, { phase: "Key milestones", detail: "Applied storytelling to profile sections." }, { phase: "Current level", detail: "Early but applied." }, { phase: "Future goals", detail: "Build stronger storytelling for products." }], resources: ["Creator essays", "Story frameworks"], realWorldUsage: ["About and Identity flow", "Project case narrative"], futurePlans: "Combine storytelling with product strategy.", relatedSkills: ["Writing", "Branding"] }),
      makeSkill({ slug: "visual-thinking", name: "Visual Thinking", icon: Brush, summary: "Explaining complex ideas through clear visual structures.", level: "Intermediate", progress: 67, learningSince: "2024", currentUsage: "Used in layout systems and concept communication.", personalConnection: "Visual thinking helps me reason through complexity.", why: "I wanted faster alignment in product decisions.", timeline: [{ phase: "Started learning", detail: "Mapped ideas visually in simple frameworks." }, { phase: "Key milestones", detail: "Created visual systems for profile architecture." }, { phase: "Current level", detail: "Useful in everyday planning." }, { phase: "Future goals", detail: "Improve advanced visual synthesis." }], resources: ["Design systems", "Diagramming practice"], realWorldUsage: ["Page architecture", "Information hierarchy"], futurePlans: "Use visuals to improve strategy communication.", relatedSkills: ["Product Design", "System Thinking"] }),
    ],
  },
  {
    key: "communication",
    title: "Communication Skills",
    icon: Megaphone,
    description: "Skills for clarity, expression, and influence.",
    skills: [
      makeSkill({ slug: "english-writing", name: "English Writing", icon: PenTool, summary: "Improving precision and confidence in written English.", level: "Intermediate", progress: 70, learningSince: "2024", currentUsage: "Used in public writing and product documentation.", personalConnection: "Stronger English helps me access global opportunities.", why: "I wanted to communicate ideas with global clarity.", timeline: [{ phase: "Started learning", detail: "Daily writing and rewrite sessions." }, { phase: "Key milestones", detail: "Published clear long-form posts." }, { phase: "Current level", detail: "Solid and improving quickly." }, { phase: "Future goals", detail: "Reach high-level persuasive writing." }], resources: ["Writing prompts", "Feedback loops"], realWorldUsage: ["Profile pages", "Product communication"], futurePlans: "Build a high-trust written voice.", relatedSkills: ["Writing", "Public Thinking"] }),
      makeSkill({ slug: "communication", name: "Communication", icon: Megaphone, summary: "Expressing ideas clearly across product and business contexts.", level: "Intermediate", progress: 68, learningSince: "2024", currentUsage: "Used in collaboration and decision clarity.", personalConnection: "Clear communication reduces confusion and rework.", why: "I wanted stronger collaboration and leadership.", timeline: [{ phase: "Started learning", detail: "Practiced concise explanation frameworks." }, { phase: "Key milestones", detail: "Improved async communication quality." }, { phase: "Current level", detail: "Reliable in written communication." }, { phase: "Future goals", detail: "Improve verbal influence and facilitation." }], resources: ["Communication frameworks", "Public note writing"], realWorldUsage: ["Feature discussions", "Strategy notes"], futurePlans: "Develop stronger leadership communication.", relatedSkills: ["Storytelling", "Product Strategy"] }),
      makeSkill({ slug: "public-thinking", name: "Public Thinking", icon: Globe, summary: "Sharing learning and ideas openly to refine thinking.", level: "Beginner", progress: 55, learningSince: "2025", currentUsage: "Used through notes and social posts.", personalConnection: "Public thinking keeps me accountable and sharp.", why: "I wanted feedback loops from real people.", timeline: [{ phase: "Started learning", detail: "Shared concise public notes." }, { phase: "Key milestones", detail: "Connected ideas to projects publicly." }, { phase: "Current level", detail: "Early stage." }, { phase: "Future goals", detail: "Publish structured public essays regularly." }], resources: ["Build in public communities", "Creator threads"], realWorldUsage: ["Learning updates", "Product reflections"], futurePlans: "Make public thinking a long-term compounding asset.", relatedSkills: ["Writing", "Communication"] }),
    ],
  },
  {
    key: "tools",
    title: "Tools & Software",
    icon: Monitor,
    description: "Practical tools used daily for building.",
    skills: [
      makeSkill({ slug: "react", name: "React", icon: Monitor, summary: "Component-based frontend development for scalable UI.", level: "Intermediate", progress: 75, learningSince: "2024", currentUsage: "Main frontend framework for profile platform builds.", personalConnection: "React helps me move quickly from concept to interface.", why: "I needed a robust UI framework for product work.", timeline: [{ phase: "Started learning", detail: "Built small reusable component screens." }, { phase: "Key milestones", detail: "Shipped multi-route profile pages." }, { phase: "Current level", detail: "Confident for production features." }, { phase: "Future goals", detail: "Deepen architecture and performance patterns." }], resources: ["React docs", "Project-based practice"], realWorldUsage: ["Profilare core pages"], futurePlans: "Build more complex UI systems with clarity.", relatedSkills: ["Frontend Development", "Tailwind CSS"] }),
      makeSkill({ slug: "tailwind-css", name: "Tailwind CSS", icon: Brush, summary: "Utility-first styling for fast and consistent design systems.", level: "Intermediate", progress: 78, learningSince: "2024", currentUsage: "Primary styling tool across profile pages.", personalConnection: "Tailwind keeps UI development fast and expressive.", why: "I wanted speed with design consistency.", timeline: [{ phase: "Started learning", detail: "Learned spacing, color, and utility patterns." }, { phase: "Key milestones", detail: "Built premium responsive card systems." }, { phase: "Current level", detail: "Strong practical fluency." }, { phase: "Future goals", detail: "Create highly reusable design primitives." }], resources: ["Tailwind docs", "Design references"], realWorldUsage: ["Full page layout styling"], futurePlans: "Advance into scalable design token systems.", relatedSkills: ["UI/UX", "Product Design"] }),
      makeSkill({ slug: "figma", name: "Figma", icon: PenTool, summary: "Design prototyping and visual system planning.", level: "Intermediate", progress: 66, learningSince: "2024", currentUsage: "Used for wireframes and UI exploration.", personalConnection: "Figma is where I think visually before building.", why: "I needed faster visual iteration loops.", timeline: [{ phase: "Started learning", detail: "Basic component and layout prototyping." }, { phase: "Key milestones", detail: "Designed section-first profile architecture." }, { phase: "Current level", detail: "Strong enough for rapid prototyping." }, { phase: "Future goals", detail: "Improve design system rigor." }], resources: ["Community files", "UI critiques"], realWorldUsage: ["Early layout explorations"], futurePlans: "Use Figma for deeper product systems planning.", relatedSkills: ["Product Design", "Visual Thinking"] }),
      makeSkill({ slug: "github", name: "GitHub", icon: Globe, summary: "Version control, collaboration, and project history management.", level: "Intermediate", progress: 69, learningSince: "2024", currentUsage: "Used for tracking and shipping iterative improvements.", personalConnection: "GitHub enables disciplined execution and collaboration.", why: "I wanted reliable progress tracking.", timeline: [{ phase: "Started learning", detail: "Used basic commits and branching." }, { phase: "Key milestones", detail: "Managed iterative feature updates." }, { phase: "Current level", detail: "Reliable daily workflow." }, { phase: "Future goals", detail: "Improve advanced collaboration workflows." }], resources: ["Docs", "Hands-on usage"], realWorldUsage: ["Repository-based development"], futurePlans: "Use stronger workflows for team-scale shipping.", relatedSkills: ["Frontend Development", "Execution"] }),
      makeSkill({ slug: "vs-code", name: "VS Code", icon: Monitor, summary: "Primary coding environment for day-to-day product execution.", level: "Advanced", progress: 82, learningSince: "2023", currentUsage: "Daily environment for coding, debugging, and iteration.", personalConnection: "VS Code is my operational workspace for turning intent into output.", why: "I needed a fast and extensible coding environment.", timeline: [{ phase: "Started learning", detail: "Basic code editing and extensions." }, { phase: "Key milestones", detail: "Optimized personal development workflow." }, { phase: "Current level", detail: "High confidence and speed." }, { phase: "Future goals", detail: "Further optimize productivity workflows." }], resources: ["Extension ecosystem", "Workflow experimentation"], realWorldUsage: ["All product coding tasks"], futurePlans: "Refine workflow automation and speed.", relatedSkills: ["Frontend Development", "React"] }),
    ],
  },
  {
    key: "languages",
    title: "Languages",
    icon: Languages,
    description: "Natural languages used for thought and communication.",
    skills: [
      makeSkill({ slug: "bengali", name: "Bengali", icon: Languages, summary: "Native fluency for personal expression and local context.", level: "Advanced", progress: 95, learningSince: "Childhood", currentUsage: "Used in personal and community communication.", personalConnection: "Bengali is core to my identity and emotional language.", why: "It is my first language and cultural root.", timeline: [{ phase: "Started learning", detail: "Native environment." }, { phase: "Key milestones", detail: "Consistent lifelong usage." }, { phase: "Current level", detail: "Advanced fluency." }, { phase: "Future goals", detail: "Use more Bengali in meaningful public writing." }], resources: ["Reading", "Conversation"], realWorldUsage: ["Daily communication"], futurePlans: "Preserve cultural depth alongside global growth.", relatedSkills: ["Storytelling", "Communication"] }),
      makeSkill({ slug: "english", name: "English", icon: Languages, summary: "Primary language for global learning and professional communication.", level: "Intermediate", progress: 72, learningSince: "School years", currentUsage: "Used in writing, building, and collaboration.", personalConnection: "English expands access to global opportunities.", why: "Needed for global product and business context.", timeline: [{ phase: "Started learning", detail: "Academic foundation." }, { phase: "Key milestones", detail: "Applied in product writing and technical work." }, { phase: "Current level", detail: "Functional and improving." }, { phase: "Future goals", detail: "Reach advanced professional fluency." }], resources: ["Writing practice", "Long-form reading"], realWorldUsage: ["Documentation", "Public notes"], futurePlans: "Develop strong and confident global communication.", relatedSkills: ["English Writing", "Public Thinking"] }),
      makeSkill({ slug: "hindi", name: "Hindi", icon: Languages, summary: "Conversational and practical communication across broader communities.", level: "Intermediate", progress: 70, learningSince: "School years", currentUsage: "Used in daily and professional conversations.", personalConnection: "Hindi helps me connect across diverse contexts.", why: "Needed for broader social and work communication.", timeline: [{ phase: "Started learning", detail: "School and social environment." }, { phase: "Key milestones", detail: "Confident daily usage." }, { phase: "Current level", detail: "Intermediate practical fluency." }, { phase: "Future goals", detail: "Improve formal fluency." }], resources: ["Conversation", "Media"], realWorldUsage: ["Meetings and networking"], futurePlans: "Use language flexibility in leadership contexts.", relatedSkills: ["Communication", "Storytelling"] }),
    ],
  },
  {
    key: "future",
    title: "Future Skills",
    icon: Rocket,
    description: "Skills being intentionally developed for long-term direction.",
    skills: [
      makeSkill({ slug: "hardware", name: "Hardware", icon: Cpu, summary: "Exploring physical systems and how software connects to hardware realities.", level: "Beginner", progress: 36, learningSince: "2026", currentUsage: "Research and foundational study.", personalConnection: "Hardware broadens my builder perspective beyond software.", why: "I want to understand full-stack real-world systems.", timeline: [{ phase: "Started learning", detail: "Reading and foundational concept mapping." }, { phase: "Key milestones", detail: "Early hardware-system study notes." }, { phase: "Current level", detail: "Beginner stage." }, { phase: "Future goals", detail: "Apply hardware understanding in product prototypes." }], resources: ["Foundational electronics resources", "Creator labs"], realWorldUsage: ["Early research only"], futurePlans: "Bridge software thinking with physical systems design.", relatedSkills: ["Robotics", "AI Infrastructure"] }),
      makeSkill({ slug: "robotics", name: "Robotics", icon: Cpu, summary: "Understanding autonomous systems and human-machine interaction.", level: "Beginner", progress: 30, learningSince: "2026", currentUsage: "Conceptual exploration.", personalConnection: "Robotics represents the future of practical intelligence.", why: "I am curious about embodied intelligence in real environments.", timeline: [{ phase: "Started learning", detail: "Surveyed robotics fundamentals." }, { phase: "Key milestones", detail: "Mapped learning path and prerequisites." }, { phase: "Current level", detail: "Early beginner." }, { phase: "Future goals", detail: "Build first simple robotics-related prototype." }], resources: ["Intro robotics courses", "Research explainers"], realWorldUsage: ["Learning phase"], futurePlans: "Integrate robotics understanding into long-term product vision.", relatedSkills: ["AI", "Hardware"] }),
      makeSkill({ slug: "ai-infrastructure", name: "AI Infrastructure", icon: Brain, summary: "Learning the systems behind reliable AI products at scale.", level: "Beginner", progress: 40, learningSince: "2026", currentUsage: "Architecture research and concept mapping.", personalConnection: "Infrastructure knowledge is needed for durable AI products.", why: "I want to go beyond surface AI usage and understand systems.", timeline: [{ phase: "Started learning", detail: "Studied model serving and data flow basics." }, { phase: "Key milestones", detail: "Mapped architecture patterns for AI apps." }, { phase: "Current level", detail: "Foundational level." }, { phase: "Future goals", detail: "Implement small-scale AI infrastructure pipelines." }], resources: ["Technical blogs", "Architecture talks"], realWorldUsage: ["Planning and design decisions"], futurePlans: "Build robust AI systems with reliability in mind.", relatedSkills: ["System Thinking", "AI"] }),
      makeSkill({ slug: "economics", name: "Economics", icon: GraduationCap, summary: "Understanding incentives, markets, and long-term decision impact.", level: "Beginner", progress: 42, learningSince: "2026", currentUsage: "Used in strategic reasoning and market framing.", personalConnection: "Economics improves judgment on value and trade-offs.", why: "I want stronger strategic depth in product and startup decisions.", timeline: [{ phase: "Started learning", detail: "Began with incentives and market principles." }, { phase: "Key milestones", detail: "Applied economic thinking in product notes." }, { phase: "Current level", detail: "Foundational stage." }, { phase: "Future goals", detail: "Use economics in higher-quality strategic planning." }], resources: ["Intro economics books", "Market commentary"], realWorldUsage: ["Decision frameworks"], futurePlans: "Integrate economics into founder-level decision systems.", relatedSkills: ["Business", "Market Research"] }),
    ],
  },
];

export const allSkills = skillCategories.flatMap((category) => category.skills);

export const learningPhilosophy = {
  statement: "I focus on learning by building real projects instead of only consuming information.",
  methods: [
    "Project-first learning loops",
    "Daily notes and reflection",
    "Weekly skill goals and review",
    "Public thinking for feedback",
    "Systems over random effort",
  ],
};

export const currentLearning = [
  { name: "AI systems", progress: 76, weeklyGoal: "4 deep sessions", status: "On Track" },
  { name: "Product architecture", progress: 68, weeklyGoal: "3 architecture notes", status: "On Track" },
  { name: "Startup strategy", progress: 64, weeklyGoal: "2 market analyses", status: "In Progress" },
  { name: "Hardware systems", progress: 34, weeklyGoal: "3 foundation lessons", status: "Early Stage" },
  { name: "English writing", progress: 71, weeklyGoal: "5 writing drafts", status: "On Track" },
  { name: "Communication", progress: 66, weeklyGoal: "3 clarity drills", status: "In Progress" },
];

export const skillGraphNodes = [
  "AI",
  "Programming",
  "Product Design",
  "System Thinking",
  "Business",
  "Communication",
  "Writing",
];

export const skillGraphEdges: Array<[string, string]> = [
  ["AI", "Programming"],
  ["AI", "Product Design"],
  ["AI", "System Thinking"],
  ["AI", "Business"],
  ["Product Design", "Writing"],
  ["System Thinking", "Business"],
  ["Communication", "Writing"],
];

export const projectSkillMap = [
  { project: "Printeor", skills: ["Product Design", "Startup Thinking", "UI/UX", "Business Strategy"] },
  { project: "AI Messaging Platform", skills: ["AI", "System Thinking", "Frontend Development", "Product Design"] },
  { project: "Profilare", skills: ["React", "Tailwind CSS", "Storytelling", "Identity Design"] },
];

export const achievements = [
  "Completed 10+ product interface experiments",
  "Published learning notes consistently",
  "Shipped multi-section profile platform",
  "Built reusable skill-card component system",
  "Contributed public reflections on AI product building",
];


