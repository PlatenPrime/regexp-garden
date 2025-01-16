import { PlantName } from "@/game/plants";
import { ReplacePlantsByStringReplaceLevel } from "@/game/LevelClasses/ReplacePlantsByStringReplaceLevel.class";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { consoleLogReplace } from "@/utils/ui.tsx";
import { Editor } from "@/components/Editor.tsx";

export const FlagG2 = new ReplacePlantsByStringReplaceLevel({
  title: "",
  titleToken: "flag g continued",
  titleDescription: () => (
    <>Replaces all the matches, not only the first match</>
  ),
  task: () => (
    <>
      <p>
        Replace{" "}
        <HoverablePlantHint
          hightlightedInds={FlagG2.matchedBySolutionPlantInds}
        >
          all the roses
        </HoverablePlantHint>{" "}
        with blackberry.{" "}
      </p>
    </>
  ),
  description: () => (
    <>
      <p>
        To make the regular expression to replace all the occurrences, not only
        the first, we have to add flag <span className="regexp">g</span> to the
        regular expression:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogReplace("foo foo foo", "/foo/i", "bar"),
          consoleLogReplace("foo foo foo", "/foo/gi", "bar"),
          consoleLogReplace("foo1 foo2 foo3", "/foo(\\d+)/gi", "$1"),
        ]}
      />
      <p>
        If your regular expression includes capturing group, it will be
        reevaluated for every match:
      </p>
      <Editor
        heightInStrings={1}
        code={[consoleLogReplace("foo1 foo2 foo3", "/foo(\\d+)/gi", "$1")]}
      />
    </>
  ),
  possibleSolution: /rose/gi,
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
    { from: PlantName.Rose, to: PlantName.Blackberry },
    { from: PlantName.Blackberry, to: PlantName.Blackberry },
    { from: PlantName.Rose, to: PlantName.Blackberry },
  ],
  replacer: "Blackberry",
});
