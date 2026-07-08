import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

type PatternMarqueeProps = {
  slug: string;
  title: string;
  note: string;
};

// 跑马灯展示印花示例袋（纯 CSS 循环，hover 暂停）。
// 图片列表在构建时扫描 public/products/examples/ 自动生成，
// 增删图片文件即可，不用改代码。
export default function PatternMarquee({ slug, title, note }: PatternMarqueeProps) {
  const dir = path.join(process.cwd(), "public/products/examples");
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.startsWith(`${slug}-`) && f.endsWith(".jpg"))
    .sort();
  if (files.length === 0) return null;

  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-wider text-soft">{title}</p>
      <div className="marquee mt-3 overflow-hidden rounded-xl" dir="ltr">
        <div className="marquee-track flex w-max">
          {[0, 1].map((half) => (
            <div key={half} className="flex gap-3 pr-3" aria-hidden={half === 1}>
              {files.map((f, i) => (
                <Image
                  key={f}
                  src={`/products/examples/${f}`}
                  alt={half === 0 ? `${title} ${i + 1}` : ""}
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
