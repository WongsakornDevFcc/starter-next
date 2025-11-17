import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      role: string;
    } & DefaultSession["visitor"];

    accessToken: string;
    error?: string;
  }

  interface User extends DefaultUser {
    email: string;
    role: string;
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email: string;
    role: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    error?: string;
  }
}
