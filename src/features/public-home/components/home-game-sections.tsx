import { GameSection } from "./game-section";
import { GameSectionSlider } from "./game-section-slider";
import type { HomeGameCategorySection } from "../types";

export function HomeGameSections({
  sections,
}: {
  sections: HomeGameCategorySection[];
}) {
  const lastSectionIndex = sections.length - 1;

  return (
    <>
      {sections.map((section, index) =>
        index === lastSectionIndex && section.games.length > 6 ? (
          <GameSectionSlider
            key={section.id}
            title={section.title}
            icon={resolveSectionIcon(section.title)}
            games={section.games}
          />
        ) : (
          <GameSection
            key={section.id}
            title={section.title}
            icon={resolveSectionIcon(section.title)}
            games={section.games.slice(0, 6)}
          />
        ),
      )}
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
