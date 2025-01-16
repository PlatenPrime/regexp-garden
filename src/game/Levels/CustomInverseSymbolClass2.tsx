import { createMatchesValidation } from "@/game/LevelClasses/validators.tsx";
import { PlantName } from "@/game/plants";
import { CutPlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/CutPlantsByArrayFilterMatchLevel.class.tsx";

export const CustomInverseSymbolClass2 = new CutPlantsByArrayFilterMatchLevel({
  title: "Single character not from a custom symbol class",
  titleToken: "[^...] again",
  titleDescription: () => (
    <>Matches single character NOT from the specified range of symbols</>
  ),
  task: () => (
    <>
      Cut plants which names doesn&apos;t contain{" "}
      <span className="literal">&quot;&apos;&quot;</span> and no digits
    </>
  ),
  description: () => (
    <>
      <p>
        Now we can craft the rest of predefined symbol classes from the previous
        lessons:
        <ul className="list-disc px-5">
          <li>
            <span className="regexp">\W</span> equals to{" "}
            <span className="regexp">[^A-Za-z0-9_]</span>
          </li>
          <li>
            <span className="regexp">\S</span> equals to{" "}
            <span className="regexp">[^ \t\n\r\f]</span>
          </li>
          <li>
            <span className="regexp">\D</span> equals to{" "}
            <span className="regexp">[^0-9]</span>
          </li>
        </ul>
      </p>
    </>
  ),
  possibleSolution: /^[^'\d]*$/i,
  validators: [
    createMatchesValidation(
      /\[\^.+\]/i,
      "Your solution should include an inverse custom symbol class",
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
    PlantName.AppleGalaMust696,
    PlantName.Rosemary,
    PlantName.CornPioneer3751,
    PlantName.ChristmasRose,
    PlantName.SnowOnTheMountain,
    PlantName.WheatNorin10,
    PlantName.RoseOfSharon,
  ],
  correctSolutionGarden: [
    PlantName.Rosemary,
    PlantName.ChristmasRose,
    PlantName.SnowOnTheMountain,
    PlantName.RoseOfSharon,
  ],
});
