import type { PropsWithChildren } from "react";
import "@/css/style.css";

import { Figtree } from "next/font/google";
import localFont from "next/font/local";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import ToastProvider from "@/components/ToastProvider";
import { EmailProvider } from "@/contexts/EmailContext";

import LayoutClientWrapper from "./LayoutClientWrapper";

const figtree = Figtree({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const yekanbakh = localFont({
  src: [
    {
      path: "../fonts/yekanbakh/YekanBakhFaNum-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/yekanbakh/YekanBakhFaNum-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/yekanbakh/YekanBakhFaNum-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/yekanbakh/YekanBakhFaNum-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/yekanbakh/YekanBakhFaNum-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/yekanbakh/YekanBakhFaNum-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-yekanbakh",
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      dir="rtl"
      lang="fa"
      className={`${yekanbakh.variable} ${figtree.variable}`}
      suppressHydrationWarning
    >
      <body>
        <EmailProvider>
          <LayoutClientWrapper>{children}</LayoutClientWrapper>
          <ToastProvider />
        </EmailProvider>
      </body>
    </html>
  );
}
