import FertilzerBag from "@public/assets/fertilizer-bag-1.png";
import "./Fertilizing.scss";
import { useFertilizerParticles } from "@/components/Plant/Fertilizing/useFertilizerParticles.ts";
import { getCssVariable } from "@/utils/cssVariables.ts";
import { useProportionalToPlantWidth } from "@/utils/useProportionalToPlantWidth.ts";
import { randomBetween } from "@/utils/random.ts";

export const Fertilizing = () => {
  useFertilizerParticles();
  const proportionalToMaxPlantWidth = useProportionalToPlantWidth();
  const PARTICLES_COUNT = parseInt(
    String(getCssVariable("--fertilizer-particle-count")),
    10,
  );
  const DUST_CLOUDS_COUNT = parseInt(
    String(getCssVariable("--dust-clouds-count")),
    10,
  );

  const particles = Array.from({ length: PARTICLES_COUNT });
  const dustClouds = Array.from({ length: DUST_CLOUDS_COUNT });

  return (
    <>
      <div className="fertilizer-bag">
        <img src={FertilzerBag.src} className={"rotate-[20deg]"} />
      </div>
      <div className="absolute">
        <div
          className="dust-cloud__opacity-wrap relative"
          style={{
            top: `${proportionalToMaxPlantWidth(-100)}px`,
            left: `0px`,
          }}
        >
          {dustClouds.map((_, ind) => (
            <div
              key={ind}
              className={`dust-cloud dust-cloud-${Math.round(randomBetween(1, 100))}`}
            />
          ))}
        </div>
        <div
          className="dust-cloud__opacity-wrap relative"
          style={{
            top: `${proportionalToMaxPlantWidth(-50)}px`,
            left: `${proportionalToMaxPlantWidth(40)}px`,
          }}
        >
          {dustClouds.map((_, ind) => (
            <div
              key={ind}
              className={`dust-cloud dust-cloud-${Math.round(randomBetween(1, 100))}`}
            />
          ))}
        </div>
        <div
          className="relative"
          style={{ top: "0px", left: `${proportionalToMaxPlantWidth(20)}px` }}
        >
          {particles.map((_, ind) => (
            <div key={ind} className={`particle particle-${ind + 1}`}>
              <div className={`particle-${ind + 1}__polygon`}></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
