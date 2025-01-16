import { LiteralMatch } from "@/game/Levels/LiteralMatch";
import { Dot } from "@/game/Levels/Dot";
import { Dot2 } from "@/game/Levels/Dot2";
import { Circumflex } from "@/game/Levels/Circumflex";
import { Dollar } from "@/game/Levels/Dollar";
import { WholeString } from "@/game/Levels/WholeString";
import { AnyWordCharacter } from "@/game/Levels/AnyWordCharacter.tsx";
import { AnyWhitespace } from "@/game/Levels/AnyWhitespace.tsx";
import { AnyDigit } from "@/game/Levels/AnyDigit.tsx";
import { Revision1 } from "@/game/Levels/Revision1";
import { OneOrMore } from "@/game/Levels/OneOrMore";
import { ZeroOrOne } from "@/game/Levels/ZeroOrOne";
import { ZeroOrMore } from "@/game/Levels/ZeroOrMore.tsx";
import { AnyNonWordCharacter } from "@/game/Levels/AnyNonWordCharacter.tsx";
import { AnyNonWhitespace } from "@/game/Levels/AnyNonWhitespace.tsx";
import { AnyNonDigit } from "@/game/Levels/AnyNonDigit";
import { CustomSymbolClass } from "@/game/Levels/CustomSymbolClass";
import { CustomSymbolClass2 } from "@/game/Levels/CustomSymbolClass2";
import { CustomInverseSymbolClass } from "@/game/Levels/CustomInverseSymbolClass";
import { CustomInverseSymbolClass2 } from "@/game/Levels/CustomInverseSymbolClass2";
import { QuantifierExactN } from "@/game/Levels/QuantifierExactN";
import { QuantifierNOrMore } from "@/game/Levels/QuantifierNOrMore";
import { QuantifierBetweenNAndM } from "@/game/Levels/QuantifierBetweenNAndM";
import { Replace } from "@/game/Levels/Replace";
import { CapturingGroup } from "@/game/Levels/CapturingGroup";
import { WordBoundary } from "@/game/Levels/WordBoundary";
import { NonCapturingGroup } from "@/game/Levels/NonCapturingGroup";
import { Disjunction } from "@/game/Levels/Disjunction.tsx";
import { PositiveLookahead } from "@/game/Levels/PositiveLookahead";
import { PositiveLookahead2 } from "@/game/Levels/PositiveLookahead2";
import { NegativeLookahead } from "@/game/Levels/NegativeLookahead";
import { NegativeLookahead2 } from "@/game/Levels/NegativeLookahead2";
import { PositiveLookbehind } from "@/game/Levels/PositiveLookbehind";
import { PositiveLookbehind2 } from "@/game/Levels/PositiveLookbehind2";
import { NegativeLookbehind } from "@/game/Levels/NegativeLookbehind";
import { Laziness } from "@/game/Levels/Laziness";
import { RecurringCapturingGroup } from "@/game/Levels/RecurringCapturingGroup";
import { CaseInsensitive } from "@/game/Levels/CaseInsensitive.tsx";
import { FlagG } from "@/game/Levels/FlagG.tsx";
import { FlagG2 } from "@/game/Levels/FlagG2.tsx";
import { Revision2 } from "@/game/Levels/Revision2.tsx";
import { Revision3 } from "@/game/Levels/Revision3.tsx";

export * from "@/game/Levels/Disjunction.tsx";
export * from "@/game/Levels/AnyWordCharacter.tsx";
export * from "@/game/Levels/AnyNonDigit";
export * from "@/game/Levels/AnyNonWordCharacter.tsx";
export * from "@/game/Levels/AnyNonWhitespace.tsx";
export * from "@/game/Levels/ZeroOrMore.tsx";
export * from "@/game/Levels/CapturingGroup";
export * from "@/game/Levels/Circumflex";
export * from "@/game/Levels/CustomInverseSymbolClass";
export * from "@/game/Levels/CustomInverseSymbolClass2";
export * from "@/game/Levels/CustomSymbolClass";
export * from "@/game/Levels/CustomSymbolClass2";
export * from "@/game/Levels/AnyDigit.tsx";
export * from "@/game/Levels/Dollar";
export * from "@/game/Levels/Dot";
export * from "@/game/Levels/Dot2";
export * from "@/game/Levels/Laziness";
export * from "@/game/Levels/NegativeLookahead";
export * from "@/game/Levels/NegativeLookahead2";
export * from "@/game/Levels/NegativeLookbehind";
export * from "@/game/Levels/NonCapturingGroup";
export * from "@/game/Levels/OneOrMore";
export * from "@/game/Levels/PositiveLookahead";
export * from "@/game/Levels/PositiveLookahead2";
export * from "@/game/Levels/PositiveLookbehind";
export * from "@/game/Levels/PositiveLookbehind2";
export * from "@/game/Levels/QuantifierBetweenNAndM";
export * from "@/game/Levels/QuantifierExactN";
export * from "@/game/Levels/QuantifierNOrMore";
export * from "@/game/Levels/RecurringCapturingGroup";
export * from "@/game/Levels/Replace";
export * from "@/game/Levels/Revision1";
export * from "@/game/Levels/LiteralMatch";
export * from "@/game/Levels/AnyWhitespace.tsx";
export * from "@/game/Levels/WholeString";
export * from "@/game/Levels/WordBoundary";
export * from "@/game/Levels/ZeroOrOne";

export const LevelsByOrder = [
  LiteralMatch,
  CaseInsensitive,
  Dot,
  Dot2,
  Circumflex,
  Dollar,
  WholeString,
  AnyWordCharacter,
  AnyWhitespace,
  AnyDigit,
  ZeroOrMore,
  OneOrMore,
  ZeroOrOne,
  Revision1,
  AnyNonWordCharacter,
  AnyNonWhitespace,
  AnyNonDigit,
  CustomSymbolClass,
  CustomSymbolClass2,
  CustomInverseSymbolClass,
  CustomInverseSymbolClass2,
  QuantifierExactN,
  QuantifierNOrMore,
  QuantifierBetweenNAndM,
  Replace,
  CapturingGroup,
  FlagG,
  FlagG2,
  WordBoundary,
  NonCapturingGroup,
  Disjunction,
  PositiveLookahead,
  PositiveLookahead2,
  NegativeLookahead,
  NegativeLookahead2,
  PositiveLookbehind,
  PositiveLookbehind2,
  NegativeLookbehind,
  Revision2,
  Revision3,
  Laziness,
  RecurringCapturingGroup,
];

if (process.env.NODE_ENV === "development") {
  LevelsByOrder.forEach((level, ind) => {
    if (!level.possibleSolutionIsCorrect) {
      console.group(`Level ${ind} ${level.titleToken}:${level.task}`);
      console.log("Garden Labels:", level.gardenLabels);
      console.log(`Incorrect possible solution: ${level.possibleSolution}`);
      console.log(
        "possibleSolutionGardenLabels",
        level.possibleSolutionGardenLabels,
      );
      console.log("correctSolutionGarden", level.correctSolutionGarden);
      console.log(
        "correctSolutionGardenLabels",
        level.correctSolutionGardenLabels,
      );
      console.groupEnd();
    }
  });
}
