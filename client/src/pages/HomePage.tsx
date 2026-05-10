import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { profileData } from "../data/profile";

const highlights = [
  "Identity",
  "Skills",
  "Education",
  "Experience",
  "Projects",
  "Content",
  "Links",
  "Contact",
];

export function HomePage() {
  return (
    <main className="px-4 pb-10 pt-6 md:px-8 md:pb-14 md:pt-8">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl glass-card px-4 py-3 md:px-6">
        <div className="inline-flex items-center rounded-xl border border-zinc-200 bg-white px-1.5 py-1.5">
          <img src="/assets/profilare-logo.png" alt="Profilare logo" className="h-8 w-auto" />
        </div>
        <div className="hidden items-center gap-6 text-sm text-zinc-600 md:flex">
          <Link to="/templates">Templates</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/about-platform">About</Link>
        </div>
        <Link to="/templates" className="rounded-full bg-[#6C4DFF] px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02]">
          Create Your Profile
        </Link>
      </nav>

      <section className="mx-auto mt-8 grid w-full max-w-7xl gap-6 lg:grid-cols-[1.12fr_0.88fr]">
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[28px] p-7 md:p-10"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-[#6C4DFF]/20 bg-[#6C4DFF]/10 px-3 py-1 text-xs font-semibold text-[#6C4DFF]">
            <Sparkles className="h-3.5 w-3.5" />
            Premium Social Identity Platform
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-zinc-900 md:text-6xl">
            Build your digital identity in minutes.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
            Minimal, modern, and fully editable profiles with a smooth flow:
            Select Template to Create Account to Open your live profile dashboard instantly.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/templates" className="inline-flex items-center gap-2 rounded-full bg-[#6C4DFF] px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5">
              Create Your Profile
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to={`/profile/${profileData.username}`}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-7 py-3.5 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50"
            >
              View Example
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="glass-card rounded-[28px] p-7"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Template Preview</p>
          <div className="mt-5 rounded-3xl border border-zinc-200 bg-white p-5 shadow-[0_22px_42px_-34px_rgba(35,35,45,0.4)]">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-b from-[#6C4DFF] to-[#8f77ff]" />
            <div className="mx-auto mt-3 h-2.5 w-40 rounded bg-zinc-800/80" />
            <div className="mx-auto mt-2 h-2 w-24 rounded bg-zinc-400/70" />
            <div className="mt-4 grid grid-cols-2 gap-2">
              {highlights.slice(0, 6).map((item) => (
                <div key={item} className="rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2 text-center text-xs font-semibold text-zinc-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.article>
      </section>

      <section id="features" className="mx-auto mt-8 w-full max-w-7xl">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Elegant profile cards",
            "Live editing with instant preview",
            "Drag and reorder sections",
            "One consistent premium design",
          ].map((item, index) => (
            <motion.article
              key={item}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="glass-card rounded-2xl p-5"
            >
              <p className="text-sm font-semibold text-zinc-800">{item}</p>
              <p className="mt-2 text-sm text-zinc-600">Calm modern UI with clean typography and smooth interactions.</p>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
