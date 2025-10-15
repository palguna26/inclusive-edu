import { useContext, useMemo } from 'react'
import { LessonContext } from '../context/LessonContext.jsx'
import { LESSONS } from '../lessons/lessons.js'

export default function GamificationBar() {
  const { points, completedLessons, currentLessonId, completeLesson } = useContext(LessonContext)
  const completedCount = useMemo(() => Object.values(completedLessons).filter(Boolean).length, [completedLessons])
  const currentCompleted = !!completedLessons[currentLessonId]

  return (
    <div className="gamification">
      <div className="stats">Points: <strong>{points}</strong> · Completed: {completedCount}/{LESSONS.length}</div>
      <button disabled={currentCompleted} onClick={() => completeLesson(currentLessonId)}>{currentCompleted ? 'Completed' : 'Mark Complete (+100)'}</button>
    </div>
  )
}


