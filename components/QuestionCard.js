"use client";

import { useEffect, useState } from "react";
import { isFavorite, toggleFavorite } from "@/lib/storage";

const LEVEL_LABEL = { easy: "سهل", medium: "متوسط", hard: "صعب" };
const LEVEL_RING = {
  easy: "border-good text-good",
  medium: "border-gold text-gold",
  hard: "border-bad text-bad",
};

export default function QuestionCard({ question, onAnswered }) {
  const [chosenIndex, setChosenIndex] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(question.id));
  }, [question.id]);

  function handleChoose(index) {
    if (revealed) return;
    setChosenIndex(index);
    setRevealed(true);
    const correct = index === question.correctIndex;
    onAnswered?.({ correct, chosenIndex: index });
  }

  function handleToggleFavorite() {
    const next = toggleFavorite(question.id);
    setFavorite(next);
  }

  return (
    <div className="corner-card rounded-md bg-surface border border-bp-line p-5">
      <div className="flex items-center justify-between mb-4">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-mono ${LEVEL_RING[question.level]}`}
        >
          {LEVEL_LABEL[question.level] || question.level}
        </span>
        <button
          onClick={handleToggleFavorite}
          aria-label="راجعها لاحقاً"
          title="راجعها لاحقاً"
          className={`text-xl leading-none transition ${
            favorite ? "text-gold" : "text-ink-faint hover:text-ink-dim"
          }`}
        >
          {favorite ? "★" : "☆"}
        </button>
      </div>

      <p className="text-lg font-medium leading-relaxed mb-5 whitespace-normal break-words [overflow-wrap:anywhere] text-ink">
        {question.question}
      </p>

      <div className="flex flex-col gap-2">
        {question.options.map((option, index) => {
          const isCorrect = index === question.correctIndex;
          const isChosen = index === chosenIndex;

          let style = "border-bp-line text-ink-dim hover:border-ink-faint";
          if (revealed && isCorrect) style = "border-good bg-good/10 text-ink";
          else if (revealed && isChosen && !isCorrect) style = "border-bad bg-bad/10 text-ink";

          return (
            <button
              key={index}
              onClick={() => handleChoose(index)}
              disabled={revealed}
              className={`text-right rounded-md border px-4 py-3 transition leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] ${style}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="mt-4 rounded-md bg-surface-alt border border-bp-line p-4 text-sm leading-relaxed">
          <p className={`font-semibold mb-1 ${chosenIndex === question.correctIndex ? "text-good" : "text-bad"}`}>
            {chosenIndex === question.correctIndex ? "إجابة صحيحة" : "إجابة غير صحيحة"}
          </p>
          <p className="text-ink-dim">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
