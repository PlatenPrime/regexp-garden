import { PlantName } from "@/game/plants";
import { FertilizePlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/FertilizePlantsByArrayFilterMatchLevel.class.tsx";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";

export const Revision1 = new FertilizePlantsByArrayFilterMatchLevel({
  title: "",
  titleToken: "Revision",
  titleDescription: () => <>Let&apos;s revise the previous lessons</>,
  task: () => (
    <>
      Fertilize{" "}
      <HoverablePlantHint
        hightlightedInds={Revision1.matchedBySolutionPlantInds}
      >
        plants
      </HoverablePlantHint>{" "}
      which name 1) consists of one word, 2) starts with{" "}
      <span className="literal">&quot;r&quot;</span> and ends with{" "}
      <span className="literal">&quot;e&quot;</span>
    </>
  ),
  description: "",
  possibleSolution: /^r\w+e$/i,
  validators: [],
  hint: [
    () => (
      <>
        Do you remember how to force a regular expression to be compared against
        all the string but not its sub-part?
      </>
    ),
    () => (
      <>
        Can you remember how to define a regular expression for a string
        starting from and ending with a specific letter?
      </>
    ),
  ],
  garden: [
    PlantName.Rue,
    PlantName.Primrose,
    PlantName.Rye,
    PlantName.Rosemary,
    PlantName.Rose,
    PlantName.ChristmasRose,
    PlantName.Rice,
    PlantName.RoseOfSharon,
  ],
  correctSolutionGarden: [
    PlantName.Rue,
    PlantName.Rye,
    PlantName.Rose,
    PlantName.Rice,
  ],
});
