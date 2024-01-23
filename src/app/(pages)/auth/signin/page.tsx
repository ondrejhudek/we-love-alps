"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Suspense } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

import { AuthBody } from "@/app/components/Body";
import Logo from "@/app/components/Logo";

const OAUTH_ERROR = "Try signing in with a different account.";

const ERRORS = {
  OAuthSignin: OAUTH_ERROR,
  OAuthCallback: OAUTH_ERROR,
  OAuthCreateAccount: OAUTH_ERROR,
  EmailCreateAccount: OAUTH_ERROR,
  Callback: OAUTH_ERROR,
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "The e-mail could not be sent.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  SessionRequired: "Please sign in to access this page.",
  Default: "Unable to sign in.",
};

const Content = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") as keyof typeof ERRORS | null;
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";

  return (
    <AuthBody>
      <Flex justify="center">
        <Logo iconOnly />
      </Flex>

      <Heading as="h2" my={8} fontSize="2xl" textAlign="center">
        Sign in to your account
      </Heading>

      <Box width={{ base: "full", sm: "400px" }}>
        <Card size="lg" borderRadius={10}>
          <CardBody p={{ base: 4, xs: 6, sm: 8 }}>
            {error && (
              <Alert
                status="error"
                variant="left-accent"
                mb={4}
                borderRadius={8}
              >
                <AlertIcon />
                {ERRORS[error] || ERRORS.Default}
              </Alert>
            )}

            <Button
              variant="outline"
              size="lg"
              width="full"
              height={14}
              leftIcon={<FcGoogle />}
              fontWeight={500}
              borderRadius={8}
              onClick={() => signIn("google", { callbackUrl })}
            >
              Google
            </Button>
          </CardBody>
        </Card>
      </Box>
    </AuthBody>
  );
};

const Page = () => (
  <Suspense fallback={<Spinner size="xl" />}>
    <Content />
  </Suspense>
);

export default Page;
