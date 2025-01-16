import { PlantName } from "@/game/plants";
import { createIncludesValidation } from "@/game/LevelClasses/validators.tsx";
import { ReplacePlantsByStringReplaceLevel } from "@/game/LevelClasses/ReplacePlantsByStringReplaceLevel.class";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { consoleLogReplace } from "@/utils/ui.tsx";
import { Editor } from "@/components/Editor.tsx";

export const WordBoundary = new ReplacePlantsByStringReplaceLevel({
  title: "Word boundary",
  titleToken: "\\b",
  titleDescription: "",
  task: () => (
    <>
      Replace{" "}
      <HoverablePlantHint
        hightlightedInds={WordBoundary.matchedBySolutionPlantInds}
      >
        all the roses
      </HoverablePlantHint>{" "}
      with blackberries
    </>
  ),
  description: () => (
    <>
      <p>
        Likewise we restricted before the regular expressions to match start of
        string and end of string, we can make regular expressions to match a
        word boundary:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogReplace(
            "foointhestart endswithfoo foobothsidesfoo foo",
            "/\\bfoo/gi",
            "bar",
          ),
          consoleLogReplace(
            "foointhestart endswithfoo foobothsidesfoo foo",
            "/foo\\b/gi",
            "bar",
          ),
          consoleLogReplace(
            "foointhestart endswithfoo foobothsidesfoo foo",
            "/\\bfoo\\b/gi",
            "bar",
          ),
        ]}
      />
      <p>
        The word boundary is defined as the transition from any symbol matching{" "}
        <span className="regexp">\w</span> to any symbol matching{" "}
        <span className="regexp">\W</span>:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogReplace("foo42", "/foo\\b/gi", "bar"),
          consoleLogReplace("foo_", "/foo\\b/gi", "bar"),
          consoleLogReplace("foo$", "/foo\\b/gi", "bar"),
          consoleLogReplace("foo+-", "/foo\\b/gi", "bar"),
        ]}
      />
    </>
  ),
  possibleSolution: /\brose\b/gi,
  validators: [createIncludesValidation("\\b")],
  hint: [
    () => (
      <>
        You may find helpful <span className="regexp">\b</span> to differentiate
        between roses and other plants
      </>
    ),
  ],
  gardenTransitions: [
    { from: PlantName.Rose, to: PlantName.Blackberry },
    { from: PlantName.Primrose, to: PlantName.Primrose },
    { from: PlantName.Rose, to: PlantName.Blackberry },
    { from: PlantName.Rosemary, to: PlantName.Rosemary },
    { from: PlantName.Rose, to: PlantName.Blackberry },
  ],
  replacer: "Blackberry",
});
