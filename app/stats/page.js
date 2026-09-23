"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getChapters } from "@/lib/questions";
import { getChapterStats, getOverallStats, resetProgress } from "@/lib/storage";

export default function StatsPage() {
  const [chapterStats, setChapterStats] = useState([]);
  const [overall, setOverall] = useState(null);

  function refresh() {
    const chapters = getChapters();
    setChapterStats(getChapterStats(chapters));
    setOverall(getOverallStats(chapters));
  }

  useEffect(() => {
    refresh();
  }, []);

  if (!overall) return null;

  return (
    <main className="max-w-2xl mx-auto px-5 py-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-bp-line">
        <Link href="/" className="text-sm text-ink-faint hover:text-ink-dim">
          ← الرئيسية
        </Link>
        <button
          onClick={() => {
            if (confirm("متأكد إنك بدك تصفر كل تقدمك؟")) {
              resetProgress();
              refresh();
            }
          }}
          className="text-sm text-bad hover:opacity-80"
        >
          تصفير التقدم
        </button>
      </div>

      <p className="font-mono text-xs tracking-wide text-gold mb-2">الأداء العام</p>

      <div className="corner-card rounded-md bg-surface border border-bp-line p-6 mb-8">
        <p className="font-mono text-5xl text-ink mb-1">{overall.accuracy}%</p>
        <p className="text-ink-faint text-sm mb-4">نسبة الإجابات الصحيحة الإجمالية</p>
        <div className="h-1.5 bg-bp-line rounded-full overflow-hidden mb-3">
          <div className="h-full bg-gold" style={{ width: `${overall.accuracy}%` }} />
        </div>
        <p className="text-sm text-ink-dim font-mono">
          {overall.totalAnswered} / {overall.totalQuestions}
        </p>
      </div>

      <p className="font-mono text-xs tracking-wide text-ink-faint mb-3">حسب الفصل</p>
      <div className="flex flex-col gap-2">
        {chapterStats.map((stat) => (
          <div key={stat.chapterId} className="rounded-md bg-surface border border-bp-line p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-ink">{stat.title}</span>
              <span className="font-mono text-sm text-gold">{stat.accuracy}%</span>
            </div>
            <div className="w-full bg-bp-line rounded-full h-1.5">
              <div
                className="bg-gold h-1.5 rounded-full"
                style={{ width: `${stat.total ? (stat.answered / stat.total) * 100 : 0}%` }}
              />
            </div>
            <p className="text-xs text-ink-faint mt-1.5 font-mono">
              {stat.answered}/{stat.total} · {stat.correct} صحيح
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
