import { AtSign, Calendar, Globe, Mail, MessageCircle, Send, Share2, type LucideIcon } from "lucide-react";

export type ContactMethod = {
  platform: string;
  value: string;
  purpose: string;
  availability: "Open" | "Limited" | "By Request";
  cta: string;
  url: string;
  icon: LucideIcon;
};

export const contactStatement = "I’m always open to meaningful conversations, collaborations, ideas, and opportunities.";
export const communicationPhilosophy =
  "I value thoughtful communication, meaningful ideas, and long-term relationships over transactional networking.";

export const contactStatus = ["Open to collaboration", "Available for networking", "Building new ideas"];

export const quickActions = [
  { label: "Copy Email", icon: Mail, value: "riyaz@example.com", type: "copy" as const },
  { label: "Schedule Call", icon: Calendar, value: "https://calendly.com/riyaz", type: "link" as const },
  { label: "Share Profile", icon: Share2, value: "/profile/riyaz", type: "share" as const },
];

export const contactMethods: ContactMethod[] = [
  { platform: "Email", value: "riyaz@example.com", purpose: "Business inquiries", availability: "Open", cta: "Send Message", url: "mailto:riyaz@example.com", icon: Mail },
  { platform: "LinkedIn", value: "Riyaz Hossaini", purpose: "Professional networking", availability: "Open", cta: "Visit Profile", url: "https://linkedin.com/in/riyaz", icon: AtSign },
  { platform: "X / Twitter", value: "@riyaz", purpose: "Ideas and discussion", availability: "Open", cta: "Open Chat", url: "https://x.com/riyaz", icon: Send },
  { platform: "Telegram", value: "@riyaz", purpose: "Quick collaboration chat", availability: "Limited", cta: "Open Chat", url: "https://t.me/riyaz", icon: Send },
  { platform: "WhatsApp", value: "+91 90000 00000", purpose: "Fast communication", availability: "By Request", cta: "Send Message", url: "https://wa.me/919000000000", icon: MessageCircle },
  { platform: "Discord", value: "riyaz#0001", purpose: "Community collaboration", availability: "Limited", cta: "Open Chat", url: "https://discord.com", icon: MessageCircle },
  { platform: "Calendly", value: "15-min intro call", purpose: "Focused discussion", availability: "Open", cta: "Schedule Call", url: "https://calendly.com/riyaz", icon: Calendar },
  { platform: "Website", value: "riyaz.dev", purpose: "Portfolio and writing", availability: "Open", cta: "Visit Profile", url: "https://riyaz.dev", icon: Globe },
];

export const collaborationInterests = [
  "AI products",
  "Startup ideas",
  "Product systems",
  "Design thinking",
  "Future technology",
  "Creative experiments",
];

export const availability = {
  status: "Open to meaningful collaboration and networking.",
  response: "Usually replies within 24-48 hours.",
  timezone: "IST (India Standard Time)",
  meeting: "Async first, then calls if needed.",
  hours: "Mon-Sat, 11:00 AM - 8:00 PM IST",
};

export const faqItems = [
  { q: "What type of messages do you respond to?", a: "Startup, product, AI, learning, and thoughtful collaboration requests." },
  { q: "Are you open to startup discussions?", a: "Yes, especially early-stage product ideas and execution strategy." },
  { q: "Do you accept collaboration requests?", a: "Yes, if the project is meaningful and long-term oriented." },
];

export const trustItems = [
  "Verified social links",
  "Public projects and case studies",
  "Open writing archive",
  "Active builder profile",
];

export const currentFocus = ["Building AI systems", "Startup architecture", "Product systems", "Communication growth"];
