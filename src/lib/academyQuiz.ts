import { useMemo } from 'react'
import type { AcademyQuizQuestion } from '../types/database'

export const QUIZ_QUESTION_COUNT = 20

export function shuffleQuestions<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function pickQuizQuestions(
  pool: AcademyQuizQuestion[],
  count = QUIZ_QUESTION_COUNT,
): AcademyQuizQuestion[] {
  return shuffleQuestions(pool).slice(0, Math.min(count, pool.length))
}

export function scoreQuiz(
  questions: AcademyQuizQuestion[],
  answers: Record<string, number>,
): { correct: number; total: number; percent: number } {
  const total = questions.length
  const correct = questions.reduce((sum, q) => sum + (answers[q.id] === q.correct_index ? 1 : 0), 0)
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0
  return { correct, total, percent }
}

export type QuizGrade = 'excellent' | 'good' | 'fair' | 'needsImprovement'

export function gradeFromPercent(percent: number): QuizGrade {
  if (percent >= 90) return 'excellent'
  if (percent >= 70) return 'good'
  if (percent >= 50) return 'fair'
  return 'needsImprovement'
}

export function useQuizSession(pool: AcademyQuizQuestion[] | undefined) {
  return useMemo(() => {
    if (!pool?.length) return []
    return pickQuizQuestions(pool)
  }, [pool])
}
