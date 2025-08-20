// lib/server-auth.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const auth = () => getServerSession(authOptions);

export async function getSession() {
  return await getServerSession(authOptions);
}
