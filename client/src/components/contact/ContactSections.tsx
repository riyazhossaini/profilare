import { motion } from "framer-motion";
import { CheckCircle2, Clock3, Pencil, Send, TimerReset, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { type ContactMethod } from "../../data/contact";

export function ContactTopNav({ username, name, onAction }: { username: string; name: string; onAction: (value: string, type: "copy" | "link" | "share") => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Link to={`/profile/${username}`} className="inline-flex rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-zinc-700">Back to profile</Link>
      <p className="text-sm font-semibold text-zinc-600">{name}</p>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => onAction("riyaz@example.com", "copy")} className="rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700">Copy email</button>
        <button onClick={() => onAction("https://calendly.com/riyaz", "link")} className="rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700">Schedule call</button>
        <button onClick={() => onAction(`/profile/${username}`, "share")} className="rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700">Share profile</button>
      </div>
    </div>
  );
}

export function ContactHero({ name, username, headline, statement, status, style, avatarText = "RH", avatarUrl = "" }: { name: string; username: string; headline: string; statement: string; status: string[]; style: string; avatarText?: string; avatarUrl?: string }) {
  const u = username.trim();
  const h = headline.trim();
  const s = statement.trim();
  const st = style.trim();
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-3xl border border-white/70 bg-white/75 p-6 text-center shadow-[0_28px_56px_-32px_rgba(79,70,229,0.55)] backdrop-blur md:p-8">
      <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 text-2xl font-bold text-white shadow-xl">{avatarUrl ? <img src={avatarUrl} alt={`${name} avatar`} className="h-full w-full object-cover" /> : avatarText}</div>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl">{name}</h1>
      {u ? <p className="mt-1 text-base font-medium text-zinc-600">@{u}</p> : null}
      {h ? <p className="mt-2 text-lg font-semibold text-zinc-800">{h}</p> : null}
      {s ? <p className="mx-auto mt-4 max-w-3xl text-zinc-700">"{s}"</p> : null}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">{status.map((s) => <span key={s} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{s}</span>)}</div>
      {st ? <p className="mt-4 text-sm text-zinc-600">{st}</p> : null}
    </motion.section>
  );
}

export function ContactOverview({ interests }: { interests: string[] }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6">
      <h2 className="text-2xl font-bold">Contact Overview</h2>
      <p className="mt-2 text-sm text-zinc-700">Best for meaningful startup, AI, design, and long-term collaboration conversations.</p>
      <div className="mt-4 flex flex-wrap gap-2">{interests.map((i) => <span key={i} className="rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-semibold text-violet-700">{i}</span>)}</div>
    </section>
  );
}

export function ContactMethodsGrid({ items, onEdit, onDelete }: { items: ContactMethod[]; onEdit?: (platform: string) => void; onDelete?: (platform: string) => void }) {
  return (
    <section className="mt-6">
      <h2 className="text-2xl font-bold">Main Contact Methods</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.platform} className="group relative rounded-2xl border border-violet-100 bg-white p-5 shadow-[0_20px_46px_-30px_rgba(79,70,229,0.45)] transition hover:-translate-y-0.5">
              {onEdit || onDelete ? (
                <div className="absolute right-3 top-3 flex gap-1 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
                  {onEdit ? (
                    <button onClick={() => onEdit(item.platform)} className="rounded-full border border-zinc-200 bg-white p-1.5 text-zinc-700">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                  ) : null}
                  {onDelete ? (
                    <button onClick={() => onDelete(item.platform)} className="rounded-full border border-rose-200 bg-white p-1.5 text-rose-600">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  ) : null}
                </div>
              ) : null}
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700"><Icon className="h-5 w-5" /></span>
                <span className="rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-violet-700">{item.availability}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-zinc-900">{item.platform}</h3>
              <p className="text-sm text-zinc-600">{item.value}</p>
              <p className="mt-2 text-xs text-zinc-500">{item.purpose}</p>
              <a href={item.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-violet-700">{item.cta}<Send className="h-3.5 w-3.5" /></a>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", subject: "", message: "", type: "Collaboration" });
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);
  const valid = useMemo(() => form.name.trim() && form.email.trim() && form.subject.trim() && form.message.trim(), [form]);

  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6">
      <h2 className="text-2xl font-bold">Contact Form</h2>
      <form
        className="mt-4 grid gap-3 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          setTouched(true);
          if (!valid) return;
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 2600);
          setForm({ name: "", email: "", company: "", subject: "", message: "", type: "Collaboration" });
          setTouched(false);
        }}
      >
        <input className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm outline-none focus:border-violet-300" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm outline-none focus:border-violet-300" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm outline-none focus:border-violet-300" placeholder="Company / organization" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
        <select className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm outline-none focus:border-violet-300" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          {["Startup discussion", "Collaboration", "Business inquiry", "Networking", "Product feedback", "Media inquiry", "General conversation"].map((opt) => <option key={opt}>{opt}</option>)}
        </select>
        <input className="md:col-span-2 rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm outline-none focus:border-violet-300" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
        <textarea className="md:col-span-2 min-h-28 rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm outline-none focus:border-violet-300" placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        {touched && !valid ? <p className="md:col-span-2 text-xs font-medium text-rose-600">Please fill name, email, subject, and message.</p> : null}
        <div className="md:col-span-2 flex items-center gap-3">
          <button type="submit" className="rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">Send Message</button>
          {submitted ? <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700"><CheckCircle2 className="h-4 w-4" />Message sent successfully</motion.span> : null}
        </div>
      </form>
    </section>
  );
}

export const CollaborationSection = ({ items }: { items: string[] }) => <SimpleSection title="Collaboration" body="Interested in collaborating on these areas:" chips={items} />;
export const CommunicationPhilosophy = ({ text }: { text: string }) => <section className="mt-6 rounded-3xl border border-violet-200 bg-gradient-to-br from-white to-violet-50/70 p-6"><h2 className="text-2xl font-bold">Communication Philosophy</h2><p className="mt-3 text-sm text-zinc-700">{text}</p></section>;
export function AvailabilitySection({ data }: { data: { status: string; response: string; timezone: string; meeting: string; hours: string } }) {
  return (
    <section className="mt-6 rounded-3xl border border-violet-100/80 bg-gradient-to-br from-white via-violet-50/40 to-indigo-50/40 p-6 shadow-[0_24px_54px_-34px_rgba(79,70,229,0.55)]">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-100 bg-white text-violet-700 shadow-sm">
          <Clock3 className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900">Availability & Schedule</h2>
          <p className="mt-1 text-sm text-zinc-600">Clear expectations for response time, timezone, and conversation flow.</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <article className="rounded-2xl border border-violet-100 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">Current Status</p>
          <p className="mt-1 text-sm text-zinc-700">{data.status}</p>
        </article>
        <article className="rounded-2xl border border-violet-100 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">Response Window</p>
          <p className="mt-1 text-sm text-zinc-700">{data.response}</p>
        </article>
        <article className="rounded-2xl border border-violet-100 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">Timezone</p>
          <p className="mt-1 text-sm text-zinc-700">{data.timezone}</p>
        </article>
        <article className="rounded-2xl border border-violet-100 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">Preferred Mode</p>
          <p className="mt-1 text-sm text-zinc-700">{data.meeting}</p>
        </article>
      </div>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-semibold text-violet-700">
        <TimerReset className="h-3.5 w-3.5" />
        {data.hours}
      </div>
    </section>
  );
}
export function QuickActions() {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6">
      <h2 className="text-2xl font-bold">Quick Actions</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {["Email me", "Schedule a call", "Download profile", "Share profile", "Connect on LinkedIn", "Follow on X"].map((a) => <button key={a} className="rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-semibold text-violet-700">{a}</button>)}
      </div>
    </section>
  );
}
export function FAQSection({ items, onEdit, onDelete }: { items: Array<{ q: string; a: string }>; onEdit?: (index: number) => void; onDelete?: (index: number) => void }) {
  return <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6"><h2 className="text-2xl font-bold">FAQ</h2><div className="mt-4 space-y-3">{items.map((i, idx) => <div key={`${i.q}-${idx}`} className="group relative rounded-xl border border-violet-100 bg-white p-4"><div className="absolute right-3 top-3 flex gap-1 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">{onEdit ? <button onClick={() => onEdit(idx)} className="rounded-full border border-zinc-200 bg-white p-1.5 text-zinc-700"><Pencil className="h-3.5 w-3.5" /></button> : null}{onDelete ? <button onClick={() => onDelete(idx)} className="rounded-full border border-rose-200 bg-white p-1.5 text-rose-600"><Trash2 className="h-3.5 w-3.5" /></button> : null}</div><p className="font-semibold text-zinc-900">{i.q}</p><p className="mt-1 text-sm text-zinc-700">{i.a}</p></div>)}</div></section>;
}
export const CommunitySection = () => <SimpleSection title="Community & Networking" lines={["Active in startup communities", "Participates in builder and tech circles", "Open to meaningful founder networks"]} />;
export const TrustSection = ({ items }: { items: string[] }) => <SimpleSection title="Trust & Identity" chips={items} />;
export const CurrentFocusSection = ({ items }: { items: string[] }) => <SimpleSection title="Current Focus" chips={items} />;
export const PersonalMessage = ({ text }: { text: string }) => <section className="mt-6 rounded-3xl border border-violet-200 bg-gradient-to-br from-white to-violet-50/70 p-6"><p className="text-sm leading-relaxed text-zinc-700">{text}</p></section>;
export function ContactCTA({ username }: { username: string }) {
  return <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6 text-center"><h2 className="text-2xl font-bold">Continue Exploring</h2><div className="mt-4 flex flex-wrap items-center justify-center gap-3">{[{ l: "View Projects", t: "projects" }, { l: "View Content", t: "content" }, { l: "View Identity", t: "identity" }, { l: "Explore Skills", t: "skills" }].map((i) => <Link key={i.t} to={`/profile/${username}/${i.t}`} className="rounded-full border border-violet-200 bg-white px-5 py-2.5 text-sm font-semibold text-violet-700">{i.l}</Link>)}</div></section>;
}

function SimpleSection({ title, body, lines, chips }: { title: string; body?: string; lines?: string[]; chips?: string[] }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      {body ? <p className="mt-2 text-sm text-zinc-700">{body}</p> : null}
      {lines ? <div className="mt-3 space-y-1.5">{lines.map((l) => <p key={l} className="text-sm text-zinc-700">{l}</p>)}</div> : null}
      {chips ? <div className="mt-4 flex flex-wrap gap-2">{chips.map((c) => <span key={c} className="rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-semibold text-violet-700">{c}</span>)}</div> : null}
    </section>
  );
}


