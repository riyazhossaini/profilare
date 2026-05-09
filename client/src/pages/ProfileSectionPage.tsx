import { motion } from "framer-motion";
import { Navigate, useParams } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import { profileData, profileSections } from "../data/profile";

export function ProfileSectionPage() {
  const { username, sectionKey } = useParams<{ username: string; sectionKey: string }>();

  if (!username || username !== profileData.username) {
    return <Navigate to={`/profile/${profileData.username}`} replace />;
  }

  const section = profileSections.find((item) => item.key === sectionKey);

  if (!section) {
    return <Navigate to={`/profile/${profileData.username}`} replace />;
  }

  const Icon = section.icon;

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-4xl">
        <BackButton to={`/profile/${profileData.username}`} />

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-5 rounded-3xl border border-white/70 bg-white/75 p-6 shadow-[0_28px_56px_-32px_rgba(79,70,229,0.55)] backdrop-blur md:p-8"
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-md">
            <Icon className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl">{section.title}</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600">{section.intro}</p>

          <div className="mt-8 rounded-2xl border border-dashed border-violet-200 bg-gradient-to-br from-white to-violet-50/60 p-6">
            <h2 className="text-lg font-bold text-zinc-900">{section.sampleHeading}</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 md:text-base">{section.sampleBody}</p>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
