import type { PropsWithChildren } from "react";
import { getServerSession, Session } from "next-auth";

import authOptions from "@/app/api/auth/[...nextauth]/[...nextauth]";
import AdminBody from "@/app/components/admin/Body";

const AdminLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession<{}, Session>(authOptions);

  return <AdminBody session={session}>{children}</AdminBody>;
};

export default AdminLayout;
