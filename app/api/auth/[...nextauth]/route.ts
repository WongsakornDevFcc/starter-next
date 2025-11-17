import type { AuthOptions, Session, User } from "next-auth"
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"

interface LoginResponse {
    tokens: {
        access: string;
        refresh: string;
    };
    user: {
        email: string;
        role: string;
    };
    message?: string;
}

interface RefreshResponse {
    tokens: {
        access: string;
    };
}

function decodeJwtExpire(jwt: string): number {
    const payload = JSON.parse(Buffer.from(jwt.split(".")[1], "base64").toString());
    return payload.exp * 1000; // seconds → ms payload.exp is in seconds to milliseconds to map with Date.now()
}

async function refreshAccessToken(token: JWT) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/authentication/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: token.refreshToken })
        });

        const data: RefreshResponse = await res.json();

        if (!data.tokens?.access) {
            return { ...token, error: "RefreshAccessTokenError" };
        }

        const newAccess = data.tokens.access;

        return {
            ...token,
            accessToken: newAccess,
            accessTokenExpires: decodeJwtExpire(newAccess),
        };

    } catch (err: unknown) {
        return { ...token, error: "RefreshAccessTokenError", err: err as Error };
    }
}

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Custom Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/authentication/signin`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(credentials)
                });

                const data: LoginResponse = await res.json();

                if (!res.ok) throw new Error(data.message || "Invalid email or password");

                if (!data?.tokens?.access) return null;

                return {
                    id: data.user.email,
                    email: data.user.email,
                    role: data.user.role,
                    accessToken: data.tokens.access,
                    refreshToken: data.tokens.refresh,
                };
            },
        }),
    ],

    callbacks: {
        async jwt({
            token,
            user
        }: {
            token: JWT;
            user?: User;
        }): Promise<JWT> {
            if (user) {
                return {
                    email: user.email,
                    role: user.role,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    accessTokenExpires: decodeJwtExpire(user.accessToken)
                };
            }

            if (Date.now() < token.accessTokenExpires) {
                return token;
            }

            return await refreshAccessToken(token);
        },

        async session({
            session,
            token
        }: {
            session: Session;
            token: JWT;
        }): Promise<Session> {
            session.user = {
                email: token.email,
                role: token.role
            };

            session.accessToken = token.accessToken;
            session.error = token.error;

            return session;
        }
    },
    pages: {
        signIn: "/signin",
    }
};



const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
