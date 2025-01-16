import styles from "./Plant.module.css";
import { PlantName } from "@/game/plants";
import Pot from "@public/assets/pot.png";
import { useEffect, useState } from "react";
import { useRiseFlagForSomeTimeOnEvent } from "@/utils/useRiseFlagForSomeTimeOnEvent.ts";
import { emitter, GameEvent } from "@/utils/emitter.ts";
import { DefaultPlant } from "@/components/Plant/DefaultPlant";
import { AnimationParams } from "@/utils/useGame/useGame";
import { HighlightOnHoverPlants } from "@/utils/ui.tsx";

type PlantProps = {
  plantName: PlantName;
  isActive: boolean;
  plantInd: number;
  animationParams: AnimationParams;
} & HighlightOnHoverPlants;

export const PlantInPot: React.FC<PlantProps> = ({
  plantName,
  isActive,
  onMouseEnter,
  onMouseLeave,
  animationParams: {
    duration,
    AnimationComponent,
    shouldAnimate: isAnimatedPlant,
    PlantComponent,
  },
}) => {
  const isGlobalTimeForSuccessAnimation = useRiseFlagForSomeTimeOnEvent(
    GameEvent.SolutionCheckSucceeded,
    duration,
  );

  const [isPlayingAnimation, setIsPlayingAnimation] = useState(
    isGlobalTimeForSuccessAnimation && isAnimatedPlant,
  );

  useEffect(() => {
    if (isGlobalTimeForSuccessAnimation && isAnimatedPlant) {
      setIsPlayingAnimation(true);
    }

    if (!isGlobalTimeForSuccessAnimation && isPlayingAnimation) {
      emitter.emit(GameEvent.SuccessAnimationEnded);
    }
  }, [isGlobalTimeForSuccessAnimation]);

  const shouldShowFailAnimation = useRiseFlagForSomeTimeOnEvent(
    GameEvent.SolutionCheckFailed,
    300,
  );

  return (
    <div
      className={`cursor-pointer ${styles.plantInPot} ${shouldShowFailAnimation ? "animate-failure" : null}`}
    >
      <img
        src={Pot.src}
        className={styles.pot}
        alt="A pot"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      <div
        className={`cursor-pointer ${styles.plantWrap} ${!isPlayingAnimation && isActive ? styles.plantWrap_active : ""}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {isPlayingAnimation && PlantComponent ? (
          <PlantComponent />
        ) : (
          <DefaultPlant plantName={plantName} />
        )}
      </div>
      {isPlayingAnimation && AnimationComponent && <AnimationComponent />}
    </div>
  );
};
