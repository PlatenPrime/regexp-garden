// Функция для получения значения CSS-переменной
export const getCssVariable = (name: string): string => {
  const root = document.documentElement;
  return getComputedStyle(root).getPropertyValue(name);
};

// Функция для масштабирования значений в зависимости от --max-plant-width
export const proportionalToPlantWidth = (value: number) => {
  const maxWidth = parseInt(getCssVariable("--max-plant-width"));
  return Math.round((value / 60) * maxWidth); // Масштабируем относительно 60px
};
