import wateringStyles from "@/components/Plant/Watering/Watering.module.scss";
import FloweringCan from "@public/assets/flowering-can.png";

export const Watering = () => {
  return (
    <>
      <img
        src={FloweringCan.src}
        alt="flowering can"
        className={wateringStyles.floweringCan}
      />
      <div className={wateringStyles.waterStream} />
      <div className={wateringStyles.waterStream} />
      <div className={wateringStyles.waterStream} />
      <div className={wateringStyles.waterStream} />
    </>
  );
};
