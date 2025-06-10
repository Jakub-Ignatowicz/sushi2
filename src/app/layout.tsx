import type { Metadata } from "next";
import { Georama } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/general/navbar/Navbar";

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
    <html className={cn(georama.className, "antialiased bg-primary")} lang="en">
      <body>
        <div className="container max-w-[85%] mx-auto h-full pt-12">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
