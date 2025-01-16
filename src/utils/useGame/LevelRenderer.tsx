import { renderPlantLabels } from "@/utils/useGame/renderLevelPlantLabels";
import { gardenState } from "@/utils/useGame/gardenState.ts";
import React from "react";
import { WaterPlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/WaterPlantsByArrayFilterMatchLevel.class";
import { ReplacePlantsByStringReplaceLevel } from "@/game/LevelClasses/ReplacePlantsByStringReplaceLevel.class";
import { ReplacePlantsByArrayMapReplaceLevel } from "@/game/LevelClasses/ReplacePlantsByArrayMapReplaceLevel.class";

export interface LevelRenderer {
  renderLevelTextRepresentation(): React.ElementType[];

  renderLog(solution: string, plantLabels: string[]): React.ElementType[];
}

const getHoverablePlantInd = (): number[] => gardenState.highlightedPlantInds;

const constGardenEqualsArray = () => (
  <>
    <span className="keyword">let </span>
    <span className="identifier">garden</span>
    <span className="casual-token"> = [</span>
  </>
);

const constGardenEqualsString = () => (
  <>
    <span className="keyword">let </span>
    <span className="identifier">garden</span>
    <span className="casual-token"> = &quot;</span>
  </>
);

const closingArrayDefenition = () => <span className="casual-token">];</span>;
const closingString = () => <span className="casual-token">&quot;;</span>;

export const WaterPlantLevelRenderer = (
  level: WaterPlantsByArrayFilterMatchLevel,
): LevelRenderer => ({
  renderLevelTextRepresentation(): React.ElementType[] {
    return renderPlantLabels(
      level.gardenLabels,
      "list",
      constGardenEqualsArray,
      closingArrayDefenition,
      true,
      getHoverablePlantInd,
    );
  },
  renderLog(solution: string, plantLabels: string[]): React.ElementType[] {
    return [
      () => (
        <span>Applied regexp: {level.regexpStringFromSolution(solution)}</span>
      ),
      ...renderPlantLabels(
        plantLabels,
        "list",
        () => <span>Watered plants: [</span>,
        () => <span>];</span>,
      ),
    ];
  },
});

export const FertilizePlantLevelRenderer = (
  level: WaterPlantsByArrayFilterMatchLevel,
): LevelRenderer => ({
  renderLevelTextRepresentation(): React.ElementType[] {
    return renderPlantLabels(
      level.gardenLabels,
      "list",
      constGardenEqualsArray,
      closingArrayDefenition,
      true,
      getHoverablePlantInd,
    );
  },
  renderLog(solution: string, plantLabels: string[]): React.ElementType[] {
    return [
      () => (
        <span>Applied regexp: {level.regexpStringFromSolution(solution)}</span>
      ),
      ...renderPlantLabels(
        plantLabels,
        "list",
        () => <span>Fertilized plants: [</span>,
        () => <span>];</span>,
      ),
    ];
  },
});

export const CutPlantLevelRenderer = (
  level: WaterPlantsByArrayFilterMatchLevel,
): LevelRenderer => ({
  renderLevelTextRepresentation(): React.ElementType[] {
    return renderPlantLabels(
      level.gardenLabels,
      "list",
      constGardenEqualsArray,
      closingArrayDefenition,
      true,
      getHoverablePlantInd,
    );
  },
  renderLog(solution: string, plantLabels: string[]): React.ElementType[] {
    return [
      () => (
        <span>Applied regexp: {level.regexpStringFromSolution(solution)}</span>
      ),
      ...renderPlantLabels(
        plantLabels,
        "list",
        () => <span>Cut plants: [</span>,
        () => <span>];</span>,
      ),
    ];
  },
});

export const ReplacePlantInStringLevelRenderer = (
  level: ReplacePlantsByStringReplaceLevel,
): LevelRenderer => ({
  renderLevelTextRepresentation(): React.ElementType[] {
    return renderPlantLabels(
      level.gardenLabels,
      "string",
      constGardenEqualsString,
      closingString,
      true,
      getHoverablePlantInd,
    );
  },
  renderLog(solution: string, plantLabels: string[]): React.ElementType[] {
    return [
      () => (
        <span>Applied regexp: {level.regexpStringFromSolution(solution)}</span>
      ),
      ...renderPlantLabels(
        plantLabels,
        "string",
        () => (
          <span>
            {`garden.replace(${level.regexpStringFromSolution(solution)}, ${level.displayReplacer}): `}
            <span className="literal">&quot;</span>
          </span>
        ),
        () => (
          <>
            <span className="literal">&quot;</span>
            <span className="casual-token">;</span>
          </>
        ),
      ),
    ];
  },
});

export const ReplacePlantInArrayLevelRenderer = (
  level: ReplacePlantsByArrayMapReplaceLevel,
): LevelRenderer => ({
  renderLevelTextRepresentation(): React.ElementType[] {
    return renderPlantLabels(
      level.gardenLabels,
      "list",
      constGardenEqualsArray,
      closingArrayDefenition,
      true,
      getHoverablePlantInd,
    );
  },
  renderLog(solution: string, plantLabels: string[]): React.ElementType[] {
    return [
      () => (
        <span>Applied regexp: {level.regexpStringFromSolution(solution)}</span>
      ),
      ...renderPlantLabels(
        plantLabels,
        "list",
        () => (
          <span>
            {`garden.map(plant => plant.replace(${level.regexpStringFromSolution(solution)}, ${level.displayReplacer})): [`}
          </span>
        ),
        () => <span>];</span>,
      ),
    ];
  },
});
