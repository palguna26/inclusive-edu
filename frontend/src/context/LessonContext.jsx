import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

export const LessonContext = createContext(null)

const STORAGE_KEY = 'inclusiveEdu.lessonState'

export function LessonProvider({ children }) {
  const [currentLessonId, setCurrentLessonId] = useState('solar-system')
  const [points, setPoints] = useState(0)
  const [completedLessons, setCompletedLessons] = useState({})

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed.currentLessonId) setCurrentLessonId(parsed.currentLessonId)
        if (parsed.points) setPoints(Number(parsed.points))
        if (parsed.completedLessons) setCompletedLessons(parsed.completedLessons)
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ currentLessonId, points, completedLessons })
      )
    } catch {}
  }, [currentLessonId, points, completedLessons])

  const completeLesson = useCallback((lessonId) => {
    setCompletedLessons(prev => ({ ...prev, [lessonId]: true }))
    setPoints(p => p + 100)
  }, [])

  const nextLesson = useCallback((ordered) => {
    const index = ordered.findIndex(l => l.id === currentLessonId)
    const next = ordered[(index + 1) % ordered.length]
    setCurrentLessonId(next.id)
  }, [currentLessonId])

  const value = useMemo(() => ({
    currentLessonId,
    setCurrentLessonId,
    points,
    completedLessons,
    completeLesson,
    nextLesson,
  }), [currentLessonId, points, completedLessons, completeLesson, nextLesson])

  return (
    <LessonContext.Provider value={value}>{children}</LessonContext.Provider>
  )
}


