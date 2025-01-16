import { createMatchesValidation } from "@/game/LevelClasses/validators.tsx";
import { PlantName } from "@/game/plants";
import { FertilizePlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/FertilizePlantsByArrayFilterMatchLevel.class.tsx";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { consoleLogMatch } from "@/utils/ui.tsx";
import { Editor } from "@/components/Editor.tsx";

export const QuantifierExactN = new FertilizePlantsByArrayFilterMatchLevel({
  title: "Exactly N times",
  titleToken: "{n}",
  titleDescription: () => <>Repeats the previous token exactly N times</>,
  task: () => (
    <>
      Fertilize{" "}
      <HoverablePlantHint
        hightlightedInds={QuantifierExactN.matchedBySolutionPlantInds}
      >
        plants
      </HoverablePlantHint>{" "}
      which names consist of exactly 4 letters
    </>
  ),
  description: () => (
    <>
      <p>
        Instead of duplicating the same token several times, you can follow it
        with the custom quantifier: <span className="regexp">\d\d\d</span>{" "}
        equals to <span className="regexp">\d{`{3}`}</span>
      </p>
      <p>Possible use-case: match all the numbers which are greater than 99:</p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogMatch("98", "/\\d{3}/"),
          consoleLogMatch("99", "/\\d{3}/"),
          consoleLogMatch("100", "/\\d{3}/"),
          consoleLogMatch("999", "/\\d{3}/"),
          consoleLogMatch("1000", "/\\d{3}/"),
          consoleLogMatch("1000000", "/\\d{3}/"),
        ]}
      />
      <p>
        As usual, if you need to match{" "}
        <span className="literal">&quot;{`{`}&quot;</span> or{" "}
        <span className="literal">&quot;{`}`}&quot;</span> literally, consider
        escaping it with the backslash:
      </p>
      <Editor
        heightInStrings={1}
        code={[consoleLogMatch("{", "/\\{/"), consoleLogMatch("}", "/\\}/")]}
      />
    </>
  ),
  possibleSolution: /^\w{4}$/i,
  validators: [
    createMatchesValidation(
      /\{.+\}/i,
      "Your solution should include a custom quantifier",
    ),
  ],
  hint: [
    () => (
      <>
        Do you remember how to cover a full string, from the beginning to the
        end, with a regular expression?
      </>
    ),
  ],
  garden: [
    PlantName.Rue,
    PlantName.Rose,
    PlantName.Rosemary,
    PlantName.Rye,
    PlantName.Rice,
    PlantName.Primrose,
  ],
  correctSolutionGarden: [PlantName.Rose, PlantName.Rice],
});
