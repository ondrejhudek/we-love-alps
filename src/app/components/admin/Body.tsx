"use client";

import type { PropsWithChildren } from "react";
import type { Session } from "next-auth";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { Skeleton } from "@chakra-ui/react";

import { AdminBody } from "@/app/components/Body";

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
      <AdminBody>
        <ProtectedBody>{children}</ProtectedBody>
      </AdminBody>
    </SessionProvider>
  );
};

export default Body;
