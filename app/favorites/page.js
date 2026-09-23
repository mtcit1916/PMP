"use client";

import { useEffect, useState } from "react";
import { getFavoriteIds } from "@/lib/storage";
import { getQuestionsByIds } from "@/lib/questions";
import ReviewRunner from "@/components/ReviewRunner";

export default function FavoritesPage() {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    const ids = getFavoriteIds();
    setQuestions(getQuestionsByIds(ids));
  }, []);

  if (questions === null) {
    return <main className="max-w-2xl mx-auto px-4 py-8 text-center">جاري التحميل...</main>;
  }

  return (
    <ReviewRunner
      title="⭐ المفضّلة"
      questions={questions}
      emptyMessage="ما عندك أي سؤال مضاف للمفضلة بعد."
      emptyHint="أثناء التدريب، دوس على أيقونة النجمة ⭐ فوق أي سؤال عشان تضيفه هون."
    />
  );
}
