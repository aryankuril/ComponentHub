import { NextAuthOptions } from "next-auth";
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
        if (!credentials) return null;

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
  ],
// ... (rest of your code)

callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.dateCreated = user.dateCreated;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // Add checks to ensure the token properties are not undefined
        if (token.id) {
          session.user.id = token.id;
        }
        if (token.role) {
          session.user.role = token.role;
        }
        if (token.dateCreated) {
          session.user.dateCreated = token.dateCreated;
        }
      }
      return session;
    },
},

// ... (rest of your code)
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};