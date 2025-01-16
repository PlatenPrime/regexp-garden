import {
  BaseReplacePlantLevel,
  BaseReplacePlantLevelParams,
} from "@/game/LevelClasses/BaseReplacePlantLevel";
import { FunctionComponent } from "react";
import { AnswerInput } from "@/components/InputTabs/AnswerInput.tsx";

export class ReplacePlantsByStringReplaceLevel extends BaseReplacePlantLevel {
  regexpFlags = "gi";

  applyRegex(regexp: RegExp): string[] {
    return this.gardenLabels
      .join("\t")
      .replace(regexp, this.replacer)
      .split("\t");
  }

  get placeholder(): FunctionComponent[] {
    return [
      () => (
        <>
          <span className="identifier">garden</span>
          <span className="casual-token"> = </span>
          <span className="identifier">garden</span>
        </>
      ),
      () => (
        <AnswerInput
          BeforeInput={() => (
            <>
              <span className="casual-token pl-4">.</span>
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
              <span className="casual-token">);</span>
            </>
          )}
        />
      ),
    ];
  }

  activeLineInd = 1;

  constructor(params: BaseReplacePlantLevelParams) {
    super(params);
    if (typeof params.regexpFlags !== "undefined") {
      this.regexpFlags = params.regexpFlags;
    }
  }
}
