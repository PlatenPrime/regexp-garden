import { PlantName } from "@/game/plants";
import { ValidationResult } from "@/game/LevelClasses/validators.tsx";

export interface RenderableLevel {
  garden: PlantName[];
  gardenLabels: string[];
  correctSolutionGarden: PlantName[];
  correctSolutionGardenLabels: string[];
  checkSolution(solution: string): CheckSolutionResult;
}

export type Validator = (solution: string) => ValidationResult;

export type CheckSolutionResult = {
  isCorrect: boolean;
  //всегда массив Plant.Label
  plantLabels: string[];
};

export type GardenTransition = { from: PlantName; to: PlantName };

export const AnswerInputSymbol: unique symbol = Symbol("AnswerInput");
