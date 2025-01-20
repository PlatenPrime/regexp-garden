import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useGame } from "@/utils/useGame/useGame";
import EditorTabIcon from "@public/assets/icons/editor-tab.svg";
import LevelLogIcon from "@public/assets/icons/lesson-log-tab.svg";
import { Editor } from "@/components/Editor";
import { FunctionComponent, useEffect, useState } from "react";
import { emitter, GameEvent } from "@/utils/emitter";
import { useRiseFlagForSomeTimeOnEvent } from "@/utils/useRiseFlagForSomeTimeOnEvent.ts";
import { logEvent } from "@/utils/logging.ts";
import { AnswerInputSymbol } from "@/game/LevelClasses/types.ts";
import { AnswerInput } from "@/components/InputTabs/AnswerInput.tsx";

export const InputTabs = () => {
  const { currentLevel, currentLevelInd, renderLog } = useGame();

  const code: (React.ElementType | typeof AnswerInputSymbol)[] =
    currentLevel.placeholder;
  const codeWithAnswerInputInd = code.indexOf(AnswerInputSymbol);

  if (codeWithAnswerInputInd === -1) {
    throw new Error("AnswerInputSymbol is not found in the level");
  }

  //конвенция такова, что AnswerInputSymbol окружен слева и справа своими пропсами
  const codeMapped = [
    ...code.slice(0, codeWithAnswerInputInd - 1),
    () => (
      <AnswerInput
        BeforeInput={code[codeWithAnswerInputInd - 1] as FunctionComponent}
        AfterInput={code[codeWithAnswerInputInd + 1] as FunctionComponent}
      />
    ),
    ...code.slice(codeWithAnswerInputInd + 2),
  ] as React.ElementType[];

  const shouldAnimate = useRiseFlagForSomeTimeOnEvent(
    GameEvent.SolutionCheckFailed,
    300,
  );

  const [log, setLog] = useState<React.ElementType[]>([]);

  const addNoteToLog = (solution: string, plantLabels: string[]): void => {
    const newLog = log.length > 1 ? [...log, () => <span>---</span>] : [...log];

    newLog.push(...renderLog(solution, plantLabels));

    setLog(newLog);
  };

  useEffect(() => {
    const unsub1 = emitter.on(GameEvent.SolutionCheckFailed, addNoteToLog);

    const unsub2 = emitter.on(GameEvent.SolutionCheckSucceeded, addNoteToLog);

    return () => {
      unsub1();
      unsub2();
    };
  }, [log]);

  useEffect(() => {
    setLog([]);
  }, [currentLevelInd]);

  return (
    <Tabs
      className={`w-full ${shouldAnimate ? "animate-failure" : null} max-h-60`}
    >
      <TabList className="tab-list">
        <Tab className="tab">
          <div className="flex gap-3">
            <EditorTabIcon />
            Code Editor
          </div>
        </Tab>
        <Tab
          className="tab"
          onClick={() => {
            logEvent("ViewLog", {
              levelNumber: currentLevelInd,
              levelTitle: currentLevel.title,
              possibleSolution: String(currentLevel.possibleSolution),
            });
          }}
        >
          <div className="flex gap-3">
            <LevelLogIcon />
            Log
          </div>
        </Tab>
      </TabList>
      <TabPanel className="tabPanel">
        <Editor
          codeColor="#DF635B"
          activeLineInd={currentLevel.activeLineInd}
          heightInStrings={6}
          code={codeMapped}
        />
      </TabPanel>
      <TabPanel className="tabPanel">
        <Editor codeColor="#8C97B0" heightInStrings={6} code={log} />
      </TabPanel>
    </Tabs>
  );
};
