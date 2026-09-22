import questionsData from "@/data/questions.json";

export const RANDOM = "random";

export function getChapters() {
  return questionsData.chapters;
}

export function getChapterById(chapterId) {
  return questionsData.chapters.find((c) => c.id === chapterId);
}

function getAllQuestionsFlat() {
  return questionsData.chapters.flatMap((c) =>
    c.questions.map((q) => ({ ...q, chapterId: c.id, chapterTitle: c.title }))
  );
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

/**
 * يجيب الأسئلة حسب اختيار الفصل والمستوى.
 * chapterId: "ch01".."ch06" أو "random" (يعني كل الفصول مخلوطة)
 * level: "easy" | "medium" | "hard" أو "random" (يعني كل المستويات مخلوطة)
 */
export function getQuestions(chapterId, level = RANDOM) {
  let pool;

  if (chapterId === RANDOM) {
    pool = getAllQuestionsFlat();
  } else {
    const chapter = getChapterById(chapterId);
    if (!chapter) return [];
    pool = chapter.questions.map((q) => ({
      ...q,
      chapterId: chapter.id,
      chapterTitle: chapter.title,
    }));
  }

  if (level !== RANDOM) {
    pool = pool.filter((q) => q.level === level);
  }

  if (chapterId === RANDOM || level === RANDOM) {
    pool = shuffle(pool);
  }

  return pool;
}

export function getRandomMockQuestions(count = 20) {
  const all = getAllQuestionsFlat();
  return shuffle(all).slice(0, Math.min(count, all.length));
}
