// كل دوال هذا الملف تعمل فقط داخل المتصفح (client) لأنها تعتمد على localStorage

const STORAGE_KEY = "pmp_trainer_progress_v1";

function safeParse(raw, fallback) {
  try {
    return JSON.parse(raw) ?? fallback;
  } catch {
    return fallback;
  }
}

// يرجع كامل بيانات التقدم: لكل سؤال id، هل أُجيب، وهل كانت الإجابة صحيحة
export function loadProgress() {
  if (typeof window === "undefined") return {};
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw ? safeParse(raw, {}) : {};
}

export function saveAnswer(questionId, { correct, chosenIndex, chapterId, level }) {
  if (typeof window === "undefined") return;
  const progress = loadProgress();
  progress[questionId] = {
    correct,
    chosenIndex,
    chapterId,
    level,
    answeredAt: new Date().toISOString(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function resetProgress() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

// إحصائيات مجمّعة لكل فصل: عدد المجاب، عدد الصحيح، النسبة
export function getChapterStats(chapters) {
  const progress = loadProgress();
  return chapters.map((chapter) => {
    const chapterQuestions = chapter.questions.map((q) => q.id);
    const answered = chapterQuestions.filter((id) => progress[id]);
    const correct = answered.filter((id) => progress[id].correct);
    return {
      chapterId: chapter.id,
      title: chapter.title,
      total: chapterQuestions.length,
      answered: answered.length,
      correct: correct.length,
      accuracy: answered.length ? Math.round((correct.length / answered.length) * 100) : 0,
    };
  });
}

export function getOverallStats(chapters) {
  const stats = getChapterStats(chapters);
  const totalAnswered = stats.reduce((sum, s) => sum + s.answered, 0);
  const totalCorrect = stats.reduce((sum, s) => sum + s.correct, 0);
  const totalQuestions = stats.reduce((sum, s) => sum + s.total, 0);
  return {
    totalQuestions,
    totalAnswered,
    totalCorrect,
    accuracy: totalAnswered ? Math.round((totalCorrect / totalAnswered) * 100) : 0,
  };
}
