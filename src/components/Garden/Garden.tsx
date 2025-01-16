import { LevelsByOrder } from "../../game/Levels";
import { useGame } from "@/utils/useGame/useGame";
import { PlantInPot } from "@/components/Plant/PlantInPot";
import { gardenState } from "@/utils/useGame/gardenState.ts";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { useHighlightOnHoverPlants } from "@/utils/ui.tsx";

export const Garden = observer(() => {
  const { currentLevelInd, useAnimation } = useGame();
  const level = LevelsByOrder[currentLevelInd];
  const garden = level.garden;
  const flexGap = `${(garden.length >= 9 ? 11 : 9) - garden.length}rem`;

  return (
    <div
      className={`flex absolute`}
      style={{
        gap: flexGap,
        bottom: "calc(20% + 53 / 60 * var(--max-plant-width) * 1px)",
      }}
    >
      {garden.map((plantName, ind) => (
        <PlantInPot
          key={ind}
          plantInd={ind}
          plantName={plantName}
          {...useHighlightOnHoverPlants([ind])}
          isActive={gardenState.highlightedPlantInds.includes(ind)}
          animationParams={useMemo(
            () => useAnimation(ind),
            [currentLevelInd, ind],
          )}
        />
      ))}
    </div>
  );
});
