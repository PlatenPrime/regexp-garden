import Link from "next/link";
import { useGame } from "@/utils/useGame/useGame";
import { inter } from "@/styles/fonts";
import { BaseLevel } from "@/game/LevelClasses/BaseLevel.class";
import { LevelStatusIcon } from "@/components/Sidebar/LevelStatusIcon";
import { LevelsByOrder } from "@/game/Levels";

export const LevelListItem = ({
  level,
  ind,
}: {
  level: BaseLevel;
  ind: number;
}) => {
  const { currentLevelInd, lastCompletedLevelInd } = useGame(); // Используем кастомный хук для получения текущего уровня

  return (
    <Link
      className={`px-2 py-1 rounded ${currentLevelInd === ind ? "bg-ds-accentFill" : ""}`}
      key={level.titleToken}
      href={`/levels/${ind + 1}`}
    >
      <div className="flex justify-between">
        <div className={`flex gap-2 text-sm ${inter.className} antialiased`}>
          <span className="flex justify-end w-5 text-ds-codeGray">
            {ind + 1}
          </span>
          <span
            className={`${lastCompletedLevelInd + 1 < ind ? "text-ds-codeGray" : ""} ${LevelsByOrder[ind].isNotSupported ? "text-ds-red" : ""}`}
          >
            {level.titleToken}
          </span>
        </div>
        <div className="flex items-center">
          <LevelStatusIcon levelInd={ind} />
        </div>
      </div>
    </Link>
  );
};
