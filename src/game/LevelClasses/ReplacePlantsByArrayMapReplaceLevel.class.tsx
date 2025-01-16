import {
  BaseReplacePlantLevel,
  BaseReplacePlantLevelParams,
} from "@/game/LevelClasses/BaseReplacePlantLevel";
import { FunctionComponent } from "react";
import { AnswerInput } from "@/components/InputTabs/AnswerInput.tsx";

export class ReplacePlantsByArrayMapReplaceLevel extends BaseReplacePlantLevel {
  regexpFlags = "i";

  applyRegex(regexp: RegExp): string[] {
    return this.gardenLabels.map((plantName) =>
      plantName.replace(regexp, this.replacer),
    );
  }

  get placeholder(): FunctionComponent[] {
    return [
      () => (
        <>
          <span className="identifier">garden </span>
          <span className="casual-token">= </span>
          <span className="identifier">garden</span>
        </>
      ),
      () => (
        <>
          <span className="casual-token pl-4">.</span>
          <span className="method">map</span>
          <span className="casual-token">(</span>
          <span className="identifier">plant </span>
          <span className="keyword">{`=>`}</span>
        </>
      ),
      () => (
        <AnswerInput
          BeforeInput={() => (
            <>
              <span className="identifier pl-8">plant</span>
              <span className="casual-token">.</span>
              <span className="method">replace</span>
              <span className="casual-token">(</span>
              <span className="regexp">/</span>
            </>
          )}
          AfterInput={() => (
            <>
              <span className="regexp">/{this.regexpFlags}</span>
              <span className="casual-token">, </span>
              <span className="literal">{this.displayReplacer}</span>
              <span className="casual-token">)</span>
            </>
          )}
        />
      ),
      () => (
        <>
          <span className="casual-token pl-4">)</span>
        </>
      ),
      () => (
        <>
          <span className="casual-token">);</span>
        </>
      ),
    ];
  }

  activeLineInd = 2;

  constructor(params: BaseReplacePlantLevelParams) {
    super(params);
  }
}
