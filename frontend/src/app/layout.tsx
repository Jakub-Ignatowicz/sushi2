import type { Metadata } from "next";
import { Georama } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const georama = Georama({
  variable: "--font-georama",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sushi Zume",
  description: "Strona restauracji Sushi Zume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
