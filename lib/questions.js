import questionsData from "@/data/questions.json";

// يرجع كل الفصول كما هي بالملف
export function getChapters() {
  return questionsData.chapters;
}

export function getChapterById(chapterId) {
  return questionsData.chapters.find((c) => c.id === chapterId);
}

// يفلتر أسئلة فصل معيّن حسب المستوى (أو كل المستويات إذا level = "all")
export function getQuestions(chapterId, level = "all") {
  const chapter = getChapterById(chapterId);
  if (!chapter) return [];
  if (level === "all") return chapter.questions;
  return chapter.questions.filter((q) => q.level === level);
}

// يجمع أسئلة عشوائية من كل الفصول لوضع الاختبار التجريبي
export function getRandomMockQuestions(count = 20) {
  const all = questionsData.chapters.flatMap((c) =>
    c.questions.map((q) => ({ ...q, chapterId: c.id, chapterTitle: c.title }))
  );
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
