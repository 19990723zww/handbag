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
    title: dict.meta.process.title,
    description: dict.meta.process.desc,
    alternates: langAlternates("/quy-trinh"),
  };
}

export default async function ProcessPage({ params }: { params: LangParams }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.processPage;

  return (
    <>
      <section className="bg-mint">
        <div className="mx-auto max-w-6xl px-4 py-10 lg:py-14">
          <h1 className="text-3xl font-extrabold tracking-tight text-forest sm:text-4xl">
            {t.heading}
          </h1>
          <p className="mt-3 max-w-2xl text-soft">{t.sub}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <ol className="relative space-y-10 border-l-2 border-mint-deep pl-8">
          {t.steps.map((s, i) => (
            <li key={s.title} className="relative">
              <span className="absolute -left-[45px] flex h-8 w-8 items-center justify-center rounded-full bg-leaf text-sm font-extrabold text-white">
                {i + 1}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-forest">{s.title}</h2>
                <span className="rounded-full bg-mint px-2.5 py-0.5 text-xs font-bold text-leaf">
                  {s.time}
                </span>
              </div>
              <p className="mt-2 leading-relaxed text-soft">{s.desc}</p>
              <p className="mt-2 rounded-lg bg-mint px-3 py-2 text-sm text-forest">💡 {s.note}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-2xl bg-forest p-6 text-center text-white sm:p-8">
          <h2 className="text-2xl font-extrabold">{t.ctaHeading}</h2>
          <p className="mt-2 text-sm text-mint-deep">{t.ctaSub}</p>
          <a
            href={site.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-zalo px-8 py-3.5 font-bold text-white transition-colors hover:bg-zalo-dark"
          >
            <ZaloIcon className="h-5 w-5 [--zalo-icon-text:#0068ff]" />
            {tpl(t.ctaBtn, { phone: site.phone })}
          </a>
        </div>
      </section>

      <section className="bg-mint">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
          <h2 className="text-2xl font-extrabold tracking-tight text-forest">{t.faqHeading}</h2>
          <div className="mt-6 space-y-3">
            {t.faqs.map(([q, a]) => (
              <details key={q} className="group rounded-xl border border-line bg-white p-4">
                <summary className="cursor-pointer list-none font-semibold text-forest marker:hidden">
                  <span className="flex items-center justify-between gap-3">
                    {q}
                    <span className="text-leaf transition-transform group-open:rotate-45">＋</span>
                  </span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-soft">{a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-soft">
            {t.moreQuestions}{" "}
            <Link href={`/${lang}/lien-he`} className="font-semibold text-leaf hover:underline">
              {t.contactLink}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
