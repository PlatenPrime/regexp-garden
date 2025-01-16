import { createIncludesValidation } from "@/game/LevelClasses/validators.tsx";
import { PlantName } from "@/game/plants";
import { WaterPlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/WaterPlantsByArrayFilterMatchLevel.class";
import { Editor } from "@/components/Editor.tsx";
import { consoleLogMatch } from "@/utils/ui.tsx";
import { HoverablePlantHint } from "@/components/HoverablePlantHint";

export const Circumflex = new WaterPlantsByArrayFilterMatchLevel({
  title: "Start of string",
  titleToken: "^",
  titleDescription: () => (
    <>
      Points to the start of string. The pattern after it will be applied only
      to the beginning of the string, but not to the other parts
    </>
  ),
  task: () => (
    <>
      Water all the{" "}
      <HoverablePlantHint
        hightlightedInds={Circumflex.matchedBySolutionPlantInds}
      >
        plants
      </HoverablePlantHint>
      , starting with <span className="literal">&quot;rose&quot;</span>
    </>
  ),
  description: () => (
    <>
      <p>
        By default, a regular expression looks for a substring matching the
        pattern at any place of the string. You can restrict the search to the
        substrings that includes the starting of the string by using{" "}
        <span className="regexp">^</span>:
      </p>
      <Editor
        heightInStrings={2}
        code={[
          consoleLogMatch("foo bar", "/^foo/"),
          consoleLogMatch("bar foo", "/^foo/"),
        ]}
      />
      <p>
        If you need to match <span className="literal">&quot;^&quot;</span>{" "}
        literally than you have to escape it with backslash:
      </p>
      <Editor
        heightInStrings={2}
        code={[
          consoleLogMatch("^foo", "/\\^foo/"),
          consoleLogMatch("^foo", "/^foo/"),
          consoleLogMatch("^foo", "/^\\^foo/"),
          consoleLogMatch("foo^", "/foo\\^/"),
          consoleLogMatch("foo^", "/foo^/"),
        ]}
      />
    </>
  ),
  possibleSolution: /^rose/i,
  validators: [createIncludesValidation("^")],
  hint: [
    () => (
      <>
        <p>
          You may find helpful <span className="regexp">^</span> to construct a
          regular expression matching plants with names starting with{" "}
          <span className="literal">&quot;rose&quot;</span> (notice that
          resulting regular expression will have case insensitive flag set).
        </p>
      </>
    ),
  ],
  garden: [
    PlantName.Rose,
    PlantName.Primrose,
    PlantName.Rice,
    PlantName.Roscoea,
    PlantName.Rosemary,
    PlantName.ChristmasRose,
  ],
  correctSolutionGarden: [PlantName.Rose, PlantName.Rosemary],
});
