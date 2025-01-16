import { createIncludesValidation } from "@/game/LevelClasses/validators.tsx";
import { PlantName } from "@/game/plants";
import { FertilizePlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/FertilizePlantsByArrayFilterMatchLevel.class.tsx";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { consoleLogMatch } from "@/utils/ui.tsx";
import { Editor } from "@/components/Editor.tsx";

export const AnyNonDigit = new FertilizePlantsByArrayFilterMatchLevel({
  title: "Any single non-digit character",
  titleToken: "\\D",
  titleDescription: () => <>Matches any single non-digit character</>,
  task: () => (
    <>
      Fertilize{" "}
      <HoverablePlantHint
        hightlightedInds={AnyNonDigit.matchedBySolutionPlantInds}
      >
        plants
      </HoverablePlantHint>{" "}
      that has no digits in their names
    </>
  ),
  description: () => (
    <>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogMatch("foo", "/\\D/"),
          consoleLogMatch("42", "/\\D/"),
          consoleLogMatch("foobar", "/foo\\D/"),
          consoleLogMatch("foo42", "/foo\\D/"),
        ]}
      />
    </>
  ),
  possibleSolution: /^\D*$/i,
  validators: [createIncludesValidation("\\D")],
  hint: [
    () => (
      <>
        Do you remember how to cover a full string, from the beginning to the
        end, with a regular expression?
      </>
    ),
  ],
  garden: [
    PlantName.Primrose,
    PlantName.AppleGalaMust696,
    PlantName.Rosemary,
    PlantName.TomatoRomaVF1,
    PlantName.Roseberry,
    PlantName.CornPioneer3751,
  ],
  correctSolutionGarden: [
    PlantName.Primrose,
    PlantName.Rosemary,
    PlantName.Roseberry,
  ],
});
