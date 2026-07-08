#!/usr/bin/env python3
"""生成三语产品宣传册 public/brochure.html（自包含单文件，可切换语言、可导出 PDF）。

用法:
  python3 scripts/build-brochure.py          # 只生成 HTML
  python3 scripts/build-brochure.py --pdf    # 同时用 Playwright 导出三语 PDF 到 marketing/brochure-pdf/
"""
import base64
import io
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
IMG = ROOT / "public/products"
OUT = ROOT / "public/brochure.html"
FONT_CSS = ROOT / "scripts/assets-fonts.css"

GALLERY = [
    "examples/tui-sieu-thi-1.jpg", "examples/tui-sieu-thi-6.jpg", "examples/tui-sieu-thi-7.jpg",
    "examples/tui-mang-di-1.jpg", "examples/tui-mang-di-7.jpg", "examples/tui-mang-di-8.jpg",
    "examples/tui-quang-cao-1.jpg", "examples/tui-quang-cao-3.jpg", "examples/tui-quang-cao-8.jpg",
]

TIERS = {
    "tui-sieu-thi": [(100, "4.500đ"), (500, "3.200đ"), (1000, "2.600đ"), (5000, "2.100đ")],
    "tui-mang-di": [(100, "3.200đ"), (500, "2.200đ"), (1000, "1.700đ"), (5000, "1.300đ")],
    "tui-quang-cao": [(100, "5.500đ"), (500, "3.800đ"), (1000, "3.000đ"), (5000, "2.400đ")],
}

I18N = {
"vi": {
  "lang.print": "Xuất PDF", "lang.hint": "Chọn ngôn ngữ rồi bấm Xuất PDF — trong hộp thoại in, chọn «Save as PDF»",
  "cover.tagline": "Túi vải không dệt in logo — giá xưởng",
  "cover.sub": "Sản xuất theo yêu cầu từ 100 cái · Thiết kế miễn phí · Giao hàng toàn quốc",
  "cover.contact": "Zalo: 0909 123 456 · baogia@urbanecarry.vn",
  "about.title": "Xưởng sản xuất trực tiếp — không qua trung gian",
  "about.body": "Từ năm 2015, URBANE CARRY sản xuất túi vải không dệt tại xưởng của mình. Khách hàng làm việc thẳng với người đứng máy: giá gốc tại xưởng, chỉnh sửa nhanh, chịu trách nhiệm đến chiếc túi cuối cùng. Chúng tôi chuyên phục vụ quán trà sữa, cà phê, nhà hàng, cửa hàng bán lẻ và doanh nghiệp cần quà tặng sự kiện.",
  "about.s1n": "10+", "about.s1": "năm sản xuất túi vải không dệt",
  "about.s2n": "50.000", "about.s2": "túi / tháng công suất tối đa",
  "about.s3n": "4", "about.s3": "dây chuyền may công nghiệp",
  "about.s4n": "100%", "about.s4": "đổi mới nếu lỗi do xưởng",
  "about.captitle": "Năng lực sản xuất",
  "about.c1t": "Xưởng may riêng", "about.c1": "4 dây chuyền may công nghiệp, 25 công nhân lành nghề. Tự chủ tiến độ, cam kết đúng hẹn.",
  "about.c2t": "Xưởng in tại chỗ", "about.c2": "In lụa 1–3 màu sắc nét; in chuyển nhiệt cho thiết kế full màu. Màu chuẩn theo maquette đã duyệt.",
  "about.c3t": "Kho vải nhập trực tiếp", "about.c3": "Vải PP 50–120 gsm nhập cuộn số lượng lớn, đủ bảng màu phổ biến, giá tận gốc.",
  "about.c4t": "Kiểm hàng từng lô", "about.c4": "Kiểm đường may, độ bám mực và số lượng trước khi đóng kiện.",
  "spec.sizes": "Kích thước", "spec.materials": "Chất liệu", "spec.thickness": "Định lượng vải", "spec.colors": "Màu sắc",
  "price.qty": "Số lượng", "price.unit": "Đơn giá / cái", "price.note": "Giá tham khảo (VNĐ), đã gồm in logo 1 màu 1 mặt. In nhiều màu / kích thước riêng: liên hệ báo giá.",
  "unit": "cái",
  "p1.name": "Túi siêu thị (túi hộp có hông)",
  "p1.desc": "Dạng hộp, có hông và đáy rộng, đứng vững, chứa nhiều hàng. Lựa chọn phổ biến nhất cho cửa hàng bán lẻ và siêu thị mini.",
  "p1.best": "Phù hợp: tạp hóa, siêu thị mini, shop quần áo",
  "p1.sizes": "25×30×10 · 30×35×12 · 35×40×15 cm · theo yêu cầu",
  "p1.mat": "Vải không dệt PP · vải cán màng (bóng/mờ)",
  "p1.gsm": "70 / 80 / 100 / 120 gsm",
  "p1.colors": "Trắng, xanh lá, đỏ, vàng, xanh dương, đen, theo yêu cầu",
  "p2.name": "Túi mang đi (takeaway)",
  "p2.desc": "Nhỏ gọn, đựng 1–2 ly hoặc hộp thức ăn. Mỗi đơn mang đi là một lần quảng cáo di động cho thương hiệu của bạn.",
  "p2.best": "Phù hợp: trà sữa, cà phê, quán ăn, tiệm bánh",
  "p2.sizes": "1 ly 12×22×10 · 2 ly 20×22×10 · hộp 25×20×15 cm",
  "p2.mat": "Vải PP · vải cán màng chống thấm",
  "p2.gsm": "50 / 70 / 80 gsm",
  "p2.colors": "Trắng, kem, xanh lá, nâu, hồng, theo yêu cầu",
  "p3.name": "Túi quảng cáo — quà tặng sự kiện",
  "p3.desc": "Dạng dẹp hoặc có hông, in sắc nét toàn mặt túi. Dùng cho hội nghị, khai trương, quà tặng khách hàng.",
  "p3.best": "Phù hợp: sự kiện, hội nghị, khai trương, quà tặng",
  "p3.sizes": "30×40 · 35×45 (dẹp) · 30×40×10 cm (hông) · theo yêu cầu",
  "p3.mat": "Vải PP · vải cán màng in chuyển nhiệt (full màu)",
  "p3.gsm": "80 / 100 / 120 gsm",
  "p3.colors": "In full màu theo thiết kế · màu vải theo yêu cầu",
  "gal.title": "Mẫu thiết kế tham khảo",
  "gal.note": "Đội thiết kế dựng mockup miễn phí theo logo của bạn trong 3 ngày làm việc. Có sẵn thư viện hoa văn — hoặc in theo file thiết kế riêng.",
  "proc.title": "Quy trình đặt hàng",
  "proc.1t": "Gửi logo qua Zalo", "proc.1": "Kèm loại túi, số lượng dự kiến và thời gian cần hàng.",
  "proc.2t": "Nhận mockup miễn phí", "proc.2": "Trong 3 ngày làm việc, kèm báo giá chi tiết. Chỉnh đến khi ưng ý.",
  "proc.3t": "Duyệt mẫu & đặt cọc 50%", "proc.3": "Ký duyệt maquette qua Zalo. Hợp đồng / hóa đơn đầy đủ nếu cần.",
  "proc.4t": "Sản xuất & giao hàng", "proc.4": "7–14 ngày, giao tận nơi toàn quốc. Kiểm hàng rồi mới thanh toán phần còn lại.",
  "ct.title": "Liên hệ nhận báo giá",
  "ct.zalo": "Zalo (nhanh nhất)", "ct.phone": "Điện thoại", "ct.email": "Email", "ct.web": "Website",
  "ct.addr": "Văn phòng giao dịch", "ct.addrv": "123 Quốc lộ 1A, P. Bình Hưng Hòa, Q. Bình Tân, TP.HCM",
  "ct.cta": "Gửi logo hôm nay — nhận báo giá trong 30 phút (giờ làm việc)",
  "foot": "URBANE CARRY — Túi vải không dệt in logo giá xưởng",
},
"en": {
  "lang.print": "Export PDF", "lang.hint": "Pick a language, then Export PDF — choose «Save as PDF» in the print dialog",
  "cover.tagline": "Custom printed non-woven bags — factory prices",
  "cover.sub": "Made to order from 100 pcs · Free design · Nationwide delivery in Vietnam",
  "cover.contact": "Zalo: 0909 123 456 · baogia@urbanecarry.vn",
  "about.title": "A real factory — no middlemen",
  "about.body": "Since 2015, URBANE CARRY has manufactured non-woven bags at its own factory. You work directly with the people running the machines: true factory prices, fast revisions, accountable down to the last bag. We serve bubble tea shops, cafes, restaurants, retail stores and companies needing event gifts.",
  "about.s1n": "10+", "about.s1": "years making non-woven bags",
  "about.s2n": "50,000", "about.s2": "bags / month max capacity",
  "about.s3n": "4", "about.s3": "industrial sewing lines",
  "about.s4n": "100%", "about.s4": "replacement for factory defects",
  "about.captitle": "Production capabilities",
  "about.c1t": "In-house sewing", "about.c1": "4 industrial lines, 25 skilled workers. Full schedule control, on-time delivery.",
  "about.c2t": "On-site printing", "about.c2": "Crisp 1–3 color screen printing; heat transfer for full-color designs, true to the approved proof.",
  "about.c3t": "Direct-sourced fabric", "about.c3": "PP fabric 50–120 gsm bought in bulk rolls, all popular colors, source pricing.",
  "about.c4t": "Batch inspection", "about.c4": "Stitching, ink adhesion and count checked before packing.",
  "spec.sizes": "Sizes", "spec.materials": "Materials", "spec.thickness": "Fabric weight", "spec.colors": "Colors",
  "price.qty": "Quantity", "price.unit": "Unit price", "price.note": "Reference prices (VND), incl. 1-color logo print on one side. Multi-color / custom sizes: contact us.",
  "unit": "pcs",
  "p1.name": "Supermarket tote (box bag)",
  "p1.desc": "Box-shaped with side and bottom gussets — stands upright, holds plenty. The most popular choice for retail.",
  "p1.best": "Best for: grocery, mini-marts, clothing shops",
  "p1.sizes": "25×30×10 · 30×35×12 · 35×40×15 cm · custom",
  "p1.mat": "PP non-woven · laminated (glossy/matte)",
  "p1.gsm": "70 / 80 / 100 / 120 gsm",
  "p1.colors": "White, green, red, yellow, blue, black, custom",
  "p2.name": "Takeaway bag",
  "p2.desc": "Compact, fits 1–2 cups or a food box. Every takeaway order becomes a walking ad for your brand.",
  "p2.best": "Best for: bubble tea, cafes, restaurants, bakeries",
  "p2.sizes": "1-cup 12×22×10 · 2-cup 20×22×10 · box 25×20×15 cm",
  "p2.mat": "PP non-woven · water-resistant laminated",
  "p2.gsm": "50 / 70 / 80 gsm",
  "p2.colors": "White, cream, green, brown, pink, custom",
  "p3.name": "Promotional / gift bag",
  "p3.desc": "Flat or gusseted, sharp full-surface printing. For conferences, grand openings and client gifts.",
  "p3.best": "Best for: events, conferences, openings, gifts",
  "p3.sizes": "30×40 · 35×45 (flat) · 30×40×10 cm (gusset) · custom",
  "p3.mat": "PP non-woven · heat-transfer laminated (full color)",
  "p3.gsm": "80 / 100 / 120 gsm",
  "p3.colors": "Full-color print per your design · custom fabric colors",
  "gal.title": "Design references",
  "gal.note": "Our team builds a free mockup from your logo within 3 working days. Ready pattern library available — or print your own artwork.",
  "proc.title": "How to order",
  "proc.1t": "Send your logo via Zalo", "proc.1": "Include bag type, estimated quantity and deadline.",
  "proc.2t": "Get a free mockup", "proc.2": "Within 3 working days, with a detailed quote. Revise until you're happy.",
  "proc.3t": "Approve & 50% deposit", "proc.3": "Sign off the print proof via Zalo. Contract / invoice available.",
  "proc.4t": "Production & delivery", "proc.4": "7–14 days, door-to-door nationwide. Inspect before paying the balance.",
  "ct.title": "Contact for a quote",
  "ct.zalo": "Zalo (fastest)", "ct.phone": "Phone", "ct.email": "Email", "ct.web": "Website",
  "ct.addr": "Sales office", "ct.addrv": "123 Quoc lo 1A, Binh Hung Hoa, Binh Tan, Ho Chi Minh City",
  "ct.cta": "Send your logo today — quote within 30 minutes (working hours)",
  "foot": "URBANE CARRY — custom printed non-woven bags at factory prices",
},
"zh": {
  "lang.print": "导出 PDF", "lang.hint": "选择语言后点击导出 PDF——在打印对话框中选择「存储为 PDF」",
  "cover.tagline": "无纺布袋定制印 LOGO — 工厂直供价",
  "cover.sub": "100 个起订 · 免费设计 · 越南全国发货",
  "cover.contact": "Zalo: 0909 123 456 · baogia@urbanecarry.vn",
  "about.title": "源头工厂直供——没有中间商",
  "about.body": "自 2015 年起，URBANE CARRY 在自有工厂直接生产无纺布袋。客户直接与一线生产者对接：真正的出厂价、修改响应快、对每一个袋子负责到底。我们专注服务奶茶店、咖啡店、餐馆、零售店铺及需要活动礼品的企业。",
  "about.s1n": "10+", "about.s1": "年无纺布袋生产经验",
  "about.s2n": "50,000", "about.s2": "个 / 月最大产能",
  "about.s3n": "4 条", "about.s3": "工业缝制生产线",
  "about.s4n": "100%", "about.s4": "工厂次品换新",
  "about.captitle": "生产能力",
  "about.c1t": "自有缝制车间", "about.c1": "4 条工业生产线、25 名熟练工人，进度自主可控，交期说到做到。",
  "about.c2t": "厂内印刷", "about.c2": "丝印 1–3 色清晰锐利；热转印支持全彩设计，颜色严格对照已确认样稿。",
  "about.c3t": "布料源头直采", "about.c3": "PP 无纺布 50–120 gsm 整卷大批量采购，常用颜色齐全，源头价格。",
  "about.c4t": "逐批质检", "about.c4": "装箱前检查缝线、油墨附着力和数量。",
  "spec.sizes": "尺寸", "spec.materials": "材质", "spec.thickness": "布料克重", "spec.colors": "颜色",
  "price.qty": "数量", "price.unit": "单价", "price.note": "参考价（越南盾），含单面单色 LOGO 印刷。多色印刷/定制尺寸请联系报价。",
  "unit": "个",
  "p1.name": "超市购物袋（立体有侧襠）",
  "p1.desc": "盒型，带侧襠和宽底，可站立、装载量大，零售场景最常用的袋型。",
  "p1.best": "适合：杂货店、小型超市、服装店",
  "p1.sizes": "25×30×10 · 30×35×12 · 35×40×15 cm · 支持定制",
  "p1.mat": "PP 无纺布 · 覆膜（亮面/哑面）",
  "p1.gsm": "70 / 80 / 100 / 120 gsm",
  "p1.colors": "白、绿、红、黄、蓝、黑，支持定制",
  "p2.name": "外卖打包袋（takeaway）",
  "p2.desc": "小巧轻便，可装 1–2 杯饮品或餐盒。每一单外卖都是品牌的移动广告。",
  "p2.best": "适合：奶茶店、咖啡店、餐馆、烘焙店",
  "p2.sizes": "单杯 12×22×10 · 双杯 20×22×10 · 餐盒 25×20×15 cm",
  "p2.mat": "PP 无纺布 · 防水覆膜",
  "p2.gsm": "50 / 70 / 80 gsm",
  "p2.colors": "白、米、绿、棕、粉，支持定制",
  "p3.name": "广告宣传袋 — 活动礼品袋",
  "p3.desc": "平面或立体袋型，整面印刷清晰锐利。适合会议、开业庆典和客户礼品。",
  "p3.best": "适合：活动、会议、开业、礼品",
  "p3.sizes": "30×40 · 35×45（平面）· 30×40×10 cm（立体）· 支持定制",
  "p3.mat": "PP 无纺布 · 覆膜热转印（全彩）",
  "p3.gsm": "80 / 100 / 120 gsm",
  "p3.colors": "按设计稿全彩印刷 · 布料颜色可定制",
  "gal.title": "设计案例参考",
  "gal.note": "设计团队 3 个工作日内按您的 LOGO 免费出效果图。有现成图案库，也可按您的设计文件印刷。",
  "proc.title": "下单流程",
  "proc.1t": "通过 Zalo 发送 LOGO", "proc.1": "附上袋型、预计数量和交货时间。",
  "proc.2t": "免费获取效果图", "proc.2": "3 个工作日内出稿，附详细报价，满意为止随意修改。",
  "proc.3t": "确认样稿并付 50% 定金", "proc.3": "通过 Zalo 签认印刷样稿，可提供合同/发票。",
  "proc.4t": "生产与发货", "proc.4": "7–14 天，全国送货上门，验货后再付尾款。",
  "ct.title": "联系报价",
  "ct.zalo": "Zalo（最快）", "ct.phone": "电话", "ct.email": "邮箱", "ct.web": "网站",
  "ct.addr": "营业联络处", "ct.addrv": "越南胡志明市平新郡平兴和坊 1A 国道 123 号",
  "ct.cta": "今天发送 LOGO——工作时间 30 分钟内回复报价",
  "foot": "URBANE CARRY — 无纺布袋定制印刷，工厂直供",
},
}


def img_uri(rel, width=None):
    from PIL import Image
    p = IMG / rel
    im = Image.open(p)
    if width and im.width > width:
        im = im.resize((width, int(width * im.height / im.width)), Image.LANCZOS)
    buf = io.BytesIO()
    im.convert("RGB").save(buf, "JPEG", quality=80, optimize=True)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()


def t(key):
    return f'<span data-i18n="{key}">{I18N["vi"][key]}</span>'


def price_table(slug):
    rows = "".join(
        f'<tr><td>{q:,}'.replace(",", ".") + f' <span data-i18n="unit">cái</span></td><td class="pr">{p}</td></tr>'
        for q, p in TIERS[slug])
    return f'''<table class="price"><thead><tr><th>{t("price.qty")}</th><th>{t("price.unit")}</th></tr></thead>
<tbody>{rows}</tbody></table>'''


def product_page(n, slug, img):
    k = f"p{n}"
    return f'''<section class="page">
  <div class="phead"><span class="pnum">0{n + 2}</span><h2>{t(k + ".name")}</h2></div>
  <div class="pbody">
    <div class="pleft"><img class="pphoto" src="{img}"><p class="best">{t(k + ".best")}</p></div>
    <div class="pright">
      <p class="pdesc">{t(k + ".desc")}</p>
      <dl class="specs">
        <dt>{t("spec.sizes")}</dt><dd>{t(k + ".sizes")}</dd>
        <dt>{t("spec.materials")}</dt><dd>{t(k + ".mat")}</dd>
        <dt>{t("spec.thickness")}</dt><dd>{t(k + ".gsm")}</dd>
        <dt>{t("spec.colors")}</dt><dd>{t(k + ".colors")}</dd>
      </dl>
      {price_table(slug)}
      <p class="pnote">{t("price.note")}</p>
    </div>
  </div>
  <div class="pfoot">{t("foot")}</div>
</section>'''


def build():
    fonts = FONT_CSS.read_text() if FONT_CSS.exists() else ""
    hero = img_uri("tui-sieu-thi.jpg", 900)
    prods = [img_uri(f"{s}.jpg", 640) for s in ("tui-sieu-thi", "tui-mang-di", "tui-quang-cao")]
    gallery = "".join(f'<img src="{img_uri(g, 460)}">' for g in GALLERY)
    leaf = '''<svg viewBox="0 0 24 24" class="leaf"><rect width="24" height="24" rx="5.5" fill="#1e7a45"/>
<path d="M12 4.5c-3.6 2.3-3.6 7.2 0 9.9 3.6-2.7 3.6-7.6 0-9.9Z" fill="#fff"/>
<path d="M12 14v5" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>'''

    html = f'''<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>URBANE CARRY — Brochure</title>
<style>
{fonts}
*{{margin:0;padding:0;box-sizing:border-box}}
:root{{--forest:#123b26;--leaf:#1e7a45;--mint:#eef6f0;--ink:#1c2a21;--soft:#5a6e61;--line:#d7e3da}}
body{{font-family:'Be Vietnam Pro',-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;background:#e7ece8;color:var(--ink);-webkit-print-color-adjust:exact;print-color-adjust:exact}}
.toolbar{{position:fixed;top:0;left:0;right:0;z-index:50;background:#fff;border-bottom:1px solid var(--line);display:flex;align-items:center;gap:10px;padding:10px 18px;flex-wrap:wrap}}
.toolbar .langs{{display:flex;gap:6px}}
.toolbar button{{font:inherit;font-weight:700;font-size:14px;padding:8px 16px;border-radius:999px;border:1px solid var(--line);background:#fff;cursor:pointer}}
.toolbar button.active{{background:var(--leaf);border-color:var(--leaf);color:#fff}}
.toolbar .pdf{{background:var(--forest);border-color:var(--forest);color:#fff;margin-left:auto}}
.toolbar .hint{{font-size:12px;color:var(--soft);flex-basis:100%}}
.doc{{padding:86px 0 40px}}
.page{{width:210mm;height:297mm;margin:0 auto 24px;background:#fff;box-shadow:0 10px 30px rgba(18,59,38,.14);position:relative;overflow:hidden;padding:16mm 16mm 20mm;display:flex;flex-direction:column}}
.pfoot{{position:absolute;left:16mm;right:16mm;bottom:8mm;font-size:9px;letter-spacing:1px;color:var(--soft);border-top:1px solid var(--line);padding-top:6px;display:flex;justify-content:space-between}}
.pfoot::after{{content:"urbanecarry — trang " counter(page)}}
.leaf{{width:34px;height:34px}}

/* 封面 */
.cover{{background:var(--forest);color:#fff;justify-content:center;align-items:center;text-align:center}}
.cover .leaf{{width:64px;height:64px}}
.cover h1{{font-size:46px;font-weight:800;letter-spacing:6px;margin-top:22px}}
.cover .tag{{font-size:19px;font-weight:700;color:#cfe6d5;margin-top:14px}}
.cover .sub{{font-size:13px;color:#9fbfa9;margin-top:10px}}
.cover img{{width:96mm;border-radius:14px;margin-top:12mm;box-shadow:0 16px 40px rgba(0,0,0,.35)}}
.cover .contact{{margin-top:12mm;font-size:13px;font-weight:700;background:#ffffff18;padding:10px 26px;border-radius:999px}}
.cover .pfoot{{display:none}}

/* 通用标题 */
.phead{{display:flex;align-items:baseline;gap:14px;border-bottom:3px solid var(--leaf);padding-bottom:10px}}
.pnum{{font-size:30px;font-weight:800;color:var(--leaf)}}
h2{{font-size:24px;font-weight:800;color:var(--forest)}}

/* 关于页 */
.about-body{{font-size:13.5px;line-height:1.8;color:var(--soft);margin-top:8mm}}
.stats{{display:grid;grid-template-columns:repeat(4,1fr);gap:5mm;margin-top:8mm}}
.stats div{{border:1px solid var(--line);border-radius:10px;text-align:center;padding:7mm 2mm}}
.stats b{{display:block;font-size:24px;color:var(--leaf)}}
.stats span{{font-size:10.5px;color:var(--soft)}}
h3{{font-size:16px;font-weight:800;color:var(--forest);margin-top:9mm}}
.caps{{display:grid;grid-template-columns:1fr 1fr;gap:5mm;margin-top:5mm}}
.caps div{{background:var(--mint);border-radius:10px;padding:6mm}}
.caps b{{display:block;font-size:13px;color:var(--forest);margin-bottom:3px}}
.caps p{{font-size:11px;line-height:1.65;color:var(--soft)}}

/* 产品页 */
.pbody{{display:grid;grid-template-columns:72mm 1fr;gap:8mm;margin-top:8mm}}
.pphoto{{width:100%;border-radius:12px}}
.best{{font-size:11px;font-weight:700;color:var(--leaf);margin-top:4mm;line-height:1.5}}
.pdesc{{font-size:12.5px;line-height:1.75;color:var(--soft)}}
.specs{{margin-top:5mm;display:grid;grid-template-columns:26mm 1fr;row-gap:2.6mm;font-size:11px}}
.specs dt{{font-weight:800;color:var(--forest);text-transform:uppercase;letter-spacing:.5px;font-size:9.5px;padding-top:1px}}
.specs dd{{color:var(--ink);line-height:1.5}}
.price{{width:100%;border-collapse:collapse;margin-top:5mm;font-size:12px}}
.price th{{background:var(--mint);color:var(--forest);text-align:left;padding:2.6mm 4mm;font-size:10.5px;letter-spacing:.5px}}
.price td{{border-bottom:1px solid var(--line);padding:2.4mm 4mm}}
.price .pr{{font-weight:800;color:var(--leaf)}}
.pnote{{font-size:9.5px;color:var(--soft);margin-top:3mm;line-height:1.6}}

/* 案例页 */
.gallery{{display:grid;grid-template-columns:repeat(3,1fr);gap:5mm;margin-top:8mm}}
.gallery img{{width:100%;border-radius:10px}}
.gal-note{{margin-top:6mm;background:var(--mint);border-radius:10px;padding:5mm 6mm;font-size:11.5px;line-height:1.7;color:var(--forest)}}

/* 流程+联系页 */
.steps{{display:grid;grid-template-columns:1fr 1fr;gap:5mm;margin-top:8mm}}
.steps div{{border:1px solid var(--line);border-radius:10px;padding:6mm}}
.steps .n{{display:inline-flex;width:9mm;height:9mm;border-radius:50%;background:var(--leaf);color:#fff;font-weight:800;align-items:center;justify-content:center;font-size:13px}}
.steps b{{display:block;font-size:13px;color:var(--forest);margin-top:3mm}}
.steps p{{font-size:11px;line-height:1.65;color:var(--soft);margin-top:2mm}}
.contact{{margin-top:9mm;background:var(--forest);border-radius:12px;color:#fff;padding:8mm;display:grid;grid-template-columns:1fr 1fr;gap:4mm 8mm}}
.contact div b{{display:block;font-size:10px;letter-spacing:1px;color:#9fbfa9;text-transform:uppercase}}
.contact div span{{font-size:14px;font-weight:700}}
.cta-line{{margin-top:6mm;text-align:center;font-size:13px;font-weight:800;color:var(--leaf)}}

@media print{{
  .toolbar{{display:none}}
  body{{background:#fff}}
  .doc{{padding:0}}
  .page{{margin:0;box-shadow:none;page-break-after:always}}
  .page:last-child{{page-break-after:auto}}
}}
@page{{size:A4;margin:0}}
</style>
</head>
<body>
<div class="toolbar">
  <div class="langs">
    <button data-lang="vi" class="active">Tiếng Việt</button>
    <button data-lang="en">English</button>
    <button data-lang="zh">中文</button>
  </div>
  <button class="pdf" onclick="window.print()" data-i18n="lang.print">Xuất PDF</button>
  <div class="hint" data-i18n="lang.hint"></div>
</div>
<div class="doc">

<section class="page cover">
  {leaf}
  <h1>URBANE CARRY</h1>
  <div class="tag">{t("cover.tagline")}</div>
  <div class="sub">{t("cover.sub")}</div>
  <img src="{hero}">
  <div class="contact">{t("cover.contact")}</div>
</section>

<section class="page">
  <div class="phead"><span class="pnum">02</span><h2>{t("about.title")}</h2></div>
  <p class="about-body">{t("about.body")}</p>
  <div class="stats">
    <div><b>{t("about.s1n")}</b><span>{t("about.s1")}</span></div>
    <div><b>{t("about.s2n")}</b><span>{t("about.s2")}</span></div>
    <div><b>{t("about.s3n")}</b><span>{t("about.s3")}</span></div>
    <div><b>{t("about.s4n")}</b><span>{t("about.s4")}</span></div>
  </div>
  <h3>{t("about.captitle")}</h3>
  <div class="caps">
    <div><b>{t("about.c1t")}</b><p>{t("about.c1")}</p></div>
    <div><b>{t("about.c2t")}</b><p>{t("about.c2")}</p></div>
    <div><b>{t("about.c3t")}</b><p>{t("about.c3")}</p></div>
    <div><b>{t("about.c4t")}</b><p>{t("about.c4")}</p></div>
  </div>
  <div class="pfoot">{t("foot")}</div>
</section>

{product_page(1, "tui-sieu-thi", prods[0])}
{product_page(2, "tui-mang-di", prods[1])}
{product_page(3, "tui-quang-cao", prods[2])}

<section class="page">
  <div class="phead"><span class="pnum">06</span><h2>{t("gal.title")}</h2></div>
  <div class="gallery">{gallery}</div>
  <div class="gal-note">{t("gal.note")}</div>
  <div class="pfoot">{t("foot")}</div>
</section>

<section class="page">
  <div class="phead"><span class="pnum">07</span><h2>{t("proc.title")}</h2></div>
  <div class="steps">
    <div><span class="n">1</span><b>{t("proc.1t")}</b><p>{t("proc.1")}</p></div>
    <div><span class="n">2</span><b>{t("proc.2t")}</b><p>{t("proc.2")}</p></div>
    <div><span class="n">3</span><b>{t("proc.3t")}</b><p>{t("proc.3")}</p></div>
    <div><span class="n">4</span><b>{t("proc.4t")}</b><p>{t("proc.4")}</p></div>
  </div>
  <h3>{t("ct.title")}</h3>
  <div class="contact">
    <div><b>{t("ct.zalo")}</b><span>0909 123 456</span></div>
    <div><b>{t("ct.phone")}</b><span>0909 123 456</span></div>
    <div><b>{t("ct.email")}</b><span>baogia@urbanecarry.vn</span></div>
    <div><b>{t("ct.web")}</b><span>19990723zww.github.io/handbag</span></div>
    <div style="grid-column:1/-1"><b>{t("ct.addr")}</b><span style="font-size:12px">{t("ct.addrv")}</span></div>
  </div>
  <div class="cta-line">{t("ct.cta")}</div>
  <div class="pfoot">{t("foot")}</div>
</section>

</div>
<script>
const I18N = {json.dumps(I18N, ensure_ascii=False)};
function setLang(l) {{
  document.documentElement.lang = l === "zh" ? "zh" : l;
  document.querySelectorAll("[data-i18n]").forEach(el => {{
    const v = I18N[l][el.dataset.i18n];
    if (v !== undefined) el.innerHTML = v;
  }});
  document.querySelectorAll(".langs button").forEach(b =>
    b.classList.toggle("active", b.dataset.lang === l));
  try {{ localStorage.setItem("brochure-lang", l); }} catch (e) {{}}
}}
document.querySelectorAll(".langs button").forEach(b =>
  b.addEventListener("click", () => setLang(b.dataset.lang)));
setLang((()=>{{ try {{ return localStorage.getItem("brochure-lang") || "vi"; }} catch(e) {{ return "vi"; }} }})());
</script>
</body>
</html>'''
    OUT.write_text(html)
    print(f"OK -> {OUT} ({OUT.stat().st_size // 1024} KB)")


def export_pdfs():
    from playwright.sync_api import sync_playwright
    pdf_dir = ROOT / "marketing/brochure-pdf"
    pdf_dir.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        b = p.chromium.launch(headless=True)
        pg = b.new_page()
        pg.goto(f"file://{OUT}")
        pg.wait_for_timeout(400)
        for lang in ("vi", "en", "zh"):
            pg.evaluate(f"setLang('{lang}')")
            pg.wait_for_timeout(200)
            pg.pdf(path=str(pdf_dir / f"urbane-carry-brochure-{lang}.pdf"),
                   format="A4", print_background=True)
            print(f"PDF -> urbane-carry-brochure-{lang}.pdf")
        b.close()


if __name__ == "__main__":
    build()
    if "--pdf" in sys.argv:
        export_pdfs()
