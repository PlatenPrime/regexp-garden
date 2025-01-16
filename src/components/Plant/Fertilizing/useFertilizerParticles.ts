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
  const x1 = proportionalToPlantWidth(randomBetweenZeroAnd(10) + 59);
  const y1 = proportionalToPlantWidth(randomBetweenZeroAnd(10) - 83);
  const c1x = proportionalToPlantWidth(randomBetweenZeroAnd(40) + 35);
  const c1y = proportionalToPlantWidth(randomBetweenZeroAnd(40) - 88);
  const c2x = proportionalToPlantWidth(randomBetweenZeroAnd(40) - 10);
  const c2y = proportionalToPlantWidth(randomBetweenZeroAnd(40) - 90);
  const x2 = proportionalToPlantWidth(randomBetweenZeroAnd(20) - 10);
  const y2 = proportionalToPlantWidth(randomBetweenZeroAnd(20) - 10);

  return `M ${x1} ${y1} C ${c1x} ${c1y} ${c2x} ${c2y} ${x2} ${y2}`;
};

// Основной компонент
export const useFertilizerParticles = () => {
  useEffect(() => {
    // Создаем уникальный ID для <style>, чтобы управлять только "своими" стилями
    const styleId = "particle-styles";

    // Функция для генерации стилей частиц
    const generateParticleStyles = () => {
      const particleCount = parseInt(
        String(getCssVariable("--fertilizer-particle-count")),
        10,
      ); // Число частиц
      let css = "";

      for (let i = 1; i < particleCount + 1; i++) {
        const path = generatePath(); // Генерация пути

        // Создаем CSS для i-й частицы
        css += `
          .particle-${i} {
            offset-path: path('${path}');
          }
        `;
      }

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
    generateParticleStyles();

    // Слушатель на изменение размера окна
    const handleResize = () => {
      generateParticleStyles();
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
