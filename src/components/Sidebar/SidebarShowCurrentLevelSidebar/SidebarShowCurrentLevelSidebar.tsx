import { LessonsNavigation } from "@/components/Sidebar/SidebarShowCurrentLevelSidebar/LessonsNavigation";
import { LessonTask } from "@/components/Sidebar/SidebarShowCurrentLevelSidebar/LessonTask";
import { LessonTitle } from "@/components/Sidebar/SidebarShowCurrentLevelSidebar/LessonTitle";
import { HintBtn } from "@/components/Sidebar/SidebarShowCurrentLevelSidebar/HintBtn";
import { useGame } from "@/utils/useGame/useGame";
import { UnsupportedBrowserDescription } from "@/components/UnsupportedBrowser/UnsupportedBrowserDescription.tsx";

export const SidebarShowCurrentLevelSidebar = () => {
  const { currentLevel } = useGame();

  const Description =
    typeof currentLevel.description === "string"
      ? () => <>{currentLevel.description as string}</>
      : currentLevel.description;

  return (
    <>
      <LessonsNavigation />
      <LessonTask />
      <LessonTitle />
      {currentLevel.isNotSupported && <UnsupportedBrowserDescription />}
      {!currentLevel.isNotSupported && currentLevel.description && (
        <div className="min-h-[1px] w-full bg-ds-progressbarFill self-center" />
      )}
      <div className="text-sm flex flex-col gap-4">
        <Description />
      </div>
      <HintBtn />
    </>
  );
};
