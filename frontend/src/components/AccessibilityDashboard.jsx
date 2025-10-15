import { useContext } from 'react'
import { AccessibilityContext } from '../context/AccessibilityContext.jsx'

export default function AccessibilityDashboard({ onToggleVoiceCommands }) {
  const {
    highContrast,
    setHighContrast,
    fontScale,
    increaseFont,
    decreaseFont,
    resetFont,
    captionsEnabled,
    setCaptionsEnabled,
    voiceGuidance,
    setVoiceGuidance,
    voiceCommands,
    setVoiceCommands,
  } = useContext(AccessibilityContext)

  return (
    <div className={`accessibility-bar ${highContrast ? 'high-contrast' : ''}`} style={{ fontSize: `${fontScale}em` }}>
      <button onClick={() => setHighContrast(!highContrast)} aria-pressed={highContrast}>Contrast</button>
      <button onClick={decreaseFont} aria-label="Decrease font size">A-</button>
      <button onClick={resetFont} aria-label="Reset font size">A</button>
      <button onClick={increaseFont} aria-label="Increase font size">A+</button>
      <button onClick={() => setCaptionsEnabled(!captionsEnabled)} aria-pressed={captionsEnabled}>Captions</button>
      <button onClick={() => setVoiceGuidance(!voiceGuidance)} aria-pressed={voiceGuidance}>Voice</button>
      <button
        onClick={() => {
          const next = !voiceCommands
          setVoiceCommands(next)
          onToggleVoiceCommands?.(next)
        }}
        aria-pressed={voiceCommands}
      >Voice Cmd</button>
    </div>
  )
}


