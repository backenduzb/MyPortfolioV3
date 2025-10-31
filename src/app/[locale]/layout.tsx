import Header from "@/components/Header";
import Background from "@/components/Background";
import { Auths } from "@/auth/Auth";
import { AlertProvider } from "@/context/Alert";
import { NextIntlClientProvider } from "next-intl";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    messages = (await import(`../../../messages/en.json`)).default;
  }

  return (
    <Auths>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <AlertProvider>
        <Background />
        <Header />
        <main>
          {children}
        </main>
        </AlertProvider>
      </NextIntlClientProvider>
    </Auths>
  );
}
