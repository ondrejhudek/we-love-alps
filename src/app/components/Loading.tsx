"use client";

import { Box, Flex, Skeleton, useColorModeValue } from "@chakra-ui/react";

const Loading = () => (
  <Box my={{ base: 4, sm: 6, md: 8 }}>
    {/* Breadcrump */}
    <Flex>
      <Skeleton width="40px" height={4} />
      <Skeleton width="12px" height={4} mx={2} />
      <Skeleton width="60px" height={4} />
    </Flex>

    {/* Heading */}
    <Box mt={2.5} mb={{ base: 2, sm: 4, md: 6 }}>
      <Skeleton
        width={180}
        maxWidth="100%"
        height={{ base: "36px", sm: "40px" }}
      />
    </Box>

    {/* Body */}
    <Box bg={useColorModeValue("white", "gray.900")} boxShadow="md">
      <Skeleton width="100%" height={300} />
    </Box>
  </Box>
);

export default Loading;
