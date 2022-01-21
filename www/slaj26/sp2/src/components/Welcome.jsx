import React, { useState, useEffect } from 'react'
import { useGreeting } from '../utils/useGreeting'

function Welcome() {
  const greeting = useGreeting(new Date())

  const [name, setName] = useState('')

  const [input, setInput] = useState('')
  const [tooltip, setTooltip] = useState('empty')
  const [displayTooltip, setDisplayTooltip] = useState(false)

  // restore name form localStorage
  useEffect(() => {
    const name = localStorage.getItem('name')

    name && setName(name)
  }, [])

  // set name to localStorage
  useEffect(() => {
    localStorage.setItem('name', name)
  }, [name])

  function handleInput(e) {
    const input = e.target.value

    if (!input) {
      setTooltip('empty')
    } else if (input.length < 20) {
      setTooltip('save')
    } else {
      setTooltip('too-long')
    }

    setInput(input)
  }

  function focus() {
    setDisplayTooltip(true)
  }

  function blur() {
    setDisplayTooltip(false)
  }

  function handleSubmit(e) {
    const input = e.target.value

    if (e.code === 'Enter' && input && input.length < 20) {
      setName(input)
    }
  }

  function handleClick() {
    setInput(name)
    setName('')
  }

  return (
    <h2 className='text-3xl font-medium text-shadow-md'>
      {greeting},{' '}
      {name ? (
        <span className='relative'>
          <span
            className="after:opacity-0 hover:after:opacity-100 after:content-['click_to_edit']
          after:whitespace-nowrap after:text-sm after:bg-black/40 after:px-2 after:rounded-2xl
          after:text-gray-80 after:absolute after:left-1/2 after:-top-5 after:-translate-x-1/2
          after:transition-opacity">
            <button onClick={handleClick}>
              <span className='text-shadow-md font-medium'>{name}</span>
            </button>
          </span>
        </span>
      ) : (
        <span className='relative'>
          <span
            className={`after:whitespace-nowrap after:text-sm after:bg-black/40 after:px-2
            after:rounded-2xl after:text-gray-80 after:absolute after:left-1/2 after:-top-5
            after:-translate-x-1/2 after:transition-opacity after:opacity-${
              displayTooltip ? '100' : '0'
            } ${tooltip}`}>
            <input
              className='w-40 bg-transparent border-b-2 border-solid border-white
              opacity-60 hover:opacity-80 focus:opacity-100 focus:outline-none
              transition-colors'
              type='text'
              value={input}
              onChange={handleInput}
              onFocus={focus}
              onBlur={blur}
              onKeyPress={handleSubmit}
            />
          </span>
        </span>
      )}
      .
    </h2>
  )
}

export default Welcome
