"use client";

import LoginForm from "@/components/loginForm/loginForm";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

export default function Signin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe] = useState(false);
  const router = useRouter();
 const handleSubmit = async (values: { email: string; password: string }) => {
   setIsSubmitting(true);

   const res = await signIn("credentials", {
     redirect: false,
     email: values.email,
     password: values.password,
     callbackUrl: "/dashboard",
   });

   if (!res || res.status !== 200) {
     setIsSubmitting(false);

     let errorMessage = "Login failed";

     if (res?.error) {
       try {
         const parsedError = JSON.parse(res.error);
         errorMessage = parsedError.message || errorMessage;
       } catch {
         errorMessage = res.error;
       }
     }

     enqueueSnackbar(errorMessage, { variant: "error" });
     return;
   }

   // login success → redirect manually
   router.push("/dashboard");
 };


  return <LoginForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}
