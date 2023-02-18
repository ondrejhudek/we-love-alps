"use client";

import { usePathname } from "next/navigation";

import Header from "@/app/components/Header";

const Page = () => {
  const pathname = usePathname();

  return (
    <>
      <Header pathname={pathname} />
    </>
  );
};

export default Page;
