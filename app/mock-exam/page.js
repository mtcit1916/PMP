"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRandomMockQuestions } from "@/lib/questions";
import { saveAnswer } from "@/lib/storage";
import QuestionCard from "@/components/QuestionCard";

const SECONDS_PER_QUESTION = 75; // بمعدل قريب من توقيت الامتحان الحقيقي (230 دقيقة / 180 سؤال)

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
  const [secondsLeft, setSecondsLeft] = useState(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const all = getRandomMockQuestions();
    setQuestions(all);
    setSecondsLeft(all.length * SECONDS_PER_QUESTION);
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

  if (!questions || secondsLeft === null) {
    return (
      <main className="max-w-2xl mx-auto px-5 py-10 text-center text-ink-dim">
        جاري تجهيز الاختبار...
      </main>
    );
  }

  if (finished) {
    const accuracy = answeredCount ? Math.round((correctCount / answeredCount) * 100) : 0;
    return (
      <main className="max-w-2xl mx-auto px-5 py-10 text-center">
        <p className="font-mono text-xs tracking-wide text-gold mb-2">النتيجة النهائية</p>
        <p className="font-mono text-5xl text-ink mb-3">{accuracy}%</p>
        <h1 className="text-lg font-semibold mb-2">انتهى الاختبار التجريبي</h1>
        <p className="text-ink-dim mb-8">
          أجبت على {answeredCount} من {questions.length} سؤال، وكانت {correctCount} إجابة صحيحة.
        </p>
        <Link
          href="/"
          className="inline-block rounded-md bg-gold text-bp-bg px-6 py-3 font-semibold hover:bg-gold-bright transition"
        >
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
    <main className="max-w-2xl mx-auto px-5 py-6">
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-bp-line">
        <Link href="/" className="text-sm text-ink-faint hover:text-ink-dim">
          ← خروج
        </Link>
        <span className="font-mono text-sm bg-surface border border-bp-line px-3 py-1 rounded-full text-gold">
          {formatTime(secondsLeft)}
        </span>
      </div>

      <p className="font-mono text-xs text-ink-faint mb-3">
        {String(index + 1).padStart(3, "0")} / {String(questions.length).padStart(3, "0")} —{" "}
        {current.chapterTitle}
      </p>

      <QuestionCard key={current.id} question={current} onAnswered={handleAnswered} />

      <div className="flex items-center justify-between mt-5 gap-3">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded-md border border-bp-line px-5 py-2.5 font-medium text-ink-dim disabled:opacity-30 disabled:cursor-not-allowed hover:border-ink-faint transition"
        >
          ← السابق
        </button>
        <button
          onClick={() => (isLast ? setFinished(true) : setIndex((i) => i + 1))}
          className="rounded-md bg-gold text-bp-bg px-5 py-2.5 font-semibold hover:bg-gold-bright transition"
        >
          {isLast ? "إنهاء الاختبار" : "التالي →"}
        </button>
      </div>
    </main>
  );
}
