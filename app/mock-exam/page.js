"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRandomMockQuestions } from "@/lib/questions";
import { saveAnswer } from "@/lib/storage";
import QuestionCard from "@/components/QuestionCard";

const QUESTION_COUNT = 20;
const DURATION_SECONDS = 25 * 60; // 25 دقيقة، عدّلها حسب رغبتك

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function MockExamPage() {
  const [questions, setQuestions] = useState(null);
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(DURATION_SECONDS);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setQuestions(getRandomMockQuestions(QUESTION_COUNT));
  }, []);

  useEffect(() => {
    if (finished || !questions) return;
    if (secondsLeft <= 0) {
      setFinished(true);
      return;
    }
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft, finished, questions]);

  if (!questions) {
    return <main className="max-w-2xl mx-auto px-4 py-8 text-center">جاري تجهيز الاختبار...</main>;
  }

  if (finished) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-8 text-center">
        <h1 className="text-xl font-bold mb-3">انتهى الاختبار التجريبي</h1>
        <p className="text-slate-300 mb-6">
          أجبت على {answeredCount} من {questions.length} سؤال، وكانت{" "}
          {correctCount} إجابة صحيحة (
          {answeredCount ? Math.round((correctCount / answeredCount) * 100) : 0}%).
        </p>
        <Link href="/" className="rounded-xl bg-brand-600 hover:bg-brand-700 px-5 py-2 font-semibold">
          العودة للرئيسية
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
    setAnsweredCount((n) => n + 1);
    if (correct) setCorrectCount((n) => n + 1);
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <Link href="/" className="text-sm text-slate-400">
          ← خروج
        </Link>
        <span className="text-sm font-mono bg-slate-800 px-3 py-1 rounded-full">
          ⏱ {formatTime(secondsLeft)}
        </span>
      </div>

      <p className="text-sm text-slate-400 mb-3">
        سؤال {index + 1} من {questions.length} — {current.chapterTitle}
      </p>

      <QuestionCard key={current.id} question={current} onAnswered={handleAnswered} />

      <div className="flex items-center justify-between mt-5 gap-3">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded-xl border border-slate-700 px-5 py-2 font-semibold text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-slate-500"
        >
          ← السابق
        </button>
        <button
          onClick={() => (isLast ? setFinished(true) : setIndex((i) => i + 1))}
          className="rounded-xl bg-brand-600 hover:bg-brand-700 px-5 py-2 font-semibold"
        >
          {isLast ? "إنهاء الاختبار" : "التالي →"}
        </button>
      </div>
    </main>
  );
}
