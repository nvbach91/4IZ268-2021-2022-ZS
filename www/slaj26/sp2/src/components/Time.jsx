import { useState } from 'react'
import Clock from './Clock'
import Stopwatch from './Stopwatch'
import WorldClock from './WorldClock'

function Time() {
  const [currentElement, setCurrentElement] = useState('Clock')
  const [isInTransition, setIsInTransition] = useState(false)

  function handleSwitch(element) {
    const possibleValues = ['Clock', 'Timezones', 'Stopwatch']

    if (possibleValues.indexOf(element) === -1) {
      console.warn('Unknown component: ' + element)
      return
    }

    setIsInTransition(true)
    setTimeout(() => {
      setCurrentElement(element)
      setIsInTransition(false)
    }, 500)
  }

  if (currentElement === 'Timezones') {
    return (
      <div
        className={`transition-opacity duration-500 ${
          isInTransition && 'opacity-0'
        }`}>
        <WorldClock handleSwitch={handleSwitch} />
      </div>
    )
  }

  if (currentElement === 'Stopwatch') {
    return (
      <div
        className={`transition-opacity duration-500 ${
          isInTransition && 'opacity-0'
        }`}>
        <Stopwatch handleSwitch={handleSwitch} />
      </div>
    )
  }

  return (
    <div
      className={`transition-opacity duration-500 ${
        isInTransition && 'opacity-0'
      }`}>
      <Clock handleSwitch={handleSwitch} />
    </div>
  )
}

export default Time
