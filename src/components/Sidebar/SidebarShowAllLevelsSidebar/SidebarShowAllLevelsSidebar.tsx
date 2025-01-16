import { LevelsByOrder } from "../../../game/Levels";
import CloseIcon from "@public/assets/icons/close.svg";
import { sidebarModeToggle } from "@/utils/toggle/sidebarModeToggle";
import { inter } from "@/styles/fonts";
import { LevelsList } from "@/components/Sidebar/SidebarShowAllLevelsSidebar/LevelsList";
import { useGame } from "@/utils/useGame/useGame";
import { observer } from "mobx-react-lite";

export const SidebarShowAllLevelsSidebar: React.FC = observer(() => {
  const { lastCompletedLevelInd } = useGame();

  return (
    <>
      <section className="flex justify-between mb-[-8px]">
        <header className="flex items-center leading-none">
          Select Lesson
        </header>
        <div className="flex cursor-pointer">
          <CloseIcon onClick={() => sidebarModeToggle.toggle()} />
        </div>
      </section>
      <div className="min-h-[1px] w-full bg-ds-progressbarFill" />
      <div
        className={`flex justify-between w-full bg-ds-greenMain rounded-xl h-12 items-center p-3 ${inter.className}`}
      >
        <span className="text-ds-greenAccent text-xs after:content">
          Complete &#x2022;
        </span>
        <span className="text-white text-2xl">
          {lastCompletedLevelInd + 1} of {LevelsByOrder.length}
        </span>
      </div>
      <LevelsList />
    </>
  );
});
