"use client";
import { useRouter, usePathname } from "@/app/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Button, Menu, MenuItem, NoSsr, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const locales = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "th", name: "ไทย", flag: "🇹🇭" }
];

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const switchLocale = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
    handleClose();
  };

  const currentLocale = locales.find(l => l.code === locale);

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outlined"
        startIcon={<LanguageIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ minWidth: 120 }}
      >
        <Typography variant="body2">
          {currentLocale?.flag} {currentLocale?.name}
        </Typography>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'locale-switcher-button',
        }}
      >
        {locales.map((localeOption) => (
          <MenuItem
            key={localeOption.code}
            onClick={() => switchLocale(localeOption.code)}
            selected={locale === localeOption.code}
          >
            <Typography variant="body2">
              {localeOption.flag} {localeOption.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
