"use client";

import LoginForm from "@/components/loginForm/loginForm";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { enqueueSnackbar } from "notistack";

export default function Signin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe] = useState(false);

  const handleSubmit = (values: { email: string; password: string }) => {
    setIsSubmitting(true);
    signIn("signin", {
      redirect: false,
      email: values.email,
      password: values.password,
      // locale: Cookies.get("NEXT_LOCALE"),
      // remember_me: rememberMe.toString(),
      callbackUrl: "/dashboard",
    }).then((res) => {
      if (res?.status !== 200) {
        setIsSubmitting(false);
        let errorMessage = "Login failed";
        if (res?.error) {
          const parsedError = JSON.parse(res.error);
          errorMessage = parsedError.message || "Login failed";
        }
        enqueueSnackbar(errorMessage, { variant: "error" });
      }
    });
  };

  return <LoginForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}
