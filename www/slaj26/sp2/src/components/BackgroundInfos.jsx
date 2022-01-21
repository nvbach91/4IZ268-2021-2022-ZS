import { FiShuffle } from 'react-icons/fi'
import Tooltip from './Tooltip'

function BackgroundInfos({ background, getRandomPhoto }) {
  return (
    <div className='group pl-4 pb-3 pt-16 pr-28 opacity-70 hover:opacity-90 transition-opacity relative'>
      <Tooltip
        content="after:content-['Try_another_photo']"
        position='right'
        method={getRandomPhoto}
        className='opacity-0 group-hover:opacity-100'>
        <FiShuffle />
      </Tooltip>

      <p className='font-medium'>{background.location.name}</p>
      <p className='opacity-80'>Photo by {background.user.name}</p>
    </div>
  )
}

export default BackgroundInfos
