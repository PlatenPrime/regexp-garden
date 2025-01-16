import { LocalStorageKeys } from "@/utils/consts.ts";
import { createLocalStorageRef } from "@/utils/localStorageRef.ts";

const ref = createLocalStorageRef(LocalStorageKeys.LastCompletedLevelInd, {
  defaultValue: "-1",
});

export const gameProgress = {
  get lastCompletedLevelInd(): number {
    return parseInt(ref.value);
  },
  setLastCompletedLevelInd(newValue: number): void {
    ref.value = String(newValue);
  },
};
