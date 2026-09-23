"use client";

import { useState } from "react";
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
      <main className="max-w-2xl mx-auto px-5 py-10 text-center">
        <Link href="/" className="text-sm text-ink-faint block mb-8 text-right hover:text-ink-dim">
          ← الرئيسية
        </Link>
        <p className="mb-2 text-lg text-ink">{emptyMessage}</p>
        {emptyHint && <p className="text-sm text-ink-faint">{emptyHint}</p>}
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
    <main className="max-w-2xl mx-auto px-5 py-6">
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-bp-line">
        <Link href="/" className="text-sm text-ink-faint hover:text-ink-dim">
          ← الرئيسية
        </Link>
        <span className="font-mono text-xs text-ink-faint">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-base font-semibold text-ink">{title}</h1>
        {current.chapterTitle && (
          <span className="text-xs border border-bp-line rounded-full px-2 py-0.5 text-ink-faint">
            {current.chapterTitle}
          </span>
        )}
      </div>

      <QuestionCard key={current.id} question={current} onAnswered={handleAnswered} />

      <div className="flex items-center justify-between mt-5 gap-3">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded-md border border-bp-line px-5 py-2.5 font-medium text-ink-dim disabled:opacity-30 disabled:cursor-not-allowed hover:border-ink-faint transition"
        >
          ← السابق
        </button>

        <span className="font-mono text-xs text-ink-faint whitespace-nowrap">
          {sessionCorrect}/{sessionAnswered} صحيح
        </span>

        {!isLast ? (
          <button
            onClick={() => setIndex((i) => i + 1)}
            className="rounded-md bg-gold text-bp-bg px-5 py-2.5 font-semibold hover:bg-gold-bright transition"
          >
            التالي →
          </button>
        ) : (
          <Link
            href="/"
            className="rounded-md bg-good text-bp-bg px-5 py-2.5 font-semibold hover:opacity-90 transition"
          >
            انتهيت
          </Link>
        )}
      </div>
    </main>
  );
}
