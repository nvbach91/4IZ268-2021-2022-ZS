import { FiWatch, FiGlobe } from 'react-icons/fi'
import ClockDisplay from './ClockDisplay'
import Tooltip from './Tooltip'

function Clock({ handleSwitch }) {
  return (
    <div className='group flex items-center'>
      <Tooltip
        content="after:content-['stopwatch']"
        position='left'
        method={() => handleSwitch('Stopwatch')}>
        <FiWatch size='1.5em' />
      </Tooltip>

      <ClockDisplay />

      <Tooltip
        content="after:content-['world_clock']"
        position='right'
        method={() => handleSwitch('Timezones')}>
        <FiGlobe size='1.5em' />
      </Tooltip>
    </div>
  )
}

export default Clock
