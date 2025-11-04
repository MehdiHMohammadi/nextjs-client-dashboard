"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import NextTopLoader from "nextjs-toploader";
import { Providers } from "@/app/providers";
import type { PropsWithChildren } from "react";

export default function LayoutClientWrapper({ children }: PropsWithChildren) {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/smart-lawyer") {
    return (
      <Providers>
        <NextTopLoader showSpinner={false} />
        <main className="isolate mx-auto h-full md:h-screen w-full overflow-hidden p-4 md:w-2/3 md:p-6 2xl:p-10">
          {children}
        </main>
      </Providers>
    );
  }
  return (
    <Providers>
      <NextTopLoader showSpinner={false} />

      <div className="flex min-h-screen">
        <Sidebar />

        <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
          <Header />
          <main className="isolate mx-auto w-full  overflow-hidden p-2 md:p-4 2xl:p-8">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
}
