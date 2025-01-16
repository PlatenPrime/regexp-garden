import { PlantName, PlantsDict } from "@/game/plants.ts";
import "./CutPlant.css";

export const CutPlant = ({ plantName }: { plantName: PlantName }) => {
  const plantSrc = PlantsDict[plantName].img;

  return (
    <div className="flex flex-col">
      <div className={`cut-plant-top__wrap`}>
        <img src={plantSrc} alt={plantName} className="cut-plant-top__plant" />
      </div>
      <div className={`cut-plant-bottom__wrap`}>
        <img
          src={plantSrc}
          alt={plantName}
          className="cut-plant-bottom__plant"
        />
      </div>
    </div>
  );
};
