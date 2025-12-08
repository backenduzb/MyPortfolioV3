import Header from "@/components/Header";
import Background from "@/components/Background";
import { NextIntlClientProvider } from "next-intl";
import Scials from "@/components/Socials";
import Socials from "@/components/Socials";

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
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Background />
        <Header />
        <Socials />
        <main>
          {children}
        </main>
      </NextIntlClientProvider>
  );
}
