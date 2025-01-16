import { Editor } from "@/components/Editor";
import { useGame } from "@/utils/useGame/useGame";
import { observer } from "mobx-react-lite";
import React from "react";

export const GardenTextRepresentation = observer(() => {
  const { renderLevelTextRepresentation } = useGame();
  return <Editor heightInStrings={1} code={renderLevelTextRepresentation()} />;
});
