import "@fontsource/ubuntu/300.css";
import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";

import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme";
// import Hero from "./components/hero/Hero";
import Footer from "./components/footer/Footer";
import Timeline from "./components/timeline/Timeline";
import Navbar from "./components/navbar/Navbar";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Navbar />
    {/* <Hero /> */}
    <Timeline />
    <Footer />
  </ChakraProvider>
);
