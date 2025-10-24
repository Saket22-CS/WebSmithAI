import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import {ClerkProvider} from '@clerk/nextjs'
import  Provider  from "./Provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "WebSmithAI",
  description: "AI-powered website builder",
  icons: "/logo.svg",
};

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={outfit.className}
      >
        <Provider>
          {children}
          <Toaster/>
        </Provider>
        
      </body>
    </html>
    </ClerkProvider>
  );
}
