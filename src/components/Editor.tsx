import React from "react";

export type EditorProps = {
  fontSize?: string;
  lineHeight?: string;
  stringLineNumberColor?: string;
  activeStringLineNumberColor?: string;
  codeColor?: string;
  bgColor?: string;
  code: React.ElementType[];
  heightInStrings?: number;
  activeLineInd?: number;
  width?: string;
};

const value = (cssValue: string): number =>
  parseFloat(cssValue.replace(/[^0-9.]/g, ""));
const units = (cssValue: string): string => cssValue.replace(/[0-9.]/g, "");

export const Editor: React.FC<EditorProps> = ({
  stringLineNumberColor,
  activeStringLineNumberColor,
  codeColor,
  code,
  bgColor,
  heightInStrings,
  activeLineInd,
  width,
  fontSize,
  lineHeight,
}) => {
  const defaultLineHeight = "1.3125rem";
  const lineHeightUse = lineHeight ?? defaultLineHeight;

  return (
    <div
      className={`grid overflow-y-auto  py-1`}
      style={{
        backgroundColor: bgColor ?? "#1B1E23",
        width: width ?? "100%",
        fontSize: fontSize ?? "0.875rem",
        lineHeight: lineHeightUse,
        minHeight: heightInStrings
          ? `calc(${heightInStrings * value(lineHeight ?? defaultLineHeight)}${units(lineHeight ?? defaultLineHeight)} + 0.5rem)`
          : `100%`,
        gridTemplateColumns: `2rem auto`,
      }}
    >
      <div
        className={`flex flex-col w-6 items-end`}
        style={{
          color: stringLineNumberColor ?? "#373D4A",
          fontWeight: 600,
        }}
      >
        {Array.from({
          length: Math.max(heightInStrings ?? 10, code.length),
        }).map((_, ind) =>
          ind === activeLineInd ? (
            <span
              key={ind}
              style={{
                color: activeStringLineNumberColor ?? "#fff",
              }}
            >
              {ind + 1}
            </span>
          ) : (
            <span key={ind}>{ind + 1}</span>
          ),
        )}
      </div>
      <div
        className="flex flex-col"
        style={{
          color: codeColor ?? "#8C97B0",
        }}
      >
        {code.map((StringEl, ind) => (
          <pre key={ind}>
            <code
              className="flex items-center"
              style={{
                width: "100%",
              }}
            >
              <StringEl />
            </code>
          </pre>
        ))}
      </div>
    </div>
  );
};
