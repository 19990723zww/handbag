#!/usr/bin/env python3
"""把 Next.js 站点导出为可双击打开的纯 HTML 版本（html-version/）。

用法：先起服务再运行本脚本
  npm run build && npm run start &
  python3 scripts/export-html.py

结构：html-version/index.html（跳转到越南语首页）+ vi/ en/ zh/ 三个
语言文件夹。原理：抓取每页渲染后的 HTML → 内联 CSS 与字体（base64）→
移除 React 运行时 → 注入原生 JS 恢复交互（估价器、手机菜单、报价表单）。
改了 src/ 里的内容后重新跑一遍即可同步。
"""

import base64
import json
import pathlib
import re
import shutil
import urllib.parse
import urllib.request

BASE = "http://localhost:3000"
ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "html-version"
LANGS = ["vi", "en", "zh"]
PAGES = {
    "index": "",
    "san-pham": "/san-pham",
    "quy-trinh": "/quy-trinh",
    "gioi-thieu": "/gioi-thieu",
    "lien-he": "/lien-he",
}


def fetch(url: str) -> bytes:
    with urllib.request.urlopen(url) as r:
        return r.read()


def extract_products():
    src = (ROOT / "src/data/products.ts").read_text()
    prods = []
    for m in re.finditer(r'slug: "([^"]+)"(.*?)art:', src, re.S):
        tiers = [
            {"quantity": int(q), "price": int(p)}
            for q, p in re.findall(r"quantity: (\d+), price: (\d+)", m.group(2))
        ]
        prods.append({"slug": m.group(1), "tiers": tiers})
    return prods


def extract_site():
    src = (ROOT / "src/data/site.ts").read_text()
    get = lambda k: re.search(rf'{k}: "([^"]+)"', src).group(1)
    return {"name": get("name"), "zaloUrl": get("zaloUrl"), "email": get("email")}


DICT_KEYS = [
    "numberLocale",
    "currency",
    "perUnit",
    "submittedHeading",
    "submittedSub",
    "copy",
    "copied",
    "openZalo",
    "orEmail",
    "emailSubject",
    "msgGreeting",
    "msgName",
    "msgPhone",
    "msgProduct",
    "msgQty",
    "msgQtyUnit",
    "msgNote",
]


def extract_strings(lang: str) -> dict:
    src = (ROOT / f"src/dictionaries/{lang}.ts").read_text()
    out = {}
    for key in DICT_KEYS:
        m = re.search(rf'\b{key}: "([^"]*)"', src)
        out[key] = m.group(1) if m else ""
    return out


CSS_CACHE: dict[str, str] = {}


def inline_css(href: str) -> str:
    if href not in CSS_CACHE:
        css = fetch(BASE + href).decode()

        def to_data_uri(m: re.Match) -> str:
            url = m.group(2)
            if url.startswith("data:"):
                return m.group(0)
            data = fetch(urllib.parse.urljoin(BASE + href, url))
            ext = url.rsplit(".", 1)[-1].split("?")[0]
            mime = {"woff2": "font/woff2", "woff": "font/woff", "ttf": "font/ttf"}.get(
                ext, "application/octet-stream"
            )
            return f"url(data:{mime};base64,{base64.b64encode(data).decode()})"

        CSS_CACHE[href] = re.sub(r"""url\((["']?)([^)"']+)\1\)""", to_data_uri, css)
    return CSS_CACHE[href]


def build_runtime_js(products, site, strings) -> str:
    return (
        "<script>\n(function(){\n"
        f"var DATA={json.dumps(products)};\n"
        f"var SITE={json.dumps(site, ensure_ascii=False)};\n"
        f"var T={json.dumps(strings, ensure_ascii=False)};\n"
        + r"""
function fmt(n){return n.toLocaleString(T.numberLocale)+T.currency}

// ---- 估价器 ----
var sel=document.getElementById('qq-product');
if(sel){
  var box=sel.parentElement;
  while(box&&!box.querySelector('[role="group"]'))box=box.parentElement;
  var btns=Array.prototype.slice.call(box.querySelectorAll('[role="group"] button'));
  var priceEl=box.querySelector('.text-2xl');
  var totalEl=box.querySelector('.text-lg');
  var idx=2;
  function upd(){
    var p=DATA.filter(function(d){return d.slug===sel.value})[0]||DATA[0];
    var i=Math.min(idx,p.tiers.length-1),t=p.tiers[i];
    priceEl.innerHTML=fmt(t.price)+'<span class="text-sm font-medium text-soft"> '+T.perUnit+'</span>';
    totalEl.textContent=fmt(t.price*t.quantity);
    btns.forEach(function(b,j){
      var on=j===i;
      b.className='rounded-lg border py-2 text-sm font-semibold transition-colors '+(on?'border-leaf bg-leaf text-white':'border-line bg-white text-ink hover:border-leaf');
      b.setAttribute('aria-pressed',on?'true':'false');
    });
  }
  btns.forEach(function(b,j){b.addEventListener('click',function(){idx=j;upd();})});
  sel.addEventListener('change',upd);
}

// ---- 手机菜单（从桌面导航克隆链接，语言切换器除外）----
var mbtn=document.querySelector('header button[aria-expanded]');
if(mbtn){
  var links=Array.prototype.slice.call(document.querySelectorAll('header nav a'))
    .filter(function(a){return !a.closest('div[aria-label]')});
  function labelOf(a){
    var t=Array.prototype.filter.call(a.childNodes,function(n){return n.nodeType===3})
      .map(function(n){return n.textContent}).join('').trim();
    return t||a.textContent.trim();
  }
  var menu=document.createElement('nav');
  menu.className='border-t border-line bg-white px-4 pb-4 lg:hidden';
  menu.style.display='none';
  menu.setAttribute('aria-label','menu');
  menu.innerHTML=links.map(function(a){
    if(a.href.indexOf('zalo.me')>=0){
      return '<a href="'+a.getAttribute('href')+'" target="_blank" rel="noopener noreferrer" class="mt-4 flex items-center justify-center gap-2 rounded-full bg-zalo py-3 font-semibold text-white">'+labelOf(a)+'</a>';
    }
    return '<a href="'+a.getAttribute('href')+'" class="block border-b border-line py-3 text-base font-medium text-ink">'+labelOf(a)+'</a>';
  }).join('');
  mbtn.closest('header').appendChild(menu);
  mbtn.addEventListener('click',function(){
    var open=menu.style.display!=='none';
    menu.style.display=open?'none':'block';
    mbtn.setAttribute('aria-expanded',open?'false':'true');
  });
}

// ---- 报价表单 ----
var nameEl=document.getElementById('cf-name');
if(nameEl){
  var form=nameEl.closest('form');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var v=function(id){return document.getElementById(id).value};
    var msg=T.msgGreeting.replace('{name}',SITE.name)
      +'\n- '+T.msgName+': '+v('cf-name')
      +'\n- '+T.msgPhone+': '+v('cf-phone')
      +'\n- '+T.msgProduct+': '+v('cf-product')
      +'\n- '+T.msgQty+': '+v('cf-qty')+' '+T.msgQtyUnit
      +(v('cf-note')?'\n- '+T.msgNote+': '+v('cf-note'):'');
    var div=document.createElement('div');
    div.className='rounded-2xl border border-line bg-white p-6';
    div.innerHTML='<p class="text-lg font-bold text-forest"></p>'
      +'<p class="mt-1 text-sm text-soft"></p>'
      +'<pre class="mt-4 whitespace-pre-wrap rounded-xl bg-mint p-4 text-sm leading-relaxed text-ink"></pre>'
      +'<div class="mt-4 grid gap-2 sm:grid-cols-2">'
      +'<button type="button" class="rounded-full border border-leaf py-3 font-semibold text-leaf transition-colors hover:bg-mint" data-copy></button>'
      +'<a href="'+SITE.zaloUrl+'" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 rounded-full bg-zalo py-3 font-bold text-white transition-colors hover:bg-zalo-dark" data-zalo></a></div>'
      +'<a class="mt-3 block text-center text-sm text-soft underline" data-mail></a>';
    div.children[0].textContent=T.submittedHeading;
    div.children[1].textContent=T.submittedSub;
    div.querySelector('pre').textContent=msg;
    div.querySelector('[data-zalo]').textContent=T.openZalo;
    var mail=div.querySelector('[data-mail]');
    mail.textContent=T.orEmail;
    mail.href='mailto:'+SITE.email
      +'?subject='+encodeURIComponent(T.emailSubject)
      +'&body='+encodeURIComponent(msg);
    var cp=div.querySelector('[data-copy]');
    cp.textContent=T.copy;
    cp.addEventListener('click',function(){
      (navigator.clipboard?navigator.clipboard.writeText(msg):Promise.reject()).then(function(){
        cp.textContent=T.copied;
        setTimeout(function(){cp.textContent=T.copy},2000);
      }).catch(function(){window.prompt('Copy:',msg)});
    });
    form.replaceWith(div);
  });
}
})();
</script>"""
    )


def process(html: str, runtime_js: str) -> str:
    html = re.sub(r"<script\b[^>]*>.*?</script>", "", html, flags=re.S)
    html = re.sub(r"<script\b[^>]*/>", "", html)

    def replace_link(m: re.Match) -> str:
        tag = m.group(0)
        href_m = re.search(r'href="([^"]+)"', tag)
        if not href_m or "/_next/" not in href_m.group(1):
            return tag
        if 'rel="stylesheet"' in tag:
            return "<style>" + inline_css(href_m.group(1)) + "</style>"
        return ""

    html = re.sub(r"<link\b[^>]*>", replace_link, html)
    html = html.replace('<link rel="icon" href="/favicon.ico"/>', "")

    # /{lang}/{page}(#hash)? → ../{lang}/{page}.html ; /{lang} → ../{lang}/index.html
    for lang in LANGS:
        for name, route in PAGES.items():
            if not route:
                continue
            html = html.replace(f'href="/{lang}{route}#', f'href="../{lang}/{name}.html#')
            html = html.replace(f'href="/{lang}{route}"', f'href="../{lang}/{name}.html"')
        html = html.replace(f'href="/{lang}"', f'href="../{lang}/index.html"')

    html = html.replace('src="/products/', 'src="../products/')

    html = html.replace(
        "</body>",
        "<!-- Bản tĩnh xuất từ Next.js. Muốn sửa: đổi nội dung trong src/ rồi chạy lại scripts/export-html.py -->\n"
        + runtime_js
        + "</body>",
    )
    return html


def main():
    products = extract_products()
    site = extract_site()
    for lang in LANGS:
        (OUT / lang).mkdir(parents=True, exist_ok=True)
        runtime_js = build_runtime_js(products, site, extract_strings(lang))
        for name, route in PAGES.items():
            html = fetch(f"{BASE}/{lang}{route}").decode()
            (OUT / lang / f"{name}.html").write_text(process(html, runtime_js))
        print(f"  {lang}/ ({len(PAGES)} pages)")

    products_dir = ROOT / "public/products"
    if products_dir.is_dir():
        shutil.copytree(products_dir, OUT / "products", dirs_exist_ok=True)
        print("  products/ (images)")

    (OUT / "index.html").write_text(
        '<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8">'
        '<meta http-equiv="refresh" content="0;url=vi/index.html">'
        f"<title>{site['name']}</title></head>"
        '<body><a href="vi/index.html">Tiếng Việt</a> · '
        '<a href="en/index.html">English</a> · '
        '<a href="zh/index.html">中文</a></body></html>'
    )
    print(f"OK -> {OUT}")


if __name__ == "__main__":
    main()
