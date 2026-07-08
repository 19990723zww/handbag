"use client";

import { useState } from "react";
import { products, type ProductSlug } from "@/data/products";
import { site } from "@/data/site";
import { tpl, type Dictionary } from "@/dictionaries";
import ZaloIcon from "@/components/ZaloIcon";

type ContactFormProps = {
  labels: Dictionary["form"];
  productNames: Record<ProductSlug, string>;
};

// Form không cần backend: soạn sẵn nội dung, khách bấm gửi qua Zalo/email.
// Khi có backend thật, thay handleSubmit bằng fetch tới API của bạn.
export default function ContactForm({ labels, productNames }: ContactFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [productName, setProductName] = useState(productNames[products[0].slug]);
  const [quantity, setQuantity] = useState("1000");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const message = [
    tpl(labels.msgGreeting, { name: site.name }),
    `- ${labels.msgName}: ${name}`,
    `- ${labels.msgPhone}: ${phone}`,
    `- ${labels.msgProduct}: ${productName}`,
    `- ${labels.msgQty}: ${quantity} ${labels.msgQtyUnit}`,
    note ? `- ${labels.msgNote}: ${note}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // trình duyệt cũ: khách tự chép tay, nội dung đã hiển thị sẵn
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-line bg-white p-6">
        <p className="text-lg font-bold text-forest">{labels.submittedHeading}</p>
        <p className="mt-1 text-sm text-soft">{labels.submittedSub}</p>
        <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-mint p-4 text-sm leading-relaxed text-ink">
          {message}
        </pre>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={copyMessage}
            className="rounded-full border border-leaf py-3 font-semibold text-leaf transition-colors hover:bg-mint"
          >
            {copied ? labels.copied : labels.copy}
          </button>
          <a
            href={site.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-zalo py-3 font-bold text-white transition-colors hover:bg-zalo-dark"
          >
            <ZaloIcon className="h-5 w-5 [--zalo-icon-text:#0068ff]" />
            {labels.openZalo}
          </a>
        </div>
        <a
          href={`mailto:${site.email}?subject=${encodeURIComponent(labels.emailSubject)}&body=${encodeURIComponent(message)}`}
          className="mt-3 block text-center text-sm text-soft underline"
        >
          {labels.orEmail}
        </a>
      </div>
    );
  }

  return (
    <form
      className="rounded-2xl border border-line bg-white p-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="text-sm font-medium text-soft">
            {labels.name}
          </label>
          <input
            id="cf-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={labels.namePh}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2.5"
          />
        </div>
        <div>
          <label htmlFor="cf-phone" className="text-sm font-medium text-soft">
            {labels.phone}
          </label>
          <input
            id="cf-phone"
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={labels.phonePh}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2.5"
          />
        </div>
        <div>
          <label htmlFor="cf-product" className="text-sm font-medium text-soft">
            {labels.product}
          </label>
          <select
            id="cf-product"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2.5"
          >
            {products.map((p) => (
              <option key={p.slug} value={productNames[p.slug]}>
                {productNames[p.slug]}
              </option>
            ))}
            <option value={labels.productUnknown}>{labels.productUnknown}</option>
          </select>
        </div>
        <div>
          <label htmlFor="cf-qty" className="text-sm font-medium text-soft">
            {labels.qty}
          </label>
          <select
            id="cf-qty"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2.5"
          >
            {labels.qtyOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="cf-note" className="text-sm font-medium text-soft">
          {labels.note}
        </label>
        <textarea
          id="cf-note"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={labels.notePh}
          className="mt-1 w-full rounded-lg border border-line px-3 py-2.5"
        />
      </div>
      <button
        type="submit"
        className="mt-5 w-full rounded-full bg-leaf py-3.5 text-base font-bold text-white transition-colors hover:bg-leaf-dark"
      >
        {labels.submit}
      </button>
      <p className="mt-2 text-center text-xs text-soft">{labels.privacy}</p>
    </form>
  );
}
