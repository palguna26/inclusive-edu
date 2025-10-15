import { useContext, useEffect, useRef } from 'react'
import { AccessibilityContext } from '../context/AccessibilityContext.jsx'
import { LessonContext } from '../context/LessonContext.jsx'
import { LESSONS } from '../lessons/lessons.js'
import { createSpeechRecognition, speak } from '../utils/speech.js'

export default function VoiceCommands({ onExplain }) {
  const { voiceCommands } = useContext(AccessibilityContext)
  const { currentLessonId, setCurrentLessonId, nextLesson } = useContext(LessonContext)
  const recognitionRef = useRef(null)

  useEffect(() => {
    if (!voiceCommands) {
      recognitionRef.current?.stop?.()
      recognitionRef.current = null
      return
    }
    const rec = createSpeechRecognition()
    if (!rec) return
    recognitionRef.current = rec
    let active = false
    rec.onresult = (ev) => {
      const transcript = ev.results[0][0].transcript.toLowerCase()
      if (transcript.includes('start lesson')) {
        const match = transcript.match(/start lesson (\d+)/)
        const idx = match ? Number(match[1]) - 1 : 0
        const lesson = LESSONS[idx]
        if (lesson) setCurrentLessonId(lesson.id)
        speak(`Loading ${lesson?.title || 'lesson'}`)
      } else if (transcript.includes('next lesson')) {
        nextLesson(LESSONS)
        speak('Loading next lesson')
      } else if (transcript.includes('explain this')) {
        onExplain?.()
      }
    }
    rec.onend = () => {
      if (voiceCommands && active) rec.start()
    }
    rec.onerror = () => {}
    active = true
    rec.start()
    return () => {
      active = false
      rec.stop()
    }
  }, [voiceCommands, setCurrentLessonId, nextLesson, onExplain])

  return null
}


