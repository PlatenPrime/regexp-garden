// Функция для генерации случайных чисел в диапазоне
export const randomBetween = (from: number, to: number): number => {
  return from + Math.random() * (to - from);
};

export const randomBetweenZeroAnd = (to: number): number =>
  randomBetween(0, to);
