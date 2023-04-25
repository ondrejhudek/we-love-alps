import NextLink from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import {
  Box,
  Divider,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Link,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import { NAV_LINKS, NAV_LINK_KEYS } from "@/app/utils";
import { NavLinkKey } from "@/app/utils/types";
import ColorModeSwitcher from "./ColorModeSwitcher";
import Logo from "./Logo";

const isActiveLink = (link: NavLinkKey, segments: string[]) => {
  const activeLink = `/${segments[1] || ""}`;
  return link === activeLink;
};

const NavLink = ({ link }: { link: NavLinkKey }) => {
  const segments = useSelectedLayoutSegments();
  const isActive = isActiveLink(link, segments);

  const color = useColorModeValue("gray.600", "gray.300");
  const activeColor = useColorModeValue("gray.800", "gray.50");
  const hoverColor = useColorModeValue("gray.900", "white");
  const activeBorderColor = useColorModeValue("primary.600", "primary.300");
  const hoverBorderColor = useColorModeValue("primary.500", "primary.400");

  return (
    <Link
      as={NextLink}
      href={link}
      display="block"
      mx={4}
      my={2}
      py={5}
      color={isActive ? activeColor : color}
      fontWeight={500}
      borderBottomWidth={2}
      borderStyle="solid"
      borderColor={isActive ? activeBorderColor : "transparent"}
      _hover={{
        color: hoverColor,
        borderColor: hoverBorderColor,
      }}
    >
      {NAV_LINKS[link]}
    </Link>
  );
};

const MobileNavLink = ({
  link,
  onClose,
}: {
  link: NavLinkKey;
  onClose: () => void;
}) => {
  const segments = useSelectedLayoutSegments();
  const isActive = isActiveLink(link, segments);

  const color = useColorModeValue("gray.600", "gray.300");
  const activeColor = useColorModeValue("gray.800", "gray.50");
  const hoverColor = useColorModeValue("gray.900", "white");
  const activeBorderColor = useColorModeValue("primary.600", "primary.300");
  const hoverBorderColor = useColorModeValue("primary.500", "primary.400");

  return (
    <Link
      role="group"
      as={NextLink}
      href={link}
      position="relative"
      display="block"
      mx={-4}
      py={4}
      px={6}
      color={isActive ? activeColor : color}
      fontWeight={500}
      onClick={onClose}
      _hover={{
        color: hoverColor,
        _before: {
          borderColor: hoverBorderColor,
        },
      }}
      _before={{
        content: '""',
        position: "absolute",
        left: 0,
        height: "24px",
        borderLeftWidth: 3,
        borderStyle: "solid",
        borderColor: isActive ? activeBorderColor : "transparent",
      }}
    >
      {NAV_LINKS[link]}
    </Link>
  );
};

const MobileNavbar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => (
  <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
    <DrawerOverlay backdropFilter="blur(5px)" />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>
        <Logo iconOnly />
      </DrawerHeader>

      <>
        {NAV_LINK_KEYS.map((link, i) => (
          <Box key={link} px={4}>
            {i > 0 && <Divider />}
            <MobileNavLink link={link} onClose={onClose} />
          </Box>
        ))}
      </>
    </DrawerContent>
  </Drawer>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue("white", "gray.900")} px={4} boxShadow="md">
      <Flex
        align="center"
        justify="space-between"
        maxW="container.xl"
        mx="auto"
      >
        {/* Logo */}
        <Logo />

        {/* Desktop */}
        <Flex alignItems="center">
          <Flex
            display={{ base: "none", md: "flex" }}
            h={16}
            justify="center"
            alignItems="center"
          >
            {NAV_LINK_KEYS.map((link) => (
              <NavLink key={link} link={link} />
            ))}
          </Flex>

          {/* Color mode switcher */}
          <ColorModeSwitcher />

          {/* Mobile hamburger icon button */}
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
      </Flex>

      {/* Mobile navbar */}
      <MobileNavbar isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
export default Navbar;
