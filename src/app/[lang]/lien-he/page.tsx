import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import ZaloIcon from "@/components/ZaloIcon";
import { products, type ProductSlug } from "@/data/products";
import { site } from "@/data/site";
import { getDictionary, langAlternates, tpl } from "@/dictionaries";

type LangParams = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: LangParams }): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return {
    title: dict.meta.contact.title,
    description: dict.meta.contact.desc,
    alternates: langAlternates("/lien-he"),
  };
}

export default async function ContactPage({ params }: { params: LangParams }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.contactPage;
  const productNames = Object.fromEntries(
    products.map((p) => [p.slug, dict.products[p.slug].shortName])
  ) as Record<ProductSlug, string>;

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

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[380px_1fr] lg:py-16">
        <div className="space-y-4">
          <a
            href={site.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl bg-zalo p-5 text-white transition-colors hover:bg-zalo-dark"
          >
            <ZaloIcon className="h-11 w-11 shrink-0 [--zalo-icon-text:#0068ff]" />
            <span>
              <span className="block text-lg font-extrabold">{t.zaloTitle}</span>
              <span className="block text-sm opacity-90">
                {tpl(t.zaloSub, { phone: site.phone })}
              </span>
            </span>
          </a>

          <a
            href={`tel:${site.phoneRaw}`}
            className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-leaf"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mint">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-leaf" fill="currentColor" aria-hidden="true">
                <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.3 0 .7-.2 1l-2.2 2.1Z" />
              </svg>
            </span>
            <span>
              <span className="block font-bold text-forest">{t.callTitle}</span>
              <span className="block text-sm text-soft">
                {tpl(t.callSub, { phone: site.phone, hours: site.workingHours })}
              </span>
            </span>
          </a>

          <a
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-leaf"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25d366]/10">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#25d366]" fill="currentColor" aria-hidden="true">
                <path d="M12 2a9.9 9.9 0 0 0-8.6 14.9L2 22l5.3-1.4A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.2-.8l.4-.5c.1-.2.1-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.2 2.1-.6 3.5.8 1.9 2.3 3.6 4.2 4.7 2.4 1.3 3.4 1.2 4.3 1 .6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.7-.4Z" />
              </svg>
            </span>
            <span>
              <span className="block font-bold text-forest">{t.waTitle}</span>
              <span className="block text-sm text-soft">{t.waSub}</span>
            </span>
          </a>

          <div className="rounded-2xl bg-mint p-5 text-sm leading-relaxed">
            <p className="font-bold text-forest">{t.visitTitle}</p>
            <p className="mt-1 text-soft">{site.address}</p>
            <p className="mt-1 text-soft">{site.workingHours}</p>
            <p className="mt-1 text-soft">
              {t.emailLabel}{" "}
              <a href={`mailto:${site.email}`} className="text-leaf underline">{site.email}</a>
            </p>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold text-forest">{t.formHeading}</h2>
          <ContactForm labels={dict.form} productNames={productNames} />
        </div>
      </section>
    </>
  );
}
