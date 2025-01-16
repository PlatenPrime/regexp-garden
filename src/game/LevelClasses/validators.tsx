import { FunctionComponent } from "react";

export type ValidationResult = true | string | FunctionComponent;
export type ValidationError = Exclude<ValidationResult, boolean>;

export const createIncludesValidation =
  (token: string) =>
  (solution: string): ValidationResult =>
    solution.toLowerCase().includes(token.toLowerCase()) ||
    (() => (
      <>
        A solution should include <span className="regexp">{token}</span>
      </>
    ));

export const createDoesntMatchValidation =
  (regexp: RegExp, errorMsg: string | FunctionComponent) =>
  (solution: string): ValidationResult =>
    !solution.match(regexp) || errorMsg;

export const isNotEnumerationValidation = createDoesntMatchValidation(
  /^([-\s\w'\d]+\|[-\s\w'\d]*)+$/gi,
  "Hey! Do not cheat!",
);

export const createMatchesValidation =
  (regexp: RegExp, errorMsg: string | FunctionComponent) =>
  (solution: string): ValidationResult =>
    !!solution.match(regexp) || errorMsg;
