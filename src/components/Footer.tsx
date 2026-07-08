import Link from "next/link";
import { site } from "@/data/site";
import type { Dictionary, Locale } from "@/dictionaries";

type FooterProps = {
  lang: Locale;
  dict: Dictionary;
};

export default function Footer({ lang, dict }: FooterProps) {
  const f = dict.footer;
  return (
    <footer className="bg-forest pb-24 text-white lg:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold">{site.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-mint-deep">{f.blurb}</p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-mint-deep">{f.linksTitle}</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href={`/${lang}/san-pham`} className="hover:underline">{f.linkProducts}</Link></li>
            <li><Link href={`/${lang}/quy-trinh`} className="hover:underline">{f.linkProcess}</Link></li>
            <li><Link href={`/${lang}/gioi-thieu`} className="hover:underline">{f.linkAbout}</Link></li>
            <li><Link href={`/${lang}/lien-he`} className="hover:underline">{f.linkContact}</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-mint-deep">{f.contactTitle}</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={`tel:${site.phoneRaw}`} className="font-semibold hover:underline">
                {site.phone}
              </a>{" "}
              {f.zaloTag}
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a>
            </li>
            <li>{site.address}</li>
            <li>{site.workingHours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15 py-4 text-center text-xs text-mint-deep">
        © {new Date().getFullYear()} {site.legalName}. {f.copyrightTail}
      </div>
    </footer>
  );
}
