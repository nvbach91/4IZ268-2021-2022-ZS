import { FiTrash2 } from 'react-icons/fi'

function Todo({ todo, handleCompletion, handleRemoval }) {
  return (
    <div className='flex place-content-between items-center hover:bg-white/10 transition-colors my-2 px-4 rounded-md'>
      <p
        className={`leading-8 cursor-pointer pr-2 ${
          todo.completed && 'line-through opacity-70'
        }`}
        onClick={handleCompletion}>
        {todo.task}
      </p>
      <FiTrash2 className='cursor-pointer' onClick={handleRemoval} />
    </div>
  )
}

export default Todo
