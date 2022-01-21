import { useState, useEffect } from 'react'

function ClockDisplay({ offset, small }) {
  const rawDate = new Date()
  if (offset || offset === 0) {
    rawDate.setHours(rawDate.getHours() - 1 + offset)
  }

  const [date, setDate] = useState(rawDate)

  function refreshClock() {
    setDate(rawDate)
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000)
    return function cleanup() {
      clearInterval(timerId)
    }
  })

  const currentTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return (
    <time
      className={`font-bold ${
        small ? 'text-8xl' : 'text-[12rem]'
      } select-none px-4`}
      dateTime={currentTime}>
      {currentTime}
    </time>
  )
}

export default ClockDisplay
