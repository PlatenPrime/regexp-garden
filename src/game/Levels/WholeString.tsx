import { createMatchesValidation } from "@/game/LevelClasses/validators.tsx";
import { PlantName } from "@/game/plants";
import { CutPlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/CutPlantsByArrayFilterMatchLevel.class.tsx";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { Editor } from "@/components/Editor.tsx";
import { consoleLogMatch } from "@/utils/ui.tsx";

export const WholeString = new CutPlantsByArrayFilterMatchLevel({
  title: "Cover full string",
  titleToken: "^...$",
  titleDescription: () => (
    <>
      Here is a trick: to force your regexp to be compared against full string
      but not it&rsquo;s substrings, enclose your regexp between{" "}
      <span className="regexp">^</span> and <span className="regexp">$</span>
    </>
  ),
  task: () => (
    <>
      Cut{" "}
      <HoverablePlantHint
        hightlightedInds={WholeString.matchedBySolutionPlantInds}
      >
        just <span className="literal">&quot;rose&quot;</span>
      </HoverablePlantHint>
      , without cultivars
    </>
  ),
  description: () => (
    <>
      <Editor
        heightInStrings={2}
        code={[
          consoleLogMatch("foo bar", "/^foo bar$/"),
          consoleLogMatch("foo bar baz", "/^foo bar$/"),
          consoleLogMatch("^foo bar$", "/^foo bar$/"),
          consoleLogMatch("^foo bar$", "/\\^foo bar\\$/"),
        ]}
      />
    </>
  ),
  possibleSolution: /^rose$/i,
  validators: [
    createMatchesValidation(/^\^.*\$$/, () => (
      <>
        Your regexp should start with <span className="regexp">^</span> and end
        with <span className="regexp">$</span>
      </>
    )),
  ],
  hint: [
    () => (
      <>
        You may find helpful <span className="regexp">^</span> and{" "}
        <span className="regexp">$</span> to construct a regular expression
        covering &quot;rose&quot;
      </>
    ),
  ],
  garden: [
    PlantName.Rosemary,
    PlantName.Rose,
    PlantName.Primrose,
    PlantName.Rice,
    PlantName.RoseOfSharon,
    PlantName.ChristmasRose,
  ],
  correctSolutionGarden: [PlantName.Rose],
});
