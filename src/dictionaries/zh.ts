import { vi } from "./vi";

// ============================================================
// 中文内容 — 网站文案在这里修改
// ============================================================
export const zh: typeof vi = {
  htmlLang: "zh",
  numberLocale: "zh-CN",
  currency: "₫",
  perUnit: "/个",
  unitWord: "个",

  meta: {
    defaultTitle: "无纺布袋定制印 LOGO，工厂直供价",
    defaultDesc:
      "面向越南市场的无纺布袋源头工厂：定制印刷 LOGO，100 个起批，免费设计打样图，全国发货。通过 Zalo 或 WhatsApp 联系，30 分钟内回复报价。",
    keywords: [
      "无纺布袋 越南",
      "定制印LOGO袋",
      "批发环保袋 越南",
      "无纺布袋工厂",
      "奶茶外卖袋定制",
      "越南 环保袋 批发",
    ],
    ogLocale: "zh_CN",
    home: {
      title: "无纺布袋定制印刷 LOGO — 工厂直供价，越南全国发货",
      desc: "无纺布袋源头工厂：超市购物袋、奶茶外卖袋、广告宣传袋。100 个起批，免费设计，越南全国发货。",
    },
    products: {
      title: "产品与批发价目表 — 无纺布袋定制印刷",
      desc: "按数量分档的批发价：100 / 500 / 1,000 / 5,000 个。超市袋、外卖袋、广告袋，各种尺寸，布料克重 50–120 gsm。",
    },
    process: {
      title: "下单流程 — 4 步，5–7 天交货",
      desc: "定制流程：通过 Zalo/WhatsApp 发送 LOGO → 免费获取设计效果图 → 确认样稿并付定金 → 生产并全国发货，5–7 天完成。",
    },
    about: {
      title: "关于工厂 — 源头生产，非中间商",
      desc: "无纺布袋源头工厂，2015 年至今：4 条缝制生产线、自有丝印车间、月产能 50,000 个。真正的出厂价。",
    },
    contact: {
      title: "联系报价 — 30 分钟内回复",
      desc: "通过 Zalo、WhatsApp、电话或报价表单联系工厂，工作时间 30 分钟内回复。下单前可免费获取布料样品。",
    },
  },

  nav: {
    home: "首页",
    products: "产品与报价",
    process: "下单流程",
    about: "关于工厂",
    contact: "联系我们",
    chatZalo: "Zalo 咨询",
    chatZaloNow: "立即 Zalo 咨询",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    mainMenu: "主菜单",
    mobileMenu: "移动端菜单",
    langSwitch: "语言",
  },

  floating: {
    zaloAria: "通过 Zalo 联系工厂",
    callNow: "立即致电",
    zalo: "Zalo",
    quote: "获取报价",
  },

  footer: {
    blurb: "无纺布袋定制印刷源头工厂。出厂价直供——没有中间商，越南全国发货。",
    linksTitle: "快速链接",
    linkProducts: "产品与价目表",
    linkProcess: "下单流程",
    linkAbout: "关于工厂",
    linkContact: "联系报价",
    contactTitle: "联系方式",
    zaloTag: "（Zalo）",
    copyrightTail: "无纺布袋 — LOGO 定制印刷 — 批发直供。",
  },

  quote: {
    title: "10 秒估算价格",
    bagType: "袋型",
    quantity: "数量",
    quantityAria: "选择数量",
    refPrice: "参考单价（含印 LOGO）",
    totalLabel: "总计约",
    cta: "Zalo 咨询 — 锁定准确价格",
    note: "通过 Zalo 发送 LOGO，30 分钟内免费获取设计效果图",
  },

  bagArt: {
    ariaSupermarket: "无纺布超市购物袋插图",
    ariaTakeaway: "装有饮品杯的外卖袋插图",
    ariaPromo: "印有 LOGO 的广告袋插图",
    logo: "LOGO",
    teaShop: "自家手作奶茶",
    brand: "您的品牌",
    fullColor: "按设计稿全彩印刷",
  },

  products: {
    "tui-sieu-thi": {
      name: "超市购物袋（立体有侧襠）",
      shortName: "超市购物袋",
      description:
        "盒型无纺布袋，带侧襠和宽底，可站立、装载量大。零售店和小型超市最常用的袋型。",
      bestFor: "杂货店、小型超市、服装店",
      sizes: ["25×30×10 cm", "30×35×12 cm", "35×40×15 cm", "支持定制尺寸"],
      materials: ["PP 无纺布", "覆膜无纺布（亮面 / 哑面）"],
      thickness: ["70 gsm", "80 gsm", "100 gsm", "120 gsm"],
      colors: ["白色", "绿色", "红色", "黄色", "蓝色", "黑色", "支持定制颜色"],
    },
    "tui-mang-di": {
      name: "外卖打包袋（takeaway）",
      shortName: "外卖打包袋",
      description:
        "小巧的袋子，可装 1–2 杯奶茶、咖啡或餐盒。把店铺 LOGO 印上去——每一单外卖都是品牌的移动广告。",
      bestFor: "奶茶店、咖啡店、餐馆、烘焙店",
      sizes: ["单杯装（12×22×10 cm）", "双杯装（20×22×10 cm）", "餐盒装（25×20×15 cm）"],
      materials: ["PP 无纺布", "防水覆膜无纺布"],
      thickness: ["50 gsm", "70 gsm", "80 gsm"],
      colors: ["白色", "米色", "绿色", "棕色", "粉色", "支持定制颜色"],
    },
    "tui-quang-cao": {
      name: "广告宣传袋 — 活动礼品袋",
      shortName: "广告宣传袋",
      description:
        "平面或立体袋型，整面印刷清晰锐利。适合会议礼品、开业活动、资料袋或促销品包装。",
      bestFor: "活动、会议、开业庆典、客户礼品",
      sizes: ["30×40 cm（平面）", "35×45 cm（平面）", "30×40×10 cm（立体）", "支持定制尺寸"],
      materials: ["PP 无纺布", "覆膜布热转印（全彩印刷）"],
      thickness: ["80 gsm", "100 gsm", "120 gsm"],
      colors: ["按设计稿全彩印刷", "布料颜色可定制"],
    },
  },

  home: {
    badge: "源头工厂直供，一手价格",
    heroTitle: ["无纺布袋定制印 LOGO，", "工厂直供价"],
    heroSub:
      "源头价格，按需印制 LOGO，100 个起订。免费设计，5–7 天快速生产，越南全国发货。",
    ctaQuote: "获取报价",
    ctaZalo: "Zalo 联系",
    socialProof: "已服务 1,200+ 家奶茶店、咖啡店和零售店铺",
    productsHeading: "三大畅销袋型",
    productsSub: "参考价已含单色 LOGO 印刷——点击查看 4 档数量的完整价格。",
    viewAll: "查看全部产品与价目表 →",
    bestSeller: "畅销",
    fromOnly: "低至",
    whyHeading: "为什么 1,200+ 店主选择{name}？",
    benefits: [
      {
        title: "出厂价，无中间商",
        desc: "自有工厂直接生产——价格按数量公开透明，订得越多单价越低。",
      },
      {
        title: "免费设计",
        desc: "通过 Zalo 发送 LOGO，设计团队 30 分钟内免费做出完整袋子效果图——确认后才投产。",
      },
      {
        title: "全国发货",
        desc: "越南全国送货上门，可靠物流配送。先验货后签收。",
      },
    ],
    stepsHeading: "只需 4 步，定制印 LOGO 袋",
    stepLabel: "第",
    steps: [
      ["通过 Zalo 发送 LOGO", "附上袋型和预计数量"],
      ["免费获取效果图", "设计 30 分钟内出稿"],
      ["确认样稿并付定金", "锁定价格，签认印刷样稿"],
      ["生产与发货", "5–7 天，全国送货上门"],
    ],
    viewProcess: "查看详细流程 →",
    ctaHeading: "今天发送 LOGO — 30 分钟拿到效果图",
    ctaSub: "免费报价，无任何约束。直接与工厂沟通，没有中间销售。",
    ctaZaloFull: "Zalo 咨询：{phone}",
    ctaForm: "填写报价表单",
  },

  productsPage: {
    heading: "产品与批发价目表",
    intro1: "参考价已含",
    introBold: "单面单色 LOGO 印刷",
    intro2: "。多色印刷、双面印刷或定制尺寸——Zalo 咨询，30 分钟内回复准确报价。",
    jumpAria: "快速跳转到产品",
    quoteBtn: "获取{product}报价",
    bestForLabel: "适合：",
    specSizes: "尺寸",
    specMaterials: "材质",
    specThickness: "布料克重",
    specColors: "颜色",
    tableCaption: "{product}按数量分档价格表",
    thQty: "数量",
    thUnit: "单价",
    thTotal: "参考总价",
    bestPrice: "（最优价）",
    footnote: "* 价格随布料克重、印刷颜色数量和时期浮动——请联系确认最终价格。",
    undecidedHeading: "不确定选哪种袋型？",
    undecidedSub: "在 Zalo 上描述您的店铺，工厂为您推荐性价比最高的袋型和尺寸。",
    undecidedZalo: "Zalo 免费咨询",
    undecidedProcess: "查看下单流程",
    examplesTitle: "现成印花图案",
    examplesNote: "全彩热转印满版印花——可选现成图案，也可以用您自己的设计。",
  },

  processPage: {
    heading: "下单流程 — 5–7 天拿到袋子",
    sub: "全程通过 Zalo 完成，无需到厂。先确认设计，后付定金——投产前您一定能看到自己袋子的最终样子。",
    steps: [
      {
        title: "通过 Zalo 发送 LOGO",
        time: "5 分钟",
        desc: "拍照或发送 LOGO 文件（AI、PDF、PNG 都可以，名片照片也行）。告知袋型、预计数量和交货时间。",
        note: "还没有 LOGO？设计团队可优惠为您重绘或全新设计。",
      },
      {
        title: "免费获取设计效果图",
        time: "30 分钟内",
        desc: "工厂用您的 LOGO 做出完整袋子效果图：印刷位置、字体大小、布料颜色。满意为止随意修改——完全免费，无需定金。",
        note: "同时附上按您所选数量和规格的详细报价。",
      },
      {
        title: "确认样稿并付定金",
        time: "1 天",
        desc: "通过 Zalo 签认印刷样稿并支付 50% 定金。3,000 个以上的订单可要求先实印 1–2 个样品检验，再批量生产。",
        note: "需要凭证的客户可提供完整合同/发票。",
      },
      {
        title: "生产与发货",
        time: "5–7 天",
        desc: "裁布、丝印/热转印、缝制成品并逐批质检。全国送货上门，可靠物流配送。收货时支付尾款。",
        note: "工厂原因导致的次品：100% 换新，绝不扯皮。",
      },
    ],
    ctaHeading: "现在就开始第一步",
    ctaSub: "通过 Zalo 发送 LOGO——30 分钟后效果图和报价就到您手上。",
    ctaBtn: "Zalo 发送 LOGO：{phone}",
    faqHeading: "常见问题",
    faqs: [
      [
        "最少订多少个？",
        "现有模具款式 100 个起订。100 个以下也接，但因制版成本，单价会略高。",
      ],
      [
        "可以印多种颜色吗？",
        "可以。丝印按颜色数量计费；热转印/贴膜印刷支持全彩，适合带渐变或图片的 LOGO。",
      ],
      [
        "很急能赶得上吗？",
        "2,000 个以内的加急单 3–4 天可完成（少量加收费用）。请提前在 Zalo 告知，以便工厂安排机器排期。",
      ],
      [
        "外省或海外怎么下单？",
        "全流程通过 Zalo/WhatsApp 完成：在线确认设计，发货前查看成品照片/视频。经可靠物流发货，验货后再付尾款。",
      ],
    ],
    moreQuestions: "还有其他问题？",
    contactLink: "联系工厂 →",
  },

  aboutPage: {
    eyebrow: "关于{name}",
    heading: "我们是生产工厂——不是中间商",
    sub: "自 {year} 年起，{name}在自有工厂直接生产无纺布袋。您直接与一线生产者对接：真正的出厂价，修改响应快，对每一个袋子负责到底。",
    stats: [
      ["10+", "年无纺布袋生产经验"],
      ["50,000", "个 / 月最大产能"],
      ["1,200+", "家店铺客户"],
      ["100%", "工厂次品换新"],
    ],
    capHeading: "生产能力",
    capabilities: [
      {
        title: "自有缝制车间",
        desc: "4 条工业缝制生产线、25 名熟练工人。进度自主可控，不依赖外协加工——交期说到做到。",
      },
      {
        title: "厂内印刷",
        desc: "手工丝印保证 1–3 色 LOGO 在无纺布上清晰锐利，热转印设备支持全彩设计。印完即缝，颜色严格对照已确认的样稿。",
      },
      {
        title: "布料源头直采",
        desc: "PP 无纺布 50–120 gsm 整卷大批量采购，常用颜色齐全。源头拿料，成品价格始终低于贸易公司。",
      },
      {
        title: "逐批质检",
        desc: "每批货装箱前检查缝线、油墨附着力和数量。工厂原因的次品 100% 换新。",
      },
    ],
    whyHeading: "为什么从工厂直接买更便宜？",
    whyBody:
      "网上大多数卖印 LOGO 袋的是贸易公司：接了您的单，再转给我们这样的工厂，中间加价 20–40%。直接和工厂合作，您省下这笔差价，确认设计更快，售后也不用等“我帮您问问工厂”。",
    visit1: "下单前想先摸到布料？免费寄送样品到您手上。营业联络处：",
    visit2: "（{hours}）。",
    ctaHeading: "今天就来验证“出厂价”",
    ctaSub: "把您手上的报价发给我们，工厂按相同规格回报底价——对比之后再做决定。",
    ctaZalo: "Zalo 比价",
    ctaPrices: "查看公开价目表",
  },

  contactPage: {
    heading: "30 分钟内获取报价",
    sub: "最快方式：Zalo 发消息并附上 LOGO 和数量。或填写下方表单，系统会为您拟好消息内容。",
    zaloTitle: "Zalo 咨询（最快）",
    zaloSub: "{phone} — 点击打开聊天",
    callTitle: "直接致电",
    callSub: "{phone}（{hours}）",
    waTitle: "WhatsApp",
    waSub: "国际客户 / 中文沟通均可",
    visitTitle: "办公地址",
    emailLabel: "邮箱：",
    formHeading: "或留下报价需求",
  },

  form: {
    name: "您的姓名 / 店铺名",
    namePh: "例：云朵奶茶",
    phone: "电话号码（Zalo/WhatsApp）",
    phonePh: "+84 9xx xxx xxx",
    product: "需要的袋型",
    productUnknown: "还不确定，需要咨询",
    qty: "预计数量",
    qtyOptions: [
      ["100", "100 个"],
      ["500", "500 个"],
      ["1000", "1,000 个"],
      ["5000", "5,000 个以上"],
    ],
    note: "备注（尺寸、颜色、交货时间…）",
    notePh: "例：双杯袋，米色，20 号前要货",
    submit: "免费获取报价",
    privacy: "信息不会存储到服务器——需求将通过 Zalo/邮件直达工厂。",
    submittedHeading: "就差一步！通过 Zalo 发送需求",
    submittedSub: "消息已为您拟好——复制后粘贴到 Zalo，工作时间内 30 分钟回复报价。",
    copy: "复制内容",
    copied: "已复制 ✓",
    openZalo: "打开 Zalo 发送",
    orEmail: "或通过邮件发送",
    emailSubject: "无纺布袋报价需求",
    msgGreeting: "您好 {name}，我想获取报价：",
    msgName: "姓名",
    msgPhone: "电话",
    msgProduct: "袋型",
    msgQty: "数量",
    msgQtyUnit: "个",
    msgNote: "备注",
  },
};
