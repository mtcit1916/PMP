"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CHAPTER_LABELS = {
  ch01: "الفصل 1",
  ch02: "الفصل 2",
  ch03: "الفصل 3",
  ch04: "الفصل 4",
  ch05: "الفصل 5",
  ch06: "الفصل 6",
};

const LEVEL_LABELS = {
  easy: "سهل",
  medium: "متوسط",
  hard: "صعب",
};

export default function HomeSelectors({ chapters }) {
  const router = useRouter();
  const [chapterId, setChapterId] = useState("random");
  const [level, setLevel] = useState("random");

  function startQuiz() {
    router.push(`/quiz?chapter=${chapterId}&level=${level}`);
  }

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h2 className="text-sm font-semibold text-slate-400 mb-2">اختر الفصل</h2>
        <div className="grid grid-cols-3 gap-2">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => setChapterId(chapter.id)}
              className={`rounded-xl border py-3 text-sm font-medium transition ${
                chapterId === chapter.id
                  ? "border-brand-500 bg-brand-500/10 text-white"
                  : "border-slate-700 text-slate-300 hover:border-slate-500"
              }`}
              title={chapter.title}
            >
              {CHAPTER_LABELS[chapter.id] || chapter.title}
            </button>
          ))}
          <button
            onClick={() => setChapterId("random")}
            className={`rounded-xl border py-3 text-sm font-medium transition ${
              chapterId === "random"
                ? "border-brand-500 bg-brand-500/10 text-white"
                : "border-slate-700 text-slate-300 hover:border-slate-500"
            }`}
          >
            🎲 عشوائي
          </button>
        </div>
        {chapterId !== "random" && (
          <p className="text-xs text-slate-500 mt-2">
            {chapters.find((c) => c.id === chapterId)?.title}
          </p>
        )}
      </section>

      <section>
        <h2 className="text-sm font-semibold text-slate-400 mb-2">اختر مستوى الصعوبة</h2>
        <div className="grid grid-cols-4 gap-2">
          {["easy", "medium", "hard"].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevel(lvl)}
              className={`rounded-xl border py-3 text-sm font-medium transition ${
                level === lvl
                  ? "border-brand-500 bg-brand-500/10 text-white"
                  : "border-slate-700 text-slate-300 hover:border-slate-500"
              }`}
            >
              {LEVEL_LABELS[lvl]}
            </button>
          ))}
          <button
            onClick={() => setLevel("random")}
            className={`rounded-xl border py-3 text-sm font-medium transition ${
              level === "random"
                ? "border-brand-500 bg-brand-500/10 text-white"
                : "border-slate-700 text-slate-300 hover:border-slate-500"
            }`}
          >
            🎲 عشوائي
          </button>
        </div>
      </section>

      <button
        onClick={startQuiz}
        className="rounded-xl bg-emerald-600 hover:bg-emerald-700 py-3 font-semibold text-lg mt-2"
      >
        ابدأ التدريب ←
      </button>
    </div>
  );
}
