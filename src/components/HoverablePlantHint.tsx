import React from "react";
import { useHighlightOnHoverPlants } from "@/utils/hoverOnPlants.ts";

export type HoverablePlantHintProps = {
  children: React.ReactNode;
  hightlightedInds: number[];
};

export const HoverablePlantHint: React.FC<HoverablePlantHintProps> = ({
  children,
  hightlightedInds,
}) => {
  return (
    <span
      {...useHighlightOnHoverPlants(hightlightedInds)}
      className="cursor-help decoration-dashed decoration-ds-blueMain underline underline-offset-[6px]"
    >
      {children}
    </span>
  );
};
