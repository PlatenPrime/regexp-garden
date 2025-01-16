import { PlantName } from "@/game/plants";
import { ReplacePlantsByStringReplaceLevel } from "@/game/LevelClasses/ReplacePlantsByStringReplaceLevel.class";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { consoleLogReplace } from "@/utils/ui.tsx";
import { Editor } from "@/components/Editor.tsx";

export const FlagG = new ReplacePlantsByStringReplaceLevel({
  title: "",
  titleToken: "flag g",
  titleDescription: () => (
    <>Replaces all the matches, not only the first match</>
  ),
  task: () => (
    <>
      <p>
        Replace{" "}
        <HoverablePlantHint hightlightedInds={FlagG.matchedBySolutionPlantInds}>
          the first rose
        </HoverablePlantHint>{" "}
        with blackberry.{" "}
      </p>
      <em>
        Attention: now you are working with the garden written in a string with
        tabulation symbol delimiters
      </em>
    </>
  ),
  description: () => (
    <>
      <p>
        When replacing with regular expressions, by default regular expressions
        replaces only the first match:
      </p>
      <Editor
        heightInStrings={1}
        code={[consoleLogReplace("foo foo foo", "/foo/i", "bar")]}
      />
    </>
  ),
  possibleSolution: /rose/i,
  validators: [],
  hint: [
    () => (
      <>
        Please, pay attention to the code where the regular expression is used
      </>
    ),
  ],
  gardenTransitions: [
    { from: PlantName.Rose, to: PlantName.Blackberry },
    { from: PlantName.Blackberry, to: PlantName.Blackberry },
    { from: PlantName.Rose, to: PlantName.Rose },
    { from: PlantName.Blackberry, to: PlantName.Blackberry },
    { from: PlantName.Rose, to: PlantName.Rose },
  ],
  replacer: "Blackberry",
  regexpFlags: "i",
});
