import type { Metadata } from "next";
import { Montserrat as FontSans, Rosarivo as FontTitles } from "next/font/google"
import "./globals.css";

import Context from "@/app/context";
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// export const fontTitles = FontTitles({
//   subsets: ["latin"],
//   weight: ["400"],
//   variable: "--font-titles",
// })

export const metadata: Metadata = {
  title: "Waldensian Map",
  description: "Lux lucet in tenebris",
  icons: {
    icon: "/favicon.ico",
    // shortcut: "/favicon-16x16.png",
    // apple: "/apple-touch-icon.png",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          // fontTitles.variable
        )}>
          <Context>
            {children}
          </Context>
          <Toaster/>
      </body>
    </html>
  );
}
