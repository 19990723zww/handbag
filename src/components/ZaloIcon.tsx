export default function ZaloIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 3C6.75 3 2.5 6.7 2.5 11.25c0 2.6 1.4 4.92 3.58 6.43-.1.9-.42 2.06-1.08 2.9-.13.17.02.42.23.38 1.6-.28 2.9-.92 3.77-1.5.94.26 1.95.4 3 .4 5.25 0 9.5-3.7 9.5-8.25S17.25 3 12 3Z"
        fill="currentColor"
      />
      <text
        x="12"
        y="14.4"
        textAnchor="middle"
        fontSize="7.5"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
        fill="var(--zalo-icon-text, #0068ff)"
      >
        Zalo
      </text>
    </svg>
  );
}
