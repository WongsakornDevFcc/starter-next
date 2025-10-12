import { Button } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React from "react";

export default function NotistacksComponent(
  message: string,
  variant: "default" | "error" | "success" | "warning" | "info"
) {
  const handleNotistack = () => {
    enqueueSnackbar(`This is a message that you want to display ${message}`, {
      variant: variant, // 'default' | 'error' | 'success' | 'warning' | 'info'
    });
  };

  return handleNotistack();
}
