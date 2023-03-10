"use client";

import {
  AspectRatio,
  Box,
  Card,
  CardBody,
  SimpleGrid,
  Skeleton,
  useBreakpointValue,
} from "@chakra-ui/react";

const Loading = () => {
  const size = useBreakpointValue({ base: 4, xs: 6, sm: 6, md: 8, lg: 10 });
  console.log("Loading size", size);

  return (
    <Card>
      <CardBody p={3}>
        <SimpleGrid
          columns={{ base: 1, xs: 2, sm: 3, md: 4, lg: 5 }}
          spacing="5px"
        >
          {[...Array(size)].map((_, i) => (
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
};

export default Loading;
