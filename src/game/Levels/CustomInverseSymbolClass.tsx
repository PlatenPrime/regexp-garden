import { createMatchesValidation } from "@/game/LevelClasses/validators.tsx";
import { PlantName } from "@/game/plants";
import { WaterPlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/WaterPlantsByArrayFilterMatchLevel.class";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { Editor } from "@/components/Editor.tsx";
import { consoleLogMatch } from "@/utils/ui.tsx";

export const CustomInverseSymbolClass = new WaterPlantsByArrayFilterMatchLevel({
  title: "Single character not from a custom symbol class",
  titleToken: "[^...]",
  titleDescription: () => (
    <>Matches single character NOT from the specified range of symbols</>
  ),
  task: () => (
    <>
      Water{" "}
      <HoverablePlantHint
        hightlightedInds={CustomInverseSymbolClass.matchedBySolutionPlantInds}
      >
        plants
      </HoverablePlantHint>{" "}
      plants starting with not <span className="literal">&quot;r&quot;</span>
    </>
  ),
  description: () => (
    <>
      <p>
        To make a symbol class blacklist instead of whitelist, start a symbol
        class with <span className="regexp">^</span>:
      </p>
      <Editor
        heightInStrings={2}
        code={[
          consoleLogMatch("0", "/[^0-46-9]/"),
          consoleLogMatch("1", "/[^0-46-9]/"),
          consoleLogMatch("2", "/[^0-46-9]/"),
          consoleLogMatch("3", "/[^0-46-9]/"),
          consoleLogMatch("4", "/[^0-46-9]/"),
          consoleLogMatch("5", "/[^0-46-9]/"),
          consoleLogMatch("6", "/[^0-46-9]/"),
          consoleLogMatch("7", "/[^0-46-9]/"),
          consoleLogMatch("8", "/[^0-46-9]/"),
          consoleLogMatch("9", "/[^0-46-9]/"),
          consoleLogMatch("-", "/[^0-46-9]/"),
        ]}
      />
    </>
  ),
  possibleSolution: /^[^r]/i,
  validators: [
    createMatchesValidation(
      /\[\^.+\]/i,
      "Your solution should include an inverse custom symbol class",
    ),
    createMatchesValidation(
      /^\^/i,
      "Your solution should define a pattern for the start of string",
    ),
  ],
  hint: [
    () => (
      <>
        Do you remember <span className="regexp">^</span>?
      </>
    ),
  ],
  garden: [
    PlantName.Rosemary,
    PlantName.Primrose,
    PlantName.Rose,
    PlantName.ChristmasRose,
    PlantName.RoseOfSharon,
  ],
  correctSolutionGarden: [PlantName.Primrose, PlantName.ChristmasRose],
});
