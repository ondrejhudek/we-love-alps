"use client";

import {
  AspectRatio,
  Box,
  Card,
  CardBody,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";

const Loading = () => (
  <Card>
    <CardBody p={3}>
      <SimpleGrid columns={{ base: 1, xs: 2, sm: 3, md: 4 }} spacing="5px">
        {[...Array(12)].map((_, i) => (
          <Box key={`skeleton-${i}`}>
            <AspectRatio ratio={4 / 3}>
              <Skeleton borderRadius="none" />
            </AspectRatio>
          </Box>
        ))}
      </SimpleGrid>
    </CardBody>
  </Card>
);

export default Loading;
