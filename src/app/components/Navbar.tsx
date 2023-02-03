import NextLink from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Box,
  Flex,
  Link,
  IconButton,
  Stack,
  Show,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import { NAV_LINKS, NAV_LINK_KEYS, NavLinkKey } from "./utils";

const NavLink = ({ link, i }: { link: NavLinkKey; i: number }) => {
  const pathname = usePathname();

  return (
    <Link
      as={NextLink}
      href={link}
      display="block"
      mx={4}
      my={2}
      py={5}
      color={pathname === link ? "gray.800" : "gray.600"}
      fontWeight="medium"
      borderBottomWidth={2}
      borderStyle="solid"
      borderColor={pathname === link ? "primary.600" : "transparent"}
      _hover={{
        color: "gray.900",
        borderColor: "primary.500",
      }}
    >
      {NAV_LINKS[link]}
    </Link>
  );
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} px={4} boxShadow="md">
      <Flex
        align="center"
        justify="space-between"
        maxW="container.xl"
        mx="auto"
      >
        {/* Logo */}
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

        {/* Desktop */}
        <Flex
          display={{ base: "none", md: "flex" }}
          h={16}
          justify="center"
          alignItems="center"
        >
          {NAV_LINK_KEYS.map((link, i) => (
            <NavLink key={link} link={link} i={i} />
          ))}
        </Flex>

        {/* Mobile */}
        <Flex
          display={{ base: "flex", md: "none" }}
          h={16}
          justify="flex-end"
          alignItems="center"
        >
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Otevřít"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>
      </Flex>

      {/* Mobile nav */}
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {NAV_LINK_KEYS.map((link, i) => (
              <NavLink key={link} link={link} i={i} />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};
export default Navbar;
