import { ArrayFilterMatchLevel } from "@/game/LevelClasses/ArrayFilterMatchLevel.class.ts";
import { AnswerInputSymbol } from "@/game/LevelClasses/types.ts";

export class WaterPlantsByArrayFilterMatchLevel extends ArrayFilterMatchLevel {
  //@ts-expect-error unique symbol
  placeholder = [
    () => (
      <>
        <span className="keyword">for </span>{" "}
        <span className="casual-token">(</span>
        <span className="keyword">const </span>
        <span className="identifier">plant </span>
        <span className="keyword">of </span>
        <span className="identifier">garden</span>
        <span className="casual-token">) {`{`}</span>
      </>
    ),
    () => (
      <>
        <span className="keyword pl-4">if </span>
        <span className="casual-token">(</span>
        <span className="identifier">plant</span>
        <span className="casual-token">.</span>
        <span className="method">match</span>
        <span className="casual-token">(</span>
        <span className="regexp">/</span>
      </>
    ),
    AnswerInputSymbol,
    () => (
      <>
        <span className="regexp">/{this.regexpFlags}</span>
        <span className="casual-token">) {`{`}</span>
      </>
    ),
    () => (
      <>
        <span className="method pl-8">water</span>
        <span className="casual-token">(</span>
        <span className="identifier">plant</span>
        <span className="casual-token">);</span>
      </>
    ),
    () => <span className="casual-token pl-4">{`}`}</span>,
    () => <span className="casual-token">{`}`}</span>,
  ];
}
