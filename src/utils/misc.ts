export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const PREFERABLE_MAX_STRING_LENGTH = 40;

export const wrapInQoutes = (string: string) => `"${string}"`;
