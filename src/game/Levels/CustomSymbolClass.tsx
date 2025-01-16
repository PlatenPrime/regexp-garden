import { createMatchesValidation } from "@/game/LevelClasses/validators.tsx";
import { PlantName } from "@/game/plants";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { CutPlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/CutPlantsByArrayFilterMatchLevel.class.tsx";
import { consoleLogMatch } from "@/utils/ui.tsx";
import { Editor } from "@/components/Editor.tsx";

export const CustomSymbolClass = new CutPlantsByArrayFilterMatchLevel({
  title: "Single character from a custom symbol class",
  titleToken: "[...]",
  titleDescription: () => (
    <>Matches single character from the specified range of symbols</>
  ),
  task: () => (
    <>
      Cut{" "}
      <HoverablePlantHint
        hightlightedInds={CustomSymbolClass.matchedBySolutionPlantInds}
      >
        plants
      </HoverablePlantHint>{" "}
      that has one or more <span className="literal">&quot;&apos;&quot;</span>{" "}
      or <span className="literal">&quot;-&quot;</span> in its name
    </>
  ),
  description: () => (
    <>
      <p>
        In the previous lessons we encountered several symbol classes:{" "}
        <span className="regexp">\w</span> for word characters only,{" "}
        <span className="regexp">\s</span> for whitespace characters only,{" "}
        <span className="regexp">\d</span> for digit characters only, and their
        opposites. In regular expressions we are not limited by these classes
        but can create our own classes enumerating allowed symbols inside{" "}
        <span className="regexp">[</span> and <span className="regexp">]</span>.
        For example, <span className="regexp">/[:;]/</span> will match single{" "}
        <span className="literal">&quot;:&quot;</span> or single{" "}
        <span className="literal">&quot;;&quot;</span>:
      </p>
      <Editor
        heightInStrings={2}
        code={[
          consoleLogMatch(":", "/[:;]/"),
          consoleLogMatch(";", "/[:;]/"),
          consoleLogMatch("4", "/[:;]/"),
          consoleLogMatch("f", "/[:;]/"),
          consoleLogMatch(":::", "/^[:;]$/"),
        ]}
      />
      <p>
        Please note, that symbols forming a class are enumerated without commas.
      </p>
      <p>
        Among enumerating symbols forming a class, we can define a range of
        symbols: <span className="regexp">/[0-4]/</span> will match any single
        digit from the range from 0 to 4:
      </p>
      <Editor
        heightInStrings={2}
        code={[
          consoleLogMatch("0", "/[0-4]/"),
          consoleLogMatch("1", "/[0-4]/"),
          consoleLogMatch("2", "/[0-4]/"),
          consoleLogMatch("3", "/[0-4]/"),
          consoleLogMatch("4", "/[0-4]/"),
          consoleLogMatch("5", "/[0-4]/"),
        ]}
      />
      <p>We can also combine multiple ranges at one time:</p>
      <Editor
        heightInStrings={2}
        code={[
          consoleLogMatch("0", "/[0-46-9]/"),
          consoleLogMatch("1", "/[0-46-9]/"),
          consoleLogMatch("2", "/[0-46-9]/"),
          consoleLogMatch("3", "/[0-46-9]/"),
          consoleLogMatch("4", "/[0-46-9]/"),
          consoleLogMatch("5", "/[0-46-9]/"),
          consoleLogMatch("6", "/[0-46-9]/"),
          consoleLogMatch("7", "/[0-46-9]/"),
          consoleLogMatch("8", "/[0-46-9]/"),
          consoleLogMatch("9", "/[0-46-9]/"),
        ]}
      />
      <p>
        Worth noting that in the regexp above{" "}
        <span className="literal">&quot;-&quot;</span> is not included in the
        range:
      </p>
      <Editor heightInStrings={1} code={[consoleLogMatch("-", "/[0-46-9]/")]} />
      <p>
        If for some reason, among the digits from 0 to 4 and from 6 to 9, you
        need to match <span className="literal">&quot;-&quot;</span>, you have
        to specify it at the beginning or at the end of the symbol class. When
        used not at the beginning or at the end,{" "}
        <span className="literal">&quot;-&quot;</span> forms a range:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogMatch("-", "/[-0-46-9]/"),
          consoleLogMatch("-", "/[0-46-9-]/"),
          consoleLogMatch("0", "/[0-46-9-]/"),
          consoleLogMatch("4", "/[0-46-9-]/"),
          consoleLogMatch("5", "/[0-46-9-]/"),
          consoleLogMatch("6", "/[0-46-9-]/"),
          consoleLogMatch("9", "/[0-46-9-]/"),
        ]}
      />
      <p>
        There is no need to escape special symbols when enumerating them except
        backslash and square brackets itself:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogMatch(".", "/[.^$\\\\/*+?\\[\\]]/"),
          consoleLogMatch("^", "/[.^$\\\\/*+?\\[\\]]/"),
          consoleLogMatch("$", "/[.^$\\\\/*+?\\[\\]]/"),
          consoleLogMatch("\\", "/[.^$\\\\/*+?\\[\\]]/"),
          consoleLogMatch("*", "/[.^$\\\\/*+?\\[\\]]/"),
          consoleLogMatch("+", "/[.^$\\\\/*+?\\[\\]]/"),
          consoleLogMatch("?", "/[.^$\\\\/*+?\\[\\]]/"),
          consoleLogMatch("[", "/[.^$\\\\/*+?\\[\\]]/"),
          consoleLogMatch("]", "/[.^$\\\\/*+?\\[\\]]/"),
        ]}
      />
      <p>
        You can also use symbol class tokens from the previous lessons inside
        the custom symbol class:
      </p>
      <Editor
        heightInStrings={2}
        code={[
          consoleLogMatch("0", "/[\\d]/"),
          consoleLogMatch("1", "/[\\d]/"),
          consoleLogMatch("2", "/[\\d]/"),
          consoleLogMatch("3", "/[\\d]/"),
          consoleLogMatch("4", "/[\\d]/"),
          consoleLogMatch("5", "/[\\d]/"),
          consoleLogMatch("6", "/[\\d]/"),
          consoleLogMatch("7", "/[\\d]/"),
          consoleLogMatch("8", "/[\\d]/"),
          consoleLogMatch("9", "/[\\d]/"),
        ]}
      />
      <p>
        As usual, if you need to match{" "}
        <span className="literal">&quot;[&quot;</span> or{" "}
        <span className="literal">&quot;]&quot;</span> literally, consider
        escaping it with the backslash:
      </p>
      <Editor
        heightInStrings={1}
        code={[consoleLogMatch("[", "/\\[/"), consoleLogMatch("]", "/\\]/")]}
      />
    </>
  ),
  possibleSolution: /['-]/i,
  validators: [
    createMatchesValidation(
      /\[.+\]/i,
      "Your solution should include a custom symbol class",
    ),
  ],
  hint: [
    () => (
      <>
        Your custom class should include{" "}
        <span className="literal">&quot;&apos;&quot;</span> and{" "}
        <span className="literal">&quot;-&quot;</span>
      </>
    ),
  ],
  garden: [
    PlantName.Primrose,
    PlantName.AppleGalaMust696,
    PlantName.Rosemary,
    PlantName.RoseOfSharon,
    PlantName.SnowInSummer,
    PlantName.TomatoRomaVF1,
    PlantName.Roseberry,
  ],
  correctSolutionGarden: [
    PlantName.AppleGalaMust696,
    PlantName.RoseOfSharon,
    PlantName.SnowInSummer,
    PlantName.TomatoRomaVF1,
  ],
});
