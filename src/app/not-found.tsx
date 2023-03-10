"use client";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
} from "@chakra-ui/react";

/**
 * Note: not-found.js currently only renders when triggered by the notFound function, we're working on support for catching unmatched routes.
 * https://beta.nextjs.org/docs/api-reference/file-conventions/not-found
 * TODO: Finish when it's done NextJS.
 */
const NotFound = () => (
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

    <Button variant="outline" colorScheme="red" mt={5}>
      Zkusit znovu
    </Button>
  </Alert>
);

export default NotFound;
