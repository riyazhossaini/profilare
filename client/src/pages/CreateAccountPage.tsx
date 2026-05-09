import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { saveAccountProfileDraft } from "../data/accountProfile";
import { templates } from "../data/templates";

type FormState = {
  fullName: string;
  email: string;
  password: string;
};

const initialForm: FormState = {
  fullName: "",
  email: "",
  password: "",
};

function toUsername(fullName: string) {
  const cleaned = fullName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 24);
  return cleaned || `user-${Math.floor(Math.random() * 9000 + 1000)}`;
}

export function CreateAccountPage() {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const templateId = search.get("template") || localStorage.getItem("profilare:selectedTemplate") || "";
  const template = templates.find((t) => t.id === templateId);

  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);

  const errors = useMemo(() => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Enter a valid email";
    if (form.password.length < 8) next.password = "Password must be at least 8 characters";
    return next;
  }, [form]);

  if (!template) return <Navigate to="/templates" replace />;

  return (
    <main className="min-h-screen px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr_1fr]">
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="glass-card rounded-3xl p-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Selected Template</p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">{template.name}</h2>
          <p className="mt-2 text-sm text-zinc-600">{template.description}</p>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4">
            <div className="mx-auto h-14 w-14 rounded-full bg-gradient-to-b from-[#6C4DFF] to-[#9a8aff]" />
            <div className="mx-auto mt-3 h-2.5 w-32 rounded bg-zinc-800/75" />
            <div className="mx-auto mt-2 h-2 w-24 rounded bg-zinc-400/65" />
            <div className="mt-4 space-y-2">
              {template.sections.slice(0, 6).map((section) => (
                <div key={section} className="rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2 text-xs text-zinc-700">
                  {section}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="glass-card rounded-3xl p-6"
        >
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Create Account</h1>
          <p className="mt-2 text-sm text-zinc-600">Fast signup. Your profile is generated instantly from this template.</p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (Object.keys(errors).length) return;
              setLoading(true);

              const username = toUsername(form.fullName);
              saveAccountProfileDraft({
                templateId: template.id,
                fullName: form.fullName.trim(),
                username,
                profileTitle: "Add your headline",
                bio: "Add your story, focus, and goals.",
                location: "Add your location",
              });

              window.setTimeout(() => {
                setLoading(false);
                navigate(`/profile/${username}`);
              }, 900);
            }}
          >
            <label className="block">
              <span className="mb-1.5 block text-sm text-zinc-700">Full Name</span>
              <input
                value={form.fullName}
                onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[#6C4DFF]/45"
                placeholder="John Doe"
              />
              {errors.fullName ? <p className="mt-1 text-xs text-zinc-500">{errors.fullName}</p> : null}
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm text-zinc-700">Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[#6C4DFF]/45"
                placeholder="you@email.com"
              />
              {errors.email ? <p className="mt-1 text-xs text-zinc-500">{errors.email}</p> : null}
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm text-zinc-700">Password</span>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[#6C4DFF]/45"
                placeholder="Minimum 8 characters"
              />
              {errors.password ? <p className="mt-1 text-xs text-zinc-500">{errors.password}</p> : null}
            </label>

            <button
              type="submit"
              disabled={loading}
              className="group mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#6C4DFF] px-6 py-3.5 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-20px_rgba(108,77,255,0.6)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <Link to="/templates" className="mt-4 inline-flex text-sm text-zinc-600 underline-offset-4 hover:underline">
            Change Template
          </Link>
        </motion.section>
      </div>
    </main>
  );
}
