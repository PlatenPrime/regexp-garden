import { Toggle } from "@/utils/toggle/Toggle.class";
import { SidebarMode } from "@/utils/consts";

export const sidebarModeToggle = new Toggle([
  SidebarMode.ShowCurrentLevel,
  SidebarMode.ShowAllLevels,
]);
