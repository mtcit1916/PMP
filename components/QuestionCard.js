"use client";

import { useState } from "react";

const LEVEL_LABEL = { easy: "سهل", medium: "متوسط", hard: "صعب" };
const LEVEL_COLOR = {
  easy: "bg-emerald-500/20 text-emerald-300",
  medium: "bg-amber-500/20 text-amber-300",
  hard: "bg-rose-500/20 text-rose-300",
};

export default function QuestionCard({ question, onAnswered }) {
  const [chosenIndex, setChosenIndex] = useState(null);
  const [revealed, setRevealed] = useState(false);

  function handleChoose(index) {
    if (revealed) return;
    setChosenIndex(index);
    setRevealed(true);
    const correct = index === question.correctIndex;
    onAnswered?.({ correct, chosenIndex: index });
  }

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs px-2 py-1 rounded-full ${LEVEL_COLOR[question.level]}`}>
          {LEVEL_LABEL[question.level] || question.level}
        </span>
      </div>

      <p className="text-lg font-medium leading-relaxed mb-4">{question.question}</p>

      <div className="flex flex-col gap-2">
        {question.options.map((option, index) => {
          const isCorrect = index === question.correctIndex;
          const isChosen = index === chosenIndex;

          let style = "border-slate-700 hover:border-brand-500";
          if (revealed && isCorrect) style = "border-emerald-500 bg-emerald-500/10";
          else if (revealed && isChosen && !isCorrect) style = "border-rose-500 bg-rose-500/10";

          return (
            <button
              key={index}
              onClick={() => handleChoose(index)}
              disabled={revealed}
              className={`text-right rounded-xl border px-4 py-3 transition ${style}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="mt-4 rounded-xl bg-slate-800/60 border border-slate-700 p-4 text-sm leading-relaxed">
          <p className="font-semibold mb-1">
            {chosenIndex === question.correctIndex ? "✅ إجابة صحيحة" : "❌ إجابة غير صحيحة"}
          </p>
          <p className="text-slate-300">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
