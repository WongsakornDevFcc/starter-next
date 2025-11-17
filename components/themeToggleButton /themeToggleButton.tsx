"use client";

import { Button } from "@mui/material";
import { useThemeMode } from "@/providers/themeProvider/themeProvider";

export default function ThemeToggleButton() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <Button variant="contained" onClick={toggleMode}>
      Switch to {mode === "light" ? "Dark" : "Light"} Mode
    </Button>
  );
}
