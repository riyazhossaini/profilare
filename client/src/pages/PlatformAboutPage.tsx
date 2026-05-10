import { motion } from "framer-motion";
import {
  Bot,
  BadgeCheck,
  Briefcase,
  Compass,
  FileText,
  GraduationCap,
  Layers3,
  LayoutTemplate,
  Link2,
  PencilRuler,
  Rocket,
  Share2,
  Sparkles,
  SwatchBook,
  Target,
  UserRound,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const problems = [
  { title: "Identity Is Scattered", text: "Skills, work, links, and content live on different platforms, so people never see the full picture." },
  { title: "Bio Space Is Too Small", text: "A short headline cannot represent your journey, values, strengths, and direction." },
  { title: "Feed-First Platforms", text: "Social feeds prioritize posts, not who you are and what you are building long term." },
  { title: "Too Many Separate Tools", text: "One tool for links, another for projects, another for resume creates fragmented identity." },
];

const benefits = [
  "Build a complete digital identity",
  "Share one profile link everywhere",
  "Present your work professionally",
  "Show your learning journey clearly",
  "Organize skills and achievements",
  "Explain your story, not just your title",
  "Help others understand who you are",
  "Useful for jobs, clients, networking, and collaborations",
];

const audiences = [
  { title: "Students", text: "Show learning path, projects, interests, and growth beyond marks." },
  { title: "Founders", text: "Present mission, startup story, execution, and vision in one place." },
  { title: "Creators", text: "Combine content, identity, links, and community presence in one profile." },
  { title: "Developers", text: "Show technical skills, projects, GitHub, writing, and engineering journey." },
  { title: "Designers", text: "Present process, tools, case studies, thinking, and creative direction." },
  { title: "Freelancers", text: "Highlight services, proof of work, style, and contact flow for clients." },
  { title: "Professionals", text: "Go beyond job titles with values, impact, strengths, and direction." },
  { title: "Learners", text: "Track progress, resources, milestones, and future goals publicly." },
  { title: "Job Seekers", text: "Share a profile that shows depth, not only a static resume." },
  { title: "Personal Brands", text: "Build a clean, structured home for story, authority, and trust." },
];

const steps = [
  { title: "Choose a Template", text: "Pick a structure that matches your profile type." },
  { title: "Create Your Account", text: "Set your username and create your profile space." },
  { title: "Build Your Profile", text: "Add identity, skills, education, work, projects, and links." },
  { title: "Customize Your Pages", text: "Edit every section, rename pages, add and remove blocks." },
  { title: "Share Your Profile", text: "Use one clean link for networking, jobs, and collaborations." },
];

const compareRows = [
  ["Shows full identity", "No", "Limited", "Yes"],
  ["Custom profile pages", "No", "No", "Yes"],
  ["Editable sections", "No", "Limited", "Yes"],
  ["Personal story", "Limited", "No", "Yes"],
  ["Skills and education", "Limited", "No", "Yes"],
  ["Projects and content", "Partial", "Links only", "Yes"],
  ["One shareable profile", "No", "Yes", "Yes"],
];

function SectionTitle({ title, text }: { title: string; text: string }) {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-relaxed text-zinc-600">{text}</p>
    </header>
  );
}

export function PlatformAboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50/70 via-white to-white px-4 py-8 text-zinc-900 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl space-y-7">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:text-violet-700"
          >
            Back to home
          </Link>
        </div>
        <section className="grid gap-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_30px_60px_-38px_rgba(79,70,229,0.45)] backdrop-blur md:grid-cols-2 md:p-9">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <p className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
              <Sparkles className="h-3.5 w-3.5" />
              Personal Identity Platform
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">Your profile should tell your full story.</h1>
            <p className="mt-4 text-base leading-relaxed text-zinc-600">
              Build a complete personal profile with identity, skills, education, experience, projects, content, links, contact, and personal story in one structured place.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/create-account" className="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white">Create Your Profile</Link>
              <Link to="/templates" className="rounded-full border border-violet-200 bg-white px-5 py-2.5 text-sm font-semibold text-violet-700">Explore Templates</Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 to-indigo-50 p-4">
            <div className="rounded-2xl border border-white/80 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600" />
                <div>
                  <p className="text-lg font-bold">Riyaz Hossaini</p>
                  <p className="text-sm text-zinc-500">@riyaz</p>
                </div>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {["Identity", "Skills", "Education", "Projects", "Content", "Links"].map((s) => (
                  <div key={s} className="rounded-xl border border-violet-100 bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700">{s}</div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_52px_-36px_rgba(79,70,229,0.35)] md:p-8">
          <SectionTitle title="Why We Created This" text="People are more than one category. Existing platforms only show fragments. We wanted one place where a complete person can be seen clearly." />
          <p className="mx-auto mt-4 max-w-4xl text-center text-zinc-600">
            Social media shows posts. LinkedIn shows work history. Link-in-bio tools show links. Portfolios show projects.
            This platform was built to connect identity, journey, learning, work, values, and future vision together.
          </p>
        </section>

        <section className="rounded-3xl border border-white/70 bg-white/80 p-6 md:p-8">
          <SectionTitle title="The Problem" text="Most people cannot present themselves properly because their identity is split across platforms." />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {problems.map((item) => (
              <article key={item.title} className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-violet-100 bg-gradient-to-br from-white to-violet-50/70 p-6 md:p-8">
          <SectionTitle title="Our Solution" text="A customizable profile system where every user can structure their identity in their own way." />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: UserRound, text: "Identity" },
              { icon: BadgeCheck, text: "Skills" },
              { icon: GraduationCap, text: "Education" },
              { icon: Briefcase, text: "Experience" },
              { icon: Rocket, text: "Projects" },
              { icon: FileText, text: "Content" },
              { icon: Link2, text: "Links" },
              { icon: Users, text: "Contact" },
              { icon: LayoutTemplate, text: "Custom Pages" },
            ].map((x) => (
              <div key={x.text} className="rounded-2xl border border-violet-100 bg-white px-4 py-3">
                <x.icon className="h-5 w-5 text-violet-600" />
                <p className="mt-2 font-semibold">{x.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-zinc-600">
            Student, founder, designer, or developer: you can rename pages, edit sections, add new pages, and shape your profile around your goals.
          </p>
        </section>

        <section className="rounded-3xl border border-white/70 bg-white/80 p-6 md:p-8">
          <SectionTitle title="How It Helps You" text="Turn a basic online bio into a clear and complete identity profile." />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {benefits.map((b) => (
              <div key={b} className="rounded-2xl border border-violet-100 bg-white px-4 py-3 text-sm font-medium">{b}</div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/70 bg-white/80 p-6 md:p-8">
          <SectionTitle title="Who This Platform Is For" text="Built for anyone who wants to present their complete identity with clarity and structure." />
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {audiences.map((a) => (
              <article key={a.title} className="rounded-2xl border border-violet-100 bg-white p-4">
                <h3 className="font-bold">{a.title}</h3>
                <p className="mt-2 text-sm text-zinc-600">{a.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/70 bg-white/80 p-6 md:p-8">
          <SectionTitle title="Why It Is Different" text="Not another feed app. Not just a resume. Not only a link list. This is about the complete person." />
          <div className="mt-6 overflow-x-auto rounded-2xl border border-violet-100">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-violet-50 text-zinc-900">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Feature</th>
                  <th className="px-4 py-3 text-left font-semibold">Normal social media</th>
                  <th className="px-4 py-3 text-left font-semibold">Link-in-bio tools</th>
                  <th className="px-4 py-3 text-left font-semibold">This platform</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((r) => (
                  <tr key={r[0]} className="border-t border-violet-100">
                    {r.map((c) => (
                      <td key={c} className="px-4 py-3">{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl border border-violet-100 bg-gradient-to-br from-white via-violet-50/70 to-indigo-50/60 p-6 md:p-8">
          <SectionTitle title="Customization Flow" text="Start fast with templates, then personalize every part of your profile." />
          <div className="mt-6 grid gap-4 md:grid-cols-5">
            {steps.map((s, i) => (
              <article key={s.title} className="rounded-2xl border border-white/90 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold text-violet-700">Step {i + 1}</p>
                <h3 className="mt-1 font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-zinc-600">{s.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/70 bg-white/80 p-6 text-center md:p-8">
          <Target className="mx-auto h-8 w-8 text-violet-600" />
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Our mission is to help people present their full identity, not just a short bio.</h2>
          <p className="mx-auto mt-3 max-w-3xl text-zinc-600">
            Everyone has a story, skills, learning journey, values, work, and vision. This platform helps organize and share all of it with clarity.
          </p>
        </section>

        <section className="rounded-3xl border border-white/70 bg-white/80 p-6 md:p-8">
          <SectionTitle title="What’s Coming Next" text="We are continuously improving the platform to give users more power, speed, and personalization." />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-violet-100 bg-white p-5">
              <Bot className="h-5 w-5 text-violet-600" />
              <h3 className="mt-2 text-lg font-bold">AI Writing Assistant</h3>
              <p className="mt-2 text-sm text-zinc-600">
                AI will help users write profile details, page intros, and section content with better clarity.
              </p>
            </article>
            <article className="rounded-2xl border border-violet-100 bg-white p-5">
              <Layers3 className="h-5 w-5 text-violet-600" />
              <h3 className="mt-2 text-lg font-bold">More Themes & Layouts</h3>
              <p className="mt-2 text-sm text-zinc-600">
                More premium profile themes and layout options will be added for different styles and professions.
              </p>
            </article>
            <article className="rounded-2xl border border-violet-100 bg-white p-5">
              <SwatchBook className="h-5 w-5 text-violet-600" />
              <h3 className="mt-2 text-lg font-bold">Advanced Customization</h3>
              <p className="mt-2 text-sm text-zinc-600">
                Users will be able to customize colors, visual style, and profile feel to match their personal brand.
              </p>
            </article>
          </div>
        </section>

        <section className="rounded-3xl border border-violet-100 bg-gradient-to-r from-violet-600 to-indigo-600 p-7 text-white md:p-10">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Build the profile that actually represents you.</h2>
          <p className="mt-3 max-w-3xl text-violet-100">
            Create your complete personal profile and share your identity, work, skills, story, and links in one place.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/create-account" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-violet-700">Create Your Profile</Link>
            <Link to="/templates" className="rounded-full border border-white/70 bg-transparent px-5 py-2.5 text-sm font-semibold text-white">View Templates</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

