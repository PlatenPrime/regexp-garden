"use client";
import { observer } from "mobx-react-lite";
import { useGame } from "@/utils/useGame/useGame";
import {
  FormEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  arrow,
  autoPlacement,
  flip,
  FloatingArrow,
  offset,
  shift,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { emitter, GameEvent } from "@/utils/emitter.ts";
import { useEvent } from "react-use";
import { showHintToggle } from "@/utils/toggle/showHintToggle.ts";
import { wait } from "@/utils/misc.ts";
import { inter } from "@/styles/fonts.ts";
import { ValidationError } from "@/game/LevelClasses/validators.tsx";
import { solutionRef } from "@/utils/useGame/solutionRef.ts";

export type AnswerInputProps = {
  BeforeInput: FunctionComponent;
  AfterInput: FunctionComponent;
};

export const AnswerInput = observer(function PlaceholderStringEl({
  BeforeInput,
  AfterInput,
}: AnswerInputProps) {
  const { currentLevel, isOnLockedLevel, currentLevelInd } = useGame();
  const inputRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [shouldShowTooltip, setShouldShowTooltip] = useState(false);
  const [tooltipMsg, setTooltipMsg] = useState<ValidationError>("");
  const TooltipMsg =
    typeof tooltipMsg === "string" ? () => <>{tooltipMsg}</> : tooltipMsg;
  const arrowRef = useRef(null);
  const { refs, floatingStyles, context } = useFloating({
    placement: "top",
    open: shouldShowTooltip,
    onOpenChange: setShouldShowTooltip,
    middleware: [
      offset(10),
      arrow({
        element: arrowRef,
      }),
      flip(),
      shift(),
      autoPlacement(),
    ],
    elements: {
      reference: inputRef.current,
    },
  });

  const role = useRole(context, {
    // If your reference element has its own label (text).
    role: "tooltip",
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([role]);

  useEffect(() => {
    const unsub = emitter.on(
      GameEvent.SolutionValidationFailed,
      (solution, validationError) => {
        setShouldShowTooltip(true);
        setTooltipMsg(() => validationError);
      },
    );

    return unsub;
  }, []);

  useEffect(() => {
    const unsub = emitter.on(GameEvent.SolutionSubmitted, () => {
      setShouldShowTooltip(false);
      setTooltipMsg("");
    });

    return unsub;
  }, []);

  const hideTooltip = useCallback(() => {
    //прячем тултип при фокусе на поле
    setShouldShowTooltip(false);
    setTooltipMsg("");
  }, []);

  //прячем тултип при переходе на следующий уровень
  useEffect(() => {
    hideTooltip();
  }, [currentLevelInd]);

  const onEnterPressed = useCallback(
    async ({ key }: KeyboardEvent) => {
      if (isOnLockedLevel || showHintToggle.currentState) {
        return;
      }

      if (key !== "Enter") {
        return;
      }

      if (!btnRef.current) {
        return;
      }

      btnRef.current?.classList.add("active");
      await wait(100);
      btnRef.current?.click();
      await wait(100);
      btnRef.current?.classList.remove("active");
    },
    [isOnLockedLevel],
  );

  useEvent(
    "keydown",
    onEnterPressed as unknown as EventListenerOrEventListenerObject,
    document,
  );

  const onBtnClick = useCallback(async (): Promise<void> => {
    if (currentLevel.isNotSupported) {
      return;
    }

    emitter.emit(GameEvent.SolutionSubmitted, solutionRef.value, {
      possibleSolution: String(currentLevel.possibleSolution),
      levelNumber: currentLevelInd,
      levelTitle: currentLevel.title,
      attemptedSolution: currentLevel.regexpStringFromSolution(
        solutionRef.value,
      ),
    });

    const validationError = currentLevel.validators
      .map((validator) => validator(solutionRef.value))
      .find((result) => typeof result !== "boolean");

    if (validationError) {
      emitter.emit(
        GameEvent.SolutionValidationFailed,
        solutionRef.value,
        validationError,
        {
          possibleSolution: String(currentLevel.possibleSolution),
          levelNumber: currentLevelInd,
          levelTitle: currentLevel.title,
          attemptedSolution: currentLevel.regexpStringFromSolution(
            solutionRef.value,
          ),
        },
      );
      return;
    }

    const { isCorrect, plantLabels } = currentLevel.checkSolution(
      solutionRef.value,
    );

    if (isCorrect) {
      emitter.emit(
        GameEvent.SolutionCheckSucceeded,
        solutionRef.value,
        plantLabels,
        {
          possibleSolution: String(currentLevel.possibleSolution),
          levelNumber: currentLevelInd,
          levelTitle: currentLevel.title,
          attemptedSolution: currentLevel.regexpStringFromSolution(
            solutionRef.value,
          ),
        },
      );
      return;
    }

    emitter.emit(
      GameEvent.SolutionCheckFailed,
      solutionRef.value,
      plantLabels,
      {
        possibleSolution: String(currentLevel.possibleSolution),
        levelNumber: currentLevelInd,
        levelTitle: currentLevel.title,
        attemptedSolution: currentLevel.regexpStringFromSolution(
          solutionRef.value,
        ),
      },
    );
  }, [currentLevelInd]);

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    setShouldShowTooltip(false);
    setTooltipMsg("");
    solutionRef.value = e.currentTarget.value;
  };

  return (
    <>
      <div className="flex justify-between w-full pr-3">
        <div>
          <span className="whitespace-pre">
            <BeforeInput />
          </span>
          <input
            disabled={currentLevel.isNotSupported}
            ref={inputRef}
            className="outline-none bg-ds-activeTabFill rounded-md w-56 px-1 regexp focus:border-2 focus:border-ds-blueMain border-box h-[1.325rem]"
            placeholder="Enter your regexp here"
            value={solutionRef.value}
            onInput={onInput}
            onFocus={hideTooltip}
            onBlur={hideTooltip}
            {...getReferenceProps()}
          />
          {shouldShowTooltip && (
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              className="bg-ds-tabIconRed text-white px-2 rounded-sm "
              {...getFloatingProps()}
            >
              <span>
                <TooltipMsg />
              </span>
              <FloatingArrow ref={arrowRef} context={context} fill="#E46C4D" />
            </div>
          )}
          <span className="whitespace-pre">
            <AfterInput />
          </span>
        </div>
        <button
          ref={btnRef}
          className={`button ${inter.className}`}
          onClick={onBtnClick}
        >
          Press Enter
        </button>
      </div>
    </>
  );
});
