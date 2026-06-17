import { useState, useEffect, useRef } from 'react'

const Timer = ({ initialSeconds = 90, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)
  const onTimeUpRef = useRef(onTimeUp)

  useEffect(() => {
    onTimeUpRef.current = onTimeUp
  }, [onTimeUp])

  useEffect(() => {
    // Reset timer and start countdown
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(initialSeconds)

    if (initialSeconds <= 0) return

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1
        if (next <= 0) {
          clearInterval(intervalId)
          onTimeUpRef.current?.()
        }
        return Math.max(0, next)
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [initialSeconds])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  const isDanger = timeLeft <= 15

  return (
    <div className={`timer-display px-3 py-2 rounded-3 text-center text-nowrap ${isDanger ? 'text-danger' : 'text-info'}`}>
      <div className="fw-bold d-flex align-items-center justify-content-center gap-2">
        <span>⏳</span>
        <span>{formattedTime}</span>
      </div>
    </div>
  )
}

export default Timer
