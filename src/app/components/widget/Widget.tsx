"use client";

import type { PropsWithChildren } from "react";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  useColorModeValue,
} from "@chakra-ui/react";

export const WidgetLoading = () => (
  <>
    {[...Array(3)].map((_, i) => (
      <Flex key={`skeleton-${i}`} justify="space-between" align="center">
        <Flex align="center">
          <SkeletonCircle size="10" />
          <Skeleton width={32} height={5} ml={3} />
        </Flex>
        <Skeleton width={6} height={5} mr={1} />
      </Flex>
    ))}
  </>
);

export const WidgetWrapper = ({
  heading,
  children,
}: PropsWithChildren<{ heading: string }>) => {
  const bgColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box>
      <Heading mb={4} size="md">
        {heading}
      </Heading>

      <SimpleGrid
        columns={1}
        spacingY={6}
        p={4}
        bgColor={bgColor}
        borderRadius={16}
      >
        {children}
      </SimpleGrid>
    </Box>
  );
};
