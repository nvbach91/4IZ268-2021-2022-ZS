import { useState, useEffect } from 'react'
import { FiClock, FiWatch } from 'react-icons/fi'
import { LONDON_TIME, NYC_TIME, TOKYO_TIME } from '../utils/endpoints'
import ClockDisplay from './ClockDisplay'
import Tooltip from './Tooltip'

function WorldClock({ handleSwitch }) {
  const [timezones, setTimezones] = useState([])
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    Promise.all([fetch(NYC_TIME), fetch(LONDON_TIME), fetch(TOKYO_TIME)])
      .then(async ([aa, bb, cc]) => {
        const a = await aa.json()
        const b = await bb.json()
        const c = await cc.json()
        return [a, b, c]
      })
      .then(
        (result) => {
          setTimezones(result)
          setIsLoaded(true)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div className='loader'>Loading...</div>
  }

  return (
    <div className='group flex items-center'>
      <Tooltip
        content="after:content-['stopwatch']"
        position='left'
        method={() => handleSwitch('Stopwatch')}>
        <FiWatch size='1.5em' />
      </Tooltip>

      <div className='flex flex-col mt-8'>
        {timezones.map((timezone, idx) => (
          <div className='flex items-center' key={idx}>
            <ClockDisplay
              small
              offset={(timezone.raw_offset + timezone.dst_offset) / 3600}
            />
            <p>
              in{' '}
              {idx === 0
                ? 'New York, USA'
                : idx === 1
                ? 'London, UK'
                : 'Tokyo, Japan'}{' '}
              (GMT
              {(timezone.raw_offset + timezone.dst_offset) / 3600})
            </p>
          </div>
        ))}
      </div>

      <Tooltip
        content="after:content-['clock']"
        position='right'
        method={() => handleSwitch('Clock')}>
        <FiClock size='1.5em' />
      </Tooltip>
    </div>
  )
}

export default WorldClock
