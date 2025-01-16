import { LevelsByOrder } from "@/game/Levels";

export const getLevelURLNumberByLevel = (
  level: (typeof LevelsByOrder)[number],
): number => LevelsByOrder.indexOf(level) + 1;
