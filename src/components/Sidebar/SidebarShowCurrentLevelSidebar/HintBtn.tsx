import HintIcon from "@public/assets/icons/hint.svg";
import { useGame } from "@/utils/useGame/useGame";
import Modal from "react-modal";
import CloseIcon from "@public/assets/icons/closeWhite.svg";
import { showHintToggle } from "@/utils/toggle/showHintToggle.ts";
import { observer } from "mobx-react-lite";
import { Toggle } from "@/utils/toggle/Toggle.class.ts";
import PrevLevelIcon from "@public/assets/icons/prev-level.svg";
import NextLevelIcon from "@public/assets/icons/next-level.svg";
import { useEffect, useMemo } from "react";
import { modalStyles } from "@/utils/modal.ts";
import { logEvent } from "@/utils/logging.ts";

export const HintBtn = observer(() => {
  const { currentLevel, currentLevelInd } = useGame();
  const hints = currentLevel.hint;
  const hintsIndToggle = useMemo(
    () => new Toggle(hints.map((_, ind) => ind)),
    [currentLevel],
  );
  //прячем хинт при переходе на след левел
  useEffect(() => {
    showHintToggle.setState(false);
  }, [currentLevelInd]);
  const hasMultipleHints = hints.length > 1;
  const isOnFirstHint = hintsIndToggle.currentState === 0;
  const isOnLastHint = hintsIndToggle.currentState === hints.length - 1;
  const CurrentHint = hints[hintsIndToggle.currentState];
  const onClick = () => {
    showHintToggle.toggle();
    logEvent("HintOpened", {
      levelNumber: currentLevelInd,
      levelTitle: currentLevel.title,
      possibleSolution: String(currentLevel.possibleSolution),
    });
  };

  return currentLevel.hint.length ? (
    <>
      <button
        className="bg-ds-headingGray bg-opacity-10 w-full rounded-2xl p-1 text-ds-headingGray flex items-center justify-center gap-1 mt-auto"
        onClick={onClick}
      >
        <HintIcon /> Get hint
      </button>
      <Modal isOpen={showHintToggle.currentState} style={modalStyles}>
        <div className="text-white py-4 px-2 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <span className="method">
                Hint{" "}
                {hasMultipleHints
                  ? `${hintsIndToggle.currentState + 1} of ${hints.length}`
                  : null}
              </span>
              {hasMultipleHints ? (
                <>
                  <button
                    className={`nav-btn ${isOnFirstHint && "nav-btn_disabled"}`}
                    onClick={() => hintsIndToggle.prevState()}
                  >
                    <PrevLevelIcon />
                  </button>
                  <button
                    className={`nav-btn ${isOnLastHint && "nav-btn_disabled"}`}
                    onClick={() => hintsIndToggle.nextState()}
                  >
                    <NextLevelIcon />
                  </button>
                </>
              ) : null}
            </div>
            <button onClick={onClick}>
              <CloseIcon />
            </button>
          </div>
          <div className="text-sm">
            <CurrentHint />
          </div>
        </div>
      </Modal>
    </>
  ) : null;
});
