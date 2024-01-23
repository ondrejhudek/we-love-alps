"use client";

import NextLink from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  HiOutlineArrowLeftOnRectangle,
  HiOutlineShieldExclamation,
} from "react-icons/hi2";

import { AuthBody } from "@/app/components/Body";
import Logo from "@/app/components/Logo";

type Error = keyof typeof ERRORS;

const ERRORS = {
  AccessDenied: {
    title: "Access Denied",
    description: ["You do not have permission to sign in."],
  },
  Configuration: {
    title: "Server error",
    description: [
      "There is a problem with the server configuration.",
      "Check the server logs for more information.",
    ],
  },
  Verification: {
    title: "Unable to sign in",
    description: [
      "The sign in link is no longer valid.",
      "It may have been used already or it may have expired.",
    ],
  },
  Default: {
    title: "Default",
    description: ["Something went wrong. Please try again."],
  },
};
const DEFAULT_ERROR: Error = "AccessDenied";

const Content = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") as Error | null;

  const { title, description } =
    ERRORS[error ?? DEFAULT_ERROR] || ERRORS[DEFAULT_ERROR];

  const iconColor = useColorModeValue("red.500", "red.400");

  return (
    <AuthBody>
      <Flex justify="center">
        <Logo iconOnly />
      </Flex>

      <Box width={{ base: "full", sm: "500px" }} mt={8}>
        <Card size="lg" borderRadius={10} position="relative" overflow="hidden">
          <Icon
            as={HiOutlineShieldExclamation}
            color={iconColor}
            boxSize={20}
            position="absolute"
            top={-3}
            left={-3}
            transform="rotate(-15deg)"
            opacity={0.3}
          />

          <CardBody p={{ base: 4, xs: 6, sm: 8 }}>
            <Heading mb={5} as="h2" fontSize="2xl" textAlign="center">
              {title}
            </Heading>

            {description.map((text) => (
              <Text key={text} mt={4} textAlign="center">
                {text}
              </Text>
            ))}

            <Button
              as={NextLink}
              href="/auth/signin"
              variant="outline"
              size="lg"
              width="full"
              height={14}
              mt={8}
              fontWeight={500}
              borderRadius={8}
              leftIcon={<HiOutlineArrowLeftOnRectangle />}
            >
              Sign in
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
