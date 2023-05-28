"use client";

import type { PropsWithChildren } from "react";
// import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, Box } from "@chakra-ui/react";

import Toast from "@/app/components/Toast";
import theme from "../theme";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Body = ({ children }: PropsWithChildren) => (
  // <CacheProvider>
  <ChakraProvider
    theme={theme}
    toastOptions={{
      defaultOptions: {
        duration: 6000,
        isClosable: true,
        position: "top-right",
        render: Toast,
      },
    }}
  >
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
