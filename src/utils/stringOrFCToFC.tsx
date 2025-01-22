import { FunctionComponent } from "react";

export const stringOrFCToFC = (
  stringOrFC: string | FunctionComponent,
): FunctionComponent =>
  typeof stringOrFC === "string" ? () => <>{stringOrFC as string}</> : stringOrFC;
