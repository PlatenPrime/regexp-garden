import { createIncludesValidation } from "@/game/LevelClasses/validators.tsx";
import { PlantName } from "@/game/plants";
import { WaterPlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/WaterPlantsByArrayFilterMatchLevel.class";
import { Editor } from "@/components/Editor.tsx";
import { consoleLogMatch } from "@/utils/ui.tsx";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";

export const Dollar = new WaterPlantsByArrayFilterMatchLevel({
  title: "End of string",
  titleToken: "$",
  titleDescription: () => (
    <>
      Points to the end of string. The pattern before it will be applied to the
      end of the string but not to the other parts
    </>
  ),
  task: () => (
    <>
      Water{" "}
      <HoverablePlantHint hightlightedInds={Dollar.matchedBySolutionPlantInds}>
        plants
      </HoverablePlantHint>{" "}
      ending with <span className="literal">&quot;rose&quot;</span>
    </>
  ),
  description: () => (
    <>
      <p>
        You can restrict your pattern to match only those substrings that
        include the end of string by using <span className="regexp">$</span>:
      </p>
      <Editor
        heightInStrings={2}
        code={[
          consoleLogMatch("foo bar", "/bar$/"),
          consoleLogMatch("bar foo", "/bar$/"),
        ]}
      />
      <p>
        If you need to match <span className="literal">&quot;$&quot;</span>{" "}
        literally than you have to escape it with backslash:
      </p>
      <Editor
        heightInStrings={2}
        code={[
          consoleLogMatch("foo$", "/foo\\$/"),
          consoleLogMatch("foo$", "/foo\\$$/"),
          consoleLogMatch("foo$", "/foo$/"),
          consoleLogMatch("$foo", "/\\$foo/"),
          consoleLogMatch("$foo", "/$foo/"),
        ]}
      />
    </>
  ),
  possibleSolution: /rose$/i,
  validators: [createIncludesValidation("$")],
  hint: [
    () => (
      <>
        <p>
          You may find helpful <span className="regexp">$</span> to construct a
          regular expression matching plants with names ending with{" "}
          <span className="literal">&quot;rose&quot;</span>.
        </p>
      </>
    ),
  ],
  garden: [
    PlantName.Rose,
    PlantName.Primrose,
    PlantName.Rosemary,
    PlantName.ChristmasRose,
    PlantName.EchinaceaSunrise,
  ],
  correctSolutionGarden: [
    PlantName.Rose,
    PlantName.Primrose,
    PlantName.ChristmasRose,
  ],
});
