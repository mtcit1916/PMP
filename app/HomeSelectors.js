"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CHAPTER_LABELS = {
  ch01: "١",
  ch02: "٢",
  ch03: "٣",
  ch04: "٤",
  ch05: "٥",
  ch06: "٦",
};

const LEVELS = [
  { id: "easy", label: "سهل" },
  { id: "medium", label: "متوسط" },
  { id: "hard", label: "صعب" },
];

export default function HomeSelectors({ chapters }) {
  const router = useRouter();
  const [chapterId, setChapterId] = useState("random");
  const [level, setLevel] = useState("random");

  const activeChapter = chapters.find((c) => c.id === chapterId);
  const questionCount =
    chapterId === "random"
      ? chapters.reduce((sum, c) => sum + c.questions.length, 0)
      : activeChapter?.questions.length || 0;

  function startQuiz() {
    router.push(`/quiz?chapter=${chapterId}&level=${level}`);
  }

  return (
    <div className="flex flex-col gap-8">
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-mono text-xs tracking-wide text-ink-faint">01 / الفصل</h2>
          <span className="font-mono text-xs text-ink-faint">
            {questionCount} سؤال متاح
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => setChapterId("random")}
            className={`col-span-2 rounded-md border py-3.5 text-sm font-medium transition ${
              chapterId === "random"
                ? "border-gold bg-gold/10 text-gold"
                : "border-bp-line text-ink-dim hover:border-ink-faint"
            }`}
          >
            كل الفصول
          </button>
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => setChapterId(chapter.id)}
              title={chapter.title}
              className={`rounded-md border py-3.5 text-sm font-medium transition font-mono ${
                chapterId === chapter.id
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-bp-line text-ink-dim hover:border-ink-faint"
              }`}
            >
              {CHAPTER_LABELS[chapter.id] || chapter.id}
            </button>
          ))}
        </div>

        {activeChapter && (
          <p className="text-xs text-ink-faint mt-2 leading-relaxed">{activeChapter.title}</p>
        )}
      </section>

      <section>
        <h2 className="font-mono text-xs tracking-wide text-ink-faint mb-3">02 / الصعوبة</h2>
        <div className="grid grid-cols-4 gap-2">
          {LEVELS.map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => setLevel(lvl.id)}
              className={`rounded-md border py-3.5 text-sm font-medium transition ${
                level === lvl.id
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-bp-line text-ink-dim hover:border-ink-faint"
              }`}
            >
              {lvl.label}
            </button>
          ))}
          <button
            onClick={() => setLevel("random")}
            className={`rounded-md border py-3.5 text-sm font-medium transition ${
              level === "random"
                ? "border-gold bg-gold/10 text-gold"
                : "border-bp-line text-ink-dim hover:border-ink-faint"
            }`}
          >
            عشوائي
          </button>
        </div>
      </section>

      <button
        onClick={startQuiz}
        className="rounded-md bg-gold text-bp-bg py-4 font-semibold text-base tracking-wide hover:bg-gold-bright transition"
      >
        ابدأ التدريب
      </button>
    </div>
  );
}
