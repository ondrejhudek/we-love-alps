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
  Hide,
  IconButton,
  Link,
  Show,
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
  // const isActive = isActiveLink(link, segments);

  const hoverBgColor = useColorModeValue("secondary.600", "secondary.700");

  return (
    <Link
      as={NextLink}
      href={link}
      display="block"
      py={5}
      px={7}
      fontWeight={500}
      color="white"
      borderRadius="full"
      transition="background-position 0.1s ease"
      bgGradient={`linear(to-t, ${hoverBgColor} 50%, transparent 50%)`}
      bgSize="100% 200%"
      bgPosition="0 0"
      _hover={{
        textDecoration: "none",
        bgPosition: "0 100%",
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
      mx={4}
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

  const bgColor = useColorModeValue("secondary.700", "secondary.600");
  const hoverBgColor = useColorModeValue("secondary.600", "secondary.700");

  return (
    <Box my={4} mx={{ base: 4, sm: 5, md: 6, xl: 0 }}>
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
          <Hide below="lg">
            <Flex
              justify="center"
              alignItems="center"
              bgColor={bgColor}
              borderRadius="full"
            >
              {NAV_LINK_KEYS.map((link) => (
                <NavLink key={link} link={link} />
              ))}
            </Flex>
          </Hide>

          {/* Color mode switcher */}
          <ColorModeSwitcher />

          {/* Mobile hamburger icon button */}
          <Hide above="lg">
            <Box ml={2} bgColor={bgColor} borderRadius="full">
              <IconButton
                width="auto"
                minWidth="auto"
                height="auto"
                icon={
                  isOpen ? (
                    <CloseIcon display="block" />
                  ) : (
                    <HamburgerIcon display="block" />
                  )
                }
                aria-label="Otevřít"
                p={6}
                color="white"
                lineHeight={1}
                borderRadius="full"
                transition="background-position 0.1s ease"
                bgGradient={`linear(to-t, ${hoverBgColor} 50%, transparent 50%)`}
                bgSize="100% 200%"
                bgPosition="0 0"
                _hover={{
                  textDecoration: "none",
                  bgPosition: "0 100%",
                }}
                onClick={isOpen ? onClose : onOpen}
              />
            </Box>
          </Hide>
        </Flex>
      </Flex>

      {/* Mobile navbar */}
      <MobileNavbar isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
export default Navbar;
