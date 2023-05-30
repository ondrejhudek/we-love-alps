import type { PropsWithChildren } from "react";

import { PublicBody } from "@/app/components/Body";

const Layout = ({ children }: PropsWithChildren) => (
  <PublicBody>{children}</PublicBody>
);

export default Layout;
