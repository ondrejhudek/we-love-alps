import { PropsWithChildren, useRef } from "react";
import NextLink from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import {
  Box,
  Center,
  Flex,
  IconButton,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HiBars3, HiXMark, HiMoon, HiSun } from "react-icons/hi2";

import { NAV_LINKS, NAV_LINK_KEYS } from "@/app/utils";
import { NavLinkKey } from "@/app/utils/types";
import Logo from "./Logo";

const isActiveLink = (link: NavLinkKey, segments: string[]) => {
  const activeLink = `/${segments[1] || ""}`;
  return link === activeLink;
};

const CircleButton = ({
  ariaText,
  onClick,
  children,
}: PropsWithChildren<{ ariaText: string; onClick: () => void }>) => {
  const bgColor = useColorModeValue("secondary.700", "secondary.600");
  const hoverBgColor = useColorModeValue("secondary.600", "secondary.700");

  return (
    <Box ml={2} bgColor={bgColor} borderRadius="full">
      <Flex
        justify="center"
        align="center"
        boxSize={16}
        color="gray.100"
        fontSize="xl"
        borderRadius="full"
        transition="background-position 0.1s ease"
        bgGradient={`linear(to-t, ${hoverBgColor} 50%, transparent 50%)`}
        bgSize="100% 200%"
        bgPosition="0 0"
        cursor="pointer"
        aria-label={ariaText}
        _hover={{
          textDecoration: "none",
          color: "white",
          bgPosition: "0 100%",
        }}
        onClick={onClick}
      >
        {children}
      </Flex>
    </Box>
  );
};

const ColorModeSwitcher = () => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("tmavý", "světlý");
  const SwitchIcon = useColorModeValue(HiMoon, HiSun);

  return (
    <CircleButton
      ariaText={`Přepnout na ${text} mód`}
      onClick={toggleColorMode}
    >
      <SwitchIcon />
    </CircleButton>
  );
};

const NavLink = ({ link }: { link: NavLinkKey }) => {
  const segments = useSelectedLayoutSegments();
  const isActive = isActiveLink(link, segments);

  const hoverBgColor = useColorModeValue("secondary.600", "secondary.700");

  return (
    <Link
      as={NextLink}
      href={link}
      display="block"
      py={5}
      px={7}
      fontWeight={500}
      color={isActive ? "white" : "gray.100"}
      borderRadius="full"
      transition="background-position 0.1s ease"
      bgGradient={`linear(to-t, ${hoverBgColor} 50%, transparent 50%)`}
      bgSize="100% 200%"
      bgPosition="0 0"
      _hover={{
        textDecoration: "none",
        color: "white",
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
  const activeColor = useColorModeValue("gray.800", "gray.100");
  const hoverColor = useColorModeValue("gray.900", "white");
  const hoverBgColor = useColorModeValue("gray.300", "gray.800");

  return (
    <Link
      as={NextLink}
      href={link}
      display="block"
      my={1}
      py={6}
      px={16}
      color={isActive ? activeColor : color}
      fontSize="lg"
      fontWeight={500}
      textAlign="center"
      borderRadius="full"
      onClick={onClose}
      _hover={{
        color: hoverColor,
        bgColor: hoverBgColor,
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
}) => {
  const initialRef = useRef(null);
  return (
    <Modal
      isOpen={isOpen}
      size="full"
      initialFocusRef={initialRef}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <IconButton
          icon={<HiXMark />}
          position="absolute"
          top={0}
          right={0}
          margin={4}
          variant="ghost"
          size="lg"
          fontSize="3xl"
          boxSize={16}
          borderRadius="full"
          ref={initialRef}
          aria-label="Zavřít menu"
          onClick={onClose}
        />
        <ModalBody p={0}>
          <Center height="100vh">
            <Box>
              {NAV_LINK_KEYS.map((link) => (
                <MobileNavLink key={link} link={link} onClose={onClose} />
              ))}
            </Box>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue("secondary.700", "secondary.600");

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

        <Flex alignItems="center">
          {/* Desktop */}
          <Flex
            display={{ base: "none", lg: "flex" }}
            justify="center"
            alignItems="center"
            bgColor={bgColor}
            borderRadius="full"
          >
            {NAV_LINK_KEYS.map((link) => (
              <NavLink key={link} link={link} />
            ))}
          </Flex>

          {/* Color mode switcher */}
          <ColorModeSwitcher />

          {/* Mobile hamburger icon button */}
          <Box display={{ base: "block", lg: "none" }}>
            <CircleButton
              ariaText="Otevřít menu"
              onClick={isOpen ? onClose : onOpen}
            >
              {isOpen ? (
                <HiXMark display="block" />
              ) : (
                <HiBars3 display="block" />
              )}
            </CircleButton>
          </Box>
        </Flex>
      </Flex>

      {/* Mobile navbar */}
      <MobileNavbar isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
export default Navbar;
