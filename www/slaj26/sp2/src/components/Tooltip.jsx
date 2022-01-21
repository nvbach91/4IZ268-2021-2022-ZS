function Tooltip({ children, content, method, position }) {
  let positionClass

  if (position === 'top') {
    positionClass = 'pt-2 after:top-0 after:left-6'
  }
  if (position === 'right') {
    positionClass = 'pr-2 after:top-0 after:left-full'
  }
  if (position === 'bottom') {
  }
  if (position === 'left') {
    positionClass = 'pl-2 after:top-0 after:right-full'
  }

  return (
    <span className='relative'>
      <button
        onClick={method}
        className={`${content} ${positionClass} opacity-0 group-hover:opacity-100
          transition-opacity after:opacity-0 hover:after:opacity-100
          after:absolute after:whitespace-nowrap after:text-sm after:bg-black/40
          after:px-2 after:rounded-2xl after:text-gray-80  after:transition-opacity`}>
        {children}
      </button>
    </span>
  )
}

export default Tooltip
