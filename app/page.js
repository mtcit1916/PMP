import { getChapters } from "@/lib/questions";
import { getOverallStats } from "@/lib/storage";
import HomeSelectors from "./HomeSelectors";
import HomeNav from "./HomeNav";

export default function HomePage() {
  const chapters = getChapters();
  const totalQuestions = chapters.reduce((sum, c) => sum + c.questions.length, 0);

  return (
    <main className="max-w-2xl mx-auto px-5 py-8">
      <header className="mb-10 flex items-end justify-between border-b border-bp-line pb-5">
        <div>
          <p className="font-mono text-xs tracking-wide text-gold mb-1">PMP · تدريب الامتحان</p>
          <h1 className="text-2xl font-bold text-ink">لوحة المذاكرة</h1>
        </div>
        <p className="font-mono text-sm text-ink-dim">
          {totalQuestions} <span className="text-ink-faint">سؤال</span>
        </p>
      </header>

      <HomeNav />

      <HomeSelectors chapters={chapters} />
    </main>
  );
}
