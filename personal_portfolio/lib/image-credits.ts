/**
 * Image credits registry.
 *
 * Every image shipped on a slide or page that is not an author-original
 * asset must appear here with a rights statement and canonical
 * attribution string. Spec: docs/_specs/slides/slide-01-02-historical-images.md
 * + docs/_specs/site/03-sources-registry.md §"Image credits registry".
 */
export interface ImageCredit {
  path: string;
  creditLine: string;
  rights: string;
  sourceId?: string;
}

export const imageCredits: readonly ImageCredit[] = [
  {
    path: "/images/historical/easter_1900_no_cars.jpg",
    creditLine:
      "Detroit Publishing Co., Easter crowds on Fifth Avenue, New York, ca. 1903. Library of Congress, Prints and Photographs Division.",
    rights: "Public domain (Library of Congress item 2016803108).",
    sourceId: "locEaster1900",
  },
  {
    path: "/images/historical/easter_1913_no_horses.jpg",
    creditLine:
      "Bain News Service, 5th Ave at 42d St. — Easter, 1913. Library of Congress, Prints and Photographs Division. No known restrictions on publication.",
    rights: 'Library of Congress item 2014691099: "No known restrictions on publication."',
    sourceId: "locEaster1913",
  },
];

export function getImageCredit(path: string): ImageCredit | undefined {
  return imageCredits.find((c) => c.path === path);
}
