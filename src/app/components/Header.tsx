import * as React from "react";
import { Heading } from "@chakra-ui/react";

import Breadcrump from "./Breadcrump";
import { NAV_LINKS, NavLinkKey } from "./utils";

const Header = ({ pathname }: { pathname: string | null }) => {
  const name = NAV_LINKS[pathname as NavLinkKey];

  return (
    <>
      {pathname && <Breadcrump name={name} />}
      <Heading as="h1" mt={1} mb={{ base: 2, sm: 4, md: 6 }}>
        {name}
      </Heading>
    </>
  );
};

export default Header;
