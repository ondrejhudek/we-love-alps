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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Divider,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import ColorModeSwitcher from "./ColorModeSwitcher";
import Logo from "./Logo";
import { NAV_LINKS, NAV_LINK_KEYS, NavLinkKey } from "./utils";

const NavLink = ({ link }: { link: NavLinkKey }) => {
  const pathname = usePathname();
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
      color={pathname === link ? activeColor : color}
      fontWeight="medium"
      borderBottomWidth={2}
      borderStyle="solid"
      borderColor={pathname === link ? activeBorderColor : "transparent"}
      _hover={{
        color: hoverColor,
        borderColor: hoverBorderColor,
      }}
    >
      {NAV_LINKS[link]}
    </Link>
  );
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();

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
      </Flex>

      {/* Mobile nav */}
      <Modal
        onClose={onClose}
        size="full"
        isOpen={isOpen}
        motionPreset="slideInRight"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Logo />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {NAV_LINK_KEYS.map((link, i) => (
              <Box key={link}>
                {i > 0 && <Divider />}
                <Button
                  as={NextLink}
                  href={link}
                  width="100%"
                  variant={pathname === link ? "solid" : "ghost"}
                  colorScheme="gray"
                  my={1}
                  py={6}
                  onClick={onClose}
                >
                  {NAV_LINKS[link]}
                </Button>
              </Box>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default Navbar;
