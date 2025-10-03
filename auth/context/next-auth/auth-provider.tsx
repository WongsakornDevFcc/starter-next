"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function NextAuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider 
      refetchInterval={5 * 60} //session จะหมดอายุใน 5 นาที
      refetchOnWindowFocus={false}
    >
      {children}
    </SessionProvider>
  );
}
