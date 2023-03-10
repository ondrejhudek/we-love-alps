import { NAV_LINKS_CS } from "./locales";

export const NAV_LINKS = {
  "/": NAV_LINKS_CS.home,
  "/members": NAV_LINKS_CS.members,
  "/trips": NAV_LINKS_CS.trips,
  "/resorts": NAV_LINKS_CS.resorts,
  "/photo": NAV_LINKS_CS.photo,
  "/video": NAV_LINKS_CS.video,
};

export type LINK = {
  path: string;
  label: string;
};

export type NavLinkKey = keyof typeof NAV_LINKS;

export const NAV_LINK_KEYS = Object.keys(NAV_LINKS) as NavLinkKey[];

export const getImagePath = (id: string, src: string) =>
  `/images/gallery/${id}/${src}`;
