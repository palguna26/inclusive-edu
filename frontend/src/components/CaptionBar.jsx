export default function CaptionBar({ text, visible }) {
  if (!visible) return null
  return (
    <div className="caption-bar" aria-live="polite">
      {text}
    </div>
  )
}


