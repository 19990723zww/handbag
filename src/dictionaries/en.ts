import { vi } from "./vi";

// ============================================================
// ENGLISH CONTENT — edit site copy here
// ============================================================
export const en: typeof vi = {
  htmlLang: "en",
  numberLocale: "en-US",
  currency: "₫",
  perUnit: "/pc",
  unitWord: "pcs",

  meta: {
    defaultTitle: "Custom printed non-woven bags at factory prices",
    defaultDesc:
      "Non-woven bag manufacturer serving the Vietnamese market. Custom logo printing, wholesale from 100 pcs, free design mockup, nationwide delivery. Get a quote via Zalo or WhatsApp within 30 minutes.",
    keywords: [
      "non-woven bags Vietnam",
      "custom logo bags",
      "wholesale bags Vietnam",
      "non-woven bag manufacturer",
      "printed tote bags Vietnam",
      "takeaway bags for cafes",
    ],
    ogLocale: "en_US",
    home: {
      title: "Custom Printed Non-Woven Bags at Factory Prices — Vietnam Wholesale",
      desc: "Custom non-woven bags for Vietnam: supermarket totes, takeaway bags, promotional bags. Wholesale from 100 pcs, free design, nationwide delivery.",
    },
    products: {
      title: "Products & wholesale price list for printed non-woven bags",
      desc: "Wholesale prices by quantity — 100 / 500 / 1,000 / 5,000 pcs: supermarket totes, takeaway bags, promotional bags. All sizes, 50–120 gsm fabric.",
    },
    process: {
      title: "How to order printed bags — 4 steps, ready in 5–7 days",
      desc: "Ordering process: send your logo via Zalo or WhatsApp → get a free design mockup → approve and pay deposit → production and nationwide delivery in 5–7 days.",
    },
    about: {
      title: "About us — a real factory, not a reseller",
      desc: "Non-woven bag factory since 2015: 4 sewing lines, in-house screen printing, capacity of 50,000 bags/month. True factory prices.",
    },
    contact: {
      title: "Contact us for a quote — reply within 30 minutes",
      desc: "Reach our bag factory via Zalo, WhatsApp, phone or the quote form. Replies within 30 minutes during working hours. Free fabric samples before you order.",
    },
  },

  nav: {
    home: "Home",
    products: "Products & pricing",
    process: "How to order",
    about: "About the factory",
    contact: "Contact",
    chatZalo: "Chat on Zalo",
    chatZaloNow: "Chat on Zalo now",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainMenu: "Main menu",
    mobileMenu: "Mobile menu",
    langSwitch: "Language",
  },

  floating: {
    zaloAria: "Chat with the factory on Zalo",
    callNow: "Call now",
    zalo: "Zalo",
    quote: "Get a quote",
  },

  footer: {
    blurb:
      "Custom printed non-woven bags at factory-direct prices — no middlemen, nationwide delivery across Vietnam.",
    linksTitle: "Links",
    linkProducts: "Products & price list",
    linkProcess: "How to order",
    linkAbout: "About the factory",
    linkContact: "Get a quote",
    contactTitle: "Contact",
    zaloTag: "(Zalo)",
    copyrightTail: "Non-woven bags — custom logo printing — wholesale prices.",
  },

  quote: {
    title: "Estimate your price in 10 seconds",
    bagType: "Bag type",
    quantity: "Quantity",
    quantityAria: "Choose quantity",
    refPrice: "Reference unit price (logo included)",
    totalLabel: "Total ~",
    cta: "Chat on Zalo — lock in your price",
    note: "Send your logo via Zalo and get a free design mockup within 30 minutes",
  },

  bagArt: {
    ariaSupermarket: "Illustration of a non-woven supermarket tote",
    ariaTakeaway: "Illustration of a takeaway bag holding a drink cup",
    ariaPromo: "Illustration of a promotional bag with printed logo",
    logo: "LOGO",
    teaShop: "HOMEMADE BUBBLE TEA",
    brand: "YOUR BRAND",
    fullColor: "FULL-COLOR CUSTOM PRINT",
  },

  products: {
    "tui-sieu-thi": {
      name: "Supermarket tote (box bag with gussets)",
      shortName: "Supermarket totes",
      description:
        "Box-shaped non-woven bag with side and bottom gussets — stands upright and holds plenty of goods. The most popular choice for retail stores and mini-marts.",
      bestFor: "Grocery stores, mini-marts, clothing shops",
      sizes: ["25×30×10 cm", "30×35×12 cm", "35×40×15 cm", "Custom sizes on request"],
      materials: ["PP non-woven fabric", "Laminated non-woven (glossy / matte)"],
      thickness: ["70 gsm", "80 gsm", "100 gsm", "120 gsm"],
      colors: ["White", "Green", "Red", "Yellow", "Blue", "Black", "Custom colors"],
    },
    "tui-mang-di": {
      name: "Takeaway bag",
      shortName: "Takeaway bags",
      description:
        "Compact bag for 1–2 drink cups or a food box. Print your shop's logo on it — every takeaway order becomes a walking ad for your brand.",
      bestFor: "Bubble tea shops, cafes, restaurants, bakeries",
      sizes: ["1 cup (12×22×10 cm)", "2 cups (20×22×10 cm)", "Food box (25×20×15 cm)"],
      materials: ["PP non-woven fabric", "Water-resistant laminated non-woven"],
      thickness: ["50 gsm", "70 gsm", "80 gsm"],
      colors: ["White", "Cream", "Green", "Brown", "Pink", "Custom colors"],
    },
    "tui-quang-cao": {
      name: "Promotional bag — event giveaways",
      shortName: "Promotional bags",
      description:
        "Flat or gusseted bag with sharp full-surface printing. Perfect for conference gifts, grand openings, documents or promotional products.",
      bestFor: "Events, conferences, grand openings, client gifts",
      sizes: ["30×40 cm (flat)", "35×45 cm (flat)", "30×40×10 cm (gusseted)", "Custom sizes on request"],
      materials: ["PP non-woven fabric", "Laminated fabric with heat-transfer print (full color)"],
      thickness: ["80 gsm", "100 gsm", "120 gsm"],
      colors: ["Full-color print per your design", "Custom fabric colors"],
    },
  },

  home: {
    badge: "Direct manufacturer — true factory pricing",
    heroTitle: ["Custom printed non-woven bags at ", "factory prices"],
    heroSub:
      "True factory-direct pricing, custom logo printing, minimum order just 100 pcs. Free design, 5–7 day production, nationwide delivery.",
    ctaQuote: "Get a quote",
    ctaZalo: "Contact via Zalo",
    socialProof: "Trusted by 1,200+ bubble tea shops, cafes and retail stores",
    productsHeading: "Our three best-selling bag lines",
    productsSub: "Reference prices include 1-color logo printing — see details for all 4 quantity tiers.",
    viewAll: "View all products & pricing →",
    bestSeller: "Best seller",
    fromOnly: "From just",
    whyHeading: "Why do 1,200+ shop owners choose {name}?",
    benefits: [
      {
        title: "Factory prices, no middlemen",
        desc: "Made directly at our own factory — transparent pricing by quantity, the more you order the less you pay.",
      },
      {
        title: "Free design",
        desc: "Send your logo via Zalo and our design team builds a complete bag mockup free within 30 minutes — you approve before we produce.",
      },
      {
        title: "Nationwide delivery",
        desc: "Door-to-door delivery nationwide via trusted carriers. Inspect before you accept.",
      },
    ],
    stepsHeading: "Order printed bags in just 4 steps",
    stepLabel: "Step",
    steps: [
      ["Send your logo via Zalo", "Include bag type and estimated quantity"],
      ["Get a free mockup", "Design ready within 30 minutes"],
      ["Approve & pay deposit", "Lock the price, sign off the print proof"],
      ["Production & delivery", "5–7 days, delivered nationwide"],
    ],
    viewProcess: "See the full process →",
    ctaHeading: "Send your logo today — mockup in 30 minutes",
    ctaSub: "Free quote, no strings attached. Chat directly with the factory — no sales middlemen.",
    ctaZaloFull: "Chat on Zalo: {phone}",
    ctaForm: "Fill in the quote form",
  },

  productsPage: {
    heading: "Products & wholesale prices",
    intro1: "Reference prices include ",
    introBold: "1-color logo printing on one side",
    intro2: ". For multi-color, two-side printing or custom sizes — chat on Zalo for an exact quote within 30 minutes.",
    jumpAria: "Jump to product",
    quoteBtn: "Get a quote: {product}",
    bestForLabel: "Best for:",
    specSizes: "Sizes",
    specMaterials: "Materials",
    specThickness: "Fabric weight",
    specColors: "Colors",
    tableCaption: "Price list for {product} by quantity",
    thQty: "Quantity",
    thUnit: "Unit price",
    thTotal: "Reference total",
    bestPrice: "(best price)",
    footnote: "* Prices vary with fabric weight, print colors and season — contact us to confirm the final price.",
    undecidedHeading: "Not sure which bag to choose?",
    undecidedSub: "Message us on Zalo describing your shop — we'll recommend the most cost-effective bag type and size.",
    undecidedZalo: "Free consultation via Zalo",
    undecidedProcess: "See how to order",
  },

  processPage: {
    heading: "How to order — bags in your hands in 5–7 days",
    sub: "Everything happens over Zalo, no factory visit needed. Approve the design first, pay the deposit after — you always see your exact bag before production starts.",
    steps: [
      {
        title: "Send your logo via Zalo",
        time: "5 minutes",
        desc: "Send your logo file (AI, PDF, PNG — even a photo of your business card works). Tell us the bag type, estimated quantity and when you need the goods.",
        note: "No logo yet? Our design team can redraw or create one for a small fee.",
      },
      {
        title: "Get a free design mockup",
        time: "within 30 minutes",
        desc: "We build a complete bag mockup with your logo: print position, text size, fabric color. Revise as much as you like until you're happy — completely free, no deposit required.",
        note: "Comes with a detailed quote for your exact quantity and specs.",
      },
      {
        title: "Approve & pay deposit",
        time: "1 day",
        desc: "You sign off the print proof (via Zalo) and pay a 50% deposit. Orders from 3,000 pcs can request 1–2 real samples for inspection before mass production.",
        note: "Full contract / invoice available for buyers who need documentation.",
      },
      {
        title: "Production & delivery",
        time: "5–7 days",
        desc: "Fabric cutting, screen/heat-transfer printing, sewing and batch inspection at our factory. Door-to-door delivery nationwide via trusted carriers. Pay the balance on delivery.",
        note: "Factory defects: 100% replacement, no arguments.",
      },
    ],
    ctaHeading: "Start step 1 right now",
    ctaSub: "Send your logo via Zalo — 30 minutes later you'll have a mockup and quote in hand.",
    ctaBtn: "Send your logo via Zalo: {phone}",
    faqHeading: "Frequently asked questions",
    faqs: [
      [
        "What's the minimum order?",
        "From 100 pcs for standard molds. We accept orders under 100 pcs too, but the unit price is higher due to print setup costs.",
      ],
      [
        "Can you print multiple colors?",
        "Yes. Screen printing is charged per color; heat-transfer / decal printing allows full color, ideal for logos with gradients or photos.",
      ],
      [
        "Can you handle rush orders?",
        "Rush orders in 3–4 days are possible for quantities under 2,000 pcs (small surcharge). Let us know via Zalo in advance so we can schedule the machines.",
      ],
      [
        "How do I order from another province or abroad?",
        "The whole process runs over Zalo or WhatsApp: approve designs online, see photos/videos of the goods before shipping. Delivery via trusted carriers, inspect before paying the balance.",
      ],
    ],
    moreQuestions: "Other questions?",
    contactLink: "Contact the factory →",
  },

  aboutPage: {
    eyebrow: "About {name}",
    heading: "We are the factory — not a reseller",
    sub: "Since {year}, {name} has manufactured non-woven bags at its own factory. You work straight with the people running the machines: true factory prices, fast revisions, accountable down to the last bag.",
    stats: [
      ["10+", "years making non-woven bags"],
      ["50,000", "bags / month max capacity"],
      ["1,200+", "shops & stores served"],
      ["100%", "replacement for factory defects"],
    ],
    capHeading: "Production capabilities",
    capabilities: [
      {
        title: "In-house sewing lines",
        desc: "4 industrial sewing lines with 25 skilled workers. Full control of our schedule, no outsourcing — deliveries arrive on time.",
      },
      {
        title: "On-site printing",
        desc: "Manual screen printing for crisp 1–3 color logos on non-woven fabric, plus heat-transfer machines for full-color designs. Printed and sewn under one roof, colors true to the approved proof.",
      },
      {
        title: "Direct-sourced fabric stock",
        desc: "PP non-woven fabric in 50–120 gsm bought in bulk rolls, all popular colors in stock. Buying at the source keeps our finished prices below trading companies.",
      },
      {
        title: "Batch-by-batch inspection",
        desc: "Every batch is checked for stitching, ink adhesion and count before packing. Factory defects are replaced 100%.",
      },
    ],
    whyHeading: "Why is buying from the factory cheaper?",
    whyBody:
      "Most online sellers of printed bags are trading companies: they take your order, place it with a factory like ours, and add a 20–40% markup. Working directly with the factory, you skip that markup, approve designs faster, and never wait for “let me check with the factory” when something needs fixing.",
    visit1: "Want to check the fabric before ordering? We ship free fabric samples to your door. Sales office: ",
    visit2: " ({hours}).",
    ctaHeading: "Put our “factory prices” to the test today",
    ctaSub: "Send us the quote you already have — we'll reply with our factory price for the same specs. Compare, then decide.",
    ctaZalo: "Compare prices via Zalo",
    ctaPrices: "See our public price list",
  },

  contactPage: {
    heading: "Get a quote within 30 minutes",
    sub: "Fastest way: message us on Zalo with your logo and quantity. Or fill in the form below and we'll draft the message for you.",
    zaloTitle: "Chat on Zalo (fastest)",
    zaloSub: "{phone} — tap to open chat",
    callTitle: "Call us directly",
    callSub: "{phone} ({hours})",
    waTitle: "WhatsApp",
    waSub: "For international buyers",
    visitTitle: "Sales office",
    emailLabel: "Email:",
    formHeading: "Or leave a quote request",
  },

  form: {
    name: "Your name / shop name",
    namePh: "e.g. Cloud House Bubble Tea",
    phone: "Phone number (Zalo/WhatsApp)",
    phonePh: "+84 9xx xxx xxx",
    product: "Bag type needed",
    productUnknown: "Not sure yet, need advice",
    qty: "Estimated quantity",
    qtyOptions: [
      ["100", "100 pcs"],
      ["500", "500 pcs"],
      ["1000", "1,000 pcs"],
      ["5000", "5,000+ pcs"],
    ],
    note: "Notes (size, colors, deadline…)",
    notePh: "e.g. 2-cup bags, cream color, needed before the 20th",
    submit: "Get my free quote",
    privacy: "Nothing is stored on a server — your request goes straight to the factory via Zalo/email.",
    submittedHeading: "Almost done! Send your request via Zalo",
    submittedSub:
      "Your message is drafted below — copy it and paste into Zalo. We'll reply with a quote within 30 minutes during working hours.",
    copy: "Copy message",
    copied: "Copied ✓",
    openZalo: "Open Zalo & send",
    orEmail: "Or send by email",
    emailSubject: "Quote request — custom non-woven bags",
    msgGreeting: "Hello {name}, I'd like to get a quote:",
    msgName: "Name",
    msgPhone: "Phone",
    msgProduct: "Bag type",
    msgQty: "Quantity",
    msgQtyUnit: "pcs",
    msgNote: "Notes",
  },
};
