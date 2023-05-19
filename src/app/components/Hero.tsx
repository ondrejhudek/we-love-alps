"use client";

import NextImage from "next/image";
import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import SkierImage from "../../../public/images/skier.svg";

const Hero = () => {
  const textGradient = useColorModeValue(
    "linear(to-r, primary.700, primary.600)",
    "linear(to-r, white, gray.200)"
  );

  const headingBg = useColorModeValue("secondary.700", "white");
  const headingColor = useColorModeValue("gray.50", "secondary.900");

  return (
    <Flex my={14} justify="space-between">
      <Box mt={16}>
        <Heading
          as="h1"
          size="4xl"
          display="inline-block"
          px={2}
          py={1}
          fontWeight="bold"
          bg={headingBg}
          color={headingColor}
        >
          Kronika.
        </Heading>

        <Text
          mt={4}
          fontSize="lg"
          maxWidth="xl"
          bgGradient={textGradient}
          bgClip="text"
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Text>
      </Box>

      <Box mb="-120px">
        <NextImage
          src={SkierImage}
          width={500}
          height={500}
          alt="Skier"
          priority
        />
      </Box>
    </Flex>
  );
};

export default Hero;
