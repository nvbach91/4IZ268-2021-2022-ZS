import { useState, useEffect } from 'react'
import { FiTrash2 } from 'react-icons/fi'

function TodoList() {
  const [todos, setTodos] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')

  // restore Todos from localStorage
  useEffect(() => {
    const restored = localStorage.getItem('todos')

    restored && setTodos(JSON.parse(restored))
  }, [])

  // save Todos to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  function handleOpenList() {
    setIsOpen(!isOpen)
  }

  function handleInput(e) {
    const input = e.target.value
    if (input.length < 30) {
      setInput(input)
    }
  }

  function handleSubmit(e) {
    const input = e.target.value

    if (e.code === 'Enter' && input) {
      setTodos([
        ...todos,
        {
          task: input,
          completed: false,
        },
      ])

      setInput('')
    }
  }

  function toggleCompletion(idx) {
    const newTodos = [...todos]
    newTodos[idx].completed = !newTodos[idx].completed
    setTodos(newTodos)
  }

  function removeTodo(idx) {
    const newTodos = [...todos]
    newTodos.splice(idx, 1)
    setTodos(newTodos)
  }

  return (
    <div className='relative'>
      <div
        className={`absolute ${
          isOpen ? 'bottom-14 opacity-100' : 'bottom-12 opacity-0'
        } right-4 px-7 pt-5 pb-8 bg-black/60 backdrop-blur-sm rounded-lg transition-all`}>
        {todos.map((todo, idx) => (
          <div
            key={idx}
            className='flex place-content-between items-center hover:bg-white/10 transition-colors my-2 px-4 rounded-md'>
            <p
              className={`leading-8 cursor-pointer pr-2 ${
                todo.completed && 'line-through opacity-70'
              }`}
              onClick={() => toggleCompletion(idx)}>
              {todo.task}
            </p>
            <FiTrash2
              className='cursor-pointer'
              onClick={() => removeTodo(idx)}
            />
          </div>
        ))}
        <input
          className='w-56 bg-transparent border-b border-solid border-white
              opacity-60 hover:opacity-80 focus:opacity-100 focus:outline-none
              transition-colors mt-4 mx-4'
          type='text'
          value={input}
          placeholder='New Todo'
          onChange={handleInput}
          onKeyPress={handleSubmit}
        />
      </div>

      <button
        onClick={handleOpenList}
        className='text-xl font-medium px-4 py-3 opacity-70 hover:opacity-90 transition-opacity'>
        Todos
      </button>
    </div>
  )
}

export default TodoList
