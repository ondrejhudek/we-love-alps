"use client";

import { usePathname } from "next/navigation";
import { Heading } from "@chakra-ui/react";

import Header from "../components/Header";

const Page = () => {
  const pathname = usePathname();

  return (
    <>
      <Header pathname={pathname} />
    </>
  );
};

export default Page;
