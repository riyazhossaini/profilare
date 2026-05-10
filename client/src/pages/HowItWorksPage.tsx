import { motion } from "framer-motion";
import { CheckCircle2, EyeOff, LayoutTemplate, PencilRuler, PlusCircle, Share2, UserPlus2 } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: LayoutTemplate,
    title: "Choose a template",
    text: "Start with a ready structure that matches your style and goals.",
  },
  {
    icon: UserPlus2,
    title: "Create your account",
    text: "Set your name and username to generate your personal profile space.",
  },
  {
    icon: PlusCircle,
    title: "Add pages you need",
    text: "Add pages like Skills, Education, Experience, Projects, Content, and Contact anytime.",
  },
  {
    icon: PencilRuler,
    title: "Fill and customize details",
    text: "Edit every page and section to match your identity, work, and journey.",
  },
  {
    icon: Share2,
    title: "Share one profile link",
    text: "Use one clean link for networking, opportunities, and personal branding.",
  },
];

const rules = [
  "If a field is empty, it does not show on public profile.",
  "If you remove content from a section, only filled parts remain visible.",
  "You can add pages later as your journey grows.",
  "You can edit your profile anytime without rebuilding from scratch.",
];

export function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50/70 via-white to-white px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl space-y-7">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:text-violet-700"
          >
            Back to home
          </Link>
        </div>
        <section className="rounded-3xl border border-white/70 bg-white/80 p-6 text-center shadow-[0_28px_56px_-32px_rgba(79,70,229,0.45)] md:p-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 md:text-5xl">How Profilare Works</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-zinc-600">
            Build a complete personal profile in simple steps. Add the pages you need, fill your details, and share one clean link.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/create-account" className="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white">Create Your Profile</Link>
            <Link to="/templates" className="rounded-full border border-violet-200 bg-white px-5 py-2.5 text-sm font-semibold text-violet-700">Explore Templates</Link>
          </div>
        </section>

        <section className="rounded-3xl border border-white/70 bg-white/80 p-6 md:p-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">Step-by-step process</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, i) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl border border-violet-100 bg-white p-5"
              >
                <step.icon className="h-5 w-5 text-violet-600" />
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-violet-700">Step {i + 1}</p>
                <h3 className="mt-1 text-lg font-bold text-zinc-900">{step.title}</h3>
                <p className="mt-2 text-sm text-zinc-600">{step.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-3xl border border-violet-100 bg-gradient-to-br from-white to-violet-50/70 p-6">
            <h3 className="text-2xl font-bold text-zinc-900">Public visibility rule</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Empty means hidden. If you do not fill a detail, it will not appear on your public profile.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700">
              <EyeOff className="h-3.5 w-3.5" />
              Empty details stay private from public view
            </div>
          </article>
          <article className="rounded-3xl border border-white/70 bg-white/80 p-6">
            <h3 className="text-2xl font-bold text-zinc-900">Important notes</h3>
            <div className="mt-3 space-y-2">
              {rules.map((rule) => (
                <p key={rule} className="inline-flex w-full items-start gap-2 rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm text-zinc-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                  {rule}
                </p>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-3xl border border-violet-100 bg-gradient-to-r from-violet-600 to-indigo-600 p-7 text-white md:p-10">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Build once. Keep improving over time.</h2>
          <p className="mt-3 max-w-3xl text-violet-100">
            Start simple today, then add more pages and details as your profile grows.
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


