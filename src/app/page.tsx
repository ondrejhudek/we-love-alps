"use client";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme";
import Footer from "../components/footer/Footer";
import Timeline from "../components/timeline/Timeline";
import Navbar from "../components/navbar/Navbar";

const Page = () => (
  <ChakraProvider theme={theme}>
    <Navbar />
    <Timeline />
    <Footer />
  </ChakraProvider>
);

export default Page;
