import { makeAutoObservable } from "mobx";

export type GardenState = { highlightedPlantInds: number[] };

export const gardenState: GardenState = makeAutoObservable({
  highlightedPlantInds: [],
});
