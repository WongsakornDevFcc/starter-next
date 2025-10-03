import { NextAuthProvider } from "@/auth/context/next-auth";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../i18n/routing";
import NotistackProvider from "@/providers/notistackProvider/notistackProvider";
import MuiThemeProvider from "@/providers/themeProvider/themeProvider";
import { getMessages } from "next-intl/server";

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
  <html lang={locale} >
    <body >
      <MuiThemeProvider>
        <NextAuthProvider>
          <NextIntlClientProvider locale={locale} messages={message}>
            <NotistackProvider>{children}</NotistackProvider>
          </NextIntlClientProvider>
        </NextAuthProvider>
      </MuiThemeProvider>
    </body>
  </html>
);}
