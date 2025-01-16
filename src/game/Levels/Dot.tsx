import { createIncludesValidation } from "@/game/LevelClasses/validators.tsx";
import { PlantName } from "@/game/plants";
import { FertilizePlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/FertilizePlantsByArrayFilterMatchLevel.class";
import { consoleLogMatch } from "@/utils/ui.tsx";
import { Editor } from "@/components/Editor.tsx";

export const Dot = new FertilizePlantsByArrayFilterMatchLevel({
  title: "Any single single character",
  titleToken: ".",
  titleDescription: () => <>Matches any single symbol</>,
  task: () => (
    <>
      Fertilize <span className="literal">&quot;Rye&quot;</span> and{" "}
      <span className="literal">&quot;Rue&quot;</span> but not the other plants
    </>
  ),
  description: () => (
    <>
      <p>
        To write a pattern with a &quot;gutshot&quot; where can stand any symbol
        use <span className="regexp">. </span>
        token:
      </p>
      <Editor
        heightInStrings={2}
        code={[
          consoleLogMatch("bar", "/ba./"),
          consoleLogMatch("baz", "/ba./"),
          consoleLogMatch("foo", "/ba./"),
        ]}
      />
    </>
  ),
  possibleSolution: /r.e/i,
  regexpFlags: "i",
  validators: [createIncludesValidation(".")],
  hint: [
    () => (
      <>
        <p>
          You may find helpful <span className="regexp">.</span> token to
          construct regular expression that matches{" "}
          <span className="literal">&quot;Rye&quot;</span> and{" "}
          <span className="literal">&quot;Rue&quot;</span>
        </p>
      </>
    ),
  ],
  garden: [PlantName.Rose, PlantName.Rue, PlantName.Rice, PlantName.Rye],
  correctSolutionGarden: [PlantName.Rue, PlantName.Rye],
});
