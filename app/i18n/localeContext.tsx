"use client";

import { createContext, useContext, ReactNode } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/app/i18n/navigation";

export const locales = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "th", name: "ไทย", flag: "🇹🇭" }
];

interface LocaleContextType {
  locale: string;
  switchLocale: (newLocale: string) => void;
  locales: typeof locales;
  currentLocale: (typeof locales)[0] | undefined;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
  };

  const currentLocale = locales.find(l => l.code === locale);

  const value: LocaleContextType = {
    locale,
    switchLocale,
    locales,
    currentLocale,
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocaleContext must be used within LocaleProvider");
  }
  return context;
}
