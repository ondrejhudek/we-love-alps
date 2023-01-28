import * as React from "react";
import { Flex, Image } from "@chakra-ui/react";

const Hero = () => (
  <Flex justify="center" bg="tertiary.100" py={10}>
    <Image src="images/hero.png" alt="We love Alps" maxW="lg" />
  </Flex>
);

export default Hero;
