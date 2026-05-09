import { Navigate, useParams } from "react-router-dom";
import {
  AvailabilitySection,
  CollaborationSection,
  ContactCTA,
  ContactForm,
  ContactHero,
  ContactMethodsGrid,
  ContactTopNav,
  CommunitySection,
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
} from "../../data/contact";
import { profileData } from "../../data/profile";

export function ContactPage() {
  const { username } = useParams<{ username: string }>();

  if (!username || username !== profileData.username) return <Navigate to={`/profile/${profileData.username}`} replace />;

  const runQuickAction = async (value: string, type: "copy" | "link" | "share") => {
    if (type === "copy") {
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        // no-op fallback
      }
      return;
    }
    if (type === "share" && navigator.share) {
      try {
        await navigator.share({ url: `${window.location.origin}${value}` });
        return;
      } catch {
        // no-op fallback
      }
    }
    window.open(type === "share" ? `${window.location.origin}${value}` : value, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <ContactTopNav username={profileData.username} name={profileData.name} onAction={runQuickAction} />
        <ContactHero
          name={profileData.name}
          username={profileData.username}
          headline={profileData.headline}
          statement={contactStatement}
          status={contactStatus}
          style="Thoughtful conversations over short-term networking."
        />
        <ContactMethodsGrid items={contactMethods} />
        <ContactForm />
        <CollaborationSection items={collaborationInterests} />
        <AvailabilitySection data={availability} />
        <FAQSection items={faqItems} />
        <CommunitySection />
        <TrustSection items={trustItems} />
        <PersonalMessage />
        <ContactCTA username={profileData.username} />
      </div>
    </main>
  );
}
