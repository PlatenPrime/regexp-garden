import { useGame } from "@/utils/useGame/useGame";

export const LessonTask = () => {
  const { currentLevel } = useGame();
  const Task =
    typeof currentLevel.task === "string"
      ? () => <>{currentLevel.task as string}</>
      : currentLevel.task;
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
