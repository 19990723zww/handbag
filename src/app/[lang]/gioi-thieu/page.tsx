import type { Metadata } from "next";
import Link from "next/link";
import ZaloIcon from "@/components/ZaloIcon";
import { site } from "@/data/site";
import { getDictionary, langAlternates, tpl } from "@/dictionaries";

type LangParams = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: LangParams }): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return {
    title: dict.meta.about.title,
    description: dict.meta.about.desc,
    alternates: langAlternates("/gioi-thieu"),
  };
}

export default async function AboutPage({ params }: { params: LangParams }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.aboutPage;

  return (
    <>
      <section className="bg-mint">
        <div className="mx-auto max-w-6xl px-4 py-10 lg:py-14">
          <p className="text-sm font-bold uppercase tracking-wider text-leaf">
            {tpl(t.eyebrow, { name: site.name })}
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight text-forest sm:text-4xl">
            {t.heading}
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-soft">
            {tpl(t.sub, { name: site.name, year: site.founded })}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.stats.map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-line bg-white p-5 text-center">
              <p className="text-3xl font-extrabold text-leaf">{value}</p>
              <p className="mt-1 text-sm text-soft">{label}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 text-2xl font-extrabold tracking-tight text-forest">{t.capHeading}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {t.capabilities.map((c) => (
            <div key={c.title} className="rounded-2xl bg-mint p-6">
              <h3 className="text-lg font-bold text-forest">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-soft">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-line p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-forest">{t.whyHeading}</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-soft">{t.whyBody}</p>
          <p className="mt-3 text-sm font-semibold text-forest">
            {t.visit1}
            <span className="text-leaf">{site.address}</span>
            {tpl(t.visit2, { hours: site.workingHours })}
          </p>
        </div>
      </section>

      <section className="bg-forest">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center text-white lg:py-14">
          <h2 className="text-2xl font-extrabold tracking-tight">{t.ctaHeading}</h2>
          <p className="mt-2 text-sm text-mint-deep">{t.ctaSub}</p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={site.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-zalo px-8 py-3.5 font-bold text-white transition-colors hover:bg-zalo-dark"
            >
              <ZaloIcon className="h-5 w-5 [--zalo-icon-text:#0068ff]" />
              {t.ctaZalo}
            </a>
            <Link
              href={`/${lang}/san-pham`}
              className="flex items-center justify-center rounded-full border-2 border-white px-8 py-3.5 font-bold text-white transition-colors hover:bg-white hover:text-forest"
            >
              {t.ctaPrices}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
