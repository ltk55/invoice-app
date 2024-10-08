import "./globals.css";

import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import { type ReactNode } from "react";

import Header from "@/components/shared/Header/Header";
import { Providers } from "@/components/shared/Providers";
import { cn } from "@/lib/utils";

const leagueSpartan = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invoice App",
  description: "Easily manage, create, and track invoices for your business.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return (
    <html lang="en">
      <body
        className={cn(
          leagueSpartan.className,
          "bg-colour-1100 dark:bg-colour-1200",
        )}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
