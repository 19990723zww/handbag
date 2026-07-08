import Link from "next/link";
import { site } from "@/data/site";
import type { Dictionary, Locale } from "@/dictionaries";
import ZaloIcon from "@/components/ZaloIcon";

type FloatingActionsProps = {
  lang: Locale;
  dict: Dictionary;
};

// Nút Zalo nổi (desktop + mobile) và thanh CTA dính đáy màn hình (mobile)
export default function FloatingActions({ lang, dict }: FloatingActionsProps) {
  const f = dict.floating;
  return (
    <>
      <a
        href={site.zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={f.zaloAria}
        className="zalo-pulse fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-zalo text-white transition-transform hover:scale-105 lg:bottom-8 lg:right-8"
      >
        <ZaloIcon className="h-8 w-8 [--zalo-icon-text:#0068ff]" />
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-2 border-t border-line bg-white p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:hidden">
        <a
          href={`tel:${site.phoneRaw}`}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-line py-3 text-sm font-semibold text-forest"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.3 0 .7-.2 1l-2.2 2.1Z" />
          </svg>
          {f.callNow}
        </a>
        <a
          href={site.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-lg bg-zalo py-3 text-sm font-semibold text-white"
        >
          <ZaloIcon className="h-4 w-4 [--zalo-icon-text:#0068ff]" />
          {f.zalo}
        </a>
        <Link
          href={`/${lang}/lien-he`}
          className="flex items-center justify-center rounded-lg bg-leaf py-3 text-sm font-semibold text-white"
        >
          {f.quote}
        </Link>
      </div>
    </>
  );
}
