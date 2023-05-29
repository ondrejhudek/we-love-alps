"use client";

import type { PropsWithChildren } from "react";
import type { Session } from "next-auth";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import {
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
  <Center height="100vh" flexDirection="column">
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

        <Heading as="h2" my={8} fontSize="2xl">
          Sign in to your account
        </Heading>

        <Card size="lg" width="400px" borderRadius={10}>
          <CardBody py={8} px={10} textAlign="center">
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
