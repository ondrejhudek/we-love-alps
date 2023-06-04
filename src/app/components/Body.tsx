"use client";

import type { PropsWithChildren } from "react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
// import { CacheProvider } from "@chakra-ui/next-js";
import {
  ChakraProvider,
  Box,
  BoxProps,
  Card,
  CardBody,
  Center,
} from "@chakra-ui/react";

import theme from "@/app/theme";
import AdminNavbar from "@/app/components/admin/Navbar";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import Toast from "@/app/components/Toast";

const PageWrapper = ({
  maxWidth,
  navbarComponent,
  children,
}: PropsWithChildren<{
  maxWidth: BoxProps["maxWidth"];
  navbarComponent: React.ReactNode;
}>) => (
  <Box
    maxWidth={maxWidth}
    mx="auto"
    my={4}
    px={{ base: 4, sm: 5, md: 6, xl: 0 }}
  >
    {navbarComponent}
    <Box my={{ base: 4, sm: 6, md: 8 }}>{children}</Box>
    <Footer />
  </Box>
);

export const AuthBody = ({ children }: PropsWithChildren) => (
  <Center
    height="var(--chakra-vh)"
    flexDirection="column"
    mt="-5vh"
    px={{ base: 4, xs: 6, sm: 0 }}
  >
    {children}
  </Center>
);

export const AdminBody = ({
  session,
  children,
}: PropsWithChildren<{ session: Session | null }>) => (
  <SessionProvider session={session}>
    <PageWrapper maxWidth="container.2xl" navbarComponent={<AdminNavbar />}>
      <Card borderRadius={10}>
        <CardBody>{children}</CardBody>
      </Card>
    </PageWrapper>
  </SessionProvider>
);

export const PublicBody = ({ children }: PropsWithChildren) => (
  <PageWrapper maxWidth="container.xl" navbarComponent={<Navbar />}>
    {children}
  </PageWrapper>
);

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
    {children}
  </ChakraProvider>
  // </CacheProvider>
);

export default Body;
