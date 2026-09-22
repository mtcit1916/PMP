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
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="text-sm text-slate-400">
          ← الرئيسية
        </Link>
        <button
          onClick={() => {
            if (confirm("متأكد إنك بدك تصفر كل تقدمك؟")) {
              resetProgress();
              refresh();
            }
          }}
          className="text-sm text-rose-400"
        >
          تصفير التقدم
        </button>
      </div>

      <h1 className="text-xl font-bold mb-4">إحصائياتك</h1>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 mb-6">
        <p className="text-3xl font-bold">{overall.accuracy}%</p>
        <p className="text-slate-400 text-sm mb-2">نسبة الإجابات الصحيحة الإجمالية</p>
        <p className="text-sm text-slate-300">
          أجبت على {overall.totalAnswered} من أصل {overall.totalQuestions} سؤال متاح
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {chapterStats.map((stat) => (
          <div key={stat.chapterId} className="rounded-xl bg-slate-900 border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">{stat.title}</span>
              <span className="text-sm text-slate-400">{stat.accuracy}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div
                className="bg-brand-500 h-2 rounded-full"
                style={{ width: `${stat.total ? (stat.answered / stat.total) * 100 : 0}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {stat.answered} من {stat.total} سؤال، {stat.correct} صحيح
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
