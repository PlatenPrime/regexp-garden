import { PlantName, PlantsDict } from "@/game/plants.ts";
import { DefaultPlant } from "@/components/Plant/DefaultPlant";
import "./ReplacePlant.css";

export const ReplacePlant = ({
  from,
  to,
}: {
  from: PlantName;
  to: PlantName;
}) => {
  if (from === to) {
    return <DefaultPlant plantName={from} />;
  }

  const plantFromSrc = PlantsDict[from].img;
  const plantToSrc = PlantsDict[to].img;

  return (
    <>
      <img
        src={plantFromSrc}
        alt={from}
        className="replace-plant replace-plant_from"
      />
      <img
        src={plantToSrc}
        alt={to}
        className="replace-plant replace-plant_to"
      />
    </>
  );
};
