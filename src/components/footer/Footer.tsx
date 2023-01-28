import * as React from "react";
import { Box, Flex, Text, Divider, Link, Icon } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

const Footer = () => (
  <Box
    mt={10}
    mb={2}
    marginInlineStart="auto"
    marginInlineEnd="auto"
    maxW="container.lg"
  >
    <Divider />
    <Flex justify="center">
      <Text
        display="flex"
        alignItems="center"
        my={5}
        textAlign="center"
        fontSize="sm"
        color="gray.700"
      >
        S láskou vytvořil{" "}
        <Link
          href="mailto:ondrej.hudek@gmail.com"
          color="tertiary.400"
          fontWeight={600}
          ml="3px"
        >
          @hudy
        </Link>
        . Skol <Icon as={FaHeart} color="red.500" ml={1} />.
      </Text>
    </Flex>
  </Box>
);

export default Footer;
