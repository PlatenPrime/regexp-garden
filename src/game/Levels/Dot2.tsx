import { createIncludesValidation } from "@/game/LevelClasses/validators.tsx";
import { PlantName } from "@/game/plants";
import { CutPlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/CutPlantsByArrayFilterMatchLevel.class";
import { consoleLogMatch } from "@/utils/ui.tsx";
import { Editor } from "@/components/Editor.tsx";

export const Dot2 = new CutPlantsByArrayFilterMatchLevel({
  title: "Any single character",
  titleDescription: () => <>Matches any single symbol</>,
  titleToken: ". again",
  task: () => (
    <>
      Cut <span className="literal">&quot;Rose&quot;</span> and{" "}
      <span className="literal">&quot;Rice&quot;</span>, but not the other
      plants
    </>
  ),
  description: () => (
    <>
      <p>
        You can combine multiple gutshots in one regular expression at any
        positions:
      </p>
      <Editor
        heightInStrings={3}
        code={[
          consoleLogMatch("bar", "/.a./"),
          consoleLogMatch("baz", "/.a./"),
          consoleLogMatch("foo", "/.a./"),
        ]}
      />
      <p>
        Please note, that if you want to match{" "}
        <span className="literal">&quot;.&quot;</span> literally, you should
        escape it with backslash <span className="regexp">\</span>:
      </p>
      <Editor
        heightInStrings={2}
        code={[
          consoleLogMatch("foo.bar", "/\\.bar/"),
          consoleLogMatch("bar", "/\\.bar/"),
          consoleLogMatch("4.2", "/\\.2/"),
          consoleLogMatch("4.4", "/\\.2/"),
          consoleLogMatch("42", "/\\.2/"),
        ]}
      />
    </>
  ),
  possibleSolution: /r..e/i,
  validators: [createIncludesValidation(".")],
  hint: [
    () => (
      <p>
        You can use <span className="regexp">.</span> several times in a regular
        expression
      </p>
    ),
  ],
  garden: [PlantName.Rose, PlantName.Rue, PlantName.Rice, PlantName.Rye],
  correctSolutionGarden: [PlantName.Rose, PlantName.Rice],
});
