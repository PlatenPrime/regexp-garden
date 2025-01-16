import { PlantName, PlantsDict } from "@/game/plants";
import { FunctionComponent } from "react";
import { areEqual, isNot } from "@/utils/arrays";
import {
  isNotEnumerationValidation,
  ValidationResult,
} from "@/game/LevelClasses/validators.tsx";
import {
  CheckSolutionResult,
  RenderableLevel,
  Validator,
} from "@/game/LevelClasses/types";

export type BaseLevelParams = {
  title: string;
  titleToken: string;
  titleDescription: string | FunctionComponent;
  task: string | FunctionComponent;
  description: string | FunctionComponent;
  hint: FunctionComponent[];
  possibleSolution: RegExp;
  validators: Validator[];
  shouldUseEnumerationValidation?: boolean;
  regexpFlags?: string;
  isNotSupported?: boolean;
};

export abstract class BaseLevel implements RenderableLevel {
  title: string;
  titleToken: string;
  titleDescription: string | FunctionComponent;

  task: string | FunctionComponent;

  description: string | FunctionComponent;

  //plants on the level
  abstract garden: PlantName[];

  get gardenLabels(): string[] {
    return this.garden.map((plantName) => PlantsDict[plantName].label);
  }
  //one of possibles solutions
  //used to test against user's solution
  possibleSolution: RegExp;

  abstract regexpFlags: string;

  get possibleSolutionGardenLabels(): string[] {
    return this.applyRegex(this.possibleSolution);
  }

  abstract correctSolutionGarden: PlantName[];

  get correctSolutionGardenLabels(): string[] {
    return this.correctSolutionGarden.map(
      (plantName) => PlantsDict[plantName].label,
    );
  }

  abstract readonly matchedBySolutionPlantInds: number[];

  getPlantIndsByPlantName(needlePlantName: PlantName): number[] {
    return this.garden
      .map((plantName, ind) => (plantName === needlePlantName ? ind : null))
      .filter(isNot(null));
  }

  //cheat checks
  _validators: Array<(solution: string) => ValidationResult>;

  get validators(): Array<(solution: string) => ValidationResult> {
    return this.shouldUseEnumerationValidation
      ? [isNotEnumerationValidation, ...this._validators]
      : [...this._validators];
  }
  //should be shown if at least one of checks is not passed
  hint: FunctionComponent[] = [];
  //placeholder with $INPUT token for a solution input
  abstract placeholder: FunctionComponent[];

  abstract activeLineInd: number;

  abstract applyRegex(regexp: RegExp): string[];

  protected regexpFromSolution(solution: string): RegExp {
    return new RegExp(solution, this.regexpFlags);
  }

  checkSolution(solution: string): CheckSolutionResult {
    try {
      const solutionRegexp = this.regexpFromSolution(solution);
      const solutionGardenLabels = this.applyRegex(solutionRegexp);
      return {
        isCorrect: areEqual(
          solutionGardenLabels,
          this.correctSolutionGardenLabels,
        ),
        plantLabels: solutionGardenLabels,
      };
    } catch (err) {
      console.log("=>(BaseLevel.class.ts:101) err", err);
      return {
        isCorrect: false,
        plantLabels: [],
      };
    }
  }

  regexpStringFromSolution(solution: string): string {
    return `/${solution}/${this.regexpFlags}`;
  }

  get possibleSolutionIsCorrect(): boolean {
    return areEqual(
      this.possibleSolutionGardenLabels,
      this.correctSolutionGardenLabels,
    );
  }

  protected shouldUseEnumerationValidation: boolean = true;

  //флаг что текущий уровень не поддерживается в браузере пользователя
  isNotSupported = false;

  constructor({
    titleToken,
    title,
    titleDescription,
    task,
    description,
    possibleSolution,
    validators,
    hint,
    shouldUseEnumerationValidation,
    isNotSupported,
  }: BaseLevelParams) {
    this.titleToken = titleToken;
    this.task = task;
    this.description = description;
    this.possibleSolution = possibleSolution;
    this._validators = validators;
    this.hint = hint;
    this.shouldUseEnumerationValidation =
      shouldUseEnumerationValidation ?? true;
    this.title = title;
    this.titleDescription = titleDescription;
    if (typeof isNotSupported !== "undefined") {
      this.isNotSupported = isNotSupported;
    }
  }
}
