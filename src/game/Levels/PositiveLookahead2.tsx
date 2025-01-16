import { PlantName } from "@/game/plants";
import { createMatchesValidation } from "@/game/LevelClasses/validators.tsx";
import { ReplacePlantsByStringReplaceLevel } from "@/game/LevelClasses/ReplacePlantsByStringReplaceLevel.class";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { Editor } from "@/components/Editor.tsx";
import { consoleLogReplace } from "@/utils/ui.tsx";

export const PositiveLookahead2 = new ReplacePlantsByStringReplaceLevel({
  title: "Positive lookahead",
  titleToken: "(?=...) again",
  titleDescription: () => (
    <>
      <span className="regexp">/x(?=y)/</span> matches{" "}
      <span className="literal">&quot;x&quot;</span> only if it is directly
      followed by <span className="literal">&quot;y&quot;</span>
    </>
  ),
  task: () => (
    <>
      <HoverablePlantHint
        hightlightedInds={PositiveLookahead2.matchedBySolutionPlantInds}
      >
        The rose
      </HoverablePlantHint>{" "}
      should be replaced with blackberry if it is followed directly by rosemary
      or by another rose that should be replaced
    </>
  ),
  description: () => (
    <>
      <p>
        Positive lookaheads can include nested capturing and non-capturing
        groups witch allows to form complex conditions. Let&apos;s say we need
        to replace with <span className="literal">&quot;bar&quot;</span> the
        first <span className="literal">&quot;foo&quot;</span> in the sequence
        of three <span className="literal">&quot;foo&quot;</span> followed up
        directly by <span className="literal">&quot;42&quot;</span>:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogReplace(
            "foo foo foo 42",
            "/foo(?=(\\s*foo\\s*){2}42)/gi",
            "bar",
          ),
          consoleLogReplace(
            "foo foo 42",
            "/foo(?=(\\s*foo\\s*){2}42)/gi",
            "bar",
          ),
          consoleLogReplace("foo 42", "/foo(?=(\\s*foo\\s*){2}42)/gi", "bar"),
          consoleLogReplace(
            "foo foo foo foo 42",
            "/foo(?=(\\s*foo\\s*){2}42)/gi",
            "bar",
          ),
        ]}
      />
    </>
  ),
  possibleSolution: /\brose\b(?=(?:\s*rose)*\s*rosemary)/gi,
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
    { from: PlantName.Rose, to: PlantName.Blackberry },
    { from: PlantName.Rosemary, to: PlantName.Rosemary },
    { from: PlantName.Rose, to: PlantName.Rose },
    { from: PlantName.Rose, to: PlantName.Rose },
    { from: PlantName.Primrose, to: PlantName.Primrose },
    { from: PlantName.Rosemary, to: PlantName.Rosemary },
    { from: PlantName.Rose, to: PlantName.Blackberry },
    { from: PlantName.Rose, to: PlantName.Blackberry },
    { from: PlantName.Rose, to: PlantName.Blackberry },
    { from: PlantName.Rosemary, to: PlantName.Rosemary },
  ],
  replacer: "Blackberry",
});
