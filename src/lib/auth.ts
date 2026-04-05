import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "./db";
import { UserModel } from "@/models/Schemas";

export const nextAuthOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Hospital Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@hospital.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error("Auth Error: Missing credentials");
          throw new Error("Missing credentials");
        }

        await dbConnect();
        console.log("Auth Debug: Attempting to find user", credentials.email);
        const user = await UserModel.findOne({ email: credentials.email.toLowerCase().trim() });

        if (!user) {
          console.error("Auth Error: User not found in DB");
          throw new Error("User not found");
        }

        console.log("Auth Debug: Found user, comparing password...");
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.passwordHash || user.password);

        if (!isPasswordCorrect) {
          console.error("Auth Error: Password mismatch");
          throw new Error("Incorrect password");
        }

        console.log("Auth Debug: Success! Redirecting...");
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
