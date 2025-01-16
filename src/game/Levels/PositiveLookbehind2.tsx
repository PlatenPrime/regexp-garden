import { PlantName } from "@/game/plants";
import { createMatchesValidation } from "@/game/LevelClasses/validators.tsx";
import { ReplacePlantsByStringReplaceLevel } from "@/game/LevelClasses/ReplacePlantsByStringReplaceLevel.class";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { consoleLogReplace } from "@/utils/ui.tsx";
import { Editor } from "@/components/Editor.tsx";

export const PositiveLookbehind2 = (() => {
  try {
    return new ReplacePlantsByStringReplaceLevel({
      title: "Positive Lookbehind",
      titleToken: "(?<=...)",
      titleDescription: () => (
        <>
          <span className="regexp">{`/(?<=y)x/`}</span> matches{" "}
          <span className="literal">&quot;x&quot;</span> only if it is directly
          following <span className="literal">&quot;y&quot;</span>
        </>
      ),
      task: () => (
        <>
          Replace with blackberry{" "}
          <HoverablePlantHint
            hightlightedInds={PositiveLookbehind2.matchedBySolutionPlantInds}
          >
            all the roses
          </HoverablePlantHint>{" "}
          that are directly following rose
        </>
      ),
      description: () => (
        <>
          <Editor
            heightInStrings={1}
            code={[
              consoleLogReplace(
                "foo foo foo foo 42",
                "/(?<=foo\\s*)foo/gi",
                "bar",
              ),
              consoleLogReplace("foo foo foo 42", "/(?<=foo\\s*)foo/gi", "bar"),
              consoleLogReplace("foo foo 42", "/(?<=foo\\s*)foo/gi", "bar"),
              consoleLogReplace("foo 42", "/(?<=foo\\s*)foo/gi", "bar"),
            ]}
          />
        </>
      ),
      possibleSolution: /(?<=\brose\s)rose\b/gi,
      validators: [
        createMatchesValidation(
          /\(\?<=.+\)/gi,
          "Your solution should include a positive lookbehind",
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
        { from: PlantName.Rose, to: PlantName.Rose },
        { from: PlantName.Rosemary, to: PlantName.Rosemary },
        { from: PlantName.Rose, to: PlantName.Rose },
        { from: PlantName.Rose, to: PlantName.Blackberry },
        { from: PlantName.Primrose, to: PlantName.Primrose },
        { from: PlantName.Rose, to: PlantName.Rose },
        { from: PlantName.Rosemary, to: PlantName.Rosemary },
        { from: PlantName.Primrose, to: PlantName.Primrose },
        { from: PlantName.Rosemary, to: PlantName.Rosemary },
        { from: PlantName.Rose, to: PlantName.Rose },
        { from: PlantName.Rose, to: PlantName.Blackberry },
      ],
      replacer: "Blackberry",
    });
  } catch (err) {
    console.warn("Seems like your browser sucks", err);
    return new ReplacePlantsByStringReplaceLevel({
      title: "Positive Lookbehind",
      titleToken: "(?<=...)",
      titleDescription: () => (
        <>
          <span className="regexp">{`/(?<=y)x/`}</span> matches{" "}
          <span className="literal">&quot;x&quot;</span> only if it is directly
          following <span className="literal">&quot;y&quot;</span>
        </>
      ),
      task: () => (
        <>
          Replace with blackberry{" "}
          <HoverablePlantHint
            hightlightedInds={PositiveLookbehind2.matchedBySolutionPlantInds}
          >
            all the roses
          </HoverablePlantHint>{" "}
          that are directly following rose
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
        { from: PlantName.Rose, to: PlantName.Rose },
        { from: PlantName.Rosemary, to: PlantName.Rosemary },
        { from: PlantName.Rose, to: PlantName.Rose },
        { from: PlantName.Rose, to: PlantName.Blackberry },
        { from: PlantName.Primrose, to: PlantName.Primrose },
        { from: PlantName.Rose, to: PlantName.Rose },
        { from: PlantName.Rosemary, to: PlantName.Rosemary },
        { from: PlantName.Primrose, to: PlantName.Primrose },
        { from: PlantName.Rosemary, to: PlantName.Rosemary },
        { from: PlantName.Rose, to: PlantName.Rose },
        { from: PlantName.Rose, to: PlantName.Blackberry },
      ],
      replacer: "Blackberry",
    });
  }
})();
