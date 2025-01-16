import { LevelsByOrder } from "../../../game/Levels";
import { LevelListItem } from "@/components/Sidebar/SidebarShowAllLevelsSidebar/LevelListItem";

export const LevelsList = () => {
  return (
    <div className="flex flex-col">
      {LevelsByOrder.map((level, ind) => (
        <LevelListItem key={`${level.titleToken}-${ind}`} level={level} ind={ind} />
      ))}
    </div>
  );
};
