import { PlantName } from "@/game/plants";
import { WaterPlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/WaterPlantsByArrayFilterMatchLevel.class";
import { Editor } from "@/components/Editor.tsx";
import { consoleLogMatch, consoleLogReplace } from "@/utils/ui.tsx";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";

export const LiteralMatch = new WaterPlantsByArrayFilterMatchLevel({
  titleToken: "Match literally",
  title: "",
  titleDescription: "",
  task: () => (
    <>
      Water{" "}
      <HoverablePlantHint
        hightlightedInds={LiteralMatch.matchedBySolutionPlantInds}
      >
        plants
      </HoverablePlantHint>
      , starting with <span className="literal">&quot;Rose&quot;</span>
    </>
  ),
  description: () => (
    <>
      <p>
        Regular Expressions (shortly - <em>regexp</em>, or <em>regex</em>) is a
        special language to lookup for a pattern in a text and to replace it
        with another pattern. Regexps are present in many programming languages
        and its implementations are very similar although sometimes has its
        unique flavor. In this course we will learn how to write regexps in
        <span className="method"> JavaScript</span>. But it&apos;s not much
        differs from other languages regexp implementations, so after finishing
        this course you&apos;ll be able to write regular expressions in every
        language.
      </p>
      <p>
        Regexps follows synhtax: <span className="regexp">/</span>
        <em>PATTERN</em>
        <span className="regexp">/</span>
        <em>parameters flags(optional)</em>. Flags allow to configure options
        like case sensitivity. In this lesson for a sake of simplicity we use
        regexps without flags.
      </p>
      <p>
        By default, string matches a regular expression if it includes a
        substring matching a pattern specified in a regular expression at any
        place. A simplest pattern is a literal match:
      </p>
      <Editor
        heightInStrings={3}
        code={[
          consoleLogMatch("foo bar", "/foo/"),
          consoleLogMatch("foo bar", "/baz/"),
          consoleLogMatch("foo bar", "/bar/"),
          consoleLogReplace("foo bar", "/foo/", "baz"),
        ]}
      />
      <span>Note, that by default regular expressions are case sensitive:</span>
      <Editor
        heightInStrings={1}
        code={[consoleLogMatch("Foo Bar", "/foo/")]}
      />
    </>
  ),
  possibleSolution: /Rose/,
  regexpFlags: "",
  validators: [],
  hint: [
    () => (
      <p>
        Write a regular expression that literally match{" "}
        <span className="literal">&quot;Rose&quot;</span>
      </p>
    ),
  ],
  garden: [
    PlantName.Rue,
    PlantName.Rose,
    PlantName.Rye,
    PlantName.Rosemary,
    PlantName.Rice,
  ],
  correctSolutionGarden: [PlantName.Rose, PlantName.Rosemary],
});
