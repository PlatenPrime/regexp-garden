import { useResponsiveCssVariable } from "@/utils/useResponsiveCssVariable.ts";

export const useProportionalToPlantWidth = (): {
  (value: number): number;
} => {
  const maxPlantWidth = parseInt(useResponsiveCssVariable("--max-plant-width"));
  return (value: number): number => Math.round((value / 60) * maxPlantWidth);
};
