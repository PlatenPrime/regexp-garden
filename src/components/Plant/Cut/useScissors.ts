import { useEffect } from "react";
import { randomBetweenZeroAnd } from "@/utils/random.ts";
import {
  getCssVariable,
  proportionalToPlantWidth,
} from "@/utils/cssVariables.ts";

/*
    Функция для генерации случайного пути path()
    Частички удобрения двигаются по заданному маршруту offset-path: path(*МАРШРУТ*)
    К сожалению, css не позволяет указать внутри path() вычисляемые значения через calc()
    Поэтому адаптивность пути (пропорциональную зависимость от --plant-max-width) приходится
    делать через js 
 */
const generatePath = () => {
  const x1 = proportionalToPlantWidth(-53);
  const y1 = proportionalToPlantWidth(-6);
  const c1x = proportionalToPlantWidth(-100);
  const c1y = proportionalToPlantWidth(38);
  const c2x = proportionalToPlantWidth(-122);
  const c2y = proportionalToPlantWidth(35);
  const x2 = proportionalToPlantWidth(-153);
  const y2 = proportionalToPlantWidth(20);

  return `M ${x1} ${y1} C ${c1x} ${c1y} ${c2x} ${c2y} ${x2} ${y2}`;
};

// Основной компонент
export const useScissors = () => {
  useEffect(() => {
    // Создаем уникальный ID для <style>, чтобы управлять только "своими" стилями
    const styleId = "scissors-styles";

    // Функция для генерации стилей частиц
    const generateScissorsStyles = () => {
      const path = generatePath(); // Генерация пути

      // Создаем CSS для i-й частицы
      const css = `
          .scissors {
            offset-path: path('${path}');
          }
        `;

      // Ищем <style> по ID
      let styleElement = document.getElementById(styleId);

      if (!styleElement) {
        // Если <style> не существует, создаем его
        styleElement = document.createElement("style");
        styleElement.id = styleId; // Устанавливаем уникальный ID
        document.head.appendChild(styleElement);
      }

      // Обновляем содержимое <style>
      styleElement.innerHTML = css;
    };

    // Генерация стилей при загрузке
    generateScissorsStyles();

    // Слушатель на изменение размера окна
    const handleResize = () => {
      generateScissorsStyles();
    };

    window.addEventListener("resize", handleResize);

    // Очистка: удаляем слушатель и <style> при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);

      const styleElement = document.getElementById(styleId);
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);
};
