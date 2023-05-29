"use client";

import type { PropsWithChildren } from "react";
import type { Session } from "next-auth";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { Button, Center, Skeleton } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

import { AdminBody } from "@/app/components/Body";

const ProtectedBody = ({ children }: PropsWithChildren) => {
  const { status } = useSession();

  // const handleSignIn = () => {
  //   signIn("google");
  // };

  if (status === "loading") return <Skeleton height={300} />;

  if (status === "unauthenticated") {
    signIn("google");

    return <Skeleton height={300} />;
  }
  // return (
  //   <Center>
  //     <Button
  //       variant="outline"
  //       size="lg"
  //       leftIcon={<FcGoogle />}
  //       fontWeight={500}
  //       onClick={handleSignIn}
  //     >
  //       Sign in with Google
  //     </Button>
  //   </Center>
  // );

  return <>{children}</>;
};

const Body = ({
  session,
  children,
}: PropsWithChildren<{ session: Session | null }>) => (
  <SessionProvider session={session}>
    <AdminBody>
      <ProtectedBody>{children}</ProtectedBody>
    </AdminBody>
  </SessionProvider>
);

export default Body;
