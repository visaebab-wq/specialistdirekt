"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { PageVisual } from "@/components/PageVisual";

const LANGUAGE_PREPAINT =
  'document.documentElement.lang=location.pathname==="/en"||location.pathname.startsWith("/en/")?"en":"sv"';

const NOT_FOUND_VISUAL = {
  src: "/page-visuals/static-not-found.webp",
  alt: "Specialistdirekt – hjälp att hitta rätt sida och specialistvård",
};

export function LocalizedNotFound() {
  const pathname = usePathname();
  const english = pathname === "/en" || pathname.startsWith("/en/");

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-6xl font-extrabold text-brand-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-ink-900">
        {english ? "Page not found" : "Sidan kunde inte hittas"}
      </h1>
      <p className="mt-3 text-ink-600">
        {english
          ? "The page you are looking for does not exist or has moved. Let us help you find the right place."
          : "Sidan du letar efter finns inte eller har flyttats. Låt oss hjälpa dig vidare."}
      </p>
      <PageVisual
        visual={
          english
            ? {
                ...NOT_FOUND_VISUAL,
                alt: "Specialistdirekt – help finding the right page and specialist care",
              }
            : NOT_FOUND_VISUAL
        }
        className="mt-8 w-full"
      />
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href={english ? "/en" : "/"}
          className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          {english ? "Go to homepage" : "Till startsidan"}
        </Link>
        <Link
          href={english ? "/en/private-orthopedist-gothenburg" : "/specialiteter"}
          className="rounded-full border border-ink-300 bg-white px-6 py-3 text-sm font-semibold text-ink-700 hover:border-brand-300 hover:text-brand-700"
        >
          {english ? "Orthopedist in Gothenburg" : "Se specialiteter"}
        </Link>
      </div>
    </div>
  );
}

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
