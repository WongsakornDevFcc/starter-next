"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ReactNode, useState } from "react";
import { useThemeMode } from "../themeProvider/themeProvider";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { signOut, useSession } from "next-auth/react";
import LocaleSwitcher from "@/components/localeSwither/localeSwither";

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { mode, toggleMode } = useThemeMode();
  const { data: session, status } = useSession();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  if (status === "unauthenticated") return null;
  if (status === "loading") return null;
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: mode === "light" ? "#1976d2" : "#121212",
          }}
        >
          <Toolbar variant="dense">
            {/* Left menu icon */}
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My App
            </Typography>

            <Button color="inherit" onClick={() =>{ session && signOut()}}>
              {session ? "Log Out" : "Login"}
            </Button>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="toggle theme"
              sx={{ mr: 2 }}
              onClick={toggleMode}
            >
              {mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <LocaleSwitcher />

            {/* Dropdown menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Settings</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
