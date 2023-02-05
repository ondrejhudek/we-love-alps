import NextLink from "next/link";
import Image from "next/image";
import { Box, Show } from "@chakra-ui/react";

const LogoWithTitle = () => (
  <Image
    src="/images/logo-navbar.png"
    alt="We love Alps"
    width={246}
    height={28}
    priority
  />
);
const LogoIcon = () => (
  <Image
    src="/images/logo-icon.png"
    alt="We love Alps"
    width={48}
    height={28}
    priority
  />
);

const Logo = ({ iconOnly }: { iconOnly?: boolean }) => {
  if (iconOnly) return <LogoIcon />;

  return (
    <Box mr={4}>
      <NextLink href="/">
        <Show above="xs">
          <LogoWithTitle />
        </Show>

        <Show below="xs">
          <LogoIcon />
        </Show>
      </NextLink>
    </Box>
  );
};

export default Logo;
