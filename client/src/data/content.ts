import { BookOpen, Brain, Cpu, Lightbulb, MessageSquare, Newspaper, PenSquare, Rocket, Sparkles, Video, type LucideIcon } from "lucide-react";

export type ContentItem = {
  slug: string;
  title: string;
  subtitle: string;
  category: "Article" | "Essay" | "Note" | "Thought" | "Post" | "Video" | "Research" | "Journal";
  date: string;
  readingTime: string;
  tags: string[];
  summary: string;
  views: number;
  likes: number;
  saves: number;
  cover: string;
  body: string[];
  insights: string[];
  reflection: string;
  related: string[];
};

export const contentPhilosophy = "I write to think clearly, share ideas, document growth, and explore the future.";

export const contentOverview = {
  topics: ["AI", "Startups", "Technology", "Design", "Society", "Philosophy", "Learning"],
  types: ["Articles", "Essays", "Notes", "Thoughts"],
  themes: "AI and society, startup execution, product systems, communication",
  discussed: "Future of work, systems thinking, creative discipline",
  style: "Thoughtful, exploratory, future-focused.",
};

export const contentItems: ContentItem[] = [
  {
    slug: "the-future-of-ai",
    title: "The Future of AI Is Human-Centered",
    subtitle: "Why the next wave of AI products should prioritize growth over hype.",
    category: "Article",
    date: "2026-04-12",
    readingTime: "8 min",
    tags: ["AI", "Society", "Future of work"],
    summary: "A perspective on building AI systems that improve human capability and decision quality.",
    views: 1840,
    likes: 286,
    saves: 94,
    cover: "gradient-ai",
    body: [
      "AI is not just a productivity shortcut. It is a design medium that can reshape how people think, learn, and create.",
      "The most meaningful AI products won’t be the loudest. They will be the ones that quietly improve everyday capability.",
      "Human-centered AI begins with a simple question: does this system increase clarity, confidence, and growth for real users?",
    ],
    insights: ["Utility beats novelty", "Context matters more than model size", "Trust is a product feature"],
    reflection: "This writing came from observing how easily tools can optimize speed while reducing thought quality.",
    related: ["startup-thinking-notes", "systems-over-hustle"],
  },
  {
    slug: "startup-thinking-notes",
    title: "Startup Thinking Notes from Building in Public",
    subtitle: "What changed in my strategy after shipping faster and listening better.",
    category: "Note",
    date: "2026-03-28",
    readingTime: "5 min",
    tags: ["Startups", "Execution", "Learning"],
    summary: "Concise notes on product validation, positioning clarity, and founder decision loops.",
    views: 1260,
    likes: 198,
    saves: 77,
    cover: "gradient-startup",
    body: [
      "Speed without reflection leads to noisy output. Reflection without shipping leads to stalled progress.",
      "The best startup rhythm combines focused execution with structured weekly learning loops.",
      "Public thinking creates accountability and sharpens the quality of decisions.",
    ],
    insights: ["Ship small, learn fast", "Positioning is strategic clarity", "Feedback is a design input"],
    reflection: "Written after repeated iteration cycles on early product ideas.",
    related: ["the-future-of-ai", "product-systems-journal"],
  },
  {
    slug: "product-systems-journal",
    title: "Product Systems Journal: Building for Consistency",
    subtitle: "A journal on creating repeatable systems for product quality.",
    category: "Journal",
    date: "2026-02-14",
    readingTime: "7 min",
    tags: ["Product Design", "Systems", "Discipline"],
    summary: "Thoughts on reducing chaos through reusable systems and decision frameworks.",
    views: 980,
    likes: 150,
    saves: 61,
    cover: "gradient-systems",
    body: [
      "Great products are rarely the result of single brilliant moments. They emerge from disciplined systems.",
      "System design helps founders preserve quality while moving quickly.",
      "Consistency is a strategic advantage in long-term building.",
    ],
    insights: ["Systems reduce cognitive load", "Quality scales through process", "Small loops compound"],
    reflection: "This came from balancing creativity with reliable execution habits.",
    related: ["startup-thinking-notes"],
  },
  {
    slug: "systems-over-hustle",
    title: "Systems Over Hustle",
    subtitle: "Why structured thinking outperforms endless busyness.",
    category: "Essay",
    date: "2026-01-30",
    readingTime: "6 min",
    tags: ["Philosophy", "Productivity", "Growth"],
    summary: "An essay on replacing reactive hustle with intentional systems.",
    views: 1110,
    likes: 172,
    saves: 68,
    cover: "gradient-essay",
    body: [
      "Hustle can generate movement, but systems generate direction.",
      "Without structure, ambition burns energy faster than it creates outcomes.",
      "The most resilient builders optimize for clarity, not constant urgency.",
    ],
    insights: ["Structure creates freedom", "Direction beats intensity", "Calm builders last longer"],
    reflection: "Written during a period of process redesign and focus recovery.",
    related: ["product-systems-journal", "the-future-of-ai"],
  },
  {
    slug: "ai-learning-clip",
    title: "AI Learning Clip: Building Better Prompt Loops",
    subtitle: "A short video on designing prompt workflows with practical constraints.",
    category: "Video",
    date: "2026-04-03",
    readingTime: "3 min",
    tags: ["AI", "Prompting", "Workflows"],
    summary: "Visual walkthrough of prompt loops that improve output quality.",
    views: 760,
    likes: 101,
    saves: 38,
    cover: "gradient-video",
    body: [
      "Prompt quality improves when context is explicit, constrained, and purposeful.",
      "A good prompt loop includes intent, format, and review criteria.",
      "Small process upgrades can dramatically improve AI outcomes.",
    ],
    insights: ["Constraints improve output", "Review loops matter", "Prompting is system design"],
    reflection: "Recorded after repeated product-level prompting experiments.",
    related: ["the-future-of-ai"],
  },
];

export const featuredContent = contentItems.slice(0, 2);

export const writingCategories: Array<{ name: string; icon: LucideIcon; count: number; description: string }> = [
  { name: "AI", icon: Cpu, count: 9, description: "Applied AI ideas and human-centered implementation." },
  { name: "Startups", icon: Rocket, count: 7, description: "Founder notes, market learning, and execution loops." },
  { name: "Product Design", icon: Sparkles, count: 6, description: "Design systems, UX patterns, and product clarity." },
  { name: "Society", icon: Brain, count: 4, description: "Technology, ethics, and human impact reflections." },
  { name: "Philosophy", icon: Lightbulb, count: 5, description: "Long-term thinking and principles for builders." },
  { name: "Learning", icon: BookOpen, count: 8, description: "Self-education systems and growth journals." },
  { name: "Communication", icon: MessageSquare, count: 5, description: "Writing clarity and message design." },
  { name: "Creativity", icon: PenSquare, count: 4, description: "Idea generation and expressive experimentation." },
  { name: "Future Thinking", icon: Newspaper, count: 3, description: "Speculative ideas and emerging product directions." },
];

export const microThoughts = [
  "Execution is how ideas earn the right to survive.",
  "A good question can save months of wrong effort.",
  "Systems create freedom for creative work.",
  "Most breakthroughs start as quiet experiments.",
];

export const journalNotes = [
  "Learning note: AI workflow quality improves with clear review criteria.",
  "Startup note: Positioning is a daily discipline, not a one-time statement.",
  "Research note: Users value clarity more than novelty.",
  "Reflection: Better communication usually fixes hidden product friction.",
];

export const mediaContent = [
  {
    slug: "ai-prompt-loop-walkthrough",
    title: "AI Prompt Loop Walkthrough",
    type: "Video",
    duration: "06:24",
    date: "2026-04-03",
    status: "New",
    tags: ["AI", "Prompting", "Workflows"],
    summary: "A practical walkthrough for creating repeatable prompt loops with better output quality.",
    views: 760,
    saves: 38,
    platform: "YouTube",
    externalUrl: "https://www.youtube.com/",
    cover: "gradient-video",
    body: [
      "This media note explains how prompt loops improve both consistency and clarity.",
      "The structure focuses on intent, constraints, and review checkpoints.",
      "The goal is to make AI outputs reliable enough for real product workflows.",
    ],
    related: ["the-future-of-ai", "startup-thinking-notes"],
  },
  {
    slug: "builder-reflection-audio",
    title: "Builder Reflection Audio",
    type: "Audio Note",
    duration: "09:10",
    date: "2026-03-11",
    status: "Series",
    tags: ["Startups", "Execution", "Mindset"],
    summary: "Short reflections on founder decision loops, trade-offs, and long-term building habits.",
    views: 520,
    saves: 27,
    platform: "Spotify",
    externalUrl: "https://open.spotify.com/",
    cover: "gradient-audio",
    body: [
      "This audio reflection explores why calm systems outperform reactive hustle.",
      "It covers prioritization, execution rhythm, and weekly learning loops.",
      "The intention is to make strategic thinking more practical for builders.",
    ],
    related: ["systems-over-hustle"],
  },
  {
    slug: "visual-essay-product-systems",
    title: "Visual Essay: Product Systems",
    type: "Visual Essay",
    duration: "08 slides",
    date: "2026-02-20",
    status: "In Progress",
    tags: ["Product Design", "Systems", "UX"],
    summary: "A visual narrative on how product systems reduce complexity and improve decision quality.",
    views: 690,
    saves: 41,
    platform: "Medium",
    externalUrl: "https://medium.com/",
    cover: "gradient-systems",
    body: [
      "This visual essay maps system thinking into practical product decisions.",
      "It highlights design consistency, decision hygiene, and scale-readiness.",
      "The central idea: repeatable systems unlock creative freedom.",
    ],
    related: ["product-systems-journal"],
  },
];

export const writingTimeline = [
  "Early short-form reflections",
  "Structured startup notes",
  "AI and product essays",
  "Systems-thinking journal phase",
  "Future-of-work thematic writing",
];

export const topicNodes = ["AI", "Society", "Productivity", "Future of work", "Ethics", "Design", "Startups", "Learning"];
export const topicEdges: Array<[string, string]> = [
  ["AI", "Society"],
  ["AI", "Future of work"],
  ["AI", "Ethics"],
  ["AI", "Design"],
  ["Startups", "Productivity"],
  ["Learning", "Startups"],
];

export const inspirations = {
  books: ["The Lean Startup", "Atomic Habits", "Design of Everyday Things"],
  writers: ["Paul Graham", "Naval Ravikant", "Morgan Housel"],
  thinkers: ["Don Norman", "Cal Newport", "Peter Drucker"],
  podcasts: ["Lenny's Podcast", "Acquired", "a16z Podcast"],
};

export const draftIdeas = [
  "AI and trust design in daily tools",
  "Founder communication systems",
  "Designing products for calm focus",
  "Learning architecture for self-education",
];

export const audience = {
  newsletter: "Weekly notes on AI, products, and founder systems.",
  collaboration: "Open to thoughtful product collaborations and idea exchanges.",
  discussion: "Available for deep-dive conversations on future-focused building.",
};

export const contentCurrentFocus = ["AI and society", "Startup building", "Product systems", "Communication and thinking"];

export const contentFilters = ["All", "Articles", "Notes", "Thoughts", "Essays", "Videos", "Posts", "Ideas", "Bookmarks", "Drafts"];
