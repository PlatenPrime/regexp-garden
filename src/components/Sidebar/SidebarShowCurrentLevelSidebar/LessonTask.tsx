import { useGame } from "@/utils/useGame/useGame";
import { stringOrFCToFC } from "@/utils/stringOrFCToFC.tsx";

export const LessonTask = () => {
  const { currentLevel } = useGame();
  const Task = stringOrFCToFC(currentLevel.task);
  return (
    <>
      <div className="rounded-xl bg-ds-accentFill flex flex-col p-3 gap-3">
        <p className="text-ds-blueMain text-xs ">Lesson task &#x2022;</p>
        <h1>
          <Task />
        </h1>
      </div>
    </>
  );
};
