import { motion } from "framer-motion";
import { type ProfileSection } from "../data/profile";
import { SectionCard } from "./SectionCard";

type SectionGridProps = {
  username: string;
  sections: ProfileSection[];
  onEditSection?: (sectionKey: string) => void;
};

export function SectionGrid({ username, sections, onEditSection }: SectionGridProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mt-8"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section, index) => (
          <motion.div
            key={section.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
          >
            <SectionCard
              to={`/profile/${username}/${section.key}`}
              title={section.title}
              description={`${section.description} ->`}
              icon={section.icon}
              onEdit={onEditSection ? () => onEditSection(section.key) : undefined}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
