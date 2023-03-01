"use client";

import { usePathname } from "next/navigation";
import { Heading } from "@chakra-ui/react";

import { NAV_LINKS, NavLinkKey } from "@/app/utils";
import Breadcrump from "./Breadcrump";

const Header = ({ name }: { name?: string }) => {
  const pathname = usePathname();

  const firstLevelPathname = `/${pathname?.split("/")[1]}`;
  const linkName = NAV_LINKS[firstLevelPathname as NavLinkKey];

  return (
    <>
      {pathname && (
        <Breadcrump
          pathname={firstLevelPathname}
          name={linkName}
          subName={name}
        />
      )}
      <Heading as="h1" mt={1} mb={{ base: 2, sm: 4, md: 6 }}>
        {name || linkName}
      </Heading>
    </>
  );
};

export default Header;
