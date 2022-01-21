import React, { useState, useEffect } from 'react'
import './styles/App.css'
import Welcome from './components/Welcome'
import { RANDOM_PHOTO } from './utils/endpoints'
import { Blurhash } from 'react-blurhash'
import BackgroundInfos from './components/BackgroundInfos'
import Time from './components/Time'
import Weather from './components/Weather'
import TodoList from './components/TodoList'

export default function App() {
  const [background, setBackground] = useState([])
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isBackgroundLoaded, setBackgroundLoaded] = useState(false)

  // get background from localStorage
  useEffect(() => {
    const bg = localStorage.getItem('backgroundImage')

    if (bg) {
      setBackground(JSON.parse(bg))
      setIsLoaded(true)
    } else {
      getRandomPhoto()
    }
  }, [])

  function getRandomPhoto() {
    fetch(RANDOM_PHOTO)
      .then((res) => res.json())
      .then(
        (result) => {
          setBackgroundLoaded(false)
          setBackground(result)
          localStorage.setItem('backgroundImage', JSON.stringify(result))
          setIsLoaded(true)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className='App font-mukta text-gray-100 text-shadow-md'>
      <div className='relative grid h-screen place-content-between justify-items-center z-20 bg-gray-800/5'>
        <div className='flex w-screen place-content-between'>
          <div></div>
          <Weather />
        </div>
        <div className='text-center'>
          <Welcome />
          <Time />
        </div>
        <div className='flex w-screen place-content-between items-end'>
          <BackgroundInfos
            background={background}
            getRandomPhoto={getRandomPhoto}
          />
          <TodoList />
        </div>
      </div>

      <img
        src={background.urls.full}
        onLoad={() => setBackgroundLoaded(true)}
        alt=''
        className={`lazy absolute top-0 w-screen h-screen object-cover z-10 ${
          isBackgroundLoaded && 'loaded'
        }`}
      />
      <Blurhash
        hash={background.blur_hash}
        width='100vw'
        height='100vh'
        resolutionX={32}
        resolutionY={32}
        punch={1}
        className='blurhash top-0 z-0'
      />
    </div>
  )
}
