"use client";

import Header from "@/app/components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    {children}
  </>
);

export default Layout;
