import Apple from "@public/assets/plants/apple.png";
import Barberry from "@public/assets/plants/barberry.png";
import Bearberry from "@public/assets/plants/bearberry.png";
import Blackberry from "@public/assets/plants/blackberry.png";
import ChristmasRose from "@public/assets/plants/christmas-rose.png";
import Corn from "@public/assets/plants/corn.png";
import Echinacea from "@public/assets/plants/echinacea.png";
import Heliopsis from "@public/assets/plants/heliopsis.png";
import Primrose from "@public/assets/plants/primrose.png";
import Raspberry from "@public/assets/plants/raspberry.png";
import Rice from "@public/assets/plants/rice.png";
import Roscoea from "@public/assets/plants/roscoea.png";
import Rose from "@public/assets/plants/rose.png";
import Roseberry from "@public/assets/plants/roseberry.png";
import RoseDoubleDelight from "@public/assets/plants/rose-double-delight.png";
import RoseIceberg from "@public/assets/plants/rose-iceberg.png";
import Rosemary from "@public/assets/plants/rosemary.png";
import RoseOfSharon from "@public/assets/plants/rose-of-sharon.png";
import RoseQueenElizabeth from "@public/assets/plants/rose-queen-elizabeth.png";
import Rue from "@public/assets/plants/rue.png";
import Rye from "@public/assets/plants/rye.png";
import SnowInSummer from "@public/assets/plants/snow-in-summer.png";
import SnowOnTheMountain from "@public/assets/plants/snow-on-the-mountain.png";
import Strawberry from "@public/assets/plants/strawberry.png";
import Tomato from "@public/assets/plants/tomato.png";
import Wheat from "@public/assets/plants/wheat.png";

export enum PlantName {
  AppleGalaMust696 = "AppleGalaMust696",
  Barberry = "Barberry",
  Bearberry = "Bearberry",
  Blackberry = "Blackberry",
  ChristmasRose = "ChristmasRose",
  CornPioneer3751 = "CornPioneer3751",
  EchinaceaSunrise = "EchinaceaSunrise",
  HeliopsisHelianthoides = "HeliopsisHelianthoides",
  Primrose = "Primrose",
  Raspberry = "Raspberry",
  Roscoea = "Roscoea",
  Rice = "Rice",
  Rose = "Rose",
  Roseberry = "Roseberry",
  RoseDoubleDelight = "RoseDoubleDelight",
  RoseIceberg = "RoseIceberg",
  Rosemary = "Rosemary",
  RoseOfSharon = "RoseOfSharon",
  RoseQueenElizabeth = "RoseQueenElizabeth",
  Rue = "Rue",
  Rye = "Rye",
  SnowInSummer = "SnowInSummer",
  SnowOnTheMountain = "SnowOnTheMountain",
  Strawberry = "Strawberry",
  TomatoRomaVF1 = "TomatoRomaVF1",
  WheatNorin10 = "WheatNorin10",
}

export const PlantsDict: Record<PlantName, { img: string; label: string }> = {
  [PlantName.AppleGalaMust696]: {
    label: "Apple 'Gala Must 696'",
    img: Apple.src,
  },
  [PlantName.Barberry]: { label: "Barberry", img: Barberry.src },
  [PlantName.Bearberry]: { label: "Bearberry", img: Bearberry.src },
  [PlantName.Blackberry]: { label: "Blackberry", img: Blackberry.src },
  [PlantName.ChristmasRose]: {
    label: "Christmas Rose",
    img: ChristmasRose.src,
  },
  [PlantName.CornPioneer3751]: { label: "Corn 'Pioneer 3751'", img: Corn.src },
  [PlantName.EchinaceaSunrise]: {
    label: "Echinacea 'Sunrise'",
    img: Echinacea.src,
  },
  [PlantName.HeliopsisHelianthoides]: {
    label: "Heliopsis helianthoides",
    img: Heliopsis.src,
  },
  [PlantName.Primrose]: { label: "Primrose", img: Primrose.src },
  [PlantName.Raspberry]: { label: "Raspberry", img: Raspberry.src },
  [PlantName.Rice]: { label: "Rice", img: Rice.src },
  [PlantName.Roscoea]: { label: "Roscoea", img: Roscoea.src },
  [PlantName.Rose]: { label: "Rose", img: Rose.src },
  [PlantName.Roseberry]: { label: "Roseberry", img: Roseberry.src },
  [PlantName.RoseDoubleDelight]: {
    label: "Rose 'Double Delight'",
    img: RoseDoubleDelight.src,
  },
  [PlantName.RoseIceberg]: { label: "Rose 'Iceberg'", img: RoseIceberg.src },
  [PlantName.Rosemary]: { label: "Rosemary", img: Rosemary.src },
  [PlantName.RoseOfSharon]: { label: "Rose-of-Sharon", img: RoseOfSharon.src },
  [PlantName.RoseQueenElizabeth]: {
    label: "Rose 'Queen Elizabeth'",
    img: RoseQueenElizabeth.src,
  },
  [PlantName.Rue]: { label: "Rue", img: Rue.src },
  [PlantName.Rye]: { label: "Rye", img: Rye.src },
  [PlantName.SnowInSummer]: { label: "Snow-in-Summer", img: SnowInSummer.src },
  [PlantName.SnowOnTheMountain]: {
    label: "Snow-on-the-Mountain",
    img: SnowOnTheMountain.src,
  },
  [PlantName.Strawberry]: { label: "Strawberry", img: Strawberry.src },
  [PlantName.TomatoRomaVF1]: { label: "Tomato 'Roma VF1'", img: Tomato.src },
  [PlantName.WheatNorin10]: { label: "Wheat 'Norin 10'", img: Wheat.src },
};
