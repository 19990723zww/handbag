"use client";

import { useState } from "react";
import { products, formatMoney, type ProductSlug } from "@/data/products";
import { site } from "@/data/site";
import type { Dictionary } from "@/dictionaries";
import ZaloIcon from "@/components/ZaloIcon";

type QuickQuoteProps = {
  labels: Dictionary["quote"];
  productNames: Record<ProductSlug, string>;
  numberLocale: string;
  currency: string;
  perUnit: string;
};

// Công cụ ước tính giá nhanh — mục tiêu: kéo khách sang chat Zalo
export default function QuickQuote({
  labels,
  productNames,
  numberLocale,
  currency,
  perUnit,
}: QuickQuoteProps) {
  const [productSlug, setProductSlug] = useState<ProductSlug>(products[0].slug);
  const [tierIndex, setTierIndex] = useState(2);

  const product = products.find((p) => p.slug === productSlug) ?? products[0];
  const tier = product.tiers[Math.min(tierIndex, product.tiers.length - 1)];
  const total = tier.price * tier.quantity;
  const fmt = (n: number) => formatMoney(n, numberLocale, currency);

  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-lg shadow-forest/5 sm:p-6">
      <p className="text-sm font-bold uppercase tracking-wider text-leaf">{labels.title}</p>

      <label className="mt-4 block text-sm font-medium text-soft" htmlFor="qq-product">
        {labels.bagType}
      </label>
      <select
        id="qq-product"
        value={productSlug}
        onChange={(e) => setProductSlug(e.target.value as ProductSlug)}
        className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-base font-medium"
      >
        {products.map((p) => (
          <option key={p.slug} value={p.slug}>
            {productNames[p.slug]}
          </option>
        ))}
      </select>

      <p className="mt-4 text-sm font-medium text-soft">{labels.quantity}</p>
      <div className="mt-1 grid grid-cols-4 gap-2" role="group" aria-label={labels.quantityAria}>
        {product.tiers.map((t, i) => (
          <button
            key={t.quantity}
            type="button"
            onClick={() => setTierIndex(i)}
            aria-pressed={i === Math.min(tierIndex, product.tiers.length - 1)}
            className={`rounded-lg border py-2 text-sm font-semibold transition-colors ${
              i === Math.min(tierIndex, product.tiers.length - 1)
                ? "border-leaf bg-leaf text-white"
                : "border-line bg-white text-ink hover:border-leaf"
            }`}
          >
            {t.quantity.toLocaleString(numberLocale)}
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-end justify-between rounded-xl bg-mint p-4">
        <div>
          <p className="text-xs text-soft">{labels.refPrice}</p>
          <p className="text-2xl font-extrabold text-forest">
            {fmt(tier.price)}
            <span className="text-sm font-medium text-soft"> {perUnit}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-soft">{labels.totalLabel}</p>
          <p className="text-lg font-bold text-forest">{fmt(total)}</p>
        </div>
      </div>

      <a
        href={site.zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-zalo py-3.5 text-base font-bold text-white transition-colors hover:bg-zalo-dark"
      >
        <ZaloIcon className="h-5 w-5 [--zalo-icon-text:#0068ff]" />
        {labels.cta}
      </a>
      <p className="mt-2 text-center text-xs text-soft">{labels.note}</p>
    </div>
  );
}
