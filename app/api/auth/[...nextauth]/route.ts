import { ServerResErrorProps } from "@/types/error"
import axios from "axios"
import type { AuthOptions } from "next-auth"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "signin",
            name: "Signin",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/authentication/signin`, {
                        email: credentials?.email,
                        password: credentials?.password,
                    });

                    if (res) return res.data
                } catch (error) {
                    const err = error as ServerResErrorProps
                    throw new Error(JSON.stringify({
                        message: err.response.data?.message ,
                    }))
                  
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            return {
                ...session,
                tokens: token["tokens"] as {},
                user: token["user"] as {},
            }
        },
        async jwt({ token, user }) {
            return { ...token, ...user }
        }
    },
    pages: {
        signIn: "/signin",
    }
}


const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
