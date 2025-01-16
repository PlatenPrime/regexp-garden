import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useGame } from "@/utils/useGame/useGame";
import EditorTabIcon from "@public/assets/icons/editor-tab.svg";
import LevelLogIcon from "@public/assets/icons/lesson-log-tab.svg";
import { Editor } from "@/components/Editor";
import { useEffect, useState } from "react";
import { emitter, GameEvent } from "@/utils/emitter";
import { useRiseFlagForSomeTimeOnEvent } from "@/utils/useRiseFlagForSomeTimeOnEvent.ts";
import { logEvent } from "@/utils/logging.ts";

export const InputTabs = () => {
  const { currentLevel, currentLevelInd, renderLog } = useGame();

  const code: React.ElementType[] = currentLevel.placeholder;

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
          code={code}
        />
      </TabPanel>
      <TabPanel className="tabPanel">
        <Editor codeColor="#8C97B0" heightInStrings={6} code={log} />
      </TabPanel>
    </Tabs>
  );
};
