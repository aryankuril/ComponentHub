// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role: "user" | "admin";
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "user" | "admin";
  }
}
