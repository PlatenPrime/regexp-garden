import { createMatchesValidation } from "@/game/LevelClasses/validators.tsx";
import { PlantName } from "@/game/plants";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { FertilizePlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/FertilizePlantsByArrayFilterMatchLevel.class.tsx";
import { consoleLogMatch } from "@/utils/ui.tsx";
import { Editor } from "@/components/Editor.tsx";

export const CustomSymbolClass2 = new FertilizePlantsByArrayFilterMatchLevel({
  title: "Single character from a custom symbol class",
  titleToken: "[...] again",
  titleDescription: () => (
    <>Matches single character from the specified range of symbols</>
  ),
  task: () => (
    <>
      Fertilize{" "}
      <HoverablePlantHint
        hightlightedInds={CustomSymbolClass2.matchedBySolutionPlantInds}
      >
        plants
      </HoverablePlantHint>{" "}
      witch name starts with <span className="literal">&quot;A&quot;</span>,{" "}
      <span className="literal">&quot;B&quot;</span> or{" "}
      <span className="literal">&quot;C&quot;</span> AND has at least one digit
      between 0 and 5 or between 7 and 9.
    </>
  ),
  description: () => (
    <>
      <p>
        Ranges can be specified not only between digits, but also between
        letters:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogMatch("a", "/[a-z]/"),
          consoleLogMatch("z", "/[a-z]/"),
          consoleLogMatch("A", "/[a-z]/"),
          consoleLogMatch("Z", "/[a-z]/"),
          consoleLogMatch("a", "/[A-Z]/"),
          consoleLogMatch("z", "/[A-Z]/"),
          consoleLogMatch("A", "/[A-Z]/"),
          consoleLogMatch("Z", "/[A-Z]/"),
        ]}
      />
      <p>
        You can combine ranges from lowercase to uppercase letters into one
        range:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogMatch("a", "/[A-z]/"),
          consoleLogMatch("z", "/[A-z]/"),
          consoleLogMatch("A", "/[A-z]/"),
          consoleLogMatch("Z", "/[A-z]/"),
        ]}
      />
      <p>
        But be careful determining case-agnostic range: the range should start
        with uppercase letter, not reverso:{" "}
        <span className="regexp">/[a-Z]/</span> throws an error. This is because
        under the hood the regular expressions uses{" "}
        <a
          className="text-ds-blueMain underline"
          href="https://wiki2.org/en/ASCII"
        >
          ASCII table
        </a>{" "}
        to determine which symbols are included in the range: it finds the ASCII
        codes of the start of range and the end of range symbols and all the
        symbols with codes in between are included in the range.{" "}
        <span className="literal">&quot;Z&quot;</span> has lower ASCII code than{" "}
        <span className="literal">&quot;a&quot;</span>, so the the resulting
        range <span className="regexp">/[a-Z]/</span> is empty.
      </p>
      <p>
        Other consequence is that <span className="regexp">/[A-z]/</span> among
        the letters in all the cases also includes some special symbols that
        lies in ASCII table between{" "}
        <span className="literal">&quot;A&quot;</span> and{" "}
        <span className="literal">&quot;z&quot;</span>:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogMatch("[", "/[A-z]/"),
          consoleLogMatch("\\", "/[A-z]/"),
          consoleLogMatch("]", "/[A-z]/"),
          consoleLogMatch("^", "/[A-z]/"),
          consoleLogMatch("_", "/[A-z]/"),
          consoleLogMatch("`", "/[A-z]/"),
        ]}
      />
      <p>
        If you want to restrict the range with only latins without special
        symbols you probably should use combination of two ranges
        &quot;cutting&quot; off the special symbols in between:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogMatch("a", "/[A-Za-z]/"),
          consoleLogMatch("z", "/[A-Za-z]/"),
          consoleLogMatch("A", "/[A-Za-z]/"),
          consoleLogMatch("Z", "/[A-Za-z]/"),
          consoleLogMatch("[", "/[A-Za-z]/"),
          consoleLogMatch("\\", "/[A-Za-z]/"),
          consoleLogMatch("]", "/[A-Za-z]/"),
          consoleLogMatch("^", "/[A-Za-z]/"),
          consoleLogMatch("_", "/[A-Za-z]/"),
          consoleLogMatch("`", "/[A-Za-z]/"),
        ]}
      />
      <p>
        Keeping in ming the underlying mechanics of the symbol classes ranges,
        we can define ranges of special symbols:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogMatch("!", "/[!-/]/"),
          consoleLogMatch('"', "/[!-/]/"),
          consoleLogMatch("#", "/[!-/]/"),
          consoleLogMatch("$", "/[!-/]/"),
          consoleLogMatch("%", "/[!-/]/"),
          consoleLogMatch("&", "/[!-/]/"),
          consoleLogMatch("'", "/[!-/]/"),
          consoleLogMatch("(", "/[!-/]/"),
          consoleLogMatch(")", "/[!-/]/"),
          consoleLogMatch("*", "/[!-/]/"),
          consoleLogMatch("+", "/[!-/]/"),
          consoleLogMatch(",", "/[!-/]/"),
          consoleLogMatch("-", "/[!-/]/"),
          consoleLogMatch(".", "/[!-/]/"),
          consoleLogMatch("/", "/[!-/]/"),
        ]}
      />
      <p>
        Now we can craft ourselves some of the predefined symbol classes from
        the previous lessons:
        <ul className="list-disc px-5">
          <li>
            <span className="regexp">\w</span> equals to{" "}
            <span className="regexp">[A-Za-z0-9_]</span>
          </li>
          <li>
            <span className="regexp">\s</span> equals to{" "}
            <span className="regexp">[ \t\n\r\f]</span>
          </li>
          <li>
            <span className="regexp">\d</span> equals to{" "}
            <span className="regexp">[0-9]</span>
          </li>
        </ul>
      </p>
    </>
  ),
  possibleSolution: /^[A-C].*[0-57-9]+/i,
  validators: [
    createMatchesValidation(
      /\[.+\]/i,
      "Your solution should include a custom symbol class",
    ),
    createMatchesValidation(
      /^\^/i,
      "Your solution should define a pattern for the start of string",
    ),
    createMatchesValidation(
      /\[.+-.+\]/i,
      "Your solution should include a range of symbols",
    ),
  ],
  hint: [() => <>Do you remember how to define that </>],
  garden: [
    PlantName.TomatoRomaVF1,
    PlantName.Rosemary,
    PlantName.AppleGalaMust696,
    PlantName.WheatNorin10,
    PlantName.Primrose,
    PlantName.CornPioneer3751,
  ],
  correctSolutionGarden: [
    PlantName.AppleGalaMust696,
    PlantName.CornPioneer3751,
  ],
});
