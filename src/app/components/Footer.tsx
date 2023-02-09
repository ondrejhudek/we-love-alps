import * as React from "react";
import {
  Box,
  Flex,
  Text,
  Divider,
  Link,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

const Footer = () => (
  <Box
    mt={10}
    mb={2}
    px={{ base: 4, md: 0 }}
    marginInlineStart="auto"
    marginInlineEnd="auto"
    maxW="container.xl"
  >
    <Divider />
    <Flex justify="center">
      <Text
        display="flex"
        alignItems="center"
        my={5}
        textAlign="center"
        fontSize="sm"
        color={useColorModeValue("gray.700", "gray.300")}
      >
        © 2023 S láskou vytvořil{" "}
        <Link href="/members/hudy" color="gray.500" fontWeight={600} ml="3px">
          @hudy
        </Link>
        . Skol <Icon as={FaHeart} color="red.500" ml={1} />.
      </Text>
    </Flex>
  </Box>
);

export default Footer;
