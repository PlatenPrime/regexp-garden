"use client";
import { Garden } from "@/components/Garden/Garden";
import GardenBg from "@public/assets/garden-bg.svg";
import { useEffect, useRef } from "react";
import { useGame } from "@/utils/useGame/useGame";
import { observer } from "mobx-react-lite";
import { GardenTextRepresentationTab } from "@/components/GardenTextRepresentation/GardenTextRepresentationTab";
import { Overlay } from "@/components/Overlay";
import { InputTabs } from "@/components/InputTabs/InputTabs";
import type { FireworksHandlers } from "@fireworks-js/react";
import { Fireworks } from "@fireworks-js/react";
import { usePathname, useRouter } from "next/navigation";
import { useRiseFlagForSomeTimeOnEvent } from "@/utils/useRiseFlagForSomeTimeOnEvent.ts";
import { GameEvent } from "@/utils/emitter.ts";
import { useWatch } from "@/utils/useWatch.ts";
import Modal from "react-modal";
import { modalStyles } from "@/utils/modal.ts";
import { solutionRef } from "@/utils/useGame/solutionRef.ts";

export default observer(function LevelPage() {
  const {
    isOnLockedLevel,
    isOnEdgeLevel,
    isOnLastLevel,
    lastCompletedLevelInd,
    setLastCompletedLevelInd,
    currentLevelInd,
    currentLevel,
  } = useGame(); // Используем кастомный хук для получения текущего уровня

  const fireworksRef = useRef<FireworksHandlers>(null);
  //показываем фейерверк только на последнем уровне
  const FIREWORKS_DURATION = isOnLastLevel ? 10000 : 0;
  const shouldShowFireworks = useRiseFlagForSomeTimeOnEvent(
    GameEvent.SuccessAnimationEnded,
    FIREWORKS_DURATION,
  );
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    solutionRef.value = "";
  }, [pathname]);

  const watchFireworks = useWatch();

  watchFireworks(
    shouldShowFireworks,
    (wasShowingFireworks, isShowingFireworks) => {
      if (isShowingFireworks) {
        if (isOnEdgeLevel) {
          setLastCompletedLevelInd(lastCompletedLevelInd + 1);
        }

        if (!fireworksRef.current) return;

        if (!fireworksRef.current.isRunning) {
          fireworksRef.current.start();
        }
      }

      if (!isShowingFireworks && wasShowingFireworks) {
        fireworksRef.current?.stop();
        //после последнего уровня не переходим на след
        if (isOnLastLevel) {
          return;
        }

        const timeout = setTimeout(() => {
          router.push(`/levels/${currentLevelInd + 2}`);
        }, 0);

        return () => {
          clearTimeout(timeout);
        };
      }
    },
  );

  return (
    <>
      <div className="h-auto py-10 px-5">
        <Overlay shouldShow={isOnLockedLevel} />
        <div className="flex h-full w-full flex-col justify-start items-center gap-10 position-relative">
          <div className="w-[105%] relative">
            <GardenBg />
            <div className="absolute flex justify-center items-center inset-x-0 inset-y-0">
              <Garden />
            </div>
          </div>
          <GardenTextRepresentationTab />
          <InputTabs />
        </div>
      </div>
      {shouldShowFireworks && (
        <Fireworks
          ref={fireworksRef}
          options={{
            sound: { enabled: true, files: ["/assets/fireworks_short.mp3"] },
          }}
          autostart={true}
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            position: "fixed",
          }}
        />
      )}
      <Modal isOpen={currentLevel.isNotSupported} style={modalStyles}>
        <div className="text-white flex justify-between items-center p-4">
          Sorry, your browser doesn&apos;t support this regexp feature. Please,
          update your browser or use another one
        </div>
      </Modal>
    </>
  );
});
