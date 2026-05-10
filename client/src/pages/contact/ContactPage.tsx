import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { EditableSectionBlock } from "../../components/EditableSectionBlock";
import {
  AvailabilitySection,
  CollaborationSection,
  ContactCTA,
  ContactForm,
  ContactHero,
  ContactMethodsGrid,
  ContactTopNav,
  FAQSection,
  PersonalMessage,
  TrustSection,
} from "../../components/contact/ContactSections";
import {
  availability,
  collaborationInterests,
  contactMethods,
  contactStatement,
  contactStatus,
  faqItems,
  trustItems,
  type ContactMethod,
} from "../../data/contact";
import { profileData } from "../../data/profile";
import { getGlobalProfileAvatarUrl } from "../../lib/profileAvatar";

type ContactPatch = {
  platform?: string;
  value?: string;
  purpose?: string;
  availability?: ContactMethod["availability"];
  cta?: string;
  url?: string;
};
type HeroDraft = { name: string; username: string; headline: string; statement: string; style: string; avatarText: string };
type AvailabilityDraft = { status: string; response: string; timezone: string; meeting: string; hours: string };
type FAQDraft = { q: string; a: string; hidden?: boolean };
type ToastState =
  | { type: "confirm-delete"; message: string; action: "hide-hero" | "delete-method" | "hide-section" | "delete-faq" | "delete-collab" | "delete-trust"; slug?: string; index?: number }
  | { type: "success"; message: string }
  | null;

const K = "profilare:contact-card-edits";
const HERO_KEY = "profilare:contact-hero-edits";
const HERO_VISIBLE_KEY = "profilare:contact-hero-visible";
const HIDDEN_METHODS_KEY = "profilare:contact-hidden-methods";
const SECTION_VISIBILITY_KEY = "profilare:contact-section-visibility";
const COLLAB_KEY = "profilare:contact-collaboration-edits";
const AVAILABILITY_KEY = "profilare:contact-availability-edits";
const FAQ_KEY = "profilare:contact-faq-edits";
const TRUST_KEY = "profilare:contact-trust-edits";
const PERSONAL_MESSAGE_KEY = "profilare:contact-message-edit";
const COMMUNITY_KEY = "profilare:contact-community-edits";
const load = <T,>(k: string, f: T) => {
  try {
    return JSON.parse(localStorage.getItem(k) || "") as T;
  } catch {
    return f;
  }
};
const save = <T,>(k: string, v: T) => localStorage.setItem(k, JSON.stringify(v));

export function ContactPage() {
  const { username } = useParams<{ username: string }>();
  const [patches, setPatches] = useState<Record<string, ContactPatch>>(() => load(K, {}));
  const [editing, setEditing] = useState<string | null>(null);
  const [heroVisible, setHeroVisible] = useState<boolean>(() => load(HERO_VISIBLE_KEY, true));
  const [editingHero, setEditingHero] = useState(false);
  const [hiddenMethods, setHiddenMethods] = useState<Record<string, boolean>>(() => load(HIDDEN_METHODS_KEY, {}));
  const [toast, setToast] = useState<ToastState>(null);
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>(() =>
    load(SECTION_VISIBILITY_KEY, {
      methods: true,
      form: true,
      collaboration: true,
      availability: true,
      faq: true,
      community: true,
      trust: true,
      message: true,
      cta: true,
    }),
  );
  const [hero, setHero] = useState<HeroDraft>(() =>
    load(HERO_KEY, {
      name: profileData.name,
      username: profileData.username,
      headline: profileData.headline,
      statement: contactStatement,
      style: "Thoughtful conversations over short-term networking.",
      avatarText: profileData.name
        .split(" ")
        .map((p) => p[0]?.toUpperCase() || "")
        .slice(0, 2)
        .join(""),
    }),
  );
  const [collabItems, setCollabItems] = useState<string[]>(() => load(COLLAB_KEY, collaborationInterests));
  const [availabilityData, setAvailabilityData] = useState<AvailabilityDraft>(() => load(AVAILABILITY_KEY, availability));
  const [faqState, setFaqState] = useState<FAQDraft[]>(() => load(FAQ_KEY, faqItems));
  const [trustState, setTrustState] = useState<string[]>(() => load(TRUST_KEY, trustItems));
  const [communityItems, setCommunityItems] = useState<string[]>(() =>
    load(COMMUNITY_KEY, ["Active in startup communities", "Participates in builder and tech circles", "Open to meaningful founder networks"]),
  );
  const [personalMessage, setPersonalMessage] = useState<string>(() =>
    load(PERSONAL_MESSAGE_KEY, "If you’re building something meaningful, exploring interesting ideas, or simply want to connect thoughtfully, feel free to reach out."),
  );
  const [editingCollab, setEditingCollab] = useState(false);
  const [editingFaqIndex, setEditingFaqIndex] = useState<number | null>(null);
  const [editingTrust, setEditingTrust] = useState(false);
  const [editingCommunity, setEditingCommunity] = useState(false);
  const [editingAvailability, setEditingAvailability] = useState(false);
  const [editingMessage, setEditingMessage] = useState(false);

  if (!username || username !== profileData.username) return <Navigate to={`/profile/${profileData.username}`} replace />;

  const methods = contactMethods.map((m) => ({ ...m, ...patches[m.platform] })).filter((m) => !hiddenMethods[m.platform]);
  const editingItem = methods.find((m) => m.platform === editing) || null;
  const visibleFaq = faqState.filter((i) => !i.hidden);

  const runQuickAction = async (value: string, type: "copy" | "link" | "share") => {
    if (type === "copy") {
      try {
        await navigator.clipboard.writeText(value);
      } catch {}
      return;
    }
    if (type === "share" && navigator.share) {
      try {
        await navigator.share({ url: `${window.location.origin}${value}` });
        return;
      } catch {}
    }
    window.open(type === "share" ? `${window.location.origin}${value}` : value, "_blank", "noopener,noreferrer");
  };

  const toggleSection = (slug: string, visible: boolean, msg: string) => {
    const next = { ...sectionVisibility, [slug]: visible };
    setSectionVisibility(next);
    save(SECTION_VISIBILITY_KEY, next);
    setToast({ type: "success", message: msg });
  };

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <ContactTopNav username={profileData.username} name={profileData.name} onAction={runQuickAction} />

        {heroVisible ? (
          <section className="group relative">
            <div className="absolute right-3 top-8 z-10 flex gap-2">
              <button onClick={() => setEditingHero(true)} className="rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => setToast({ type: "confirm-delete", message: "Hide Contact hero section?", action: "hide-hero" })} className="rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            </div>
            <ContactHero name={hero.name} username={hero.username} headline={hero.headline} statement={hero.statement} status={contactStatus} style={hero.style} avatarText={hero.avatarText} avatarUrl={getGlobalProfileAvatarUrl()} />
          </section>
        ) : (
          <HiddenSection name="Contact Hero" onShow={() => { setHeroVisible(true); save(HERO_VISIBLE_KEY, true); setToast({ type: "success", message: "Contact hero restored." }); }} />
        )}

        {sectionVisibility.methods ? (
          <section className="group relative">
            <button onClick={() => setToast({ type: "confirm-delete", message: "Hide Contact Methods section?", action: "hide-section", slug: "methods" })} className="absolute right-3 top-8 z-10 rounded-full border border-rose-200 bg-white p-2 text-rose-600 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
            <EditableSectionBlock sectionId="contact-methods" label="Contact Methods">
              {methods.length ? (
                <ContactMethodsGrid items={methods} onEdit={setEditing} onDelete={(platform) => setToast({ type: "confirm-delete", message: "Delete this contact method?", action: "delete-method", slug: platform })} />
              ) : (
                <section className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
                  <p className="text-sm text-zinc-600">All contact methods are deleted.</p>
                  <button onClick={() => { setHiddenMethods({}); save(HIDDEN_METHODS_KEY, {}); setToast({ type: "success", message: "Contact methods restored." }); }} className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">Restore Methods</button>
                </section>
              )}
            </EditableSectionBlock>
          </section>
        ) : (
          <HiddenSection name="Contact Methods" onShow={() => toggleSection("methods", true, "Contact Methods section restored.")} />
        )}

        {sectionVisibility.form ? <SectionWithDelete label="Contact Form" onDelete={() => setToast({ type: "confirm-delete", message: "Hide Contact Form section?", action: "hide-section", slug: "form" })}><EditableSectionBlock sectionId="contact-form" label="Contact Form"><ContactForm /></EditableSectionBlock></SectionWithDelete> : <HiddenSection name="Contact Form" onShow={() => toggleSection("form", true, "Contact Form section restored.")} />}
        {sectionVisibility.collaboration ? <SectionWithDelete label="Collaboration" onEdit={() => setEditingCollab(true)} onDelete={() => setToast({ type: "confirm-delete", message: "Hide Collaboration section?", action: "hide-section", slug: "collaboration" })}><EditableSectionBlock sectionId="contact-collaboration" label="Collaboration"><CollaborationSection items={collabItems} /></EditableSectionBlock></SectionWithDelete> : <HiddenSection name="Collaboration" onShow={() => toggleSection("collaboration", true, "Collaboration section restored.")} />}
        {sectionVisibility.availability ? <SectionWithDelete label="Availability" onEdit={() => setEditingAvailability(true)} onDelete={() => setToast({ type: "confirm-delete", message: "Hide Availability section?", action: "hide-section", slug: "availability" })}><EditableSectionBlock sectionId="contact-availability" label="Availability"><AvailabilitySection data={availabilityData} /></EditableSectionBlock></SectionWithDelete> : <HiddenSection name="Availability" onShow={() => toggleSection("availability", true, "Availability section restored.")} />}
        {sectionVisibility.faq ? <SectionWithDelete label="FAQ" onDelete={() => setToast({ type: "confirm-delete", message: "Hide FAQ section?", action: "hide-section", slug: "faq" })}><EditableSectionBlock sectionId="contact-faq" label="FAQ">{visibleFaq.length ? <FAQSection items={visibleFaq} onEdit={(i) => { const item = visibleFaq[i]; const original = faqState.findIndex((f) => f.q === item.q && f.a === item.a && !f.hidden); if (original >= 0) setEditingFaqIndex(original); }} onDelete={(i) => { const item = visibleFaq[i]; const original = faqState.findIndex((f) => f.q === item.q && f.a === item.a && !f.hidden); if (original >= 0) setToast({ type: "confirm-delete", message: "Delete this FAQ item?", action: "delete-faq", index: original }); }} /> : <section className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center"><p className="text-sm text-zinc-600">All FAQ items are deleted.</p><button onClick={() => { const restored = faqState.map((f) => ({ ...f, hidden: false })); setFaqState(restored); save(FAQ_KEY, restored); setToast({ type: "success", message: "FAQ restored." }); }} className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">Restore FAQ</button></section>}</EditableSectionBlock></SectionWithDelete> : <HiddenSection name="FAQ" onShow={() => toggleSection("faq", true, "FAQ section restored.")} />}
        {sectionVisibility.community ? <SectionWithDelete label="Community" onEdit={() => setEditingCommunity(true)} onDelete={() => setToast({ type: "confirm-delete", message: "Hide Community section?", action: "hide-section", slug: "community" })}><EditableSectionBlock sectionId="contact-community" label="Community"><SimpleLinesSection title="Community & Networking" lines={communityItems} /></EditableSectionBlock></SectionWithDelete> : <HiddenSection name="Community" onShow={() => toggleSection("community", true, "Community section restored.")} />}
        {sectionVisibility.trust ? <SectionWithDelete label="Trust" onEdit={() => setEditingTrust(true)} onDelete={() => setToast({ type: "confirm-delete", message: "Hide Trust section?", action: "hide-section", slug: "trust" })}><EditableSectionBlock sectionId="contact-trust" label="Trust"><TrustSection items={trustState} /></EditableSectionBlock></SectionWithDelete> : <HiddenSection name="Trust" onShow={() => toggleSection("trust", true, "Trust section restored.")} />}
        {sectionVisibility.message ? <SectionWithDelete label="Personal Message" onEdit={() => setEditingMessage(true)} onDelete={() => setToast({ type: "confirm-delete", message: "Hide Personal Message section?", action: "hide-section", slug: "message" })}><EditableSectionBlock sectionId="contact-message" label="Personal Message"><PersonalMessage text={personalMessage} /></EditableSectionBlock></SectionWithDelete> : <HiddenSection name="Personal Message" onShow={() => toggleSection("message", true, "Personal Message section restored.")} />}
        {sectionVisibility.cta ? <SectionWithDelete label="Next Step" onDelete={() => setToast({ type: "confirm-delete", message: "Hide Next Step section?", action: "hide-section", slug: "cta" })}><EditableSectionBlock sectionId="contact-cta" label="Next Step"><ContactCTA username={profileData.username} /></EditableSectionBlock></SectionWithDelete> : <HiddenSection name="Next Step" onShow={() => toggleSection("cta", true, "Next Step section restored.")} />}
      </div>

      <AnimatePresence>
        {editingItem ? <EditModal item={editingItem} onClose={() => setEditing(null)} onSave={(v) => { const n = { ...patches, [editingItem.platform]: v }; setPatches(n); save(K, n); setEditing(null); setToast({ type: "success", message: "Contact method updated." }); }} /> : null}
        {editingHero ? <HeroEditModal value={hero} onClose={() => setEditingHero(false)} onSave={(next) => { setHero(next); save(HERO_KEY, next); setEditingHero(false); setToast({ type: "success", message: "Contact hero updated." }); }} /> : null}
        {editingAvailability ? <AvailabilityEditModal value={availabilityData} onClose={() => setEditingAvailability(false)} onSave={(next) => { setAvailabilityData(next); save(AVAILABILITY_KEY, next); setEditingAvailability(false); setToast({ type: "success", message: "Availability updated." }); }} /> : null}
        {editingMessage ? <TextEditModal title="Edit Personal Message" value={personalMessage} label="Message" onClose={() => setEditingMessage(false)} onSave={(next) => { setPersonalMessage(next); save(PERSONAL_MESSAGE_KEY, next); setEditingMessage(false); setToast({ type: "success", message: "Personal message updated." }); }} /> : null}
        {editingFaqIndex !== null ? <FAQEditModal value={faqState[editingFaqIndex]} onClose={() => setEditingFaqIndex(null)} onSave={(next) => { const copy = [...faqState]; copy[editingFaqIndex] = { ...copy[editingFaqIndex], ...next }; setFaqState(copy); save(FAQ_KEY, copy); setEditingFaqIndex(null); setToast({ type: "success", message: "FAQ item updated." }); }} /> : null}
        {editingCollab ? <ListEditModal title="Edit Collaboration Items" value={collabItems} onClose={() => setEditingCollab(false)} onSave={(next) => { setCollabItems(next); save(COLLAB_KEY, next); setEditingCollab(false); setToast({ type: "success", message: "Collaboration updated." }); }} /> : null}
        {editingTrust ? <ListEditModal title="Edit Trust Items" value={trustState} onClose={() => setEditingTrust(false)} onSave={(next) => { setTrustState(next); save(TRUST_KEY, next); setEditingTrust(false); setToast({ type: "success", message: "Trust updated." }); }} /> : null}
        {editingCommunity ? <ListEditModal title="Edit Community Items" value={communityItems} onClose={() => setEditingCommunity(false)} onSave={(next) => { setCommunityItems(next); save(COMMUNITY_KEY, next); setEditingCommunity(false); setToast({ type: "success", message: "Community section updated." }); }} /> : null}
        {toast ? <Toast toast={toast} onClose={() => setToast(null)} onConfirm={() => {
          if (toast.type !== "confirm-delete") return;
          if (toast.action === "hide-hero") {
            setHeroVisible(false);
            save(HERO_VISIBLE_KEY, false);
            setToast({ type: "success", message: "Contact hero hidden." });
            return;
          }
          if (toast.action === "delete-method" && toast.slug) {
            const next = { ...hiddenMethods, [toast.slug]: true };
            setHiddenMethods(next);
            save(HIDDEN_METHODS_KEY, next);
            setToast({ type: "success", message: "Contact method deleted." });
            return;
          }
          if (toast.action === "hide-section" && toast.slug) {
            toggleSection(toast.slug, false, "Section hidden.");
            return;
          }
          if (toast.action === "delete-faq" && typeof toast.index === "number") {
            const copy = [...faqState];
            copy[toast.index] = { ...copy[toast.index], hidden: true };
            setFaqState(copy);
            save(FAQ_KEY, copy);
            setToast({ type: "success", message: "FAQ item deleted." });
            return;
          }
          if (toast.action === "delete-collab" && typeof toast.index === "number") {
            const copy = collabItems.filter((_, i) => i !== toast.index);
            setCollabItems(copy);
            save(COLLAB_KEY, copy);
            setToast({ type: "success", message: "Collaboration item deleted." });
            return;
          }
          if (toast.action === "delete-trust" && typeof toast.index === "number") {
            const copy = trustState.filter((_, i) => i !== toast.index);
            setTrustState(copy);
            save(TRUST_KEY, copy);
            setToast({ type: "success", message: "Trust item deleted." });
          }
        }} /> : null}
      </AnimatePresence>
    </main>
  );
}

function SectionWithDelete({ children, onDelete, onEdit }: { children: React.ReactNode; label: string; onDelete: () => void; onEdit?: () => void }) {
  return (
    <section className="group relative">
      <div className="absolute right-3 top-8 z-10 flex gap-2 pointer-events-none opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
        {onEdit ? <button onClick={onEdit} className="rounded-full border border-zinc-200 bg-white p-2 text-zinc-700"><Pencil className="h-4 w-4" /></button> : null}
        <button onClick={onDelete} className="rounded-full border border-rose-200 bg-white p-2 text-rose-600"><Trash2 className="h-4 w-4" /></button>
      </div>
      {children}
    </section>
  );
}

function EditModal({ item, onClose, onSave }: { item: ContactMethod; onClose: () => void; onSave: (v: ContactPatch) => void }) {
  const [d, setD] = useState<ContactPatch>({ platform: item.platform, value: item.value, purpose: item.purpose, availability: item.availability, cta: item.cta, url: item.url });
  return <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4"><motion.div initial={{y:14,opacity:0}} animate={{y:0,opacity:1}} exit={{y:14,opacity:0}} className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-lg font-bold">Edit Contact Card</h3><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5"><X className="h-4 w-4" /></button></div><div className="mt-4 grid gap-3 md:grid-cols-2"><Field label="Platform" value={d.platform||""} onChange={(v)=>setD(p=>({...p,platform:v}))} /><Field label="Value" value={d.value||""} onChange={(v)=>setD(p=>({...p,value:v}))} /><Field label="Purpose" value={d.purpose||""} onChange={(v)=>setD(p=>({...p,purpose:v}))} /><Field label="Availability" value={d.availability||""} onChange={(v)=>setD(p=>({...p,availability:v as ContactMethod["availability"]}))} /><Field label="CTA" value={d.cta||""} onChange={(v)=>setD(p=>({...p,cta:v}))} /><Field label="URL" value={d.url||""} onChange={(v)=>setD(p=>({...p,url:v}))} /></div><button onClick={()=>onSave(d)} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"><Save className="h-4 w-4" />Save</button></motion.div></motion.div>;
}

function HeroEditModal({ value, onClose, onSave }: { value: HeroDraft; onClose: () => void; onSave: (v: HeroDraft) => void }) {
  const [draft, setDraft] = useState(value);
  return <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4"><motion.div initial={{y:14,opacity:0}} animate={{y:0,opacity:1}} exit={{y:14,opacity:0}} className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-lg font-bold">Edit Contact Hero</h3><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5"><X className="h-4 w-4" /></button></div><div className="mt-4 grid gap-3 overflow-y-auto pr-1 md:grid-cols-2"><Field label="Name" value={draft.name} onChange={(v)=>setDraft(p=>({...p,name:v}))} /><Field label="Username" value={draft.username} onChange={(v)=>setDraft(p=>({...p,username:v}))} /><Field label="Headline" value={draft.headline} onChange={(v)=>setDraft(p=>({...p,headline:v}))} /><Field label="Avatar Text" value={draft.avatarText} onChange={(v)=>setDraft(p=>({...p,avatarText:v.slice(0,3).toUpperCase()}))} /><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Statement</label><textarea value={draft.statement} onChange={(e)=>setDraft(p=>({...p,statement:e.target.value}))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div><div className="md:col-span-2"><label className="mb-1 block text-xs text-zinc-600">Style Line</label><textarea value={draft.style} onChange={(e)=>setDraft(p=>({...p,style:e.target.value}))} className="min-h-20 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div></div><button onClick={()=>onSave(draft)} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"><Save className="h-4 w-4" />Save</button></motion.div></motion.div>;
}

function AvailabilityEditModal({ value, onClose, onSave }: { value: AvailabilityDraft; onClose: () => void; onSave: (v: AvailabilityDraft) => void }) {
  const [d, setD] = useState(value);
  return <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4"><motion.div initial={{y:14,opacity:0}} animate={{y:0,opacity:1}} exit={{y:14,opacity:0}} className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-lg font-bold">Edit Availability</h3><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5"><X className="h-4 w-4" /></button></div><div className="mt-4 grid gap-3 overflow-y-auto pr-1 md:grid-cols-2"><Field label="Status" value={d.status} onChange={(v)=>setD(p=>({...p,status:v}))} /><Field label="Response Window" value={d.response} onChange={(v)=>setD(p=>({...p,response:v}))} /><Field label="Timezone" value={d.timezone} onChange={(v)=>setD(p=>({...p,timezone:v}))} /><Field label="Preferred Mode" value={d.meeting} onChange={(v)=>setD(p=>({...p,meeting:v}))} /><div className="md:col-span-2"><Field label="Hours" value={d.hours} onChange={(v)=>setD(p=>({...p,hours:v}))} /></div></div><button onClick={()=>onSave(d)} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"><Save className="h-4 w-4" />Save</button></motion.div></motion.div>;
}

function FAQEditModal({ value, onClose, onSave }: { value: FAQDraft; onClose: () => void; onSave: (v: FAQDraft) => void }) {
  const [d, setD] = useState(value);
  return <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4"><motion.div initial={{y:14,opacity:0}} animate={{y:0,opacity:1}} exit={{y:14,opacity:0}} className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-lg font-bold">Edit FAQ</h3><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5"><X className="h-4 w-4" /></button></div><div className="mt-4 grid gap-3"><Field label="Question" value={d.q} onChange={(v)=>setD(p=>({...p,q:v}))} /><div><label className="mb-1 block text-xs text-zinc-600">Answer</label><textarea value={d.a} onChange={(e)=>setD(p=>({...p,a:e.target.value}))} className="min-h-24 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div></div><button onClick={()=>onSave(d)} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"><Save className="h-4 w-4" />Save</button></motion.div></motion.div>;
}

function TextEditModal({ title, value, label, onClose, onSave }: { title: string; value: string; label: string; onClose: () => void; onSave: (v: string) => void }) {
  const [text, setText] = useState(value);
  return <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4"><motion.div initial={{y:14,opacity:0}} animate={{y:0,opacity:1}} exit={{y:14,opacity:0}} className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-lg font-bold">{title}</h3><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5"><X className="h-4 w-4" /></button></div><div className="mt-4"><label className="mb-1 block text-xs text-zinc-600">{label}</label><textarea value={text} onChange={(e)=>setText(e.target.value)} className="min-h-24 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div><button onClick={()=>onSave(text)} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"><Save className="h-4 w-4" />Save</button></motion.div></motion.div>;
}

function ListEditModal({ title, value, onClose, onSave }: { title: string; value: string[]; onClose: () => void; onSave: (v: string[]) => void }) {
  const [text, setText] = useState(value.join("\n"));
  return <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/25 p-3 backdrop-blur-sm md:items-center md:p-4"><motion.div initial={{y:14,opacity:0}} animate={{y:0,opacity:1}} exit={{y:14,opacity:0}} className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-[#fcfbfd] p-5 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-lg font-bold">{title}</h3><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white p-1.5"><X className="h-4 w-4" /></button></div><div className="mt-4"><label className="mb-1 block text-xs text-zinc-600">One item per line</label><textarea value={text} onChange={(e)=>setText(e.target.value)} className="min-h-44 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></div><button onClick={()=>onSave(text.split("\n").map((v)=>v.trim()).filter(Boolean))} className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#6C4DFF] px-4 py-2 text-sm font-semibold text-white"><Save className="h-4 w-4" />Save</button></motion.div></motion.div>;
}

const Field = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => <label><span className="mb-1 block text-xs text-zinc-600">{label}</span><input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" /></label>;

function HiddenSection({ name, onShow }: { name: string; onShow: () => void }) {
  return (
    <section className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-5 text-center">
      <p className="text-sm text-zinc-600">{name} section is hidden.</p>
      <button onClick={onShow} className="mt-3 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">Show Section</button>
    </section>
  );
}

function Toast({ toast, onClose, onConfirm }: { toast: ToastState; onClose: () => void; onConfirm: () => void }) {
  if (!toast) return null;
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="fixed bottom-4 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl">
      <p className="text-sm text-zinc-800">{toast.message}</p>
      {toast.type === "confirm-delete" ? (
        <div className="mt-3 flex gap-2"><button onClick={onConfirm} className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">Confirm</button><button onClick={onClose} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Cancel</button></div>
      ) : (
        <button onClick={onClose} className="mt-3 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">Close</button>
      )}
    </motion.div>
  );
}

function SimpleLinesSection({ title, lines }: { title: string; lines: string[] }) {
  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-3 space-y-1.5">
        {lines.map((line) => (
          <p key={line} className="text-sm text-zinc-700">{line}</p>
        ))}
      </div>
    </section>
  );
}




