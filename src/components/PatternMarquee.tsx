import Image from "next/image";

const EXAMPLE_COUNT = 6;

type PatternMarqueeProps = {
  slug: string;
  title: string;
  note: string;
};

// 跑马灯展示满版印花示例袋（纯 CSS 循环，hover 暂停）
export default function PatternMarquee({ slug, title, note }: PatternMarqueeProps) {
  const items = Array.from({ length: EXAMPLE_COUNT }, (_, i) => i + 1);
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-wider text-soft">{title}</p>
      <div className="marquee mt-3 overflow-hidden rounded-xl" dir="ltr">
        <div className="marquee-track flex w-max">
          {[0, 1].map((half) => (
            <div key={half} className="flex gap-3 pr-3" aria-hidden={half === 1}>
              {items.map((i) => (
                <Image
                  key={i}
                  src={`/products/examples/${slug}-${i}.jpg`}
                  alt={half === 0 ? `${title} ${i}` : ""}
                  width={700}
                  height={763}
                  className="h-40 w-auto rounded-lg sm:h-48"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2 text-xs text-soft">{note}</p>
    </div>
  );
}
