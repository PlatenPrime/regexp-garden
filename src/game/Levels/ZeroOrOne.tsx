import { createIncludesValidation } from "@/game/LevelClasses/validators.tsx";
import { PlantName } from "@/game/plants";
import { CutPlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/CutPlantsByArrayFilterMatchLevel.class.tsx";
import { Editor } from "@/components/Editor.tsx";
import { consoleLogMatch } from "@/utils/ui.tsx";

export const ZeroOrOne = new CutPlantsByArrayFilterMatchLevel({
  title: "Zero time or once",
  titleToken: "?",
  titleDescription: () => <>Repeats the previous token zero or one times</>,
  task: () => (
    <>
      Cut <span className="literal">&quot;barberry&quot;</span> and{" "}
      <span className="literal">&quot;bearberry&quot;</span>
    </>
  ),
  description: () => (
    <>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogMatch("foobar", "/^foo\\w?bar$/"),
          consoleLogMatch("foo4bar", "/^foo\\w?bar$/"),
          consoleLogMatch("foo42bar", "/^foo\\w?bar$/"),
        ]}
      />
      <p>
        If you want to match <span className="literal">&quot;?&quot;</span>{" "}
        literally, escape it with backslash:
      </p>
      <Editor heightInStrings={1} code={[consoleLogMatch("?", "/\\?/")]} />
    </>
  ),
  possibleSolution: /b\w?arberry/i,
  validators: [createIncludesValidation("?")],
  hint: [() => <>Notice, that bearberry and barberry differs in one letter</>],
  garden: [
    PlantName.Rosemary,
    PlantName.Barberry,
    PlantName.Bearberry,
    PlantName.Primrose,
  ],
  correctSolutionGarden: [PlantName.Barberry, PlantName.Bearberry],
});
