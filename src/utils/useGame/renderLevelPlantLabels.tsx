import { PlantTextRepresentation } from "@/components/GardenTextRepresentation/PlantTextRepresentation";
import {
  innerItemsCount,
  splitWordsInArrEvenlyByLength,
  totalStringArrLength,
} from "@/utils/arrays.ts";
import { PREFERABLE_MAX_STRING_LENGTH, wrapInQoutes } from "@/utils/misc.ts";
import { observer } from "mobx-react-lite";
import { useHighlightOnHoverPlants } from "@/utils/hoverOnPlants.ts";

export type RenderPlantLabelsMode = "list" | "string";
export type Suffix = "tabulation" | "comma";

/**
 * Рендерит строку PlanLabels в виде PlantLabel<suffix>PlantLabel...[<suffix>]
 *
 * @param plantLabelsString
 * @param suffix
 * @param onHover
 * @param indexesFrom
 * @param shouldAddTerminalSuffix
 */
const redenerString =
  (
    plantLabelsString: string[],
    suffix: Suffix,
    shouldUseHover?: boolean,
    getHoverablePlantInd?: () => number[],
    tabulation = 0,
    indexesFrom = 0,
    shouldAddTerminalSuffix = false,
  ): React.ElementType =>
  () => (
    <>
      <span className="whitespace-pre">{"\t".repeat(tabulation)}</span>
      {plantLabelsString
        .map((plantLabel, ind) => {
          return observer(() => (
            <>
              {/*если передали onHover - рендерим PlantTextRepresentation, иначе - просто span*/}
              {shouldUseHover && getHoverablePlantInd ? (
                <PlantTextRepresentation
                  plantLabel={plantLabel}
                  {...useHighlightOnHoverPlants([indexesFrom + ind])}
                  isActive={getHoverablePlantInd().includes(indexesFrom + ind)}
                />
              ) : (
                <span className="literal">{plantLabel}</span>
              )}
              {(shouldAddTerminalSuffix ||
                ind !== plantLabelsString.length - 1) && (
                <span
                  className={`${(suffix === "tabulation" && "tabulation-literal") || "casual-token"} whitespace-pre`}
                >
                  {suffix === "tabulation" ? "\\t" : ", "}
                </span>
              )}
            </>
          ));
        })
        .map((Component, ind) => (
          <Component key={ind} />
        ))}
    </>
  );

const renderPlantLabelsAsString = (
  plantLabels: string[][],
  PrefixEl: React.ElementType,
  SuffixEl: React.ElementType,
  shouldUseHover?: boolean,
  getHoverablePlantInd?: () => number[],
): React.ElementType[] => {
  if (plantLabels.length === 1) {
    return [
      () => (
        <>
          <PrefixEl />
          {plantLabels
            .map((label) =>
              redenerString(
                label,
                "tabulation",
                shouldUseHover,
                getHoverablePlantInd,
              ),
            )
            .map((Component, ind) => (
              <Component key={ind} />
            ))}
          <SuffixEl />
        </>
      ),
    ];
  }

  const plantLabelsRender = plantLabels.map((plantLabelsString, ind) =>
    redenerString(
      plantLabelsString,
      "tabulation",
      shouldUseHover,
      getHoverablePlantInd,
      0,
      innerItemsCount(plantLabels.slice(0, ind)),
      ind !== plantLabels.length - 1,
    ),
  );

  const First = plantLabelsRender[0];
  const Last = plantLabelsRender.at(-1)!;

  return [
    () => (
      <>
        <PrefixEl />
        <First />
      </>
    ),
    ...plantLabelsRender.slice(1, -1),
    () => (
      <>
        <Last />
        <SuffixEl />
      </>
    ),
  ];
};

const renderPlantLabelsAsList = (
  plantLabels: string[][],
  PrefixEl: React.ElementType,
  SuffixEl: React.ElementType,
  shouldUseHover?: boolean,
  getHoverablePlantInd?: () => number[],
): React.ElementType[] => {
  const quoted = plantLabels.map((labelsString) =>
    labelsString.map(wrapInQoutes),
  );

  if (plantLabels.length === 1) {
    return [
      () => (
        <>
          <PrefixEl />
          {quoted
            .map((label) =>
              redenerString(
                label,
                "comma",
                shouldUseHover,
                getHoverablePlantInd,
              ),
            )
            .map((Component, ind) => (
              <Component key={ind} />
            ))}
          <SuffixEl />
        </>
      ),
    ];
  }

  return [
    PrefixEl,
    ...quoted.map((plantLabelsString, ind) =>
      redenerString(
        plantLabelsString,
        "comma",
        shouldUseHover,
        getHoverablePlantInd,
        1,
        innerItemsCount(quoted.slice(0, ind)),
        ind !== quoted.length - 1,
      ),
    ),
    SuffixEl,
  ];
};

export const renderPlantLabels = (
  plantLabels: string[],
  renderPlantLabelsMode: RenderPlantLabelsMode = "list",
  PrefixEl: React.ElementType,
  SuffixEl: React.ElementType,
  shouldUseHover?: boolean,
  getHoverablePlantInd?: () => number[],
): React.ElementType[] => {
  const plantsCount = plantLabels.length;
  const totalLength =
    totalStringArrLength(plantLabels) +
    (renderPlantLabelsMode === "list"
      ? plantsCount * ", ".length + plantsCount * '""'.length
      : plantsCount * "\\t".length + '""'.length);
  const plantLabelsByStrings = splitWordsInArrEvenlyByLength(
    plantLabels,
    Math.ceil(totalLength / PREFERABLE_MAX_STRING_LENGTH),
  );

  if (renderPlantLabelsMode === "string") {
    return renderPlantLabelsAsString(
      plantLabelsByStrings,
      PrefixEl,
      SuffixEl,
      shouldUseHover,
      getHoverablePlantInd,
    );
  }

  return renderPlantLabelsAsList(
    plantLabelsByStrings,
    PrefixEl,
    SuffixEl,
    shouldUseHover,
    getHoverablePlantInd,
  );
};
