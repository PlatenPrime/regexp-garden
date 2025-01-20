import { PlantName } from "@/game/plants";
import {
  BaseLevel,
  BaseLevelParams,
} from "@/game/LevelClasses/BaseLevel.class";
import { FunctionComponent } from "react";
import { isNot } from "@/utils/arrays.ts";
import { AnswerInputSymbol } from "@/game/LevelClasses/types.ts";

export type ArrayFilterMatchLevelParams = BaseLevelParams & {
  garden: PlantName[];
  correctSolutionGarden: PlantName[];
  regexpFlags?: string;
};

export abstract class ArrayFilterMatchLevel extends BaseLevel {
  garden: PlantName[];

  correctSolutionGarden: PlantName[];

  //В уровнях ArrayFilterMatchLevel, если растение матчится решением, то его plantName есть в correctSolutionGarden
  get matchedBySolutionPlantInds(): number[] {
    return this.garden
      .map((plantName, ind) =>
        this.correctSolutionGarden.includes(plantName) ? ind : null,
      )
      .filter(isNot(null));
  }

  abstract placeholder: (FunctionComponent | typeof AnswerInputSymbol)[];

  activeLineInd = 1;

  regexpFlags = "i";

  applyRegex(regexp: RegExp): string[] {
    return this.gardenLabels.filter((plantName) => !!plantName.match(regexp));
  }

  constructor(params: ArrayFilterMatchLevelParams) {
    super(params);
    this.garden = params.garden;
    this.correctSolutionGarden = params.correctSolutionGarden;
    if (typeof params.regexpFlags !== "undefined") {
      this.regexpFlags = params.regexpFlags;
    }
  }
}
