/**
 * Проверяет что два массива содержат одинаковые элементы (по ссылке) и в одинаковом порядке
 */
export const areEqual = <T>(arr1: T[], arr2: T[]): boolean =>
  arr1.length === arr2.length && arr1.every((item, ind) => item === arr2[ind]);

export const totalStringArrLength = (arr: string[]): number =>
  arr.join("").length;

export const last = <T>(arr: T[]): T | void => arr[arr.length - 1];

export const splitWordsInArrEvenlyByLength = (
  words: string[],
  numGroups: number,
): string[][] => {
  // Рассчитываем общее количество символов во всех словах
  const totalLength = words.reduce((sum, word) => sum + word.length, 0);

  // Целевая длина для каждого подмассива
  const targetLength = Math.ceil(totalLength / numGroups);

  const result: string[][] = [];
  let currentGroup: string[] = [];
  let currentLength = 0;

  for (const word of words) {
    const wordLength = word.length;

    // Если добавление текущего слова не превышает рассчитанную целевую длину, добавляем его в текущую группу
    if (currentLength + wordLength <= targetLength) {
      currentGroup.push(word);
      currentLength += wordLength;
    } else {
      // Если превышает, сохраняем текущую группу и начинаем новую
      result.push(currentGroup);
      currentGroup = [word];
      currentLength = wordLength;
    }
  }

  // Добавляем последнюю группу, если она не пуста
  if (currentGroup.length > 0) {
    result.push(currentGroup);
  }

  return result;
};

export const innerItemsCount = (arr: unknown[][]): number =>
  arr.map((nested) => nested.length).reduce((col, current) => current + col, 0);

export const isNot =
  <T>(notThis: T) =>
  <K>(item: K | T): item is K =>
    item !== notThis;
