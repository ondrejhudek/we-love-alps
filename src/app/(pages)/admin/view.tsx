"use client";

import { signOut, useSession } from "next-auth/react";
import { Button, Code } from "@chakra-ui/react";

const View = () => {
  const { data: session } = useSession();

  return (
    <>
      <Code
        colorScheme="secondary"
        display="block"
        whiteSpace="pre"
        p={10}
        mb={4}
      >
        {JSON.stringify(session, null, 2)}
      </Code>

      {/* Sign out */}
      <Button
        colorScheme="secondary"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign out
      </Button>
    </>
  );
};

export default View;
