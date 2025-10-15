import { useEffect, useRef, useState } from 'react'
import { speak, stopSpeak } from '../utils/speech.js'

export default function Chatbot({ contextTopic }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: 'system', content: 'Hello! Ask me about the lesson.' }])
  const [input, setInput] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  async function handleSend() {
    const text = input.trim()
    if (!text) return
    const userMsg = { role: 'user', content: text }
    setMessages(m => [...m, userMsg])
    setInput('')
    // Mock AI using a small rule-based reply
    const reply = generateMockAIReply(text, contextTopic)
    setMessages(m => [...m, { role: 'assistant', content: reply }])
    speak(reply)
  }

  function generateMockAIReply(q, topic) {
    const lower = q.toLowerCase()
    if (topic === 'solar-system') {
      if (lower.includes('sun')) return 'The Sun is a star at the center providing light and heat.'
      return 'In the Solar System, planets orbit the Sun due to gravity.'
    }
    if (topic === 'heart') {
      return 'The human heart pumps blood through four chambers: two atria and two ventricles.'
    }
    if (topic === 'atom') {
      return 'An atom consists of a nucleus with protons and neutrons, and electrons orbiting around.'
    }
    if (lower.includes('photosynthesis')) return 'Photosynthesis converts light energy into chemical energy in plants.'
    return `Here is an explanation related to ${topic}.`
  }

  return (
    <div className="chatbot">
      <button className="chatbot-fab" aria-label="AI Tutor" onClick={() => setOpen(o => !o)}>💬</button>
      {open && (
        <div className="chatbot-modal" role="dialog" aria-label="AI Tutor">
          <div className="chatbot-header">
            <strong>AI Tutor</strong>
            <button onClick={() => { stopSpeak(); setOpen(false) }} aria-label="Close">✕</button>
          </div>
          <div className="chatbot-body">
            {messages.filter(m => m.role !== 'system').map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>{m.content}</div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="chatbot-input">
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask a question..." />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  )
}


