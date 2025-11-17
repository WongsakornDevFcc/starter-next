"use client";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useLocaleContext } from "@/app/i18n/localeContext";

export default function LocaleSwitcher() {
  const { locale, switchLocale, locales, currentLocale } = useLocaleContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSwitchLocale = (newLocale: string) => {
    switchLocale(newLocale);
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color="inherit"
        startIcon={<LanguageIcon />}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Typography>{currentLocale?.name}</Typography>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "locale-switcher-button",
        }}
      >
        {locales.map((localeOption) => (
          <MenuItem
            key={localeOption.code}
            onClick={() => handleSwitchLocale(localeOption.code)}
            selected={locale === localeOption.code}
          >
            <Typography>{localeOption.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
