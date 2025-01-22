import { PlantName } from "@/game/plants";
import { createMatchesValidation } from "@/game/LevelClasses/validators.tsx";
import { ReplacePlantsByStringReplaceLevel } from "@/game/LevelClasses/ReplacePlantsByStringReplaceLevel.class";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { Editor } from "@/components/Editor.tsx";
import { consoleLogReplace } from "@/utils/ui.tsx";
import { getLevelURLNumberByLevel } from "@/utils/routing.ts";
import { PositiveLookahead2 } from "@/game/Levels/PositiveLookahead2.tsx";

export const NegativeLookahead2 = new ReplacePlantsByStringReplaceLevel({
  title: "Negative Lookahead",
  titleToken: "(?!...) again",
  titleDescription: () => (
    <>
      <span className="regexp">/x(?!y)/</span> matches{" "}
      <span className="literal">&quot;x&quot;</span> only if it is not directly
      followed by <span className="literal">&quot;y&quot;</span>
    </>
  ),
  task: () => (
    <>
      <HoverablePlantHint
        hightlightedInds={NegativeLookahead2.matchedBySolutionPlantInds}
      >
        The rose
      </HoverablePlantHint>{" "}
      should be replaced with blackberry if it is followed directly by NOT
      rosemary or by another rose that should be replaced
    </>
  ),
  description: () => (
    <>
      <p>
        Negative lookaheads, like{" "}
        <a
          href={`/levels/${getLevelURLNumberByLevel(PositiveLookahead2)}`}
          className="text-ds-blueMain underline"
        >
          Positive Lookaheads
        </a>
        , can include nested capturing and non-capturing groups:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogReplace(
            "foo foo foo foo 42",
            "/foo(?!(\\s*foo\\s*){2}42)/gi",
            "bar",
          ),
          consoleLogReplace(
            "foo foo foo 42",
            "/foo(?!(\\s*foo\\s*){2}42)/gi",
            "bar",
          ),
          consoleLogReplace(
            "foo foo 42",
            "/foo(?!(\\s*foo\\s*){2}42)/gi",
            "bar",
          ),
          consoleLogReplace("foo 42", "/foo(?!(\\s*foo\\s*){2}42)/gi", "bar"),
        ]}
      />
    </>
  ),
  possibleSolution: /\brose\b(?!(\s*\brose\b)*\s*rosemary)/gi,
  validators: [
    createMatchesValidation(
      /\(\?!.+\)/gi,
      "Your solution should include a negative lookahead",
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
    { from: PlantName.Primrose, to: PlantName.Primrose },
    { from: PlantName.Rose, to: PlantName.Blackberry },
    { from: PlantName.Rose, to: PlantName.Blackberry },
    { from: PlantName.Primrose, to: PlantName.Primrose },
    { from: PlantName.Rosemary, to: PlantName.Rosemary },
    { from: PlantName.Rose, to: PlantName.Rose },
    { from: PlantName.Rose, to: PlantName.Rose },
    { from: PlantName.Rosemary, to: PlantName.Rosemary },
    { from: PlantName.Rose, to: PlantName.Blackberry },
  ],
  replacer: "Blackberry",
});
