"use client";

import { Box } from "@chakra-ui/react";

import Header from "@/app/components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <Box>
    <Header />
    {children}
  </Box>
);

export default Layout;
