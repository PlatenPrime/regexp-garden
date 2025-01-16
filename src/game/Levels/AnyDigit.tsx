import { createIncludesValidation } from "@/game/LevelClasses/validators.tsx";
import { PlantName } from "@/game/plants";
import { WaterPlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/WaterPlantsByArrayFilterMatchLevel.class";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { Editor } from "@/components/Editor.tsx";
import { consoleLogMatch } from "@/utils/ui.tsx";

export const AnyDigit = new WaterPlantsByArrayFilterMatchLevel({
  title: "Any single digit character",
  titleToken: "\\d",
  titleDescription: () => <>Matches any single digit character</>,
  task: () => (
    <>
      Water all the{" "}
      <HoverablePlantHint
        hightlightedInds={AnyDigit.matchedBySolutionPlantInds}
      >
        plants
      </HoverablePlantHint>{" "}
      that has digits in their names
    </>
  ),
  description: () => (
    <>
      <Editor
        heightInStrings={2}
        code={[
          consoleLogMatch("foo42", "/\\d/"),
          consoleLogMatch("foo", "/\\d/"),
          consoleLogMatch("foo42", "/foo\\d/"),
          consoleLogMatch("foo$", "/foo\\d/"),
          consoleLogMatch("foo42", "/\\d$/"),
          consoleLogMatch("foo$", "/\\d$/"),
          consoleLogMatch("foo", "/\\d$/"),
          consoleLogMatch("foo42", "/\\w\\d/"),
          consoleLogMatch("foo$", "/\\w\\d/"),
          consoleLogMatch("foo 42", "/^\\w\\w\\w\\s\\d\\d$/"),
          consoleLogMatch("bar 42", "/^\\w\\w\\w\\s\\d\\d$/"),
        ]}
      />
    </>
  ),
  possibleSolution: /\d/i,
  validators: [createIncludesValidation("\\d")],
  hint: [
    () => (
      <>
        You may find helpful <span className="regexp">\d</span> to construct a
        regular expression matching all the plants having digits in their names
      </>
    ),
  ],
  garden: [
    PlantName.AppleGalaMust696,
    PlantName.CornPioneer3751,
    PlantName.ChristmasRose,
    PlantName.Primrose,
    PlantName.TomatoRomaVF1,
    PlantName.Rosemary,
    PlantName.WheatNorin10,
  ],
  correctSolutionGarden: [
    PlantName.AppleGalaMust696,
    PlantName.CornPioneer3751,
    PlantName.TomatoRomaVF1,
    PlantName.WheatNorin10,
  ],
});
