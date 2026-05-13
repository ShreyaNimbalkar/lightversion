"use client";

import { ThemeProvider } from "next-themes";

import { EnquiryModalProvider } from "@/components/EnquiryModalProvider";

export default function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      storageKey="softlink-theme"
    >
      <EnquiryModalProvider>{children}</EnquiryModalProvider>
    </ThemeProvider>
  );
}