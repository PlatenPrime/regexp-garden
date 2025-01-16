import { PlantName } from "@/game/plants";
import { createMatchesValidation } from "@/game/LevelClasses/validators.tsx";
import { ReplacePlantsByStringReplaceLevel } from "@/game/LevelClasses/ReplacePlantsByStringReplaceLevel.class";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import Link from "next/link";
import { getLevelURLNumberByLevel } from "@/utils/routing.ts";
import { PositiveLookahead } from "@/game/Levels/PositiveLookahead.tsx";
import { consoleLogMatch, consoleLogReplace } from "@/utils/ui.tsx";
import { Editor } from "@/components/Editor.tsx";

export const NegativeLookahead = new ReplacePlantsByStringReplaceLevel({
  title: "Negative Lookahead",
  titleToken: "(?!...)",
  titleDescription: () => (
    <>
      <span className="regexp">/x(?!y)/</span> matches{" "}
      <span className="literal">&quot;x&quot;</span> only if it is directly
      followed by NOT <span className="literal">&quot;y&quot;</span>
    </>
  ),
  task: () => (
    <>
      Replace with blackberry{" "}
      <HoverablePlantHint
        hightlightedInds={NegativeLookahead.matchedBySolutionPlantInds}
      >
        all the roses
      </HoverablePlantHint>{" "}
      that are followed directly by NOT rose
    </>
  ),
  description: () => (
    <>
      <p>
        Much alike{" "}
        <Link
          href={`/levels/${getLevelURLNumberByLevel(PositiveLookahead)}`}
          className="text-ds-blueMain underline"
        >
          Positive Lookahead
        </Link>
        , but do the opposite:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogMatch("foobar", "/foo(?!\\d+)/gi"),
          consoleLogMatch("foobar", "/foo(?=\\d+)/gi"),
          consoleLogMatch("foo42", "/foo(?!\\d+)/gi"),
          consoleLogMatch("foo42", "/foo(?=\\d+)/gi"),
          consoleLogReplace("foobar", "/foo(?!\\d+)/gi", "bar"),
          consoleLogReplace("foobar", "/foo(?=\\d+)/gi", "bar"),
          consoleLogReplace("foo42", "/foo(?!\\d+)/gi", "bar"),
          consoleLogReplace("foo42", "/foo(?=\\d+)/gi", "bar"),
        ]}
      />
    </>
  ),
  possibleSolution: /\brose\b(?!\s*rose\b)/gi,
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
    { from: PlantName.Rose, to: PlantName.Blackberry },
    { from: PlantName.Rosemary, to: PlantName.Rosemary },
    { from: PlantName.Primrose, to: PlantName.Primrose },
    { from: PlantName.Rose, to: PlantName.Rose },
    { from: PlantName.Rose, to: PlantName.Blackberry },
    { from: PlantName.Primrose, to: PlantName.Primrose },
    { from: PlantName.Rosemary, to: PlantName.Rosemary },
    { from: PlantName.Rose, to: PlantName.Rose },
    { from: PlantName.Rose, to: PlantName.Blackberry },
    { from: PlantName.Rosemary, to: PlantName.Rosemary },
  ],
  replacer: "Blackberry",
});
