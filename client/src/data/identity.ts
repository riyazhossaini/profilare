import {
  Brain,
  Briefcase,
  Brush,
  Compass,
  Cpu,
  Gem,
  GraduationCap,
  Handshake,
  Lightbulb,
  PenLine,
  Rocket,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserRoundSearch,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type IdentityDetailItem = {
  slug: string;
  name: string;
  short: string;
  icon: LucideIcon;
  why: string;
  start: string;
  meaning: string;
  build: string;
  future: string;
};

export const identityStatement =
  "I’m a builder, learner, and deep thinker working to turn ideas into useful products.";

export const identityOverview = [
  {
    title: "Who I am",
    text: "I am a calm but ambitious person who combines curiosity with execution. I care about meaningful work over empty noise.",
  },
  {
    title: "How I think",
    text: "I think in systems and long-term outcomes. I like to break complex ideas into simple actions and test them in real life.",
  },
  {
    title: "What drives me",
    text: "Growth, usefulness, and impact drive me. I want my work to make people stronger in how they learn and build.",
  },
  {
    title: "What I am becoming",
    text: "I am becoming a stronger founder with deeper technical judgment, better communication, and more disciplined execution.",
  },
];

export const roleItems: IdentityDetailItem[] = [
  {
    slug: "founder",
    name: "Founder",
    short: "Turning ideas into direction, systems, and outcomes.",
    icon: Rocket,
    why: "I chose this role because I wanted ownership over what I build and who it helps.",
    start: "I became this by starting small projects, taking full responsibility, and learning from real constraints.",
    meaning: "Founder means taking initiative and carrying both vision and execution with integrity.",
    build: "Through this role, I am building products, teams, and habits that create long-term value.",
    future: "My goal is to become a founder known for thoughtful products and reliable leadership.",
  },
  {
    slug: "builder",
    name: "Builder",
    short: "Shipping practical solutions instead of just discussing ideas.",
    icon: Wrench,
    why: "I chose this role because creation gives me clarity and confidence.",
    start: "I became this by learning through projects and solving one real problem at a time.",
    meaning: "Builder means action, iteration, and learning from shipped work.",
    build: "I build useful tools, product systems, and execution muscle.",
    future: "I want to be a world-class builder who ships fast with deep quality.",
  },
  {
    slug: "learner",
    name: "Learner",
    short: "Growing skills across technology, business, and communication.",
    icon: GraduationCap,
    why: "I chose this role because continuous learning protects me from becoming outdated.",
    start: "I became this by studying daily and applying lessons immediately in work.",
    meaning: "Learner means humility, curiosity, and disciplined improvement.",
    build: "I build a stronger foundation in AI, product design, and strategy.",
    future: "I want to become a lifelong learner who compounds knowledge into impact.",
  },
  {
    slug: "thinker",
    name: "Thinker",
    short: "Understanding root causes before rushing to solutions.",
    icon: Brain,
    why: "I chose this role because better thinking leads to better outcomes.",
    start: "I became this by reflecting on failures and asking deeper questions.",
    meaning: "Thinker means slowing down enough to see what actually matters.",
    build: "I build frameworks for decision-making and long-term strategy.",
    future: "I aim to become a clear thinker whose ideas translate into meaningful work.",
  },
  {
    slug: "creator",
    name: "Creator",
    short: "Crafting products, stories, and systems with personality.",
    icon: Brush,
    why: "I chose this role because creativity helps me connect vision with emotion.",
    start: "I became this by blending design, writing, and product experimentation.",
    meaning: "Creator means shaping original work that feels both useful and human.",
    build: "I create identity-driven products and thoughtful digital experiences.",
    future: "I want to create work that people remember because it genuinely helps them.",
  },
];

export const interestItems: IdentityDetailItem[] = [
  {
    slug: "artificial-intelligence",
    name: "Artificial Intelligence",
    short: "Exploring AI to build smarter, more useful product experiences.",
    icon: Cpu,
    why: "AI can dramatically improve how people learn, create, and work.",
    start: "I started with basic prompting and API experiments, then moved to product workflows.",
    meaning: "This interest means building practical intelligence, not hype.",
    build: "I want to build AI products that make daily work clearer and faster.",
    future: "I plan to specialize in AI-native product design and implementation.",
  },
  {
    slug: "startups",
    name: "Startups",
    short: "Building from zero with speed, constraints, and conviction.",
    icon: TrendingUp,
    why: "Startups are where learning and execution happen fastest.",
    start: "I started by studying founders and launching small experiments.",
    meaning: "This interest means solving real problems under real pressure.",
    build: "I want to build durable startup systems and better founder habits.",
    future: "I plan to launch products with clear value and sustainable growth.",
  },
  {
    slug: "product-design",
    name: "Product Design",
    short: "Designing clear, useful, and human-centered digital products.",
    icon: Compass,
    why: "Design turns complexity into clarity for real users.",
    start: "I began by redesigning simple interfaces and learning UX principles.",
    meaning: "This interest means empathy, clarity, and usable decisions.",
    build: "I want to build products that feel simple and emotionally intelligent.",
    future: "I plan to master AI product design with strong craft.",
  },
  {
    slug: "technology",
    name: "Technology",
    short: "Using tools and systems to solve high-value problems.",
    icon: Lightbulb,
    why: "Technology expands what one person can build and scale.",
    start: "I started by learning web basics and shipping tiny projects.",
    meaning: "This interest means translating ideas into practical systems.",
    build: "I build technical confidence through consistent project-based learning.",
    future: "I want to become technically strong enough to ship ambitious products.",
  },
  {
    slug: "business",
    name: "Business",
    short: "Understanding value creation, positioning, and growth.",
    icon: Briefcase,
    why: "Business thinking helps products survive and create impact.",
    start: "I started by learning strategy, markets, and founder case studies.",
    meaning: "This interest means making smart trade-offs around value and viability.",
    build: "I build stronger product decisions through business context.",
    future: "I aim to combine product craft with sharp business execution.",
  },
  {
    slug: "writing",
    name: "Writing",
    short: "Turning ideas into clear and useful communication.",
    icon: PenLine,
    why: "Writing improves thinking and helps ideas reach people.",
    start: "I started by writing short notes and gradually publishing longer reflections.",
    meaning: "This interest means clarity, honesty, and consistent voice.",
    build: "I build better communication for products, teams, and audiences.",
    future: "I want to write with precision and influence.",
  },
  {
    slug: "personal-growth",
    name: "Personal Growth",
    short: "Developing character, discipline, and emotional maturity.",
    icon: UserRoundSearch,
    why: "Inner growth determines the quality of external outcomes.",
    start: "I started by tracking habits, reflection, and deliberate self-improvement.",
    meaning: "This interest means becoming someone worthy of bigger responsibility.",
    build: "I build stronger routines, attention, and resilience.",
    future: "I want steady growth in character, leadership, and self-mastery.",
  },
];

export const valueItems: IdentityDetailItem[] = [
  {
    slug: "curiosity",
    name: "Curiosity",
    short: "Questions first, assumptions later.",
    icon: Search,
    why: "Curiosity keeps me learning and helps me find deeper truths.",
    start: "It came from always wanting to understand how things work.",
    meaning: "It means staying open-minded and asking better questions.",
    build: "It shapes how I research, learn, and design solutions.",
    future: "I want to use curiosity to keep expanding my perspective.",
  },
  {
    slug: "discipline",
    name: "Discipline",
    short: "Consistency over temporary motivation.",
    icon: Target,
    why: "Discipline converts goals into daily progress.",
    start: "I developed it through routines and accountability.",
    meaning: "It means doing what matters even when it is hard.",
    build: "It shapes my work blocks, learning habits, and execution quality.",
    future: "I want to become extremely reliable in long-term execution.",
  },
  {
    slug: "responsibility",
    name: "Responsibility",
    short: "Owning outcomes, not only effort.",
    icon: ShieldCheck,
    why: "Responsibility builds trust with myself and others.",
    start: "It grew as I took on bigger projects and consequences.",
    meaning: "It means no excuses, only learning and action.",
    build: "It shapes how I lead projects and solve problems.",
    future: "I want to carry larger responsibilities with calm clarity.",
  },
  {
    slug: "freedom",
    name: "Freedom",
    short: "Building the ability to choose consciously.",
    icon: Sparkles,
    why: "Freedom lets me align life with values and purpose.",
    start: "I discovered it by noticing how skills create options.",
    meaning: "It means earning independence through discipline.",
    build: "It shapes my focus on leverage, skills, and ownership.",
    future: "I want to create freedom for myself and people I serve.",
  },
  {
    slug: "creativity",
    name: "Creativity",
    short: "Original thinking applied to useful outcomes.",
    icon: Gem,
    why: "Creativity helps me discover non-obvious solutions.",
    start: "It grew through design, writing, and experimentation.",
    meaning: "It means combining imagination with usefulness.",
    build: "It shapes product ideas, storytelling, and user experiences.",
    future: "I want creativity that is both bold and practical.",
  },
  {
    slug: "long-term-thinking",
    name: "Long-term thinking",
    short: "Choosing compounding paths over quick wins.",
    icon: Compass,
    why: "Long-term thinking protects direction and quality.",
    start: "I learned it by seeing short-term decisions create long-term pain.",
    meaning: "It means patience with purpose.",
    build: "It shapes strategy, learning priorities, and partnerships.",
    future: "I want to make decade-level decisions with clarity.",
  },
  {
    slug: "execution",
    name: "Execution",
    short: "Making ideas real through action.",
    icon: Rocket,
    why: "Execution is what separates intention from impact.",
    start: "I built it by shipping imperfect work and iterating quickly.",
    meaning: "It means closing loops and finishing strong.",
    build: "It shapes my output velocity and delivery standards.",
    future: "I want elite execution with thoughtful craftsmanship.",
  },
  {
    slug: "honesty",
    name: "Honesty",
    short: "Truth with self, work, and people.",
    icon: Scale,
    why: "Honesty keeps decisions clean and relationships strong.",
    start: "It came from learning that clarity beats image.",
    meaning: "It means saying what is true and acting with integrity.",
    build: "It shapes feedback, accountability, and trust.",
    future: "I want to remain grounded in truth as responsibility grows.",
  },
];

export const personalityTraits = [
  { name: "Deep thinker", text: "I reflect deeply before making major decisions.", level: 88 },
  { name: "Builder mindset", text: "I learn best by creating and shipping.", level: 92 },
  { name: "Curious learner", text: "I stay open to new frameworks and ideas.", level: 90 },
  { name: "Quiet observer", text: "I notice patterns others often miss.", level: 80 },
  { name: "Future-focused", text: "I optimize today around long-term outcomes.", level: 86 },
  { name: "Problem solver", text: "I enjoy turning ambiguity into structure.", level: 89 },
];

export const beliefItems = [
  "Knowledge without direction is chaos.",
  "Execution makes ideas real.",
  "Technology should help humans grow.",
  "Discipline creates freedom.",
  "Strong character is more important than appearance.",
];

export const identityTimeline = [
  "Early curiosity",
  "Started learning business",
  "Discovered technology and AI",
  "Started building products",
  "Becoming a founder",
  "Working toward long-term vision",
];
