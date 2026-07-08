import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { site } from "@/data/site";
import { getDictionary, isLocale, langAlternates, locales } from "@/dictionaries";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type LangParams = Promise<{ lang: string }>;

export async function generateMetadata({
  params,
}: {
  params: LangParams;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(site.domain),
    title: {
      default: `${dict.meta.defaultTitle} | ${site.name}`,
      template: `%s | ${site.name}`,
    },
    description: dict.meta.defaultDesc,
    keywords: dict.meta.keywords,
    alternates: langAlternates(""),
    openGraph: {
      type: "website",
      locale: dict.meta.ogLocale,
      siteName: site.name,
      title: dict.meta.defaultTitle,
      description: dict.meta.defaultDesc,
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LangParams;
}) {
  const { lang: langParam } = await params;
  const lang = isLocale(langParam) ? langParam : "vi";
  const dict = getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.legalName,
    description: dict.meta.defaultDesc,
    telephone: site.phone,
    email: site.email,
    url: `${site.domain}/${lang}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Ho Chi Minh City",
      addressCountry: "VN",
    },
    priceRange: "₫₫",
  };

  return (
    <html lang={dict.htmlLang} className={`${beVietnam.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header lang={lang} nav={dict.nav} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} dict={dict} />
        <FloatingActions lang={lang} dict={dict} />
      </body>
    </html>
  );
}
