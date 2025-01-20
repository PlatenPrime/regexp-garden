"use client";
import { observer } from "mobx-react-lite";
import { sidebarModeToggle } from "@/utils/toggle/sidebarModeToggle";
import { SidebarMode } from "@/utils/consts";
import { SidebarShowAllLevelsSidebar } from "@/components/Sidebar/SidebarShowAllLevelsSidebar/SidebarShowAllLevelsSidebar";
import { SidebarShowCurrentLevelSidebar } from "@/components/Sidebar/SidebarShowCurrentLevelSidebar/SidebarShowCurrentLevelSidebar";
import { usePreserveScrollPosition } from "@/utils/usePreserveScrollPosition";

export const Sidebar = observer(function _Sidebar() {
  const scrollContainerRef = usePreserveScrollPosition(_Sidebar);
  console.log(
    "=>(Sidebar.tsx:25) sidebarModeToggle.currentState",
    sidebarModeToggle.currentState,
  );
  console.log(
    "=>(Sidebar.tsx:29) sidebarModeToggle.currentState === SidebarMode.ShowAllLevels",
    sidebarModeToggle.currentState === SidebarMode.ShowAllLevels,
  );

  return (
    <div
      className="relative min-h-full bg-ds-secondaryFill w-2/5 p-5 text-white overflow-y-scroll overflow-x-hidden flex flex-col gap-5"
      ref={scrollContainerRef}
    >
      {sidebarModeToggle.currentState === SidebarMode.ShowAllLevels ? (
        <SidebarShowAllLevelsSidebar />
      ) : (
        <SidebarShowCurrentLevelSidebar />
      )}
    </div>
  );
});
