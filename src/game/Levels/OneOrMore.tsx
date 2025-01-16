import { createIncludesValidation } from "@/game/LevelClasses/validators.tsx";
import { PlantName } from "@/game/plants";
import { WaterPlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/WaterPlantsByArrayFilterMatchLevel.class";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { consoleLogMatch } from "@/utils/ui.tsx";
import { Editor } from "@/components/Editor.tsx";

export const OneOrMore = new WaterPlantsByArrayFilterMatchLevel({
  title: "At least once",
  titleToken: "+",
  titleDescription: () => <>Repeats the previous token one or more times</>,
  task: () => (
    <>
      Water{" "}
      <HoverablePlantHint
        hightlightedInds={OneOrMore.matchedBySolutionPlantInds}
      >
        plants
      </HoverablePlantHint>{" "}
      having one or more letters after{" "}
      <span className="literal">&quot;rose&quot;</span>
    </>
  ),
  description: () => (
    <>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogMatch("foo42bar", "/^foo\\w+bar$/"),
          consoleLogMatch("foo4bar", "/^foo\\w+bar$/"),
          consoleLogMatch("foobar", "/^foo\\w+bar$/"),
        ]}
      />
      <p>
        If you want to match <span className="literal">&quot;+&quot;</span>{" "}
        literally, escape it with backslash:
      </p>
      <Editor heightInStrings={1} code={[consoleLogMatch("+", "/\\+/")]} />
    </>
  ),
  possibleSolution: /rose\w+/i,
  validators: [createIncludesValidation("+")],
  hint: [
    () => (
      <>
        Do you remember how to make a regular expression to match any letter
        symbol?
      </>
    ),
  ],
  garden: [
    PlantName.Rose,
    PlantName.Rosemary,
    PlantName.Roseberry,
    PlantName.Primrose,
  ],
  correctSolutionGarden: [PlantName.Rosemary, PlantName.Roseberry],
});
