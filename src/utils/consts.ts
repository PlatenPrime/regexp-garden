export enum SidebarMode {
  ShowCurrentLevel = "ShowCurrentLevel",
  ShowAllLevels = "ShowAllLevels",
}
export const LOCAL_STORAGE_KEY_PREFIX = "regexpGarden/";
export const LocalStorageKeys = {
  LastCompletedLevelInd: LOCAL_STORAGE_KEY_PREFIX + "lastCompletedLevel",
  SolutionInputValue: LOCAL_STORAGE_KEY_PREFIX + "solutionInputValue",
};
