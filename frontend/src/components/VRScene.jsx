import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { AccessibilityContext } from '../context/AccessibilityContext.jsx'
import { LessonContext } from '../context/LessonContext.jsx'
import { LESSONS } from '../lessons/lessons.js'
import { speak } from '../utils/speech.js'

/**
 * A reusable interactive model component
 * Handles both spheres and boxes, reacts to clicks, and supports voice narration
 */
function InteractiveModel({ model, onSpeak }) {
  const meshRef = useRef()

  // Handle click for speech and vibration
  const handleClick = () => {
    if (onSpeak) onSpeak(model.id)
    window.navigator?.vibrate?.(50)
  }

  // Small idle rotation animation
  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.003
  })

  // Choose geometry type based on model
  let geometry
  if (model.primitive === 'sphere') {
    geometry = new THREE.SphereGeometry(model.radius, 32, 32)
  } else if (model.primitive === 'box') {
    geometry = new THREE.BoxGeometry(model.width, model.height, model.depth)
  }

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={model.position.split(' ').map(Number)}
      onClick={handleClick}
    >
      <meshStandardMaterial color={model.color} />
    </mesh>
  )
}

/**
 * Main VR Scene component
 * Replaces the A-Frame version with Three.js + React integration
 */
export default function VRScene({ onCaptionChange }) {
  const { voiceGuidance } = useContext(AccessibilityContext)
  const { currentLessonId } = useContext(LessonContext)
  const [caption, setCaption] = useState('')

  // Load the active lesson based on context
  const lesson = useMemo(
    () => LESSONS.find(l => l.id === currentLessonId),
    [currentLessonId]
  )

  // Handle captions and voice narration
  useEffect(() => {
    setCaption(lesson?.caption || '')
    onCaptionChange?.(lesson?.caption || '')
    if (voiceGuidance && lesson?.caption) speak(lesson.caption)
  }, [lesson, voiceGuidance, onCaptionChange])

  // Handle speech for interactive elements
  const handleSpeak = (id) => {
    const t = lesson?.tts?.[id]
    if (t) speak(t)
  }

  // Loading state (if lesson not ready)
  if (!lesson) {
    return (
      <div
        className="vr-container"
        style={{
          display: 'grid',
          placeItems: 'center',
          background: '#000022',
          color: '#9bb1ff',
        }}
      >
        Loading 3D environment…
      </div>
    )
  }

  return (
    <div className="vr-container">
      <Canvas
        camera={{ position: [0, 1.6, 4], fov: 60 }}
        style={{ background: '#000022', width: '100%', height: '100%' }}
      >
        {/* Lights */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[0, 2, -1]} intensity={0.8} />

        {/* Sky simulation */}
        <Sky distance={450000} sunPosition={[0, 1, 0]} turbidity={0.1} />

        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#0b1020" />
        </mesh>

        {/* Models from lesson */}
        {lesson.models?.map((model) => (
          <InteractiveModel key={model.id} model={model} onSpeak={handleSpeak} />
        ))}

        {/* Camera controls */}
        <OrbitControls enableZoom enablePan enableRotate />
      </Canvas>
    </div>
  )
}
