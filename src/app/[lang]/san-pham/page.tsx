import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PatternMarquee from "@/components/PatternMarquee";
import ZaloIcon from "@/components/ZaloIcon";
import { products, formatMoney } from "@/data/products";
import { site } from "@/data/site";
import { getDictionary, langAlternates, tpl } from "@/dictionaries";

type LangParams = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: LangParams }): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return {
    title: dict.meta.products.title,
    description: dict.meta.products.desc,
    alternates: langAlternates("/san-pham"),
  };
}

export default async function ProductsPage({ params }: { params: LangParams }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.productsPage;
  const fmt = (n: number) => formatMoney(n, dict.numberLocale, dict.currency);

  return (
    <>
      <section className="bg-mint">
        <div className="mx-auto max-w-6xl px-4 py-10 lg:py-14">
          <h1 className="text-3xl font-extrabold tracking-tight text-forest sm:text-4xl">
            {t.heading}
          </h1>
          <p className="mt-3 max-w-2xl text-soft">
            {t.intro1}
            <strong className="text-forest">{t.introBold}</strong>
            {t.intro2}
          </p>
          <nav className="mt-5 flex flex-wrap gap-2" aria-label={t.jumpAria}>
            {products.map((p) => (
              <a
                key={p.slug}
                href={`#${p.slug}`}
                className="rounded-full border border-line bg-white px-4 py-1.5 text-sm font-semibold text-forest transition-colors hover:border-leaf hover:text-leaf"
              >
                {dict.products[p.slug].shortName}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12 lg:py-16">
        {products.map((p) => {
          const text = dict.products[p.slug];
          return (
            <section
              key={p.slug}
              id={p.slug}
              className="scroll-mt-24 grid gap-8 lg:grid-cols-[320px_1fr]"
            >
              <div>
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={`/products/${p.slug}.jpg`}
                    alt={text.name}
                    width={900}
                    height={982}
                    className="h-auto w-full"
                  />
                </div>
                <a
                  href={site.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-zalo py-3 font-bold text-white transition-colors hover:bg-zalo-dark"
                >
                  <ZaloIcon className="h-5 w-5 [--zalo-icon-text:#0068ff]" />
                  {tpl(t.quoteBtn, { product: text.shortName })}
                </a>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-extrabold tracking-tight text-forest">{text.name}</h2>
                  {p.popular && (
                    <span className="rounded-full bg-leaf px-2.5 py-0.5 text-xs font-bold text-white">
                      {dict.home.bestSeller}
                    </span>
                  )}
                </div>
                <p className="mt-2 leading-relaxed text-soft">{text.description}</p>
                <p className="mt-2 text-sm font-semibold text-leaf">
                  {t.bestForLabel} {text.bestFor}
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <Spec label={t.specSizes} items={text.sizes} />
                  <Spec label={t.specMaterials} items={text.materials} />
                  <Spec label={t.specThickness} items={text.thickness} />
                </div>
                <div className="mt-4">
                  <Spec label={t.specColors} items={text.colors} inline />
                </div>

                <div className="mt-6 overflow-x-auto rounded-xl border border-line">
                  <table className="w-full min-w-[420px] text-left text-sm">
                    <caption className="sr-only">{tpl(t.tableCaption, { product: text.name })}</caption>
                    <thead>
                      <tr className="bg-mint text-forest">
                        <th scope="col" className="px-4 py-3 font-bold">{t.thQty}</th>
                        <th scope="col" className="px-4 py-3 font-bold">{t.thUnit}</th>
                        <th scope="col" className="px-4 py-3 font-bold">{t.thTotal}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.tiers.map((tier, i) => (
                        <tr key={tier.quantity} className={i % 2 ? "bg-mint/40" : "bg-white"}>
                          <td className="px-4 py-3 font-semibold text-forest">
                            {tier.quantity.toLocaleString(dict.numberLocale)} {dict.unitWord}
                            {i === p.tiers.length - 1 && (
                              <span className="ml-1 text-xs font-medium text-leaf">{t.bestPrice}</span>
                            )}
                          </td>
                          <td className="px-4 py-3 font-extrabold text-leaf">{fmt(tier.price)}</td>
                          <td className="px-4 py-3 text-soft">{fmt(tier.price * tier.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-xs text-soft">{t.footnote}</p>
              </div>

              <div className="lg:col-span-2">
                <PatternMarquee slug={p.slug} title={t.examplesTitle} note={t.examplesNote} />
              </div>
            </section>
          );
        })}
      </div>

      <section className="bg-mint">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-forest">
            {t.undecidedHeading}
          </h2>
          <p className="mt-2 text-soft">{t.undecidedSub}</p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={site.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-zalo px-8 py-3.5 font-bold text-white transition-colors hover:bg-zalo-dark"
            >
              <ZaloIcon className="h-5 w-5 [--zalo-icon-text:#0068ff]" />
              {t.undecidedZalo}
            </a>
            <Link
              href={`/${lang}/quy-trinh`}
              className="flex items-center justify-center rounded-full border-2 border-leaf px-8 py-3.5 font-bold text-leaf transition-colors hover:bg-leaf hover:text-white"
            >
              {t.undecidedProcess}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Spec({
  label,
  items,
  inline,
}: {
  label: string;
  items: readonly string[];
  inline?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-soft">{label}</p>
      {inline ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {items.map((s) => (
            <span
              key={s}
              className="rounded-full border border-line bg-white px-2.5 py-1 text-xs font-medium text-ink"
            >
              {s}
            </span>
          ))}
        </div>
      ) : (
        <ul className="mt-2 space-y-1 text-sm text-ink">
          {items.map((s) => (
            <li key={s} className="flex gap-1.5">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-leaf" />
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
