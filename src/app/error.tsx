"use client";

import { useEffect } from "react";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Icon,
} from "@chakra-ui/react";

import { FaSync } from "react-icons/fa";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    // TODO: Log it to Vercel.
    console.error(error);
  }, [error]);

  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      py={10}
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

      <Button
        variant="outline"
        colorScheme="red"
        mt={5}
        leftIcon={<Icon as={FaSync} fontSize="xs" />}
        onClick={() => reset()}
      >
        Zkusit znovu
      </Button>
    </Alert>
  );
};

export default Error;
