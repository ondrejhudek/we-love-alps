import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiOutlineArrowRightOnRectangle, HiOutlineHome } from "react-icons/hi2";

import Logo from "@/app/components/Logo";
import {
  BG_COLOR,
  CircleButton,
  ColorModeSwitcher,
} from "@/app/components/Navbar";

const User = () => {
  const { status, data: session } = useSession();
  console.log({ session });

  const bgColor = useColorModeValue(BG_COLOR.light, BG_COLOR.dark);
  const nameColor = useColorModeValue("gray.500", "gray.400");

  if (status === "loading" || !session) return null;

  return (
    <Menu>
      <Box
        boxSize={{ base: 14, sm: 16 }}
        p={0.5}
        bgColor={bgColor}
        borderRadius="full"
      >
        <Avatar
          as={MenuButton}
          name={session.user?.name ?? ""}
          src={session.user?.image ?? ""}
          size="full"
          textAlign="center"
          fontSize="4xl"
        />
      </Box>
      <MenuList>
        <MenuGroup title="Signed in as" color={nameColor} fontWeight={500}>
          <Box mt={-1} mb={3} mx={4}>
            <Text lineHeight="short" fontWeight={700}>
              {session.user?.name}
            </Text>
            <Text
              lineHeight="short"
              color={nameColor}
              fontSize="xs"
              fontWeight={300}
            >
              {session.user?.email}
            </Text>
          </Box>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuItem onClick={() => signOut({ callbackUrl: "/" })}>
            <Icon as={HiOutlineArrowRightOnRectangle} mr={2} />
            Sign out
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

const BackButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <CircleButton
      ariaText="Back to website"
      fixedSize={false}
      onClick={handleClick}
      px={6}
    >
      <Flex align="center">
        <Icon as={HiOutlineHome} boxSize={6} />
        <Box ml={4} mr={2}>
          <Text fontSize="md" fontWeight={500} lineHeight="shorter">
            Back to
          </Text>
          <Text fontSize="sm" lineHeight="shorter">
            website
          </Text>
        </Box>
      </Flex>
    </CircleButton>
  );
};

const Navbar = () => (
  <Flex align="center" justify="space-between">
    {/* Logo */}
    <Flex align="center">
      <Logo href="/admin" />
      <Badge
        colorScheme="red"
        mt={1}
        py={0.5}
        px={2}
        fontSize="md"
        fontWeight={500}
        borderRadius={6}
      >
        Admin
      </Badge>
    </Flex>

    <Flex alignItems="center">
      {/* User */}
      <User />

      {/* Back button */}
      <BackButton />

      {/* Color mode switcher */}
      <ColorModeSwitcher />
    </Flex>
  </Flex>
);

export default Navbar;
