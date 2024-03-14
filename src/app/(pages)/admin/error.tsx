"use client";

import Link from "next/link";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
} from "@chakra-ui/react";

const ErrorComponent = () => (
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

    <Button as={Link} href="/admin" variant="outline" colorScheme="red" mt={5}>
      Zpět na úvod
    </Button>
  </Alert>
);

export default ErrorComponent;
