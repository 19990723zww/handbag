import type { Metadata } from "next";
import Link from "next/link";
import BagArt from "@/components/BagArt";
import QuickQuote from "@/components/QuickQuote";
import ZaloIcon from "@/components/ZaloIcon";
import { products, formatMoney, type ProductSlug } from "@/data/products";
import { site } from "@/data/site";
import { getDictionary, langAlternates, tpl } from "@/dictionaries";

type LangParams = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: LangParams }): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return {
    title: dict.meta.home.title,
    description: dict.meta.home.desc,
    alternates: langAlternates(""),
  };
}

const benefitIcons = [
  <path
    key="factory"
    d="M12 2 2 7v10l10 5 10-5V7L12 2Zm0 2.2 7.5 3.75L12 11.7 4.5 7.95 12 4.2ZM4 9.6l7 3.5v6.6l-7-3.5V9.6Zm16 0v6.6l-7 3.5v-6.6l7-3.5Z"
  />,
  <path
    key="design"
    d="M17.6 3.1c.5-.5 1.4-.5 1.9 0l1.4 1.4c.5.5.5 1.4 0 1.9L9.4 17.9 4.5 19.5l1.6-4.9L17.6 3.1Zm-1 2.9 1.4 1.4 1-1-1.4-1.4-1 1ZM7.9 15.1l-.6 1.6 1.6-.6 7.7-7.6-1.1-1.1-7.6 7.7ZM3 21h18v1.5H3V21Z"
  />,
  <path
    key="truck"
    d="M3 5h11v10H3V5Zm11 3h3.5l3.5 4v3h-2a2.5 2.5 0 1 1-5 0h-4a2.5 2.5 0 1 1-5 0H3v-2h11V8Zm3.6 1.5H15.5V12h4l-1.9-2.5ZM7.5 17.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
  />,
];

export default async function Home({ params }: { params: LangParams }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const h = dict.home;
  const productNames = Object.fromEntries(
    products.map((p) => [p.slug, dict.products[p.slug].shortName])
  ) as Record<ProductSlug, string>;

  return (
    <>
      {/* Hero */}
      <section className="bg-mint">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2 lg:items-center lg:py-20">
          <div>
            <p className="rise-in inline-flex items-center gap-2 rounded-full border border-leaf/30 bg-white px-3 py-1 text-xs font-semibold text-leaf">
              <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
              {h.badge}
            </p>
            <h1 className="rise-in mt-4 text-4xl font-extrabold leading-tight tracking-tight text-forest sm:text-5xl">
              {h.heroTitle[0]}
              <span className="text-leaf">{h.heroTitle[1]}</span>
            </h1>
            <p className="rise-in-1 mt-4 max-w-lg text-lg leading-relaxed text-soft">{h.heroSub}</p>
            <div className="rise-in-2 mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${lang}/lien-he`}
                className="flex items-center justify-center rounded-full bg-leaf px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-leaf-dark"
              >
                {h.ctaQuote}
              </Link>
              <a
                href={site.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-zalo px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-zalo-dark"
              >
                <ZaloIcon className="h-5 w-5 [--zalo-icon-text:#0068ff]" />
                {h.ctaZalo}
              </a>
            </div>
            <p className="rise-in-2 mt-4 text-sm text-soft">{h.socialProof}</p>
          </div>
          <div className="rise-in-1">
            <QuickQuote
              labels={dict.quote}
              productNames={productNames}
              numberLocale={dict.numberLocale}
              currency={dict.currency}
              perUnit={dict.perUnit}
            />
          </div>
        </div>
      </section>

      {/* 3 nhóm sản phẩm */}
      <section className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-forest">
              {h.productsHeading}
            </h2>
            <p className="mt-2 text-soft">{h.productsSub}</p>
          </div>
          <Link href={`/${lang}/san-pham`} className="text-sm font-semibold text-leaf hover:underline">
            {h.viewAll}
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {products.map((p) => {
            const text = dict.products[p.slug];
            return (
              <Link
                key={p.slug}
                href={`/${lang}/san-pham#${p.slug}`}
                className="group rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-1 hover:border-leaf hover:shadow-lg hover:shadow-forest/10"
              >
                <div className="rounded-xl bg-mint p-6 transition-colors group-hover:bg-mint-deep">
                  <BagArt variant={p.art} text={dict.bagArt} className="mx-auto h-40 w-40" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <h3 className="text-lg font-bold text-forest">{text.shortName}</h3>
                  {p.popular && (
                    <span className="rounded-full bg-leaf px-2 py-0.5 text-[11px] font-bold text-white">
                      {h.bestSeller}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-soft">{text.bestFor}</p>
                <p className="mt-3 text-sm text-soft">
                  {h.fromOnly}{" "}
                  <span className="text-xl font-extrabold text-leaf">
                    {formatMoney(p.tiers[p.tiers.length - 1].price, dict.numberLocale, dict.currency)}
                  </span>
                  {dict.perUnit}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Lợi ích */}
      <section className="bg-forest text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
          <h2 className="text-3xl font-extrabold tracking-tight">
            {tpl(h.whyHeading, { name: site.name })}
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {h.benefits.map((b, i) => (
              <div key={b.title}>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-leaf">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="#fff" aria-hidden="true">
                    {benefitIcons[i]}
                  </svg>
                </span>
                <h3 className="mt-4 text-lg font-bold">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mint-deep">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quy trình rút gọn */}
      <section className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
        <h2 className="text-3xl font-extrabold tracking-tight text-forest">{h.stepsHeading}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {h.steps.map(([title, desc], i) => (
            <div key={title} className="rounded-2xl border border-line bg-white p-5">
              <span className="text-sm font-extrabold text-leaf">
                {h.stepLabel} {i + 1}
              </span>
              <h3 className="mt-1 font-bold text-forest">{title}</h3>
              <p className="mt-1 text-sm text-soft">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href={`/${lang}/quy-trinh`} className="text-sm font-semibold text-leaf hover:underline">
            {h.viewProcess}
          </Link>
        </div>
      </section>

      {/* CTA cuối trang */}
      <section className="bg-mint">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center lg:py-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-forest">{h.ctaHeading}</h2>
          <p className="mt-3 text-soft">{h.ctaSub}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={site.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-zalo px-8 py-3.5 font-bold text-white transition-colors hover:bg-zalo-dark"
            >
              <ZaloIcon className="h-5 w-5 [--zalo-icon-text:#0068ff]" />
              {tpl(h.ctaZaloFull, { phone: site.phone })}
            </a>
            <Link
              href={`/${lang}/lien-he`}
              className="flex items-center justify-center rounded-full border-2 border-leaf px-8 py-3.5 font-bold text-leaf transition-colors hover:bg-leaf hover:text-white"
            >
              {h.ctaForm}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
