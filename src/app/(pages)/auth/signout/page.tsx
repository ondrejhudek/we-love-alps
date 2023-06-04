"use client";

import { useSearchParams } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

import { AuthBody } from "@/app/components/Body";
import Logo from "@/app/components/Logo";

const Page = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  return (
    <AuthBody>
      <Flex justify="center">
        <Logo iconOnly />
      </Flex>

      <Heading as="h2" mt={8} fontSize="2xl" textAlign="center">
        Sign out
      </Heading>

      <Text mt={4} mb={6}>
        Are you sure you want to sign out?
      </Text>

      <Box width={{ base: "full", sm: "400px" }}>
        <Card size="lg" borderRadius={10}>
          <CardBody p={{ base: 4, xs: 6, sm: 8 }}>
            <Button
              variant="outline"
              size="lg"
              width="full"
              height={14}
              leftIcon={<HiOutlineArrowRightOnRectangle />}
              fontWeight={500}
              borderRadius={8}
              onClick={() => signOut({ callbackUrl })}
            >
              Sign out
            </Button>
          </CardBody>
        </Card>
      </Box>
    </AuthBody>
  );
};

export default Page;
