import * as React from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Link,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaHeart, FaArrowUp } from "react-icons/fa";

const BackToTop = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box mb={{ base: 8 }} textAlign="center">
      <Tooltip label="Zpět nahoru" placement="right" aria-label="Zpět nahoru">
        <Button
          role="group"
          variant="outline"
          colorScheme="gray"
          boxSize={12}
          borderRadius="full"
          aria-label="Zpět nahoru"
          onClick={handleClick}
        >
          <Icon
            as={FaArrowUp}
            transition="var(--chakra-transition-primary)"
            _groupHover={{
              transform: "translateY(-2px)",
            }}
          />
        </Button>
      </Tooltip>
    </Box>
  );
};

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
        <Link
          as={NextLink}
          href="/members/hudy"
          color="gray.500"
          fontWeight={600}
          ml="3px"
        >
          @hudy
        </Link>
        . Skol
        <Icon as={FaHeart} color="red.500" ml={1.5} />.
      </Text>
    </Flex>

    <BackToTop />
  </Box>
);

export default Footer;
