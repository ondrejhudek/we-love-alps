"use client";

import { usePathname } from "next/navigation";
import { SimpleGrid } from "@chakra-ui/react";

import Header from "../components/Header";
import Card from "../components/CardForMembers";

const Page = () => {
  const pathname = usePathname();

  return (
    <>
      <Header pathname={pathname} />

      <SimpleGrid columns={4} spacing={4}>
        <Card />
        <Card />
        <Card />
        <Card />
      </SimpleGrid>
    </>
  );
};

export default Page;
