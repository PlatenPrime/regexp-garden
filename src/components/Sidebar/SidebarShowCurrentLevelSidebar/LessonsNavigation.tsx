import { useGame } from "@/utils/useGame/useGame";
import { LevelsByOrder } from "@/game/Levels";
import { SwitchSidebarModeBtn } from "@/components/SwitchSidebarModeBtn/SwitchSidebarModeBtn";
import { LevelStatusIcon } from "@/components/Sidebar/LevelStatusIcon";
import PrevLevelIcon from "@public/assets/icons/prev-level.svg";
import NextLevelIcon from "@public/assets/icons/next-level.svg";
import Link from "next/link";

export const LessonsNavigation = () => {
  const { currentLevelInd } = useGame();
  const levelsCount = LevelsByOrder.length;
  const progressPercent = (currentLevelInd + 1) / levelsCount;
  const pointerOffset = "10px";
  const pointerPosition = `calc((100% - ${pointerOffset}) * ${progressPercent})`;

  return (
    <>
      <div className="flex flex-col gap-5 relative z-50">
        <section className="flex justify-between mb-[-8px] gap-3">
          <header className="flex items-center leading-none gap-3">
            Lesson {currentLevelInd + 1} / {levelsCount}{" "}
            <LevelStatusIcon levelInd={currentLevelInd} />
            <Link
              className={`nav-btn ${currentLevelInd === 0 && "nav-btn_disabled"}`}
              href={`/levels/${currentLevelInd}`}
            >
              <PrevLevelIcon />
            </Link>
            <Link
              className={`nav-btn ${currentLevelInd === levelsCount - 1 && "nav-btn_disabled"}`}
              href={`/levels/${currentLevelInd + 2}`}
            >
              <NextLevelIcon />
            </Link>
          </header>
          <div className="flex cursor-pointer">
            <SwitchSidebarModeBtn />
          </div>
        </section>
        <div>
          <div className="min-h-[1px] w-full bg-ds-progressbarFill" />
          <div
            className="min-h-[1px] bg-ds-headingRed relative top-[-1px]"
            style={{ width: pointerPosition }}
          />
          <div className="progress-pointer" style={{ left: pointerPosition }} />
        </div>
      </div>
    </>
  );
};
