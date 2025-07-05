import type { Metadata } from "next";
import { PublicEnvScript } from "next-runtime-env";
import { ThemeProvider } from "@/components/theme-provider";
import { Georama } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { CartStateProvider } from "@/context/cart-context";

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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={cn(georama.className, "antialiased  h-full")}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <PublicEnvScript />
      </head>
      <body className="h-full bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors toastOptions={{}} theme="system" />
          <div className="h-full flex flex-col justify-start mx-auto">
            <div className="flex-grow">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
