"use client";

import { usePathname } from "next/navigation";
import { Heading } from "@chakra-ui/react";

import { NAV_LINKS, LINK, NavLinkKey } from "@/app/utils";
import Breadcrump from "./Breadcrump";

import MEMBERS from "@/data/members";
import RESORTS from "@/data/resorts";
import TRIPS from "@/data/trips";

const findMember = (pathname: string) => {
  const member = MEMBERS.find((member) => member.id === pathname.substring(1));
  return member?.name || "Not found";
};

const findResort = (pathname: string) => {
  const resort = RESORTS.find((resort) => resort.id === pathname.substring(1));
  return resort?.name || "Not found";
};

const findTrip = (pathname: string) => {
  const trip = TRIPS.find((trip) => trip.id === pathname.substring(1));
  return trip?.title || "Not found";
};

const getLabel = (firstLevel: NavLinkKey, secondLevel: string) => {
  switch (firstLevel) {
    case "/members":
      return findMember(secondLevel);
    case "/resorts":
      return findResort(secondLevel);
    case "/trips":
    case "/photo":
      return findTrip(secondLevel);
    default:
      return "";
  }
};

const Header = () => {
  const pathname = usePathname();
  const pathnameParts = pathname
    .split("/")
    .filter(String)
    .map((part) => `/${part}` as NavLinkKey);
  const links: LINK[] = pathnameParts.map((path, i) => {
    return {
      path,
      label: i === 0 ? NAV_LINKS[path] : getLabel(pathnameParts[0], path),
    };
  });

  return (
    <>
      {/* Breadcrump */}
      <Breadcrump links={links} />

      {/* Heading */}
      <Heading as="h1" mt={1} mb={{ base: 2, sm: 4, md: 6 }}>
        {links[links.length - 1].label}
      </Heading>
    </>
  );
};

export default Header;
