import styles from "@/components/Plant/Plant.module.css";
import { PlantName, PlantsDict } from "@/game/plants";

export const DefaultPlant = ({ plantName }: { plantName: PlantName }) => {
  const plantSrc = PlantsDict[plantName].img;

  return <img src={plantSrc} alt={plantName} className={styles.plant} />;
};
