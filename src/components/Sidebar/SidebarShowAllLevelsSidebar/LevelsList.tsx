import { LevelsByOrder } from "../../../game/Levels";
import { LevelListItem } from "@/components/Sidebar/SidebarShowAllLevelsSidebar/LevelListItem";
import { BaseLevel } from "@/game/LevelClasses/BaseLevel.class.ts";

export const LevelsList = () => {
  return (
    <div className="flex flex-col">
      {LevelsByOrder.map((level, ind) => (
        <LevelListItem
          key={`${level.titleToken}-${ind}`}
          level={level as BaseLevel}
          ind={ind}
        />
      ))}
    </div>
  );
};
