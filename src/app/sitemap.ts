import type { MetadataRoute } from "next";
import { LevelsByOrder } from "@/game/Levels";
import { BASE_URL } from "@/utils/consts.ts";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/levels`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...LevelsByOrder.map((_, ind) => ({
      url: `${BASE_URL}/levels/${ind + 1}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      //easier levels have higher priority
      priority: LevelsByOrder.length / (LevelsByOrder.length + ind),
    })),
  ];
}
