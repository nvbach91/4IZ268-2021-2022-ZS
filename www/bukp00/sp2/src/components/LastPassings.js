import React from 'react'

import { useDataStore } from '../hooks/useStore'

const LastPassings = (props) => {

    const { setSelectedResults } = props

    const passings = useDataStore((state) => state.lastPassings)

    let listItems = null;

    if (Array.isArray(passings)) {
        listItems = passings.map((obj, index) => {
            return (
                <span key={index}>
                    {obj.passtime}: {obj.runnerName}
                    (<button onClick={() => setSelectedResults({ type: 'class', value: obj.class })}>{obj.class}</button>)
                    proběhl {obj.controlName} v čase {obj.time}
                </span>
            )
        })
    }

    return (
        <div className='card'>
            <h4>Poslední změny:</h4>
            {listItems}
        </div>
    )
}

export default LastPassings