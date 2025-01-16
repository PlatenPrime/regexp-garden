import { PlantName } from "@/game/plants";
import { createMatchesValidation } from "@/game/LevelClasses/validators.tsx";
import { ReplacePlantsByStringReplaceLevel } from "@/game/LevelClasses/ReplacePlantsByStringReplaceLevel.class";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { Editor } from "@/components/Editor.tsx";
import { consoleLogMatch, consoleLogReplace } from "@/utils/ui.tsx";

export const PositiveLookahead = new ReplacePlantsByStringReplaceLevel({
  title: "Positive lookahead",
  titleToken: "(?=...)",
  titleDescription: () => (
    <>
      <span className="regexp">/x(?=y)/</span> matches{" "}
      <span className="literal">&quot;x&quot;</span> only if it is directly
      followed by <span className="literal">&quot;y&quot;</span>
    </>
  ),
  task: () => (
    <>
      Replace with blackberry{" "}
      <HoverablePlantHint
        hightlightedInds={PositiveLookahead.matchedBySolutionPlantInds}
      >
        every rose
      </HoverablePlantHint>{" "}
      that is followed directly by rose
    </>
  ),
  description: () => (
    <>
      <p>
        Useful for replacing when you need to conditionally replace some{" "}
        <em>pattern1</em> witch is followed by another <em>pattern2</em>, and
        the <em>pattern2</em> should not be replaced.
      </p>
      <p>
        For the simple cases where you need to check if the string matches{" "}
        <em>pattern1</em> followed by <em>pattern2</em>, you can simply write{" "}
        <em>pattern2</em> after <em>pattern1</em> in the regular expression - it
        would be more simple and performant solution with the same result:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogMatch("foo42", "/foo(?=\\d*)/gi"),
          consoleLogMatch("foo42", "/foo\\d*/gi"),
          consoleLogReplace("foo42", "/foo(?=\\d*)/gi", "bar"),
          consoleLogReplace("foo42", "/foo\\d*/gi", "bar"),
        ]}
      />
    </>
  ),
  possibleSolution: /\brose(?=\s*rose\b)/gi,
  validators: [
    createMatchesValidation(
      /\(\?=.+\)/gi,
      "Your solution should include a positive lookahead",
    ),
  ],
  hint: [
    () => (
      <>
        You may find helpful <span className="regexp">\b</span>
      </>
    ),
    () => (
      <>Don&apos;t forget about tabulation symbols between the plant names</>
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
    { from: PlantName.Rose, to: PlantName.Blackberry },
    { from: PlantName.Rose, to: PlantName.Rose },
    { from: PlantName.Primrose, to: PlantName.Primrose },
    { from: PlantName.Rose, to: PlantName.Rose },
    { from: PlantName.Rosemary, to: PlantName.Rosemary },
    { from: PlantName.Rose, to: PlantName.Blackberry },
    { from: PlantName.Rose, to: PlantName.Rose },
    { from: PlantName.Rosemary, to: PlantName.Rosemary },
  ],
  replacer: "Blackberry",
});
