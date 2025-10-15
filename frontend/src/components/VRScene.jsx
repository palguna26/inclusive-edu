import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AccessibilityContext } from '../context/AccessibilityContext.jsx'
import { LessonContext } from '../context/LessonContext.jsx'
import { LESSONS } from '../lessons/lessons.js'
import { speak } from '../utils/speech.js'

export default function VRScene({ onCaptionChange }) {
  const { voiceGuidance } = useContext(AccessibilityContext)
  const { currentLessonId, completeLesson } = useContext(LessonContext)
  const [caption, setCaption] = useState('')
  const sceneRef = useRef(null)

  const lesson = useMemo(() => LESSONS.find(l => l.id === currentLessonId), [currentLessonId])

  useEffect(() => {
    setCaption(lesson?.caption || '')
    onCaptionChange?.(lesson?.caption || '')
    if (voiceGuidance && lesson?.caption) speak(lesson.caption)
  }, [lesson, voiceGuidance, onCaptionChange])

  useEffect(() => {
    function onModelClick(e) {
      const targetId = e.target?.getAttribute('id')
      if (!targetId || !lesson) return
      const t = lesson.tts?.[targetId]
      if (t) speak(t)
      window.navigator?.vibrate?.(50)
    }
    const el = sceneRef.current
    if (!el) return
    el.addEventListener('click', onModelClick)
    return () => el.removeEventListener('click', onModelClick)
  }, [lesson])

  return (
    <div className="vr-container">
      <a-scene vr-mode-ui="enabled: true" embedded renderer="alpha: false" style={{ width: '100%', height: '60vh', display: 'block' }}>
        <a-sky color="#000022"></a-sky>
        <a-entity light="type: ambient; intensity: 0.6"></a-entity>
        <a-entity light="type: directional; intensity: 0.8" position="0 2 -1"></a-entity>
        <a-entity position="0 1.6 0">
          <a-camera wasd-controls-enabled="true"></a-camera>
        </a-entity>
        <a-entity ref={sceneRef} id="interactive-root">
          {lesson?.models?.map(model => {
            if (model.primitive === 'sphere') {
              return (
                <a-sphere key={model.id} id={model.id} position={model.position} radius={`${model.radius}`} color={model.color}></a-sphere>
              )
            }
            if (model.primitive === 'box') {
              return (
                <a-box key={model.id} id={model.id} position={model.position} depth={`${model.depth}`} height={`${model.height}`} width={`${model.width}`} color={model.color}></a-box>
              )
            }
            return null
          })}
        </a-entity>
        <a-plane position="0 0 -4" rotation="-90 0 0" width="20" height="20" color="#0b1020"></a-plane>
        <a-entity position="0 0 -4">
          <a-plane color="#111" height="0.4" width="2" opacity="0.6"></a-plane>
        </a-entity>
      </a-scene>
    </div>
  )
}


