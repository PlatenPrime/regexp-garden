import LevelDone from "@public/assets/icons/level-done.svg";
import LevelInProgress from "@public/assets/icons/level-in-progress.svg";
import LevelIsLocked from "@public/assets/icons/level-is-locked.svg";
import { useGame } from "@/utils/useGame/useGame";
import { observer } from "mobx-react-lite";

export const LevelStatusIcon: React.FC<{ levelInd: number }> = observer(
  ({ levelInd }) => {
    const { lastCompletedLevelInd } = useGame();

    let Icon;

    if (levelInd < lastCompletedLevelInd + 1) {
      Icon = LevelDone;
    } else if (levelInd === lastCompletedLevelInd + 1) {
      Icon = LevelInProgress;
    } else {
      Icon = LevelIsLocked;
    }

    return (
      <>
        <Icon />
      </>
    );
  },
);
