import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
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

  if (!user) return null;

  const isValid = bcrypt.compareSync(
    credentials.password,
    user.password
  );

  if (!isValid) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role ?? "user",
    dateCreated: user.dateCreated, // ✅ REQUIRED
  };
}
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.role = (user as any).role;
      token.dateCreated = (user as any).dateCreated;
    }
    return token;
  },

  async session({ session, token }) {
    if (session.user) {
      session.user.id = token.id as string;
      session.user.role = token.role as "user" | "admin";
      session.user.dateCreated = token.dateCreated as Date | string;
    }
    return session;
  },
},

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};