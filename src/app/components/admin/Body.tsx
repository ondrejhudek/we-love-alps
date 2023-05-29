"use client";

import type { PropsWithChildren } from "react";
import type { Session } from "next-auth";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

import { AdminBody } from "@/app/components/Body";
import Logo from "@/app/components/Logo";

const SignInWrapper = ({ children }: PropsWithChildren) => (
  <Center height="100vh" flexDirection="column" px={{ base: 4, xs: 6, sm: 0 }}>
    {children}
  </Center>
);

const ProtectedBody = ({ children }: PropsWithChildren) => {
  const { status } = useSession();

  const handleSignIn = () => {
    signIn("google");
  };

  if (status === "loading")
    return (
      <SignInWrapper>
        <Spinner size="xl" />
      </SignInWrapper>
    );

  if (status === "unauthenticated")
    return (
      <SignInWrapper>
        <Logo iconOnly />

        <Heading as="h2" my={8} fontSize="2xl" textAlign="center">
          Sign in to your account
        </Heading>

        <Box width={{ base: "full", sm: "400px" }}>
          <Card size="lg" borderRadius={10}>
            <CardBody p={{ base: 4, xs: 6, sm: 8 }} textAlign="center">
              <Button
                variant="outline"
                size="lg"
                width="full"
                height={14}
                leftIcon={<FcGoogle />}
                fontWeight={500}
                borderRadius={8}
                onClick={handleSignIn}
              >
                Google
              </Button>
            </CardBody>
          </Card>
        </Box>
      </SignInWrapper>
    );

  return <AdminBody>{children}</AdminBody>;
};

const Body = ({
  session,
  children,
}: PropsWithChildren<{ session: Session | null }>) => (
  <SessionProvider session={session}>
    <ProtectedBody>{children}</ProtectedBody>
  </SessionProvider>
);

export default Body;
