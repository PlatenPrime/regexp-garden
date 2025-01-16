import { useState, useEffect } from "react";
import { getCssVariable } from "@/utils/cssVariables.ts";

export const useResponsiveCssVariable = (variableName: string): string => {
  const [variableValue, setVariableValue] = useState("");

  useEffect(() => {
    // Функция для получения текущего значения CSS-переменной
    const getVariableValue = () => {
      const value = getCssVariable(variableName);
      setVariableValue(value);
    };

    // Получаем значение переменной при загрузке компонента
    getVariableValue();

    // Обновляем значение переменной при каждом изменении размера окна
    window.addEventListener("resize", getVariableValue);

    // Очищаем обработчик события при размонтировании компонента
    return () => {
      window.removeEventListener("resize", getVariableValue);
    };
  }, [variableName]);

  return variableValue;
};
