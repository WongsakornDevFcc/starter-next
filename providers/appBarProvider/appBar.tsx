"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useThemeMode } from "../themeProvider/themeProvider";
import { useSession } from "next-auth/react";
import LocaleSwitcher from "@/components/localeSwither/localeSwither";
import ThemeToggleButton from "@/components/themeToggleButton/themeToggleButton";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Image from "next/image";
import { Divider, Link } from "@mui/material";
import { useRouter } from "next/navigation";

interface LinkTabProps {
  label?: string;
  href: string;
  selected?: boolean;
}

function samePageLinkNavigation(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}
function LinkTab(props: LinkTabProps) {
  const router = useRouter();
  const defaultTheme = useThemeMode();
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (samePageLinkNavigation(event)) {
          event.preventDefault();
          router.push(props.href);
        }
      }}
      aria-current={props.selected && "page"}
      {...props}
    />
  );
}

export default function ButtonAppBar() {
  const { mode } = useThemeMode();
  const { data: session, status } = useSession();
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (
      event.type !== "click" ||
      (event.type === "click" &&
        samePageLinkNavigation(
          event as React.MouseEvent<HTMLAnchorElement, MouseEvent>
        ))
    ) {
      setValue(newValue);
    }
  };

  if (status === "unauthenticated") return null;
  if (status === "loading") return null;

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            // backgroundColor: mode === "light" ? "#1976d2" : "#121212",
          }}
        >
          <Toolbar
            variant="dense"
            sx={{
              minHeight: 35,
              paddingRight: { xs: 2, sm: 4, md: 8, lg: 8 },
              paddingLeft: { xs: 2, sm: 4, md: 8, lg: 8 },
            }}
          >
            <Box
              sx={{
                flexGrow: 15,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <Typography variant="body2">
                Get started with your projects using our Next.js starter kit!
                <Link
                  href="/devtool"
                  style={{
                    marginLeft: 4,
                    color: "inherit",
                    textDecoration: "underline",
                  }}
                >
                  Learn more in Dev Tool
                </Link>
              </Typography>
              <ArrowOutwardIcon fontSize="small" />
            </Box>
            <ThemeToggleButton />
            <LocaleSwitcher />
          </Toolbar>
        </AppBar>

        <Divider color={mode === "light" ? "primary.main" : "primary.main"} />
        {/* //------------------ Main AppBar ------------------// */}
        <AppBar
          position="static"
          sx={{
            // backgroundColor: mode === "light" ? "#1976d2" : "#121212",
          }}
        >
          <Toolbar
            variant="dense"
            sx={{
              minHeight: 45,
              paddingRight: { xs: 2, sm: 4, md: 8, lg: 8 },
              paddingLeft: { xs: 2, sm: 4, md: 8, lg: 8 },
            }}
          >
            <Box
              sx={{
                flexGrow: 15,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <Image src="/next.svg" width={100} height={30} alt="NEXT.JS" />
            </Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
              role="navigation"
            >
              <LinkTab label="Dashboard" href="/dashboard" />
              <LinkTab label="Devtool" href="/devtool" />
              <LinkTab label="Page Three" href="#" />
            </Tabs>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          paddingRight: { xs: 2, sm: 4, md: 8, lg: 8 },
          paddingLeft: { xs: 2, sm: 4, md: 8, lg: 8 },
        }}
      >
      </Box>
    </>
  );
}
