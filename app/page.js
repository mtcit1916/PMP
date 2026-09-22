import Link from "next/link";
import { getChapters } from "@/lib/questions";

export default function HomePage() {
  const chapters = getChapters();

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-1">PMP Trainer</h1>
        <p className="text-slate-400 text-sm">اختر الفصل ومستوى الصعوبة وابدأ التدريب</p>
      </header>

      <div className="flex gap-3 mb-8">
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

      <div className="flex flex-col gap-3">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
            <h2 className="font-semibold mb-3">{chapter.title}</h2>
            <div className="flex gap-2">
              {["easy", "medium", "hard"].map((level) => (
                <Link
                  key={level}
                  href={`/quiz?chapter=${chapter.id}&level=${level}`}
                  className="flex-1 text-center text-sm rounded-lg border border-slate-700 hover:border-brand-500 py-2"
                >
                  {level === "easy" ? "سهل" : level === "medium" ? "متوسط" : "صعب"}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
