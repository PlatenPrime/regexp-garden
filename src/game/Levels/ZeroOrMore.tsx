import { createIncludesValidation } from "@/game/LevelClasses/validators.tsx";
import { PlantName } from "@/game/plants";
import { FertilizePlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/FertilizePlantsByArrayFilterMatchLevel.class.tsx";
import { Editor } from "@/components/Editor.tsx";
import { consoleLogMatch } from "@/utils/ui.tsx";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";

export const ZeroOrMore = new FertilizePlantsByArrayFilterMatchLevel({
  title: "Zero or more times",
  titleToken: "*",
  titleDescription: () => <>Repeats the previous token zero or more times</>,
  task: () => (
    <>
      Fertilize{" "}
      <HoverablePlantHint
        hightlightedInds={ZeroOrMore.matchedBySolutionPlantInds}
      >
        plants
      </HoverablePlantHint>{" "}
      which names consist of only word characters
    </>
  ),
  description: () => (
    <>
      <p>
        In the previous lessons we&apos;ve wrote regular expressions where one
        token match exactly one symbol. Let&apos;s say we want to write an
        expression to match all the strings starting with{" "}
        <span className="literal">&quot;foo&quot;</span> and ending with{" "}
        <span className="literal">&quot;bar&quot;</span> with any two word
        characters in between. We would write something like this:
      </p>
      <Editor
        heightInStrings={1}
        code={[consoleLogMatch("foo42bar", "/^foo\\w\\wbar$/")]}
      />
      <p>
        But what if we don&apos;t know in advance how many word characters will
        be between <span className="literal">&quot;foo&quot;</span> and{" "}
        <span className="literal">&quot;bar&quot;</span>? What if there could be
        zero or any word characters in the middle? Our previous expression would
        fail there:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogMatch("foo4bar", "/^foo\\w\\wbar$/"),
          consoleLogMatch("foo423bar", "/^foo\\w\\wbar$/"),
          consoleLogMatch("foobar", "/^foo\\w\\wbar$/"),
        ]}
      />
      <p>
        This is where <span className="regexp">*</span> would help us:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogMatch("foo42bar", "/^foo\\w*bar$/"),
          consoleLogMatch("foo4bar", "/^foo\\w*bar$/"),
          consoleLogMatch("foobar", "/^foo\\w*bar$/"),
        ]}
      />
      <p>
        If you want to match <span className="literal">&quot;*&quot;</span>{" "}
        literally, escape it with backslash:
      </p>
      <Editor heightInStrings={1} code={[consoleLogMatch("*", "/\\*/")]} />
    </>
  ),
  possibleSolution: /^\w*$/i,
  validators: [createIncludesValidation("*")],
  hint: [() => <>Consider making your regexp to match the full string</>],
  garden: [
    PlantName.AppleGalaMust696,
    PlantName.CornPioneer3751,
    PlantName.ChristmasRose,
    PlantName.Primrose,
    PlantName.TomatoRomaVF1,
    PlantName.Rosemary,
    PlantName.WheatNorin10,
  ],
  correctSolutionGarden: [PlantName.Primrose, PlantName.Rosemary],
});
