import {
  Box,
  Flex,
  Link,
  Image,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const LINKS = ["Domů", "Členové", "Destinace", "Foto", "Video"];

const NavLink: React.FC<{ children: React.ReactNode; i: number }> = ({
  children,
  i,
}) => (
  <Link
    display="block"
    mx={4}
    my={2}
    py={5}
    color={i === 0 ? "gray.900" : "gray.600"}
    fontWeight="medium"
    borderBottomWidth={2}
    borderStyle="solid"
    borderColor={i === 0 ? "primary.700" : "transparent"}
    _hover={{
      color: "gray.900",
      borderColor: "primary.500",
    }}
    href="#"
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} px={4} boxShadow="md">
      <Flex
        align="center"
        justify="space-between"
        maxW="container.lg"
        mx="auto"
      >
        {/* Logo */}
        <Image src="images/logo-navbar.png" alt="We love Alps" h={7} mr={4} />

        {/* Desktop */}
        <Flex
          display={{ base: "none", md: "flex" }}
          h={16}
          justify="center"
          alignItems="center"
        >
          {LINKS.map((link, i) => (
            <NavLink key={link} i={i}>
              {link}
            </NavLink>
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
            {LINKS.map((link, i) => (
              <NavLink key={link} i={i}>
                {link}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};
export default Navbar;
