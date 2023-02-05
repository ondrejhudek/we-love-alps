import * as React from "react";
import { Heading } from "@chakra-ui/react";

import Breadcrump from "./Breadcrump";
import { NAV_LINKS, NavLinkKey } from "./utils";

const Header = ({
  pathname,
  name,
}: {
  pathname: string | null;
  name?: string;
}) => {
  const linkName = NAV_LINKS[pathname as NavLinkKey];

  return (
    <>
      {pathname && (
        <Breadcrump pathname={pathname} name={linkName} subName={name} />
      )}
      <Heading as="h1" mt={1} mb={{ base: 2, sm: 4, md: 6 }}>
        {name || linkName}
      </Heading>
    </>
  );
};

export default Header;
