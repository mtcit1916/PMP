import Link from "next/link";

const NAV_ITEMS = [
  { href: "/mock-exam", label: "اختبار تجريبي", mark: "⧗" },
  { href: "/stats", label: "إحصائياتي", mark: "▤" },
  { href: "/favorites", label: "المفضّلة", mark: "★" },
  { href: "/mistakes", label: "مراجعة الأخطاء", mark: "↺" },
];

export default function HomeNav() {
  return (
    <nav className="grid grid-cols-4 gap-2 mb-10">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex flex-col items-center gap-1.5 rounded-md border border-bp-line bg-surface py-3 text-ink-dim hover:border-gold/60 hover:text-gold transition"
        >
          <span className="text-lg leading-none">{item.mark}</span>
          <span className="text-[11px] leading-tight text-center">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
