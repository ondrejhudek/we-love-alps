export const NAV_LINKS = {
  "/": "Domů",
  "/members": "Členové",
  "/resorts": "Resorty",
  "/photo": "Foto",
  "/video": "Video",
};

export type NavLinkKey = keyof typeof NAV_LINKS;

export const NAV_LINK_KEYS = Object.keys(NAV_LINKS) as NavLinkKey[];
