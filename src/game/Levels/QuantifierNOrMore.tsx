import { createMatchesValidation } from "@/game/LevelClasses/validators.tsx";
import { PlantName } from "@/game/plants";
import { WaterPlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/WaterPlantsByArrayFilterMatchLevel.class";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";

export const QuantifierNOrMore = new WaterPlantsByArrayFilterMatchLevel({
  title: "N or more times",
  titleToken: "{n,}",
  titleDescription: () => <>Repeats the previous token N times or more</>,
  task: () => (
    <>
      Water{" "}
      <HoverablePlantHint
        hightlightedInds={QuantifierNOrMore.matchedBySolutionPlantInds}
      >
        plants
      </HoverablePlantHint>{" "}
      which names consist of at least 4 letters
    </>
  ),
  description: () => (
    <>
      <p>
        Now we can define ourselves some of the previous predefined qunatifiers:
      </p>
      <ul className="list-disc px-5">
        <li>
          <span className="regexp">*</span> equals to{" "}
          <span className="regexp">{`{0,}`}</span>
        </li>
        <li>
          <span className="regexp">+</span> equals to{" "}
          <span className="regexp">{`{1,}`}</span>
        </li>
      </ul>
    </>
  ),
  possibleSolution: /\w{4,}/gi,
  validators: [
    createMatchesValidation(
      /\{.+\}/i,
      "Your solution should include a custom quantifier",
    ),
  ],
  hint: [
    () => (
      <>
        Do you remember <span className="regexp">\w</span>?
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
  correctSolutionGarden: [
    PlantName.Rose,
    PlantName.Rosemary,
    PlantName.Rice,
    PlantName.Primrose,
  ],
});
