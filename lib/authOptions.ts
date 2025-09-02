import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/schemas/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        await dbConnect();
        const user = await User.findOne({ email: credentials.email });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role as "user" | "admin",
    dateCreated: user.dateCreated, // ✅ add this
  };
}

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id!;
        session.user.role = token.role as "user" | "admin";
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
};
