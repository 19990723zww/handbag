import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { locales } from "@/dictionaries";

export const dynamic = "force-static";

const paths = ["", "/san-pham", "/quy-trinh", "/gioi-thieu", "/lien-he"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((lang) =>
    paths.map((path) => ({
      url: `${site.domain}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l === "zh" ? "zh-Hans" : l, `${site.domain}/${l}${path}`])
        ),
      },
    }))
  );
}
