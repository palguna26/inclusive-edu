import { useContext, useEffect, useMemo, useState } from 'react'
import './App.css'
import { AccessibilityProvider, AccessibilityContext } from './context/AccessibilityContext.jsx'
import { LessonProvider, LessonContext } from './context/LessonContext.jsx'
import AccessibilityDashboard from './components/AccessibilityDashboard.jsx'
import VRScene from './components/VRScene.jsx'
import CaptionBar from './components/CaptionBar.jsx'
import Chatbot from './components/Chatbot.jsx'
import VoiceCommands from './components/VoiceCommands.jsx'
import { LESSONS } from './lessons/lessons.js'
import GamificationBar from './components/GamificationBar.jsx'

function AppShell() {
  const { captionsEnabled } = useContext(AccessibilityContext)
  const { currentLessonId, points } = useContext(LessonContext)
  const [caption, setCaption] = useState('')

  const currentLesson = useMemo(() => LESSONS.find(l => l.id === currentLessonId), [currentLessonId])

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="brand">Inclusive AR/VR Classroom</div>
        <div className="spacer" />
        <div className="points" aria-label="Points">⭐ {points}</div>
      </header>
      <main className="app-main">
        <aside className="sidebar">
          <LessonList />
          <AccessibilityDashboard onToggleVoiceCommands={() => {}} />
        </aside>
        <section className="scene">
          <VRScene onCaptionChange={setCaption} />
        </section>
      </main>
      <CaptionBar text={caption} visible={captionsEnabled} />
      <GamificationBar />
      <Chatbot contextTopic={currentLesson?.id} />
      <VoiceCommands onExplain={() => setCaption(currentLesson?.caption || '')} />
    </div>
  )
}

function LessonList() {
  const { currentLessonId, setCurrentLessonId } = useContext(LessonContext)
  return (
    <div className="lessons">
      <h3>Lessons</h3>
      {LESSONS.map((l, idx) => (
        <button
          key={l.id}
          className={`lesson-item ${l.id === currentLessonId ? 'active' : ''}`}
          onClick={() => setCurrentLessonId(l.id)}
        >{idx + 1}. {l.title}</button>
      ))}
    </div>
  )
}

export default function App() {
  return (
    <AccessibilityProvider>
      <LessonProvider>
        <AppShell />
      </LessonProvider>
    </AccessibilityProvider>
  )
}
