import { useState, useEffect } from 'react'
import {
  FiSun,
  FiCloud,
  FiCloudDrizzle,
  FiCloudRain,
  FiCloudLightning,
  FiCloudSnow,
  FiWind,
} from 'react-icons/fi'
import { WEATHER_INFO } from '../utils/endpoints'

function Weather() {
  const [info, setInfo] = useState([])
  const [icon, setIcon] = useState('')
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetch(WEATHER_INFO)
      .then((res) => res.json())
      .then(
        (result) => {
          setInfo(result)
          setIcon(parseIcon(result.weather[0].icon))
          setIsLoaded(true)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  function parseIcon(input) {
    const iconId = input.slice(0, 2)
    return iconId
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return (
      <div className='pr-4 pt-3 pb-16 pl-28 opacity-0'>
        <p className='h-14'>Loading...</p>
      </div>
    )
  }

  return (
    <div className='group pr-4 pt-3 pb-16 pl-28 opacity-70 hover:opacity-90 transition-opacity'>
      <div className='flex items-center gap-x-2'>
        {icon === '01' && <FiSun size='2em' />}
        {(icon === '02' || icon === '03' || icon === '04') && (
          <FiCloud size='2em' />
        )}
        {icon === '09' && <FiCloudDrizzle size='2em' />}
        {icon === '10' && <FiCloudRain size='2em' />}
        {icon === '11' && <FiCloudLightning size='2em' />}
        {icon === '13' && <FiCloudSnow size='2em' />}
        {icon === '50' && <FiWind size='2em' />}

        <p className='font-medium text-2xl'>{Math.round(info.main.temp)} °C</p>
      </div>
      <p className='text-center opacity-80'>{info.name}</p>
    </div>
  )
}

export default Weather
