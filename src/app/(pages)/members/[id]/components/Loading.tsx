"use client";

import { Box, Skeleton, useColorModeValue } from "@chakra-ui/react";

const Loading = () => {
  const borderColor = useColorModeValue("gray.300", "gray.700");

  return (
    <>
      <Box borderTopWidth={4} borderStyle="solid" borderColor={borderColor}>
        <Skeleton height="184" />
      </Box>

      <Skeleton height="175" mt={4} />
      <Skeleton height="217" mt={4} />
    </>
  );
};

export default Loading;
