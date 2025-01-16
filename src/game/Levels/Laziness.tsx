import { PlantName } from "@/game/plants";
import { createMatchesValidation } from "@/game/LevelClasses/validators.tsx";
import { ReplacePlantsByStringReplaceLevel } from "@/game/LevelClasses/ReplacePlantsByStringReplaceLevel.class";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { consoleLogReplace } from "@/utils/ui.tsx";
import { Editor } from "@/components/Editor.tsx";

export const Laziness = new ReplacePlantsByStringReplaceLevel({
  title: "",
  titleToken: "Laziness",
  titleDescription: "",
  task: () => (
    <>
      Remove{" "}
      <HoverablePlantHint
        hightlightedInds={Laziness.matchedBySolutionPlantInds}
      >
        all the cultivars
      </HoverablePlantHint>{" "}
      in the plants names
    </>
  ),
  description: () => (
    <>
      <p>
        By default <span className="regexp">*</span> and{" "}
        <span className="regexp">+</span> are eager: once they find occurrence
        they try to capture as much as they can.
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogReplace("foo 42 something 42", "/foo.*42/gi", "bar"),
          consoleLogReplace("foo 42 other 42", "/foo.*42/gi", "bar"),
          consoleLogReplace("foo 42 42", "/foo.*42/gi", "bar"),
        ]}
      />
      <p>
        In this example you can see that <span className="regexp">.*</span>{" "}
        match doesn&apos;stop on the first encountering of the{" "}
        <span className="literal">&quot;42&quot;</span> although it would be a
        valid match: it expanded till the last{" "}
        <span className="literal">&quot;42&quot;</span>. To alter this behavior,
        we should follow it with <span className="regexp">?</span>:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogReplace("foo 42 something 42", "/foo.*?42/gi", "bar"),
          consoleLogReplace("foo 42 other 42", "/foo.*?42/gi", "bar"),
          consoleLogReplace("foo 42 42", "/foo.*?42/gi", "bar"),
        ]}
      />
    </>
  ),
  possibleSolution: /(\w*) '.*?'/gi,
  validators: [
    createMatchesValidation(
      /(\*|\+)\?/gi,
      "You solution should include laziness",
    ),
  ],
  hint: [
    () => <>Your task is to make cultivar roses just roses</>,
    () => <>The rose should be captured by a capturing group</>,
  ],
  gardenTransitions: [
    { from: PlantName.Rosemary, to: PlantName.Rosemary },
    { from: PlantName.RoseIceberg, to: PlantName.Rose },
    { from: PlantName.Primrose, to: PlantName.Primrose },
    { from: PlantName.RoseDoubleDelight, to: PlantName.Rose },
    { from: PlantName.Rose, to: PlantName.Rose },
    { from: PlantName.RoseQueenElizabeth, to: PlantName.Rose },
  ],
  replacer: "$1",
});
