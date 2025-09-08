import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["uz", "en", "ru", "ja"],

  defaultLocale: "en"
});

export const config = {
  matcher: ["/", "/(uz|en|ru|ja)/:path*"]
};
