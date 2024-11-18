import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import FcmTokenComp from "@/hooks/firebaseForeground";
import LocalFont from "next/font/local";

const zodiak = LocalFont({
  src: "./fonts/Zodiak-Variable.woff2",
  variable: "--font-zodiak",
  fallback: ["latin", "system-ui"],
});

const hind = LocalFont({
  src: "./fonts/Hind-Variable.woff2",
  variable: "--font-hind",
  fallback: ["latin", "system-ui"],
});

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "FloraCare",
  description: "Automated Hydroponics with IoT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            zodiak.variable,
            hind.variable
          )}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <>
              {children}
              <FcmTokenComp />
            </>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
