import { PlantName } from "@/game/plants";
import { createMatchesValidation } from "@/game/LevelClasses/validators.tsx";
import { ReplacePlantsByStringReplaceLevel } from "@/game/LevelClasses/ReplacePlantsByStringReplaceLevel.class";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { consoleLogReplace } from "@/utils/ui.tsx";
import { Editor } from "@/components/Editor.tsx";

export const NegativeLookbehind = (() => {
  try {
    return new ReplacePlantsByStringReplaceLevel({
      title: "Negative Lookbehind",
      titleToken: "(?<!...)",
      titleDescription: () => (
        <>
          <span className="regexp">{`/(?<!y)x/`}</span> matches{" "}
          <span className="literal">&quot;x&quot;</span> only if it is directly
          following NOT <span className="literal">&quot;y&quot;</span>
        </>
      ),
      task: () => (
        <>
          Replace with blackberry{" "}
          <HoverablePlantHint
            hightlightedInds={NegativeLookbehind.matchedBySolutionPlantInds}
          >
            every plant
          </HoverablePlantHint>{" "}
          that has no rose to the left of it
        </>
      ),
      description: () => (
        <>
          <Editor
            heightInStrings={1}
            code={[
              consoleLogReplace(
                "foo foo foo foo 42",
                "/(?<!(?:foo\\s*){3}\\s*)\\d\\d/gi",
                "bar",
              ),
              consoleLogReplace(
                "foo foo foo 42",
                "/(?<!(?:foo\\s*){3}\\s*)\\d\\d/gi",
                "bar",
              ),
              consoleLogReplace(
                "foo foo 42",
                "/(?<!(?:foo\\s*){3}\\s*)\\d\\d/gi",
                "bar",
              ),
              consoleLogReplace(
                "foo 42",
                "/(?<!(?:foo\\s*){3}\\s*)\\d\\d/gi",
                "bar",
              ),
            ]}
          />
        </>
      ),
      possibleSolution: /(?<!\brose\b\s*)\b\w+\b/gi,
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
        { from: PlantName.Rose, to: PlantName.Blackberry },
        { from: PlantName.Rose, to: PlantName.Rose },
        { from: PlantName.Primrose, to: PlantName.Primrose },
        { from: PlantName.Rosemary, to: PlantName.Blackberry },
        { from: PlantName.Rosemary, to: PlantName.Blackberry },
        { from: PlantName.Rose, to: PlantName.Blackberry },
        { from: PlantName.Rose, to: PlantName.Rose },
      ],
      replacer: "Blackberry",
    });
  } catch (err) {
    console.warn("Seems like your browser sucks", err);
    return new ReplacePlantsByStringReplaceLevel({
      title: "Negative Lookbehind",
      titleToken: "(?<!...)",
      titleDescription: () => (
        <>
          <span className="regexp">{`/(?<!y)x/`}</span> matches{" "}
          <span className="literal">&quot;x&quot;</span> only if it is directly
          following NOT <span className="literal">&quot;y&quot;</span>
        </>
      ),
      task: () => (
        <>
          Replace with blackberry{" "}
          <HoverablePlantHint
            hightlightedInds={NegativeLookbehind.matchedBySolutionPlantInds}
          >
            every plant
          </HoverablePlantHint>{" "}
          that has no rose to the left of it
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
        { from: PlantName.Rose, to: PlantName.Blackberry },
        { from: PlantName.Rose, to: PlantName.Rose },
        { from: PlantName.Primrose, to: PlantName.Primrose },
        { from: PlantName.Rosemary, to: PlantName.Blackberry },
        { from: PlantName.Rosemary, to: PlantName.Blackberry },
        { from: PlantName.Rose, to: PlantName.Blackberry },
        { from: PlantName.Rose, to: PlantName.Rose },
      ],
      replacer: "Blackberry",
    });
  }
})();
