import { createIncludesValidation } from "@/game/LevelClasses/validators.tsx";
import { PlantName } from "@/game/plants";
import { FertilizePlantsByArrayFilterMatchLevel } from "@/game/LevelClasses/FertilizePlantsByArrayFilterMatchLevel.class.tsx";
import { HoverablePlantHint } from "@/components/HoverablePlantHint.tsx";
import { consoleLogMatch } from "@/utils/ui.tsx";
import { Editor } from "@/components/Editor.tsx";

export const AnyWordCharacter = new FertilizePlantsByArrayFilterMatchLevel({
  title: "Any single word character",
  titleToken: "\\w",
  titleDescription: () => (
    <>
      Matches any single <em>latin</em> letter, number or underscore. Note, that
      the whitespace characters and special characters other than{" "}
      <span className="literal">&quot;_&quot;</span> will not be matched by{" "}
      <span className="regexp">\w</span>
    </>
  ),
  task: () => (
    <>
      Fertilize all the{" "}
      <HoverablePlantHint
        hightlightedInds={AnyWordCharacter.matchedBySolutionPlantInds}
      >
        plants
      </HoverablePlantHint>{" "}
      consisting of 3 letters
    </>
  ),
  description: () => (
    <>
      <p>
        Often you don&apos;t know in advance which symbol will be following in
        the substring you are looking for. The only thing you know is that it
        will be a word character. In such scenario you may find useful{" "}
        <span className="regexp">\w</span>:
      </p>
      <Editor
        heightInStrings={2}
        code={[
          consoleLogMatch("foo42", "/foo\\w/"),
          consoleLogMatch("foo$", "/foo\\w/"),
        ]}
      />
      <p>
        Spaces are not covered with <span className="regexp">\w</span>:
      </p>
      <Editor
        heightInStrings={2}
        code={[
          consoleLogMatch("4_2", "/\\w\\w\\w/"),
          consoleLogMatch("4 2", "/\\w\\w\\w/"),
        ]}
      />
      <p>
        Note that one <span className="regexp">\w</span> stands for one symbol:
      </p>
      <Editor
        heightInStrings={2}
        code={[
          consoleLogMatch("foobar", "/\\w\\w\\w\\w/"),
          consoleLogMatch("foo", "/\\w\\w\\w\\w/"),
          consoleLogMatch("foo", "/^\\w\\w\\w$/"),
          consoleLogMatch("foo bar", "/^\\w\\w\\w$/"),
        ]}
      />
      <p>
        Remember that if you need to match{" "}
        <span className="literal">&quot;\&quot;</span> literally, you need to
        escape it with backslash:
      </p>
      <Editor
        heightInStrings={1}
        code={[
          consoleLogMatch("\\", "/^\\\\/"),
          consoleLogMatch("\\w", "/^\\\\w/"),
          consoleLogMatch("\\w", "/^\\w/"),
        ]}
      />
    </>
  ),
  possibleSolution: /^\w\w\w$/i,
  validators: [createIncludesValidation("\\w")],
  hint: [
    () => (
      <>
        You may find helpful <span className="regexp">\w</span> to construct a
        regular expression matching plants having any 3 letters in their names.
        Make sure your regular expression will be compared against full plant
        name, not its sub-part.
      </>
    ),
  ],
  garden: [
    PlantName.Rose,
    PlantName.Rue,
    PlantName.Primrose,
    PlantName.Rye,
    PlantName.Rosemary,
  ],
  correctSolutionGarden: [PlantName.Rue, PlantName.Rye],
});
