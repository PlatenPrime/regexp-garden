import { FunctionComponent } from "react";

const regexpFromString = (regexpString: string): RegExp | null => {
  const body = regexpString.match(/[/](.*)[/]/)?.[1] ?? null;
  if (!body) return null;
  const flags = regexpString.match(/[/].*[/](.*)$/)?.[1] ?? "";
  return new RegExp(body, flags);
};

export const consoleLogMatch = (
  text: string,
  regexpString: string,
): FunctionComponent => {
  const regexp = regexpFromString(regexpString);
  if (!regexp) throw new Error(`Wrong regexp: ${regexpString}`);
  const result = !!text.match(regexp);
  return () => (
    <>
      <span className="identifier">console</span>
      <span className="casual-token">.</span>
      <span className="method">log</span>
      <span className="casual-token">(!!</span>
      <span className="literal">{`"${text}"`}</span>
      <span className="casual-token">.</span>
      <span className="method">match</span>
      <span className="casual-token">(</span>
      <span className="regexp">{regexpString}</span>
      <span className="casual-token">)</span>
      <span className="casual-token">) </span>
      <span className="comment">{`// ${String(result)} `}</span>
    </>
  );
};

export const consoleLogReplace = (
  text: string,
  regexpString: string,
  replacer: string,
): FunctionComponent => {
  const regexp = regexpFromString(regexpString);
  if (!regexp) throw new Error(`Wrong regexp: ${regexpString}`);
  const result = text.replace(regexp, replacer);

  return () => (
    <>
      <span className="identifier">console</span>
      <span className="casual-token">.</span>
      <span className="method">log</span>
      <span className="casual-token">(</span>
      <span className="literal">{`"${text}"`}</span>
      <span className="casual-token">.</span>
      <span className="method">replace</span>
      <span className="casual-token">(</span>
      <span className="regexp">{regexpString}</span>
      <span className="casual-token">, </span>
      <span className="literal">{`"${replacer}"`}</span>
      <span className="casual-token">)</span>
      <span className="casual-token">) </span>
      <span className="comment">{`// ${result} `}</span>
    </>
  );
};
