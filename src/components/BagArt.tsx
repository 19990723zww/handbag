import type { Dictionary } from "@/dictionaries";

type BagArtText = Dictionary["bagArt"];

type BagArtProps = {
  variant: "supermarket" | "takeaway" | "promo";
  text: BagArtText;
  className?: string;
};

// Minh họa SVG — thay bằng ảnh chụp sản phẩm thật khi có
// (giữ nguyên tỷ lệ vuông để không vỡ layout).
export default function BagArt({ variant, text, className }: BagArtProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={
        variant === "supermarket"
          ? text.ariaSupermarket
          : variant === "takeaway"
            ? text.ariaTakeaway
            : text.ariaPromo
      }
      className={className}
    >
      {variant === "supermarket" && <Supermarket text={text} />}
      {variant === "takeaway" && <Takeaway text={text} />}
      {variant === "promo" && <Promo text={text} />}
    </svg>
  );
}

function Supermarket({ text }: { text: BagArtText }) {
  return (
    <g>
      <ellipse cx="100" cy="172" rx="62" ry="8" fill="#123b26" opacity="0.08" />
      <path d="M52 70 L148 70 L156 168 L44 168 Z" fill="#1e7a45" />
      <path d="M148 70 L156 168 L138 168 L132 70 Z" fill="#166035" />
      <path
        d="M66 70 C66 40 82 32 100 32 C118 32 134 40 134 70"
        fill="none"
        stroke="#123b26"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="100" cy="112" r="30" fill="#ffffff" />
      <path
        d="M100 96 C88 104 88 118 100 126 C112 118 112 104 100 96 Z"
        fill="#1e7a45"
      />
      <path d="M100 126 L100 98" stroke="#166035" strokeWidth="2.5" />
      <text
        x="100"
        y="152"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        letterSpacing="2"
        fill="#eef6f0"
      >
        {text.logo}
      </text>
    </g>
  );
}

function Takeaway({ text }: { text: BagArtText }) {
  return (
    <g>
      <ellipse cx="100" cy="174" rx="52" ry="7" fill="#123b26" opacity="0.08" />
      {/* ly trà sữa nhô lên khỏi miệng túi */}
      <path d="M86 44 L114 44 L110 92 L90 92 Z" fill="#f3e3c9" />
      <path d="M84 40 L116 40 L115 50 L85 50 Z" fill="#e5cfa8" />
      <rect x="97" y="18" width="6" height="30" rx="3" fill="#1e7a45" />
      <circle cx="93" cy="84" r="3" fill="#5a3b22" />
      <circle cx="102" cy="87" r="3" fill="#5a3b22" />
      <circle cx="108" cy="82" r="3" fill="#5a3b22" />
      {/* thân túi */}
      <path d="M58 88 L142 88 L148 170 L52 170 Z" fill="#ffffff" />
      <path d="M58 88 L142 88 L148 170 L52 170 Z" fill="none" stroke="#d7e3da" strokeWidth="2" />
      <path d="M142 88 L148 170 L132 170 L128 88 Z" fill="#eef6f0" />
      <path
        d="M72 88 C72 68 84 62 100 62 C116 62 128 68 128 88"
        fill="none"
        stroke="#1e7a45"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="100" cy="128" r="22" fill="#1e7a45" />
      <text
        x="100"
        y="133"
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        letterSpacing="1.5"
        fill="#ffffff"
      >
        {text.logo}
      </text>
      <text
        x="100"
        y="162"
        textAnchor="middle"
        fontSize="8"
        fontWeight="600"
        letterSpacing="1"
        fill="#5a6e61"
      >
        {text.teaShop}
      </text>
    </g>
  );
}

function Promo({ text }: { text: BagArtText }) {
  return (
    <g>
      <ellipse cx="100" cy="176" rx="58" ry="7" fill="#123b26" opacity="0.08" />
      <path d="M50 62 L150 62 L150 172 L50 172 Z" fill="#eef6f0" />
      <path d="M50 62 L150 62 L150 172 L50 172 Z" fill="none" stroke="#d7e3da" strokeWidth="2" />
      <path
        d="M68 62 C68 36 82 28 100 28 C118 28 132 36 132 62"
        fill="none"
        stroke="#123b26"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* mảng in full màu */}
      <path d="M50 108 L150 108 L150 172 L50 172 Z" fill="#1e7a45" />
      <path d="M50 108 C70 96 90 120 110 106 C126 96 140 102 150 96 L150 108 Z" fill="#166035" opacity="0.5" />
      <circle cx="100" cy="88" r="16" fill="#1e7a45" />
      <path d="M100 79 C93 84 93 92 100 97 C107 92 107 79 100 79 Z" fill="#ffffff" />
      <text
        x="100"
        y="136"
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        letterSpacing="2"
        fill="#ffffff"
      >
        {text.brand}
      </text>
      <text
        x="100"
        y="152"
        textAnchor="middle"
        fontSize="8"
        fontWeight="500"
        letterSpacing="1"
        fill="#dcebe1"
      >
        {text.fullColor}
      </text>
    </g>
  );
}
