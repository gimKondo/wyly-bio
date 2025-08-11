import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wyly",
  description: "画像とテキストを投稿・シェアするソーシャルプラットフォーム",
  manifest: "/manifest.json",
  openGraph: {
    title: "Wyly",
    description: "画像とテキストを投稿・シェアするソーシャルプラットフォーム",
    url: "https://wyly.app",
    siteName: "Wyly",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wyly",
    description: "画像とテキストを投稿・シェアするソーシャルプラットフォーム",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
