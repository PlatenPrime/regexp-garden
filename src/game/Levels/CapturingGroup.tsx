import { PlantName } from "@/game/plants";
import { createMatchesValidation } from "@/game/LevelClasses/validators.tsx";
import { ReplacePlantsByArrayMapReplaceLevel } from "@/game/LevelClasses/ReplacePlantsByArrayMapReplaceLevel.class";
import { consoleLogMatch, consoleLogReplace } from "@/utils/ui.tsx";
import { Editor } from "@/components/Editor.tsx";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";

export const CapturingGroup = new ReplacePlantsByArrayMapReplaceLevel({
  title: "Capturing group",
  titleToken: "(...)",
  titleDescription:
    "Saves a part of matched string into a local variable that can be used later in a replacer",
  task: () => (
    <>
      Remove all the{" "}
      <HoverablePlantHint
        hightlightedInds={CapturingGroup.matchedBySolutionPlantInds}
      >
        cultivars
      </HoverablePlantHint>{" "}
      from the names of the plants
    </>
  ),
  description: () => (
    <>
      <p>
        With regular expressions you can not only replace one text with another,
        but you can dynamically define replacer text based on the original text.
        If you cover a part of the regular expression with round brackets, you
        can address it in the replacer as{" "}
        <span className="literal">&quot;$1&quot;</span>:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogReplace(
            "foo 42 bar",
            "/^\\w+ (.+) \\w+/i",
            "the number in between is $1",
          ),
          consoleLogReplace(
            "foo 42",
            "/^\\w+ (\\d+)/i",
            "the number after foo is $1",
          ),
        ]}
      />
      <p>
        You are not restricted with only one capturing group: you can have as
        much as 10&apos;000 of capturing groups in one regular expression! Each
        of them can be than addressed in a replacer with{" "}
        <span className="literal">&quot;$2&quot;</span>,{" "}
        <span className="literal">&quot;$3&quot;</span>, ...,{" "}
        <span className="literal">&quot;$10000&quot;</span>:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogReplace("Isaac Asimov", "/(\\w+) (\\w+)/i", "$2, $1"),
          consoleLogReplace(
            "4 8 15 16 23 42",
            "/(\\d+) (\\d+) (\\d+) (\\d+) (\\d+) (\\d+)/i",
            "$6 $5 $4 $3 $2 $1",
          ),
        ]}
      />
      <p>
        Another use-case for capturing group - applying a quantifier to the part
        of the regular expression wrapped in the brackets:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogMatch("foo", "/(foo\\s*){3,}/i"),
          consoleLogMatch("foo foo", "/(foo\\s*){3,}/i"),
          consoleLogMatch("foo foo foo", "/(foo\\s*){3,}/i"),
        ]}
      />
      <p>
        But there is a more performant way to grouping repetitive parts of the
        regular expression. We will cover it later.
      </p>
      <p>
        If you need to match <span className="literal">&quot;{`(`}&quot;</span>{" "}
        or <span className="literal">&quot;{`)`}&quot;</span> literally,
        consider escaping it with the backslash:
      </p>
      <Editor
        heightInStrings={1}
        code={[consoleLogMatch("(", "/\\(/"), consoleLogMatch(")", "/\\)/")]}
      />
    </>
  ),
  possibleSolution: /(\w+) '.*'/i,
  validators: [
    createMatchesValidation(
      /\(.+\)/i,
      "Your solution should include a capturing group",
    ),
  ],
  hint: [
    () => <>Your task is to make cultivar roses just roses</>,
    () => <>The rose should be in a capturing group</>,
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
