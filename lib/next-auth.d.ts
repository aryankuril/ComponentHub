// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role: "user" | "admin";
    dateCreated: Date | string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      role: "user" | "admin";
      dateCreated: Date | string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "user" | "admin";
    dateCreated?: Date | string; // ✅ ADD THIS
  }
}