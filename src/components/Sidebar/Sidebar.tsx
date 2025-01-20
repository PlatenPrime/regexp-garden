"use client";
import { observer } from "mobx-react-lite";
import { sidebarModeToggle } from "@/utils/toggle/sidebarModeToggle";
import { SidebarMode } from "@/utils/consts";
import { SidebarShowAllLevelsSidebar } from "@/components/Sidebar/SidebarShowAllLevelsSidebar/SidebarShowAllLevelsSidebar";
import { SidebarShowCurrentLevelSidebar } from "@/components/Sidebar/SidebarShowCurrentLevelSidebar/SidebarShowCurrentLevelSidebar";
import { usePreserveScrollPosition } from "@/utils/usePreserveScrollPosition";
import { useEffect } from "react";

export const Sidebar = observer(function _Sidebar() {
  const scrollContainerRef = usePreserveScrollPosition(_Sidebar);
  useEffect(() => {
    sidebarModeToggle.setState(SidebarMode.ShowCurrentLevel);
  }, []);

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
