import { createIncludesValidation } from "@/game/LevelClasses/validators.tsx";
import { PlantName } from "@/game/plants";
import { CutPlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/CutPlantsByArrayFilterMatchLevel.class.tsx";
import { consoleLogMatch } from "@/utils/ui.tsx";
import { Editor } from "@/components/Editor.tsx";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";

export const AnyWhitespace = new CutPlantsByArrayFilterMatchLevel({
  title: "Any single whitespace character",
  titleToken: "\\s",
  titleDescription: () => (
    <>
      Matches single <span className="tabulation-literal">space</span>,{" "}
      <span className="tabulation-literal">\t</span>,{" "}
      <span className="tabulation-literal">\n</span>,{" "}
      <span className="tabulation-literal">\r</span>,{" "}
      <span className="tabulation-literal">\f</span>
    </>
  ),
  task: () => (
    <>
      Cut all the{" "}
      <HoverablePlantHint
        hightlightedInds={AnyWhitespace.matchedBySolutionPlantInds}
      >
        plants
      </HoverablePlantHint>{" "}
      that has spaces in their names
    </>
  ),
  description: () => (
    <>
      <Editor
        heightInStrings={2}
        code={[
          consoleLogMatch("4 2", "/\\w\\s\\w/"),
          consoleLogMatch("4_2", "/\\w\\s\\w/"),
          consoleLogMatch("42", "/\\s/"),
        ]}
      />
    </>
  ),
  possibleSolution: /\s/i,
  validators: [createIncludesValidation("\\s")],
  hint: [() => <>Your regular expression should match space</>],
  garden: [
    PlantName.HeliopsisHelianthoides,
    PlantName.Rosemary,
    PlantName.EchinaceaSunrise,
    PlantName.Primrose,
    PlantName.ChristmasRose,
    PlantName.Rose,
  ],
  correctSolutionGarden: [
    PlantName.HeliopsisHelianthoides,
    PlantName.EchinaceaSunrise,
    PlantName.ChristmasRose,
  ],
});
