import { gardenState } from "@/utils/useGame/gardenState.ts";

export type HighlightOnHoverPlants = {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};
export const useHighlightOnHoverPlants = (
  inds: number[],
): HighlightOnHoverPlants => {
  return {
    onMouseEnter: () => {
      gardenState.highlightedPlantInds = inds.slice();
    },
    onMouseLeave: () => (gardenState.highlightedPlantInds = []),
  };
};
