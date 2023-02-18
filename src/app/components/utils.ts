export const NAV_LINKS = {
  "/": "Domů",
  "/members": "Členové",
  "/trips": "Zájezdy",
  "/resorts": "Střediska",
  "/photo": "Foto",
  "/video": "Video",
};

export type NavLinkKey = keyof typeof NAV_LINKS;

export const NAV_LINK_KEYS = Object.keys(NAV_LINKS) as NavLinkKey[];

export const MONTHS = ["Leden", "Únor", "Březen", "Duben"];

export const TRIP_CS: Record<number, string> = {
  1: "zájezd",
  2: "zájezdy",
  3: "zájezdy",
  4: "zájezdy",
  5: "zájezdů",
};

export const RESORT_CS: Record<number, string> = {
  1: "středisko",
  2: "střediska",
  3: "střediska",
  4: "střediska",
  5: "středisek",
};
