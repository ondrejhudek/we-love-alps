"use client";

import type { PropsWithChildren } from "react";
import type { Session } from "next-auth";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { Skeleton } from "@chakra-ui/react";

const ProtectedBody = ({ children }: PropsWithChildren) => {
  const { status } = useSession();

  if (status === "loading" || status === "unauthenticated") {
    return <Skeleton height={300} />;
  }

  return <>{children}</>;
};

const Body = ({
  session,
  children,
}: PropsWithChildren<{ session: Session | null }>) => {
  if (!session) {
    signIn("google");
  }

  return (
    <SessionProvider session={session}>
      <ProtectedBody>{children}</ProtectedBody>
    </SessionProvider>
  );
};

export default Body;
