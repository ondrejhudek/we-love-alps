"use client";

// import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, Box } from "@chakra-ui/react";

import theme from "../theme";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Body = ({ children }: { children: React.ReactNode }) => (
  // <CacheProvider>
  <ChakraProvider theme={theme}>
    <Navbar />
    <Box
      maxW="container.xl"
      mx="auto"
      my={{ base: 4, sm: 6, md: 8 }}
      px={{ base: 4, sm: 5, md: 6, xl: 0 }}
    >
      {children}
    </Box>
    <Footer />
  </ChakraProvider>
  // </CacheProvider>
);

export default Body;
