import type { Metadata } from "next";
import { Georama } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/general/navbar/Navbar";
import { CartStateProvider } from "@/context/CartState";

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
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html className={cn(georama.className, "antialiased  h-full")} lang="en">
      <body className="h-full bg-background">
        <div className="h-full flex flex-col justify-start mx-auto">
          <CartStateProvider>
            {modal}
            <Navbar />
            <div className="flex-grow">{children}</div>
          </CartStateProvider>
        </div>
      </body>
    </html>
  );
}
