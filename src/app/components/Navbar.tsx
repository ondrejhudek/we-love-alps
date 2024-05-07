import { type PropsWithChildren, useRef } from "react";
import NextLink from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import {
  Box,
  Center,
  Flex,
  FlexProps,
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

import Logo from "@/app/components/Logo";
import { NAV_LINKS, NAV_LINK_KEYS } from "@/app/utils";
import { NavLinkKey } from "@/app/utils/types";

export const BG_COLOR = {
  light: "secondary.600",
  dark: "secondary.700",
};

export const HOVER_BG_COLOR = {
  light: "secondary.700",
  dark: "secondary.600",
};

export const CircleButton = ({
  ariaText,
  fixedSize = true,
  onClick,
  children,
  ...flexProps
}: PropsWithChildren<
  {
    ariaText: string;
    fixedSize?: boolean;
    onClick: () => void;
  } & FlexProps
>) => {
  const bgColor = useColorModeValue(BG_COLOR.light, BG_COLOR.dark);
  const hoverBgColor = useColorModeValue(
    HOVER_BG_COLOR.light,
    HOVER_BG_COLOR.dark
  );

  return (
    <Box ml={2} bgColor={bgColor} borderRadius="full">
      <Flex
        justify="center"
        align="center"
        boxSize={fixedSize ? { base: 14, sm: 16 } : undefined}
        height={fixedSize ? undefined : { base: 14, sm: 16 }}
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
        {...flexProps}
      >
        {children}
      </Flex>
    </Box>
  );
};

export const ColorModeSwitcher = () => {
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
  const segment = useSelectedLayoutSegment();
  const isActive = link === `/${segment || ""}`;

  const hoverBgColor = useColorModeValue(
    HOVER_BG_COLOR.light,
    HOVER_BG_COLOR.dark
  );

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
      bgPosition={isActive ? "0 100%" : "0 0"}
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
  const segment = useSelectedLayoutSegment();
  const isActive = link === `/${segment || ""}`;

  const color = useColorModeValue("gray.600", "gray.300");
  const activeColor = useColorModeValue("gray.800", "gray.100");
  const bgColor = useColorModeValue("gray.200", "gray.800");
  const hoverColor = useColorModeValue("gray.900", "white");
  const hoverBgColor = useColorModeValue("gray.300", "gray.900");
  const borderColor = useColorModeValue("secondary.700", "secondary.600");
  const hoverBorderBgColor = useColorModeValue(
    "secondary.600",
    "secondary.700"
  );

  return (
    <Link
      as={NextLink}
      href={link}
      display="block"
      my={3}
      py={5}
      px={20}
      color={isActive ? activeColor : color}
      bgColor={bgColor}
      fontSize="lg"
      fontWeight={500}
      textAlign="center"
      borderRadius="full"
      onClick={onClose}
      borderStyle="solid"
      borderLeftWidth={4}
      borderColor={borderColor}
      _hover={{
        color: hoverColor,
        bgColor: hoverBgColor,
        borderColor: hoverBorderBgColor,
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
        <Flex
          justify="space-between"
          align="center"
          width="full"
          position="absolute"
          top={0}
          p={4}
        >
          <Box ml={2}>
            <Logo iconOnly />
          </Box>
          <IconButton
            icon={<HiXMark />}
            variant="ghost"
            size="lg"
            fontSize="3xl"
            boxSize={16}
            borderRadius="full"
            ref={initialRef}
            aria-label="Zavřít menu"
            onClick={onClose}
          />
        </Flex>

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

  const bgColor = useColorModeValue(BG_COLOR.light, BG_COLOR.dark);

  return (
    <>
      <Flex align="center" justify="space-between">
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
    </>
  );
};
export default Navbar;
