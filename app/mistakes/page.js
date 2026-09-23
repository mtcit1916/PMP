"use client";

import { useEffect, useState } from "react";
import { getWrongQuestionIds } from "@/lib/storage";
import { getQuestionsByIds } from "@/lib/questions";
import ReviewRunner from "@/components/ReviewRunner";

export default function MistakesPage() {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    const ids = getWrongQuestionIds();
    setQuestions(getQuestionsByIds(ids));
  }, []);

  if (questions === null) {
    return <main className="max-w-2xl mx-auto px-5 py-10 text-center text-ink-dim">جاري التحميل...</main>;
  }

  return (
    <ReviewRunner
      title="🔁 مراجعة الأخطاء"
      questions={questions}
      emptyMessage="ما في أسئلة أخطأت فيها لسا، أو راجعتها كلها وصححتها 🎉"
      emptyHint="أي سؤال تجاوب عليه غلط بينضاف هون تلقائياً، ولما ترجع تجاوب عليه صح بيطلع من اللستة."
    />
  );
}
