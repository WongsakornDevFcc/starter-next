import { NextAuthProvider } from "@/auth/context/next-auth";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../i18n/routing";
import NotistackProvider from "@/providers/notistackProvider/notistackProvider";
import MuiThemeProvider from "@/providers/themeProvider/themeProvider";
import { getMessages } from "next-intl/server";
import { ReduxProvider } from "@/redux/context";
import ButtonAppBar from "@/providers/appBarProvider/appBar";
import { LocaleProvider } from "@/app/i18n/localeContext";
import { Box } from "@mui/material";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  const message = await getMessages();
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true}>
        <NextAuthProvider>
          <NextIntlClientProvider locale={locale} messages={message}>
            <ReduxProvider>
              <LocaleProvider>
                <NotistackProvider>
                  <MuiThemeProvider>
                    <ButtonAppBar />
                    <Box
                      sx={{
                        paddingRight: { xs: 2, sm: 4, md: 8, lg: 8 },
                        paddingLeft: { xs: 2, sm: 4, md: 8, lg: 8 },
                      }}
                    >
                    {children}
                    </Box>
                  </MuiThemeProvider>
                </NotistackProvider>
              </LocaleProvider>
            </ReduxProvider>
          </NextIntlClientProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
