import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const supportedLocales = ["uz", "en", "ru", "ja"];
  const currentLocale = supportedLocales.includes(locale) ? locale : "en";

  return {
    locale: currentLocale,
    messages: (await import(`../../messages/${currentLocale}.json`)).default
  };
});
