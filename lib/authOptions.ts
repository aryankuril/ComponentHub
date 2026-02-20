import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/schemas/User";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodbAdapter";

export const authOptions: NextAuthOptions = {
   adapter: MongoDBAdapter(clientPromise),
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
          dateCreated: user.dateCreated,
        };
      }
      return null;
    },
  }),

  // ✅ Google
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),

  // ✅ GitHub
  GitHubProvider({
    clientId: process.env.GITHUB_ID!,
    clientSecret: process.env.GITHUB_SECRET!,
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
