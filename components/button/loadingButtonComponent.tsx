import { useTranslations } from "next-intl";
import React from "react";
import { Button } from '@mui/material';
interface Props {
  isSubmitting: boolean;
  text: string;
}
export default function LoadingButtonComponent({ isSubmitting, text }: Props) {
  const t = useTranslations();
  return (
    <Button
      type="submit"
      variant="contained"
      loading={isSubmitting}
      fullWidth
      sx={{
        borderRadius: "10px",
        height: "40px",
        marginTop: "20px",
      }}
    >
      {text}
    </Button>
  );
}
