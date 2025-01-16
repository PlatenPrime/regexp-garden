import { PlantName } from "@/game/plants";
import { ReplacePlantsByArrayMapReplaceLevel } from "@/game/LevelClasses/ReplacePlantsByArrayMapReplaceLevel.class";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { Editor } from "@/components/Editor.tsx";
import { consoleLogReplace } from "@/utils/ui.tsx";

export const Replace = new ReplacePlantsByArrayMapReplaceLevel({
  title: "Replace part of string",
  titleToken: "String.prototype.replace",
  titleDescription: "",
  task: () => (
    <>
      Replace all the{" "}
      <HoverablePlantHint hightlightedInds={Replace.matchedBySolutionPlantInds}>
        roses
      </HoverablePlantHint>{" "}
      with blackberries
    </>
  ),
  description: () => (
    <>
      <p>
        One of the most powerful features of regular expressions is that with
        regular expressions you can not only check if the substring is present
        in the string, but also replace a substring matching pattern with
        another string provided:
      </p>
      <Editor
        heightInStrings={1}
        code={[consoleLogReplace("foo bar", "/foo/i", "baz")]}
      />
      <p>By default only first match will be replaced:</p>
      <Editor
        heightInStrings={1}
        code={[consoleLogReplace("foo bar foo", "/foo/i", "baz")]}
      />
      <p>
        But later we&apos;ll see that there is a special flag that alters this
        behaviour
      </p>
    </>
  ),
  possibleSolution: /^rose$/i,
  validators: [],
  hint: [
    () => (
      <>
        Do you remember how to cover a full string, from the beginning to the
        end, with a regular expression?
      </>
    ),
  ],
  gardenTransitions: [
    { from: PlantName.Rose, to: PlantName.Blackberry },
    { from: PlantName.Primrose, to: PlantName.Primrose },
    { from: PlantName.Rose, to: PlantName.Blackberry },
    { from: PlantName.Rosemary, to: PlantName.Rosemary },
    { from: PlantName.Rose, to: PlantName.Blackberry },
  ],
  replacer: "Blackberry",
});
