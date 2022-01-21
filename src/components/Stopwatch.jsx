import { useState, useEffect } from 'react'
import { FiClock, FiGlobe } from 'react-icons/fi'
import Tooltip from './Tooltip'

function Stopwatch({ handleSwitch }) {
  const [time, setTime] = useState(0)
  const [isPaused, setIsPaused] = useState(true)

  useEffect(() => {
    let interval = null

    if (!isPaused) {
      interval = setInterval(() => {
        setTime((time) => time + 10)
      }, 10)
    } else {
      clearInterval(interval)
    }
    return () => {
      clearInterval(interval)
    }
  }, [isPaused])

  const handleClick = () => {
    setIsPaused(!isPaused)
  }

  const handleReset = () => {
    setIsPaused(true)
    setTime(0)
  }

  return (
    <div className='group flex items-center'>
      <Tooltip
        content="after:content-['clock']"
        position='left'
        method={() => handleSwitch('Clock')}>
        <FiClock size='1.5em' />
      </Tooltip>

      <div
        className='font-bold text-[12rem] select-none px-4 tabular-nums cursor-pointer'
        onClick={handleClick}
        onDoubleClick={handleReset}>
        {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
        {('0' + Math.floor((time / 1000) % 60)).slice(-2)}.
        {('0' + ((time / 10) % 100)).slice(-2)}
      </div>

      <Tooltip
        content="after:content-['world_clock']"
        position='right'
        method={() => handleSwitch('Timezones')}>
        <FiGlobe size='1.5em' />
      </Tooltip>
    </div>
  )
}

export default Stopwatch
