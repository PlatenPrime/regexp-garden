import { PlantName } from "@/game/plants";
import { createIncludesValidation } from "@/game/LevelClasses/validators.tsx";

import { ReplacePlantsByStringReplaceLevel } from "@/game/LevelClasses/ReplacePlantsByStringReplaceLevel.class";
import { consoleLogMatch } from "@/utils/ui.tsx";
import { Editor } from "@/components/Editor.tsx";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";

export const Disjunction = new ReplacePlantsByStringReplaceLevel({
  title: "Disjunction",
  titleToken: "|",
  titleDescription: () => (
    <>
      <span className="regexp">x|y</span> matches either{" "}
      <span className="literal">&quot;x&quot;</span> or{" "}
      <span className="literal">&quot;y&quot;</span>
    </>
  ),
  task: () => (
    <>
      Replace{" "}
      <HoverablePlantHint
        hightlightedInds={Disjunction.matchedBySolutionPlantInds}
      >
        every rose or strawberry
      </HoverablePlantHint>{" "}
      with blackberry
    </>
  ),
  description: () => (
    <>
      <Editor
        heightInStrings={2}
        code={[
          consoleLogMatch("foo", "/foo|bar/"),
          consoleLogMatch("bar", "/foo|bar/"),
          consoleLogMatch("baz", "/foo|bar/"),
        ]}
      />
      <p>
        To use a disjunction as part of the regular expression wrap it into a
        non-capturing group:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogMatch("foo", "/(?:foo|bar)42/"),
          consoleLogMatch("foo42", "/(?:foo|bar)42/"),
          consoleLogMatch("bar", "/(?:foo|bar)42/"),
          consoleLogMatch("bar42", "/(?:foo|bar)42/"),
          consoleLogMatch("baz", "/(?:foo|bar)42/"),
          consoleLogMatch("baz42", "/(?:foo|bar)42/"),
        ]}
      />
      <p>
        Fun fact: you can rewrite a custom symbol class with a disjunction:{" "}
        <span className="regexp">/(?:x|y)/</span> equals to{" "}
        <span className="regexp">/[xy]/</span>:
      </p>
      <Editor
        heightInStrings={2}
        code={[
          consoleLogMatch(":", "/[:;]/"),
          consoleLogMatch(":", "/(?::|;)/"),
          consoleLogMatch(";", "/[:;]/"),
          consoleLogMatch(";", "/(?::|;)/"),
          consoleLogMatch("4", "/[:;]/"),
          consoleLogMatch("4", "/(?::|;)/"),
          consoleLogMatch("f", "/[:;]/"),
          consoleLogMatch("f", "/(?::|;)/"),
          consoleLogMatch(":::", "/^[:;]$/"),
          consoleLogMatch(":::", "/^(?::|;)$/"),
        ]}
      />
    </>
  ),
  possibleSolution: /\brose\b|strawberry/gi,
  validators: [createIncludesValidation("|")],
  hint: [
    () => (
      <>
        You may find helpful <span className="regexp">\b</span>
      </>
    ),
  ],
  gardenTransitions: [
    { from: PlantName.Rosemary, to: PlantName.Rosemary },
    { from: PlantName.Rose, to: PlantName.Blackberry },
    { from: PlantName.Primrose, to: PlantName.Primrose },
    { from: PlantName.Strawberry, to: PlantName.Blackberry },
    { from: PlantName.Blackberry, to: PlantName.Blackberry },
    { from: PlantName.Rose, to: PlantName.Blackberry },
    { from: PlantName.Blackberry, to: PlantName.Blackberry },
    { from: PlantName.Strawberry, to: PlantName.Blackberry },
  ],
  replacer: "Blackberry",
  shouldUseEnumerationValidation: false,
});
