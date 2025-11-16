import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    tokens: {
      access: string
      refresh: string
    }
    user: {
      email?: string
      id?: number
      name?: string
      role?: string
      is_active?: boolean
      phone_number?: string
    }
  }
}
