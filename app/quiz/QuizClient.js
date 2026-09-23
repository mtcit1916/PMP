"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getQuestions, getChapterById, RANDOM } from "@/lib/questions";
import { saveAnswer } from "@/lib/storage";
import QuestionCard from "@/components/QuestionCard";

const LEVEL_LABELS = { easy: "سهل", medium: "متوسط", hard: "صعب", random: "عشوائي" };

export default function QuizClient() {
  const params = useSearchParams();
  const chapterId = params.get("chapter") || RANDOM;
  const level = params.get("level") || RANDOM;

  const questions = useMemo(() => getQuestions(chapterId, level), [chapterId, level]);
  const chapterTitle =
    chapterId === RANDOM ? "كل الفصول (عشوائي)" : getChapterById(chapterId)?.title || "";

  const [index, setIndex] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionAnswered, setSessionAnswered] = useState(0);

  if (questions.length === 0) {
    return (
      <main className="max-w-2xl mx-auto px-5 py-10 text-center">
        <p className="mb-4 text-ink-dim">ما في أسئلة متاحة لهذا الاختيار بعد.</p>
        <Link href="/" className="text-gold underline">
          ارجع للرئيسية
        </Link>
      </main>
    );
  }

  const current = questions[index];
  const isLast = index === questions.length - 1;

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
          {String(index + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-base font-semibold text-ink">{chapterTitle}</h1>
        <span className="text-xs border border-bp-line rounded-full px-2 py-0.5 text-ink-faint font-mono">
          {level === RANDOM ? "عشوائي" : LEVEL_LABELS[level]}
        </span>
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
            href="/stats"
            className="rounded-md bg-good text-bp-bg px-5 py-2.5 font-semibold hover:opacity-90 transition"
          >
            انتهيت
          </Link>
        )}
      </div>
    </main>
  );
}
