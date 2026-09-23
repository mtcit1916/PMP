import Link from "next/link";
import { getChapters } from "@/lib/questions";
import HomeSelectors from "./HomeSelectors";

export default function HomePage() {
  const chapters = getChapters();

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-1">PMP Trainer</h1>
        <p className="text-slate-400 text-sm">اختر الفصل ومستوى الصعوبة وابدأ التدريب</p>
      </header>

      <div className="flex gap-3 mb-4">
        <Link
          href="/mock-exam"
          className="flex-1 text-center rounded-xl bg-brand-600 hover:bg-brand-700 py-3 font-semibold"
        >
          🕒 اختبار تجريبي كامل
        </Link>
        <Link
          href="/stats"
          className="flex-1 text-center rounded-xl bg-slate-800 hover:bg-slate-700 py-3 font-semibold"
        >
          📊 إحصائياتي
        </Link>
      </div>

      <div className="flex gap-3 mb-8">
        <Link
          href="/favorites"
          className="flex-1 text-center rounded-xl bg-slate-800 hover:bg-slate-700 py-3 font-semibold"
        >
          ⭐ المفضّلة
        </Link>
        <Link
          href="/mistakes"
          className="flex-1 text-center rounded-xl bg-slate-800 hover:bg-slate-700 py-3 font-semibold"
        >
          🔁 مراجعة الأخطاء
        </Link>
      </div>

      <HomeSelectors chapters={chapters} />
    </main>
  );
}
