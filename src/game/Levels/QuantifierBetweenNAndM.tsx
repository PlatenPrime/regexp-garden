import { createMatchesValidation } from "@/game/LevelClasses/validators.tsx";
import { PlantName } from "@/game/plants";
import { WaterPlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/WaterPlantsByArrayFilterMatchLevel.class";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";

export const QuantifierBetweenNAndM = new WaterPlantsByArrayFilterMatchLevel({
  title: "From N to M times",
  titleToken: "{n,m}",
  titleDescription: () => <>Repeats the previous token between N and M times</>,
  task: () => (
    <>
      Water{" "}
      <HoverablePlantHint
        hightlightedInds={QuantifierBetweenNAndM.matchedBySolutionPlantInds}
      >
        plants
      </HoverablePlantHint>{" "}
      which names consist of 3 or 4 letters
    </>
  ),
  description: () => (
    <>
      <p>
        Now we can rewrite <span className="regexp">*</span> as{" "}
        <span className="regexp">{`{0,1}`}</span>:
      </p>
    </>
  ),
  possibleSolution: /^\w{3,4}$/gi,
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
  correctSolutionGarden: [
    PlantName.Rue,
    PlantName.Rose,
    PlantName.Rye,
    PlantName.Rice,
  ],
});
