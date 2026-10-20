"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";

const LANGUAGE_PREPAINT =
  'document.documentElement.lang=location.pathname==="/en"||location.pathname.startsWith("/en/")?"en":"sv"';

export function LocaleShell({
  children,
  headerSv,
  headerEn,
  footerSv,
  footerEn,
}: {
  children: ReactNode;
  headerSv: ReactNode;
  headerEn: ReactNode;
  footerSv: ReactNode;
  footerEn: ReactNode;
}) {
  const pathname = usePathname();
  const english = pathname === "/en" || pathname.startsWith("/en/");
  const locale = english ? "en" : "sv";

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: LANGUAGE_PREPAINT }} />
      {/* The server-rendered language scope covers all visible chrome and page
          content. The pre-paint script mirrors it onto <html> before the page
          is displayed and the effect keeps it correct during client routing. */}
      <div lang={locale} className="contents">
        <a
          href="#innehall"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          {english ? "Skip to content" : "Hoppa till innehåll"}
        </a>
        {english ? headerEn : headerSv}
        <main id="innehall" lang={locale} className="flex-1">
          {children}
        </main>
        {english ? footerEn : footerSv}
      </div>
    </>
  );
}
