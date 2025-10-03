"use client";

import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";

interface ClientProvidersProps {
  children: ReactNode;
}

export default function NotistackProvider({ children }: ClientProvidersProps) {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {children}
    </SnackbarProvider>
  );
}
