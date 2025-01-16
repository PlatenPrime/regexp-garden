import { createIncludesValidation } from "@/game/LevelClasses/validators.tsx";
import { PlantName } from "@/game/plants";
import { WaterPlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/WaterPlantsByArrayFilterMatchLevel.class";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { consoleLogMatch } from "@/utils/ui.tsx";
import { Editor } from "@/components/Editor.tsx";

export const AnyNonWordCharacter = new WaterPlantsByArrayFilterMatchLevel({
  title: "Any single non-word character",
  titleToken: "\\W",
  titleDescription: () => (
    <>Matches single character, that is not letter, number or underscore</>
  ),
  task: () => (
    <>
      Water{" "}
      <HoverablePlantHint
        hightlightedInds={AnyNonWordCharacter.matchedBySolutionPlantInds}
      >
        plants
      </HoverablePlantHint>{" "}
      which names end with non-word character
    </>
  ),
  description: () => (
    <>
      <Editor
        heightInStrings={2}
        code={[
          consoleLogMatch("foo$", "/foo\\W/"),
          consoleLogMatch("foo*", "/foo\\W/"),
          consoleLogMatch("foo_", "/foo\\W/"),
          consoleLogMatch("foobar", "/foo\\W/"),
          consoleLogMatch("foo42", "/foo\\W/"),
          consoleLogMatch("foo", "/foo\\W/"),
        ]}
      />
    </>
  ),
  possibleSolution: /\W$/i,
  validators: [createIncludesValidation("\\W")],
  hint: [
    () => (
      <>
        You may find helpful <span className="regepx">$</span> from the previous
        lessons
      </>
    ),
  ],
  garden: [
    PlantName.Rosemary,
    PlantName.AppleGalaMust696,
    PlantName.Primrose,
    PlantName.EchinaceaSunrise,
    PlantName.Rose,
  ],
  correctSolutionGarden: [
    PlantName.AppleGalaMust696,
    PlantName.EchinaceaSunrise,
  ],
});
