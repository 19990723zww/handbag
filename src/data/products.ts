// ============================================================
// SẢN PHẨM & GIÁ — SỬA GIÁ TẠI ĐÂY
// Tên, mô tả, kích thước… của từng ngôn ngữ nằm trong
// src/dictionaries/{vi,en,zh}.ts (mục "products").
// Giá tham khảo (VNĐ/cái), đã gồm in logo 1 màu 1 mặt.
// ============================================================

export type PriceTier = {
  quantity: number;
  price: number;
};

export type ProductSlug = "tui-sieu-thi" | "tui-mang-di" | "tui-quang-cao";

export type Product = {
  slug: ProductSlug;
  tiers: PriceTier[];
  art: "supermarket" | "takeaway" | "promo";
  popular?: boolean;
};

export const products: Product[] = [
  {
    slug: "tui-sieu-thi",
    tiers: [
      { quantity: 100, price: 4500 },
      { quantity: 500, price: 3200 },
      { quantity: 1000, price: 2600 },
      { quantity: 5000, price: 2100 },
    ],
    art: "supermarket",
    popular: true,
  },
  {
    slug: "tui-mang-di",
    tiers: [
      { quantity: 100, price: 3200 },
      { quantity: 500, price: 2200 },
      { quantity: 1000, price: 1700 },
      { quantity: 5000, price: 1300 },
    ],
    art: "takeaway",
    popular: true,
  },
  {
    slug: "tui-quang-cao",
    tiers: [
      { quantity: 100, price: 5500 },
      { quantity: 500, price: 3800 },
      { quantity: 1000, price: 3000 },
      { quantity: 5000, price: 2400 },
    ],
    art: "promo",
  },
];

export function formatMoney(n: number, locale: string, currency: string): string {
  return n.toLocaleString(locale) + currency;
}
