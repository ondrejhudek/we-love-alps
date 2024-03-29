import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    signIn: async ({ profile }) => profile?.email === process.env.ADMIN_EMAIL,
  },
  pages: {
    error: "/auth/error",
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
};

export default NextAuth(authOptions);
