import { PlantName } from "@/game/plants";
import { createMatchesValidation } from "@/game/LevelClasses/validators.tsx";
import { WaterPlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/WaterPlantsByArrayFilterMatchLevel.class";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { Editor } from "@/components/Editor.tsx";
import { consoleLogMatch } from "@/utils/ui.tsx";

export const RecurringCapturingGroup = new WaterPlantsByArrayFilterMatchLevel({
  title: "Recurring Capturing group",
  titleToken: "\\N",
  titleDescription: () => (
    <>Matches the text captured with the N&apos;th capturing group</>
  ),
  task: () => (
    <>
      Water{" "}
      <HoverablePlantHint
        hightlightedInds={RecurringCapturingGroup.matchedBySolutionPlantInds}
      >
        a plant
      </HoverablePlantHint>{" "}
      that has a recurring pattern of 4 or more letters in its name
    </>
  ),
  description: () => (
    <>
      <p>
        You may define a pattern where some text is repeating word-by-word
        throughout the string. Once captured, the text in a capturing group can
        be then referenced in a regular expression with{" "}
        <span className="regexp">\N</span> where{" "}
        <span className="regexp">N</span> is an order of the capturing group
        numbered from 1. E.g. <span className="regexp">\1</span> will match
        literally the text captured with the first capturing group:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogMatch("foo foo", "/(\\w*)\\s\\1/gi"),
          consoleLogMatch("bar bar", "/(\\w*)\\s\\1/gi"),
          consoleLogMatch("foo bar", "/(\\w*)\\s\\1/gi"),
          consoleLogMatch("foo bar foo bar", "/(\\w*)\\s(\\w*)\\s\\1\\s\\2/gi"),
          consoleLogMatch("foo foo bar bar", "/(\\w*)\\s(\\w*)\\s\\1\\s\\2/gi"),
        ]}
      />
    </>
  ),
  possibleSolution: /(\w{4,}).*\1/gi,
  validators: [
    createMatchesValidation(
      /\(.+\)/gi,
      "Your solution should include a capturing group",
    ),
    createMatchesValidation(
      /\\\d/gi,
      "Your solution should include a backreference to a capturing group",
    ),
  ],
  hint: [
    () => <>You may find helpful quantifiers</>,
    () => (
      <>The recurring pattern have to be captured in a backreferenced group</>
    ),
    () => (
      <>
        Consider that between the first entry of the captured text and the
        second there can be any symbols
      </>
    ),
  ],
  garden: [
    PlantName.Blackberry,
    PlantName.HeliopsisHelianthoides,
    PlantName.Rosemary,
    PlantName.Primrose,
  ],
  correctSolutionGarden: [PlantName.HeliopsisHelianthoides],
  regexpFlags: "gi",
});
