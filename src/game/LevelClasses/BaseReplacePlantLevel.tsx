import { GardenTransition } from "@/game/LevelClasses/types";
import { PlantName } from "@/game/plants";
import {
  BaseLevel,
  BaseLevelParams,
} from "@/game/LevelClasses/BaseLevel.class";
import { isNot } from "@/utils/arrays.ts";

export type BaseReplacePlantLevelParams = BaseLevelParams & {
  replacer: string;
  gardenTransitions: GardenTransition[];
  regexpFlags?: string;
};

export abstract class BaseReplacePlantLevel extends BaseLevel {
  replacer: string;

  gardenTransitions: GardenTransition[];

  get garden(): PlantName[] {
    return this.gardenTransitions.map((transition) => transition.from);
  }

  get correctSolutionGarden(): PlantName[] {
    return this.gardenTransitions.map((transition) => transition.to);
  }

  //В уровнях Replace, если растение матчится решением, то его from !== to
  get matchedBySolutionPlantInds(): number[] {
    return this.gardenTransitions
      .map(({ from, to }, ind) => (from !== to ? ind : null))
      .filter(isNot(null));
  }

  get displayReplacer(): string {
    // return this.replacer === "$1" ? "(_, $1) => $1" : `"${this.replacer}"`;
    return `"${this.replacer}"`;
  }

  constructor(params: BaseReplacePlantLevelParams) {
    super(params);
    this.replacer = params.replacer;
    this.gardenTransitions = params.gardenTransitions;
  }
}
