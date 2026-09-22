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
      <main className="max-w-2xl mx-auto px-4 py-8 text-center">
        <p className="mb-4">ما في أسئلة متاحة لهذا الاختيار بعد.</p>
        <Link href="/" className="text-brand-500 underline">
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
    <main className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <Link href="/" className="text-sm text-slate-400">
          ← الرئيسية
        </Link>
        <span className="text-sm text-slate-400">
          سؤال {index + 1} من {questions.length}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-lg font-semibold">{chapterTitle}</h1>
        <span className="text-xs bg-slate-800 px-2 py-1 rounded-full text-slate-300">
          {level === RANDOM ? "مستوى عشوائي" : `مستوى ${LEVEL_LABELS[level]}`}
        </span>
      </div>

      <QuestionCard key={current.id} question={current} onAnswered={handleAnswered} />

      <div className="flex items-center justify-between mt-5">
        <span className="text-sm text-slate-400">
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
            href="/stats"
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2 font-semibold"
          >
            انتهيت — شاهد إحصائياتك
          </Link>
        )}
      </div>
    </main>
  );
}
