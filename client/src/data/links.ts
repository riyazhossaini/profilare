import {
  Briefcase,
  Building2,
  Contact,
  Globe,
  Link,
  Mail,
  MessageCircle,
  MonitorPlay,
  Rocket,
  Send,
  Users,
  type LucideIcon
} from "lucide-react";

export type LinkCategory = "Social" | "Work" | "Content" | "Community" | "Products" | "Contact" | "Personal";

export type PlatformLink = {
  name: string;
  handle: string;
  url: string;
  description: string;
  category: LinkCategory;
  icon?: LucideIcon;
  logo?: string;
  active: "Active" | "Growing" | "Planned";
  metric?: string;
};

export const linksPhilosophy = "I use the internet to learn, build, connect, and share meaningful ideas.";
export const linksIdentityStatement = "My digital presence across technology, ideas, products, and creative work.";

export const linkFilters: LinkCategory[] = ["Social", "Work", "Content", "Community", "Products", "Contact", "Personal"];

export const featuredLinks = [
  {
    title: "Personal Website",
    platform: "Portfolio",
    url: "https://riyaz.dev",
    description: "My central place for work, writing, and ongoing product experiments.",
    cta: "Visit",
    category: "Work",
  },
  {
    title: "Printeor",
    platform: "Startup",
    url: "https://printeor.com",
    description: "Design-to-production platform for printing and packaging workflows.",
    cta: "Explore",
    category: "Products",
  },
  {
    title: "Medium Journal",
    platform: "Medium",
    url: "https://medium.com/@riyaz",
    description: "Thoughtful writing on AI, startup execution, and product systems.",
    cta: "Read",
    category: "Content",
  },
] as const;

export const mainLinks: PlatformLink[] = [
  { name: "X / Twitter", handle: "@riyaz", url: "https://x.com/riyaz", description: "Startup notes, AI ideas, and short reflections.", category: "Social", logo: "https://cdn.simpleicons.org/x/111111", active: "Active", metric: "3.2k followers" },
  { name: "LinkedIn", handle: "Riyaz Hossaini", url: "https://linkedin.com/in/riyaz", description: "Professional updates and founder journey posts.", category: "Work", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png", active: "Active", metric: "5.1k followers" },
  { name: "GitHub", handle: "riyaz", url: "https://github.com/riyaz", description: "Code repositories, product prototypes, and UI systems.", category: "Work", logo: "https://cdn.simpleicons.org/github/111111", active: "Active", metric: "56 repos" },
  { name: "Medium", handle: "@riyaz", url: "https://medium.com/@riyaz", description: "Long-form writing on design, systems, and startups.", category: "Content", logo: "https://cdn.simpleicons.org/medium/111111", active: "Growing", metric: "41 stories" },
  { name: "YouTube", handle: "Riyaz Builds", url: "https://youtube.com/@riyaz", description: "Builder clips, product breakdowns, and visual essays.", category: "Content", logo: "https://cdn.simpleicons.org/youtube/FF0000", active: "Growing", metric: "1.1k subscribers" },
  { name: "Instagram", handle: "@riyaz", url: "https://instagram.com/riyaz", description: "Creative visuals, process snapshots, and life updates.", category: "Social", logo: "https://cdn.simpleicons.org/instagram/E4405F", active: "Planned" },
  { name: "Product Hunt", handle: "@riyaz", url: "https://producthunt.com/@riyaz", description: "Launches, experiments, and maker community engagement.", category: "Community", logo: "https://cdn.simpleicons.org/producthunt/DA552F", active: "Growing" },
  { name: "Personal Blog", handle: "riyaz.dev/blog", url: "https://riyaz.dev/blog", description: "Writing archive and public learning notes.", category: "Personal", icon: Globe, active: "Active" },
];

export const socialLinks = mainLinks.filter((item) => item.category === "Social");
export const developerLinks = mainLinks.filter((item) => item.name === "GitHub" || item.name === "Product Hunt");
export const writingLinks = mainLinks.filter((item) => item.category === "Content" || item.name === "Personal Blog");

export const startupLinks = [
  { name: "Printeor", tagline: "Design-to-production platform", stage: "Building", category: "Printing + SaaS", url: "https://printeor.com", icon: Building2 },
  { name: "AI Messaging Platform", tagline: "Smart communication workspace", stage: "Concept", category: "AI + Productivity", url: "https://example.com/ai-messaging", icon: MessageCircle },
  { name: "AI Workspace", tagline: "Focused execution system for builders", stage: "Research", category: "AI + Work", url: "https://example.com/ai-workspace", icon: Briefcase },
  { name: "ONTAB", tagline: "Hardware-meets-productivity concept", stage: "Idea", category: "Device + Software", url: "https://example.com/ontab", icon: MonitorPlay },
] as const;

export const communityLinks = [
  { name: "Founder Community", description: "Weekly startup discussions and product reviews.", url: "https://discord.com", icon: Users },
  { name: "Open-source Circle", description: "Collaborating with builders on practical tools.", url: "https://github.com", icon: Link },
] as const;

export const identityLinks = [
  { label: "Resume", url: "https://example.com/resume" },
  { label: "Personal Manifesto", url: "https://example.com/manifesto" },
  { label: "Learning Roadmap", url: "https://example.com/learning-roadmap" },
  { label: "Public Notes", url: "https://example.com/notes" },
  { label: "Reading List", url: "https://example.com/reading-list" },
  { label: "Digital Garden", url: "https://example.com/garden" },
] as const;

export const contactLinks = [
  { label: "Email", value: "riyaz@example.com", url: "mailto:riyaz@example.com", icon: Mail },
  { label: "Telegram", value: "@riyaz", url: "https://t.me/riyaz", icon: Send },
  { label: "WhatsApp", value: "+91 90000 00000", url: "https://wa.me/919000000000", icon: MessageCircle },
  { label: "Calendly", value: "Book a call", url: "https://calendly.com/riyaz", icon: Contact },
] as const;

export const linksAnalytics = [
  { label: "Total Followers", value: "9.4k" },
  { label: "Published Content", value: "84" },
  { label: "Projects Shared", value: "6" },
  { label: "Community Reach", value: "12+ groups" },
  { label: "Most Active", value: "LinkedIn" },
] as const;

export const platformMap = [
  { source: "GitHub", targets: ["Projects", "AI Work", "Frontend Systems"] },
  { source: "Medium", targets: ["Writing", "Learning", "Startup Ideas"] },
  { source: "X", targets: ["Thoughts", "Community", "Discovery"] },
  { source: "LinkedIn", targets: ["Professional Network", "Founder Updates"] },
] as const;

export const currentOnlineFocus = [
  "Building on GitHub",
  "Writing on Medium",
  "Sharing ideas on X",
  "Networking on LinkedIn",
];

export const futureDigitalVision = [
  "Launch a stronger personal website ecosystem",
  "Publish deeper AI + startup research series",
  "Grow a focused builder community",
  "Create product education content in mixed media",
];

export const linksCta = [
  { label: "View Projects", to: "projects" },
  { label: "View Content", to: "content" },
  { label: "View Identity", to: "identity" },
  { label: "Contact Me", to: "contact" },
] as const;

export const contentPlatforms = [] as const;
