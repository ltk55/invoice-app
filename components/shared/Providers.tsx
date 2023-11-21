"use client";

import { ThemeProvider } from "next-themes";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
