import { GameSectionSlider } from "./game-section-slider";
import type { HomeGameCategorySection } from "../types";

export function HomeGameSections({
  sections,
}: {
  sections: HomeGameCategorySection[];
}) {
  return (
    <>
      {sections.map((section) => (
        <GameSectionSlider
          key={section.id}
          title={section.title}
          icon={resolveSectionIcon(section.title)}
          games={section.games}
        />
      ))}
    </>
  );
}

function resolveSectionIcon(title: string) {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes("slot")) {
    return "🎰";
  }

  if (normalizedTitle.includes("sport")) {
    return "⚽";
  }

  if (normalizedTitle.includes("fish")) {
    return "🐬";
  }

  if (normalizedTitle.includes("card")) {
    return "🃏";
  }

  return "🔥";
}
