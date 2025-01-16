import ScissorsGif from "@public/assets/scissors-2.gif";
import ScissorsNoAnimation from "@public/assets/scissors-1.png";
import "./Scissors.scss";
import { useScissors } from "@/components/Plant/Cut/useScissors.ts";

export const Scissors = () => {
  useScissors();
  return (
    <>
      <img
        src={ScissorsNoAnimation.src}
        alt="scissors"
        className="scissors scissors-no-animation"
      />
      <img
        src={ScissorsGif.src}
        alt="scissors"
        className="scissors scissors-animated"
      />
    </>
  );
};
