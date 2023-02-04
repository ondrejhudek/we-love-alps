import NextLink from "next/link";
import Image from "next/image";
import { Box, Show } from "@chakra-ui/react";

const Logo = () => (
  <Box mr={4}>
    <NextLink href="/">
      <Show above="xs">
        <Image
          src="/images/logo-navbar.png"
          alt="We love Alps"
          width={246}
          height={28}
          priority
        />
      </Show>
      <Show below="xs">
        <Image
          src="/images/logo-icon.png"
          alt="We love Alps"
          width={48}
          height={28}
          priority
        />
      </Show>
    </NextLink>
  </Box>
);

export default Logo;
