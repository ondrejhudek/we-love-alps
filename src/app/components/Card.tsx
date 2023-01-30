import { Box, useColorModeValue } from "@chakra-ui/react";

const Card = ({ children }: { children: React.ReactNode }) => (
  <Box
    p={6}
    bg={useColorModeValue("white", "gray.900")}
    rounded="lg"
    borderWidth={1}
    borderStyle="solid"
    borderColor="gray.100"
    boxShadow="xl"
  >
    {children}
  </Box>
);

export default Card;
