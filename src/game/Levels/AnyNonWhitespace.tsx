import { createIncludesValidation } from "@/game/LevelClasses/validators.tsx";
import { PlantName } from "@/game/plants";
import { WaterPlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/WaterPlantsByArrayFilterMatchLevel.class";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { consoleLogMatch } from "@/utils/ui.tsx";
import { Editor } from "@/components/Editor.tsx";

export const AnyNonWhitespace = new WaterPlantsByArrayFilterMatchLevel({
  title: "Any single non-whitespace character",
  titleToken: "\\S",
  titleDescription: () => (
    <>
      Matches single character that is not{" "}
      <span className="tabulation-literal">space</span>,{" "}
      <span className="tabulation-literal">\t</span>,{" "}
      <span className="tabulation-literal">\n</span>,{" "}
      <span className="tabulation-literal">\r</span>,{" "}
      <span className="tabulation-literal">\f</span>
    </>
  ),
  task: () => (
    <>
      Water{" "}
      <HoverablePlantHint
        hightlightedInds={AnyNonWhitespace.matchedBySolutionPlantInds}
      >
        plants
      </HoverablePlantHint>{" "}
      that has no spaces in their names
    </>
  ),
  description: () => (
    <>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogMatch("4_2", "/\\w\\S\\w/"),
          consoleLogMatch("4 2", "/\\w\\S\\w/"),
          consoleLogMatch("42", "/\\S/"),
        ]}
      />
    </>
  ),
  possibleSolution: /^\S*$/i,
  validators: [createIncludesValidation("\\S")],
  hint: [
    () => (
      <>
        Do you remember how to cover a full string, from the beginning to the
        end, with a regular expression?
      </>
    ),
  ],
  garden: [
    PlantName.Rose,
    PlantName.ChristmasRose,
    PlantName.Rosemary,
    PlantName.AppleGalaMust696,
    PlantName.RoseOfSharon,
  ],
  correctSolutionGarden: [
    PlantName.Rose,
    PlantName.Rosemary,
    PlantName.RoseOfSharon,
  ],
});
