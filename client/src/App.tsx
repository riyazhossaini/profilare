import { Navigate, Route, Routes } from "react-router-dom";
import { profileData } from "./data/profile";
import { IdentityDetailPage } from "./pages/IdentityDetailPage";
import { IdentityPage } from "./pages/IdentityPage";
import { ContentDetailPage } from "./pages/content/ContentDetailPage";
import { MediaDetailPage } from "./pages/content/MediaDetailPage";
import { ContentPage } from "./pages/content/ContentPage";
import { DraftsPage } from "./pages/content/DraftsPage";
import { JournalPage } from "./pages/content/JournalPage";
import { ThoughtsPage } from "./pages/content/ThoughtsPage";
import { ContactPage } from "./pages/contact/ContactPage";
import { EducationPage } from "./pages/education/EducationPage";
import { FormalEducationDetailPage } from "./pages/education/FormalEducationDetailPage";
import { EducationResourcesPage } from "./pages/education/EducationResourcesPage";
import { SelfLearningDetailPage } from "./pages/education/SelfLearningDetailPage";
import { ExperienceDetailPage } from "./pages/experience/ExperienceDetailPage";
import { ExperiencePage } from "./pages/experience/ExperiencePage";
import { HomePage } from "./pages/HomePage";
import { ProfileHubPage } from "./pages/ProfileHubPage";
import { ProfileSectionPage } from "./pages/ProfileSectionPage";
import { LinksPage } from "./pages/links/LinksPage";
import { ProjectDetailPage } from "./pages/projects/ProjectDetailPage";
import { ProjectsPage } from "./pages/projects/ProjectsPage";
import { SkillDetailPage } from "./pages/skills/SkillDetailPage";
import { SkillsPage } from "./pages/skills/SkillsPage";
import { TemplatesPage } from "./pages/TemplatesPage";
import { CreateAccountPage } from "./pages/CreateAccountPage";
import { PlatformAboutPage } from "./pages/PlatformAboutPage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { FeedbackWidget } from "./components/FeedbackWidget";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/about-platform" element={<PlatformAboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/profile/:username" element={<ProfileHubPage />} />
        <Route path="/profile/:username/about" element={<Navigate to="../identity" replace />} />
        <Route path="/profile/:username/identity" element={<IdentityPage />} />
        <Route path="/profile/:username/identity/:detailType/:slug" element={<IdentityDetailPage />} />
        <Route path="/profile/:username/skills" element={<SkillsPage />} />
        <Route path="/profile/:username/skills/:skillSlug" element={<SkillDetailPage />} />
        <Route path="/profile/:username/education" element={<EducationPage />} />
        <Route path="/profile/:username/education/resources" element={<EducationResourcesPage />} />
        <Route path="/profile/:username/education/formal/:formalSlug" element={<FormalEducationDetailPage />} />
        <Route path="/profile/:username/education/self-learning/:topicSlug" element={<SelfLearningDetailPage />} />
        <Route path="/profile/:username/experience" element={<ExperiencePage />} />
        <Route path="/profile/:username/experience/:experienceSlug" element={<ExperienceDetailPage />} />
        <Route path="/profile/:username/projects" element={<ProjectsPage />} />
        <Route path="/profile/:username/projects/:projectSlug" element={<ProjectDetailPage />} />
        <Route path="/profile/:username/links" element={<LinksPage />} />
        <Route path="/profile/:username/links/*" element={<LinksPage />} />
        <Route path="/profile/:username/social-links" element={<LinksPage />} />
        <Route path="/profile/:username/social-links/*" element={<LinksPage />} />
        <Route path="/profile/:username/content" element={<ContentPage />} />
        <Route path="/profile/:username/content/thoughts" element={<ThoughtsPage />} />
        <Route path="/profile/:username/content/journal" element={<JournalPage />} />
        <Route path="/profile/:username/content/drafts" element={<DraftsPage />} />
        <Route path="/profile/:username/content/media/:mediaSlug" element={<MediaDetailPage />} />
        <Route path="/profile/:username/content/:contentSlug" element={<ContentDetailPage />} />
        <Route path="/profile/:username/contact" element={<ContactPage />} />
        <Route path="/profile/:username/:sectionKey" element={<ProfileSectionPage />} />
        <Route path="*" element={<Navigate to={`/profile/${profileData.username}`} replace />} />
      </Routes>
      <FeedbackWidget />
    </>
  );
}
