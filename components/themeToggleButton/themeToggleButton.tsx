"use client";

import { IconButton } from "@mui/material";
import { useThemeMode } from "@/providers/themeProvider/themeProvider";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function ThemeToggleButton() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <IconButton
      size="small"
      color="inherit"
      aria-label="toggle theme"
      sx={{ mr: 2 }}
      onClick={toggleMode}
    >
      {mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
