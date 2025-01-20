import React from "react";

import {HighlightOnHoverPlants} from "@/utils/hoverOnPlants.ts";

export type PlantTextRepresentationProps = {
  plantLabel: string;
  isActive: boolean;
} & HighlightOnHoverPlants;

export const PlantTextRepresentation: React.FC<
  PlantTextRepresentationProps
> = ({ plantLabel, onMouseEnter, onMouseLeave, isActive }) => {
  return (
    <>
      <span
        className={`literal cursor-pointer ${isActive ? "text-white" : ""}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {plantLabel}
      </span>
    </>
  );
};
