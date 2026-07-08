"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/data/site";
import { locales, localeLabels, type Dictionary, type Locale } from "@/dictionaries";
import ZaloIcon from "@/components/ZaloIcon";

type HeaderProps = {
  lang: Locale;
  nav: Dictionary["nav"];
};

export default function Header({ lang, nav }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const subPath = pathname.replace(/^\/(vi|en|zh)/, "") || "";

  const items = [
    { href: `/${lang}`, label: nav.home },
    { href: `/${lang}/san-pham`, label: nav.products },
    { href: `/${lang}/quy-trinh`, label: nav.process },
    { href: `/${lang}/gioi-thieu`, label: nav.about },
    { href: `/${lang}/lien-he`, label: nav.contact },
  ];

  const langSwitcher = (
    <div className="flex items-center gap-1 rounded-full border border-line p-1" aria-label={nav.langSwitch}>
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${subPath}`}
          onClick={() => setOpen(false)}
          aria-current={l === lang ? "true" : undefined}
          className={`whitespace-nowrap rounded-full px-2 py-1 text-xs font-bold transition-colors sm:px-2.5 ${
            l === lang ? "bg-leaf text-white" : "text-soft hover:text-leaf"
          }`}
        >
          {localeLabels[l]}
        </Link>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href={`/${lang}`} className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-leaf">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                d="M12 4c-4 2.5-4 8 0 11 4-3 4-8.5 0-11Z"
                fill="#fff"
              />
              <path d="M12 15v5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <span className="whitespace-nowrap text-base font-extrabold tracking-tight text-forest sm:text-lg">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label={nav.mainMenu}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-leaf ${
                pathname === item.href ? "text-leaf" : "text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {langSwitcher}
          <a
            href={site.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-zalo px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zalo-dark"
          >
            <ZaloIcon className="h-4 w-4 [--zalo-icon-text:#0068ff]" />
            {nav.chatZalo}
          </a>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          {langSwitcher}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-forest"
            aria-expanded={open}
            aria-label={open ? nav.closeMenu : nav.openMenu}
            onClick={() => setOpen(!open)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-white px-4 pb-4 lg:hidden" aria-label={nav.mobileMenu}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block border-b border-line py-3 text-base font-medium ${
                pathname === item.href ? "text-leaf" : "text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-zalo py-3 font-semibold text-white"
          >
            <ZaloIcon className="h-5 w-5 [--zalo-icon-text:#0068ff]" />
            {nav.chatZaloNow}
          </a>
        </nav>
      )}
    </header>
  );
}
