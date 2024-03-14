"use client";

import Link from "next/link";
import {
  AbsoluteCenter,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
} from "@chakra-ui/react";

const Error = () => (
  <Box position="relative" height="100vh">
    <AbsoluteCenter axis="both" width={{ base: "100%", md: "auto" }}>
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        mx={10}
        py={10}
        width={{ md: "2xl" }}
        textAlign="center"
        borderRadius="lg"
      >
        <AlertIcon boxSize="40px" mr={0} />

        <AlertTitle mt={4} mb={1} fontSize="lg">
          Něco se pokazilo!
        </AlertTitle>

        <AlertDescription maxWidth="sm">
          Bohužel se stránka rozbila. Prosím zkus to znovu.
        </AlertDescription>

        <Button as={Link} href="/" variant="outline" colorScheme="red" mt={5}>
          Zpět na úvod
        </Button>
      </Alert>
    </AbsoluteCenter>
  </Box>
);

export default Error;
