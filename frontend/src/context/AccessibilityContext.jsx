import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

export const AccessibilityContext = createContext(null)

const STORAGE_KEY = 'inclusiveEdu.accessibility'

export function AccessibilityProvider({ children }) {
  const [highContrast, setHighContrast] = useState(false)
  const [fontScale, setFontScale] = useState(1)
  const [captionsEnabled, setCaptionsEnabled] = useState(true)
  const [voiceGuidance, setVoiceGuidance] = useState(false)
  const [voiceCommands, setVoiceCommands] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        setHighContrast(!!parsed.highContrast)
        setFontScale(Number(parsed.fontScale || 1))
        setCaptionsEnabled(parsed.captionsEnabled !== false)
        setVoiceGuidance(!!parsed.voiceGuidance)
        setVoiceCommands(!!parsed.voiceCommands)
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ highContrast, fontScale, captionsEnabled, voiceGuidance, voiceCommands })
      )
    } catch {}
  }, [highContrast, fontScale, captionsEnabled, voiceGuidance, voiceCommands])

  const increaseFont = useCallback(() => setFontScale(s => Math.min(1.8, Number((s + 0.1).toFixed(2)))), [])
  const decreaseFont = useCallback(() => setFontScale(s => Math.max(0.8, Number((s - 0.1).toFixed(2)))), [])
  const resetFont = useCallback(() => setFontScale(1), [])

  const value = useMemo(
    () => ({
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
    }),
    [highContrast, fontScale, captionsEnabled, voiceGuidance, voiceCommands, increaseFont, decreaseFont, resetFont]
  )

  return (
    <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>
  )
}


