import { PlantName } from "@/game/plants";
import { createMatchesValidation } from "@/game/LevelClasses/validators.tsx";
import { ReplacePlantsByStringReplaceLevel } from "@/game/LevelClasses/ReplacePlantsByStringReplaceLevel.class";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";

export const Revision2 = (() => {
  try {
    return new ReplacePlantsByStringReplaceLevel({
      title: "",
      titleToken: "Revision 2",
      titleDescription: () => <>Let&apos;s recap the previous lessons</>,
      task: () => (
        <>
          Replace with blackberry{" "}
          <HoverablePlantHint
            hightlightedInds={Revision2.matchedBySolutionPlantInds}
          >
            every plant
          </HoverablePlantHint>{" "}
          that is not following directly AND is not followed directly by rose
        </>
      ),
      description: "",
      possibleSolution: /(?<!\brose\b\s*)\b\w+\b(?!\s*rose\b)/gi,
      validators: [
        createMatchesValidation(
          /\(\?<!.+\)/gi,
          "Your solution should include a negative lookbehind",
        ),
      ],
      hint: [
        () => (
          <>
            You may find helpful <span className="regexp">\b</span>
          </>
        ),
        () => (
          <>
            Don&apos;t forget about tabulation symbols between the plant names
          </>
        ),
        () => (
          <>
            You may find helpful <span className="regexp">\s</span> to match
            tabulation symbol
          </>
        ),
      ],
      gardenTransitions: [
        { from: PlantName.Rose, to: PlantName.Blackberry },
        { from: PlantName.Rosemary, to: PlantName.Rosemary },
        { from: PlantName.Rose, to: PlantName.Rose },
        { from: PlantName.Rose, to: PlantName.Rose },
        { from: PlantName.Primrose, to: PlantName.Primrose },
        { from: PlantName.Rosemary, to: PlantName.Blackberry },
        { from: PlantName.Rosemary, to: PlantName.Rosemary },
        { from: PlantName.Rose, to: PlantName.Rose },
        { from: PlantName.Rose, to: PlantName.Rose },
      ],
      replacer: "Blackberry",
    });
  } catch (err) {
    console.warn("Seems like your browser sucks", err);
    return new ReplacePlantsByStringReplaceLevel({
      title: "",
      titleToken: "Revision 2",
      titleDescription: () => <>Let&apos;s recap the previous lessons</>,
      task: () => (
        <>
          Replace with blackberry{" "}
          <HoverablePlantHint
            hightlightedInds={Revision2.matchedBySolutionPlantInds}
          >
            every plant
          </HoverablePlantHint>{" "}
          that is not following directly AND is not followed directly by rose
        </>
      ),
      description: "",
      possibleSolution: /.*?/gi,
      validators: [],
      hint: [
        () => (
          <>
            You may find helpful <span className="regexp">\b</span>
          </>
        ),
        () => (
          <>
            Don&apos;t forget about tabulation symbols between the plant names
          </>
        ),
        () => (
          <>
            You may find helpful <span className="regexp">\s</span> to match
            tabulation symbol
          </>
        ),
      ],
      gardenTransitions: [
        { from: PlantName.Rose, to: PlantName.Blackberry },
        { from: PlantName.Rosemary, to: PlantName.Rosemary },
        { from: PlantName.Rose, to: PlantName.Rose },
        { from: PlantName.Rose, to: PlantName.Rose },
        { from: PlantName.Primrose, to: PlantName.Primrose },
        { from: PlantName.Rosemary, to: PlantName.Blackberry },
        { from: PlantName.Rosemary, to: PlantName.Rosemary },
        { from: PlantName.Rose, to: PlantName.Rose },
        { from: PlantName.Rose, to: PlantName.Rose },
      ],
      replacer: "Blackberry",
      isNotSupported: true,
    });
  }
})();
