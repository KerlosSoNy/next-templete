import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import localFont from 'next/font/local'

import './globals.css'
import { getLocale } from "next-intl/server";
import { ThemeInitializer } from "@/components/themeinit";
import StoreProvider from "./StoreProvider";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import Toast from "@/components/toast/toast";
import { Almarai } from "next/font/google";


const neoSansArabic = localFont({
  src: [
    { path: '../../../public/fonts/NeoSansArabic/NeoSansArabicLight.ttf', weight: '300', style: 'normal' },
    { path: '../../../public/fonts/NeoSansArabic/NeoSansArabic.ttf', weight: '400', style: 'normal' },
    { path: '../../../public/fonts/NeoSansArabic/NeoSansArabicMedium.ttf', weight: '500', style: 'normal' },
    { path: '../../../public/fonts/NeoSansArabic/NeoSansArabicBold.ttf', weight: '700', style: 'normal' },
    { path: '../../../public/fonts/NeoSansArabic/NeoSansArabicBlack.ttf', weight: '900', style: 'normal' },
  ],
  variable: '--font-neo-sans-arabic',
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
});


const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-almarai",
});

export const metadata: Metadata = {
  title: "Robita",
  description: "Robita is a leading e-commerce store offering the latest products at the best prices. We always strive to provide a distinctive and easy shopping experience for our valued customers.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale()

  return (
    <html dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${locale === "ar" ? neoSansArabic.variable : ""} ${almarai.variable} antialiased pt-[54px] max-w-full overflow-x-hidden`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider>
          <StoreProvider>
            <Toast />
            <Navbar />
            <ThemeInitializer />
          </StoreProvider>
          {children}
          <StoreProvider>
            <Footer />
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
