import type React from "react";
import type { Metadata, Viewport } from "next";
import { Roboto, Geist_Mono, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AntdProvider } from "@/components/antd-provider";
import { LanguageProvider } from "@/lib/language-context";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-heading",
});

const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LUMIÈRE | Fine Art Photography",
  description:
    "Discover timeless moments captured through the lens. Premium photography prints for collectors and art enthusiasts.",
};

export const viewport: Viewport = {
  themeColor: "#fafafa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${roboto.variable} ${newsreader.variable}`}>
      <body suppressHydrationWarning>
        <AntdRegistry>
          <AntdProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </AntdProvider>
        </AntdRegistry>
        <Analytics />
      </body>
    </html>
  );
}
