"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import QuestionCard from "@/components/QuestionCard";
import { saveAnswer } from "@/lib/storage";

export default function ReviewRunner({ title, emptyMessage, emptyHint, questions }) {
  const [index, setIndex] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionAnswered, setSessionAnswered] = useState(0);

  const total = questions.length;

  if (total === 0) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-8 text-center">
        <Link href="/" className="text-sm text-slate-400 block mb-6 text-right">
          ← الرئيسية
        </Link>
        <p className="mb-2 text-lg">{emptyMessage}</p>
        {emptyHint && <p className="text-sm text-slate-500">{emptyHint}</p>}
      </main>
    );
  }

  const current = questions[index];
  const isLast = index === total - 1;

  function handleAnswered({ correct, chosenIndex }) {
    saveAnswer(current.id, {
      correct,
      chosenIndex,
      chapterId: current.chapterId,
      level: current.level,
    });
    setSessionAnswered((n) => n + 1);
    if (correct) setSessionCorrect((n) => n + 1);
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <Link href="/" className="text-sm text-slate-400">
          ← الرئيسية
        </Link>
        <span className="text-sm text-slate-400">
          سؤال {index + 1} من {total}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-lg font-semibold">{title}</h1>
        {current.chapterTitle && (
          <span className="text-xs bg-slate-800 px-2 py-1 rounded-full text-slate-300">
            {current.chapterTitle}
          </span>
        )}
      </div>

      <QuestionCard key={current.id} question={current} onAnswered={handleAnswered} />

      <div className="flex items-center justify-between mt-5 gap-3">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded-xl border border-slate-700 px-5 py-2 font-semibold text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-slate-500"
        >
          ← السؤال السابق
        </button>

        <span className="text-sm text-slate-400 whitespace-nowrap">
          صحيح: {sessionCorrect} / {sessionAnswered}
        </span>

        {!isLast ? (
          <button
            onClick={() => setIndex((i) => i + 1)}
            className="rounded-xl bg-brand-600 hover:bg-brand-700 px-5 py-2 font-semibold"
          >
            السؤال التالي →
          </button>
        ) : (
          <Link
            href="/"
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2 font-semibold"
          >
            انتهيت
          </Link>
        )}
      </div>
    </main>
  );
}
