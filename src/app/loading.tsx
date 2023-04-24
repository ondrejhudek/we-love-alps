"use client";

import { SimpleGrid, Skeleton, useColorModeValue } from "@chakra-ui/react";

const COLORS = ["orange", "purple", "pink"];

const LoadinItem = ({ color }: { color: string }) => {
  const startColor = useColorModeValue(
    `var(--chakra-colors-${color}-200)`,
    `var(--chakra-colors-${color}-300)`
  );
  const endColor = useColorModeValue(
    `var(--chakra-colors-${color}-400)`,
    `var(--chakra-colors-${color}-500)`
  );

  return (
    <Skeleton
      width="100%"
      height="141px"
      startColor={startColor}
      endColor={endColor}
      borderRadius="md"
    />
  );
};

const Loading = () => (
  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 3, sm: 4, md: 6 }}>
    {COLORS.map((color) => (
      <LoadinItem key={color} color={color} />
    ))}
  </SimpleGrid>
);

export default Loading;
