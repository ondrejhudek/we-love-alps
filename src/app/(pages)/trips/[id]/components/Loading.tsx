"use client";

import { Box, Skeleton, useColorModeValue } from "@chakra-ui/react";

const Loading = () => {
  const borderColor = useColorModeValue("gray.300", "gray.700");

  return (
    <Box borderTopWidth={4} borderStyle="solid" borderColor={borderColor}>
      <Skeleton height="136" />
    </Box>
  );
};

export default Loading;
