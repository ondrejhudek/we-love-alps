"use client";

import { Ubuntu } from "@next/font/google";
import { ChakraProvider, Box } from "@chakra-ui/react";

import theme from "./theme";
import AnalyticsWrapper from "./components/Analytics";
import Footer from "./components/Footer";
import Timeline from "./components/Timeline";
import Navbar from "./components/Navbar";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  display: "auto",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className={`${ubuntu.variable}`}>
    <head />
    <body>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Box
          maxW="container.lg"
          mx="auto"
          my={{ base: 4, sm: 6, md: 8 }}
          px={{ base: 2, sm: 4, md: 6, lg: 0 }}
        >
          {children}
        </Box>
        <Footer />
      </ChakraProvider>
    </body>
    <AnalyticsWrapper />
  </html>
);

export default RootLayout;
