import { LevelsByOrder } from "../../game/Levels";
import { useParams } from "next/navigation";
import { BaseLevel } from "@/game/LevelClasses/BaseLevel.class";
import {
  CutPlantLevelRenderer,
  FertilizePlantLevelRenderer,
  LevelRenderer,
  ReplacePlantInArrayLevelRenderer,
  ReplacePlantInStringLevelRenderer,
  WaterPlantLevelRenderer,
} from "@/utils/useGame/LevelRenderer";
import { match, P } from "ts-pattern";
import { WaterPlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/WaterPlantsByArrayFilterMatchLevel.class";
import { ReplacePlantsByArrayMapReplaceLevel } from "@/game/LevelClasses/ReplacePlantsByArrayMapReplaceLevel.class";
import { ReplacePlantsByStringReplaceLevel } from "@/game/LevelClasses/ReplacePlantsByStringReplaceLevel.class";
import { gameProgress } from "@/utils/useGame/gameProgress.ts";
import { FertilizePlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/FertilizePlantsByArrayFilterMatchLevel.class";
import { CutPlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/CutPlantsByArrayFilterMatchLevel.class";
import { ReplacePlant } from "@/components/Plant/Replace/ReplacePlant";
import { Watering } from "@/components/Plant/Watering/Watering";
import { Fertilizing } from "@/components/Plant/Fertilizing/Fertilizing";
import { Scissors } from "@/components/Plant/Cut/Scissors";
import { CutPlant } from "@/components/Plant/Cut/CutPlant";
import { BaseReplacePlantLevel } from "@/game/LevelClasses/BaseReplacePlantLevel";
import { FunctionComponent, useCallback, useMemo } from "react";

export enum AnimationType {
  Watering,
  Fertilizing,
  Cutting,
  Replacement,
  Removing,
}

export type AnimationParams = {
  duration: number;
  type: AnimationType;
  AnimationComponent?: FunctionComponent;
  shouldAnimate: boolean;
  PlantComponent?: FunctionComponent;
};

export interface CurrentLevel {
  currentLevelInd: number;
  currentLevel: BaseLevel;
  isOnLockedLevel: boolean;
  isOnEdgeLevel: boolean;
  isOnLastLevel: boolean;
  lastCompletedLevelInd: number;
  setLastCompletedLevelInd: (ind: number) => void;
  renderLevelTextRepresentation(): React.ElementType[];
  renderLog(solution: string, plantLabels: string[]): React.ElementType[];
  useAnimation(plantInd: number): AnimationParams;
}

// Хук для получения текущего уровня
export const useGame = (): CurrentLevel => {
  const { level } = useParams(); // Получаем параметр уровня из URL
  if (typeof level === "undefined") {
    throw new Error("Пытаемся получить номер уровня не на странице уровня");
  }

  if (typeof level !== "string") {
    throw new Error("Неизвестная ошибка роутинга");
  }

  //TODO: добавить сохранение в локалстораж
  const currentLevelInd = parseInt(level) - 1;

  const currentLevel = LevelsByOrder[currentLevelInd];

  const isOnLockedLevel =
    gameProgress.lastCompletedLevelInd + 1 < currentLevelInd;

  const isOnNextLevel =
    gameProgress.lastCompletedLevelInd + 1 === currentLevelInd;

  const isOnLastLevel = currentLevelInd === LevelsByOrder.length - 1;

  const levelRenderer: LevelRenderer = useMemo(
    () =>
      match(currentLevel)
        .with(
          P.instanceOf(ReplacePlantsByArrayMapReplaceLevel),
          (replaceInArrayLevel: ReplacePlantsByArrayMapReplaceLevel) =>
            ReplacePlantInArrayLevelRenderer(replaceInArrayLevel),
        )
        .with(
          P.instanceOf(ReplacePlantsByStringReplaceLevel),
          // @ts-expect-error too complex types
          (replaceInStringLevel: ReplacePlantsByStringReplaceLevel) =>
            ReplacePlantInStringLevelRenderer(replaceInStringLevel),
        )
        .with(P.instanceOf(WaterPlantsByArrayFilterMatchLevel), (waterLevel) =>
          WaterPlantLevelRenderer(waterLevel),
        )
        .with(
          P.instanceOf(FertilizePlantsByArrayFilterMatchLevel),
          (fertilizeLevel) => FertilizePlantLevelRenderer(fertilizeLevel),
        )
        .with(
          P.instanceOf(CutPlantsByArrayFilterMatchLevel),
          (fertilizeLevel) => CutPlantLevelRenderer(fertilizeLevel),
        )
        .otherwise(() => {
          throw new Error("unknown level type");
        }),
    [currentLevelInd],
  );

  const useAnimation: (plantInd: number) => AnimationParams = useCallback(
    match(currentLevel)
      .with(
        P.instanceOf(BaseReplacePlantLevel),
        (currentLevel) =>
          (plantInd: number): AnimationParams => {
            const plantFrom = currentLevel.gardenTransitions[plantInd].from;
            const plantTo = currentLevel.gardenTransitions[plantInd].to;
            return {
              duration: 3000,
              type: AnimationType.Removing,
              shouldAnimate: plantFrom !== plantTo,
              PlantComponent: () => (
                <ReplacePlant from={plantFrom} to={plantTo} />
              ),
            };
          },
      )
      .with(
        P.instanceOf(WaterPlantsByArrayFilterMatchLevel),
        () =>
          (plantInd: number): AnimationParams => {
            const plantName = currentLevel.garden[plantInd];
            return {
              duration: 5700, //5400 actually
              type: AnimationType.Watering,
              AnimationComponent: Watering,
              shouldAnimate:
                currentLevel.correctSolutionGarden.includes(plantName),
            };
          },
      )
      .with(
        P.instanceOf(FertilizePlantsByArrayFilterMatchLevel),
        () =>
          (plantInd: number): AnimationParams => {
            const plantName = currentLevel.garden[plantInd];
            return {
              duration: 5500, //5200 raw
              type: AnimationType.Fertilizing,
              AnimationComponent: Fertilizing,
              shouldAnimate:
                currentLevel.correctSolutionGarden.includes(plantName),
            };
          },
      )
      .with(
        P.instanceOf(CutPlantsByArrayFilterMatchLevel),
        () => (plantInd: number) => {
          const plantName = currentLevel.garden[plantInd];
          return {
            duration: 6600, //6300 raw
            type: AnimationType.Cutting,
            AnimationComponent: Scissors,
            shouldAnimate:
              currentLevel.correctSolutionGarden.includes(plantName),
            PlantComponent: () => <CutPlant plantName={plantName} />,
          };
        },
      )
      .otherwise(() => {
        throw new Error("Unknown level type");
      }),
    [currentLevelInd],
  );

  return {
    currentLevelInd,
    currentLevel,
    isOnLockedLevel,
    isOnEdgeLevel: isOnNextLevel,
    isOnLastLevel,
    lastCompletedLevelInd: gameProgress.lastCompletedLevelInd,
    setLastCompletedLevelInd: gameProgress.setLastCompletedLevelInd,
    ...levelRenderer,
    useAnimation,
  };
};
