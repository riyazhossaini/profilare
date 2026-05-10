import { MessageSquare, Send, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

type Priority = "low" | "medium" | "high";

function apiBase() {
  const envBase = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();
  return envBase || "";
}

export function FeedbackWidget() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState("");
  const [form, setForm] = useState({
    tryingToDo: "",
    issue: "",
    priority: "medium" as Priority,
    contact: "",
  });

  const submit = async () => {
    if (!form.tryingToDo.trim() || !form.issue.trim()) return;
    setSubmitting(true);
    setDone("");
    const payload = {
      tryingToDo: form.tryingToDo.trim(),
      issue: form.issue.trim(),
      priority: form.priority,
      contact: form.contact.trim() || undefined,
      page: pathname,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    };
    try {
      const res = await fetch(`${apiBase()}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setDone("Thanks. Your feedback was submitted.");
      setForm({ tryingToDo: "", issue: "", priority: "medium", contact: "" });
    } catch {
      const key = "profilare:feedback:fallback";
      const prev = JSON.parse(localStorage.getItem(key) || "[]") as unknown[];
      localStorage.setItem(key, JSON.stringify([...prev, { ...payload, createdAt: new Date().toISOString() }]));
      setDone("Saved locally. Backend not reachable right now.");
      setForm({ tryingToDo: "", issue: "", priority: "medium", contact: "" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg"
      >
        <MessageSquare className="h-4 w-4" />
        Share Feedback
      </button>
      {open ? (
        <section className="fixed inset-0 z-[70] flex items-end justify-center bg-black/30 p-3 backdrop-blur-sm md:items-center">
          <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900">Help Us Improve</h3>
              <button onClick={() => setOpen(false)} className="rounded-full border border-zinc-200 bg-white p-1.5 text-zinc-700">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <label className="block">
                <span className="mb-1 block text-xs text-zinc-600">What were you trying to do?</span>
                <textarea value={form.tryingToDo} onChange={(e) => setForm((p) => ({ ...p, tryingToDo: e.target.value }))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-zinc-600">What was confusing or broken?</span>
                <textarea value={form.issue} onChange={(e) => setForm((p) => ({ ...p, issue: e.target.value }))} className="min-h-24 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-xs text-zinc-600">Priority</span>
                  <select value={form.priority} onChange={(e) => setForm((p) => ({ ...p, priority: e.target.value as Priority }))} className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs text-zinc-600">Contact (optional)</span>
                  <input value={form.contact} onChange={(e) => setForm((p) => ({ ...p, contact: e.target.value }))} className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
                </label>
              </div>
            </div>
            {done ? <p className="mt-3 text-sm font-medium text-emerald-700">{done}</p> : null}
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700">Close</button>
              <button disabled={submitting} onClick={submit} className="inline-flex items-center gap-1 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-70">
                <Send className="h-4 w-4" />
                {submitting ? "Sending..." : "Submit"}
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

