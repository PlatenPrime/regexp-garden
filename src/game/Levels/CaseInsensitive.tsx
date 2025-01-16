import { PlantName } from "@/game/plants";
import { WaterPlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/WaterPlantsByArrayFilterMatchLevel.class";
import { consoleLogMatch } from "@/utils/ui.tsx";
import { Editor } from "@/components/Editor.tsx";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";

export const CaseInsensitive = new WaterPlantsByArrayFilterMatchLevel({
  titleToken: "flag i",
  title: "",
  titleDescription: () => <>Makes regular expression case insensitive</>,
  task: () => (
    <>
      Water{" "}
      <HoverablePlantHint
        hightlightedInds={CaseInsensitive.matchedBySolutionPlantInds}
      >
        every plant
      </HoverablePlantHint>
      , containing <span className="literal">&quot;rose&quot;</span> at any
      place and case
    </>
  ),
  description: () => (
    <>
      <p>
        To make regular expression case insensitive one should use a special
        flag - <span className="regexp">i</span> - after the main pattern of the
        regexp:
      </p>
      <Editor
        heightInStrings={2}
        code={[
          consoleLogMatch("Foo Bar", "/foo/"),
          consoleLogMatch("Foo Bar", "/foo/i"),
        ]}
      />
      <p>
        Note: from here on all the regular expressions will include this flag,
        beware.
      </p>
    </>
  ),
  possibleSolution: /rose/i,
  regexpFlags: "i",
  validators: [],
  hint: [
    () => (
      <p>
        Write a regular expression that matches
        <span className="literal"> &quot;rose&quot;</span> case insensitive.
        Note that flag <span className="regexp">i</span> is already present in
        the solution
      </p>
    ),
  ],
  garden: [
    PlantName.Rue,
    PlantName.Rose,
    PlantName.Rye,
    PlantName.Rosemary,
    PlantName.Rice,
    PlantName.Primrose,
  ],
  correctSolutionGarden: [
    PlantName.Rose,
    PlantName.Rosemary,
    PlantName.Primrose,
  ],
});
