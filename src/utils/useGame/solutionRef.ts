import { LocalStorageKeys } from "@/utils/consts.ts";
import { createLocalStorageRef } from "@/utils/localStorageRef.ts";

export const solutionRef = createLocalStorageRef(LocalStorageKeys.SolutionInputValue, {
  defaultValue: "",
  shouldUseSessionStorage: true
});

