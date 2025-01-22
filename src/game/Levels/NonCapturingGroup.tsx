import { createMatchesValidation } from "@/game/LevelClasses/validators.tsx";
import { PlantName } from "@/game/plants";
import { FertilizePlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/FertilizePlantsByArrayFilterMatchLevel.class.tsx";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { getLevelURLNumberByLevel } from "@/utils/routing.ts";
import { CapturingGroup } from "@/game/Levels/CapturingGroup.tsx";
import { consoleLogMatch, consoleLogReplace } from "@/utils/ui.tsx";
import { Editor } from "@/components/Editor.tsx";

export const NonCapturingGroup = new FertilizePlantsByArrayFilterMatchLevel({
  title: "Non-capturing group",
  titleToken: "(?:...)",
  titleDescription:
    "Groups repetitive patterns but without saving it into variables",
  task: () => (
    <>
      Fertilize{" "}
      <HoverablePlantHint
        hightlightedInds={NonCapturingGroup.matchedBySolutionPlantInds}
      >
        plants
      </HoverablePlantHint>{" "}
      having more than 2 dash symbols in their names
    </>
  ),
  description: () => (
    <>
      <p>
        In{" "}
        <a
          href={`/levels/${getLevelURLNumberByLevel(CapturingGroup)}`}
          className="text-ds-blueMain underline"
        >
          Capturing groups
        </a>{" "}
        we&apos;ve seen that the brackets can be used to reuse repetitive
        patterns inside regular expressions. But capturing groups are not the
        best option for it - the main purpose of capturing groups is
        &quot;capturing&quot; match into local variable for the later
        replacement.
      </p>
      <p>
        In case you don&apos;t need the replacement with a matched pattern, you
        can use non-capturing group: it doesn&apos;t save the matched pattern to
        a local variable and thus saves memory. Replacing capturing groups with
        non-capturing groups optimizes performance of the regular expression.
        Use it whenever you can.
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogMatch("foo", "/(foo\\s*){3,}/i"),
          consoleLogMatch("foo", "/(?:foo\\s*){3,}/i"),
          consoleLogMatch("foo foo", "/(foo\\s*){3,}/i"),
          consoleLogMatch("foo foo", "/(?:foo\\s*){3,}/i"),
          consoleLogMatch("foo foo foo", "/(foo\\s*){3,}/i"),
          consoleLogMatch("foo foo foo", "/(?:foo\\s*){3,}/i"),
        ]}
      />
      <p>
        Remember: non-capturing groups are more performant in grouping
        repetitive patterns inside regular expressions than capturing groups,
        but are not suitable for using these repetitive patterns for
        replacement:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogReplace("Isaac Asimov", "/(\\w+) (\\w+)/i", "$2, $1"),
          consoleLogReplace("Isaac Asimov", "/(?:\\w+) (?:\\w+)/i", "$2, $1"),
          consoleLogReplace(
            "4 8 15 16 23 42",
            "/(\\d+) (\\d+) (\\d+) (\\d+) (\\d+) (\\d+)/i",
            "$6 $5 $4 $3 $2 $1",
          ),
          consoleLogReplace(
            "4 8 15 16 23 42",
            "/(?:\\d+) (?:\\d+) (?:\\d+) (?:\\d+) (?:\\d+) (?:\\d+)/i",
            "$6 $5 $4 $3 $2 $1",
          ),
        ]}
      />
    </>
  ),
  possibleSolution: /(?:[-].*){3,}/gi,
  validators: [
    createMatchesValidation(
      /\(\?:.+\)/gi,
      "Your solution should include a non-capturing group",
    ),
  ],
  hint: [
    () => (
      <>
        What pattern do you have to repeat in order to match names with 3{" "}
        <span className="literal">-</span> symbols or more?
      </>
    ),
  ],
  garden: [
    PlantName.SnowInSummer,
    PlantName.SnowOnTheMountain,
    PlantName.RoseOfSharon,
  ],
  correctSolutionGarden: [PlantName.SnowOnTheMountain],
});
