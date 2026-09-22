import { Suspense } from "react";
import QuizClient from "./QuizClient";

export default function QuizPage() {
  return (
    <Suspense fallback={<main className="max-w-2xl mx-auto px-4 py-8 text-center">جاري التحميل...</main>}>
      <QuizClient />
    </Suspense>
  );
}
