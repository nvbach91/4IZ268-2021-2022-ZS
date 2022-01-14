import React from 'react'
import { AutoComplete } from 'antd';

import { useDataStore, usePersonalSettings } from '../hooks/useStore';

const HighlightInput = () => {

    const clubList = useDataStore((store) => store.clubList)
    const setHighlightClub = usePersonalSettings((store) => store.setHighlightClub)

    const onChange = (val) => {
        setHighlightClub(val)
    }

    const onSelect = (val) => {
        setHighlightClub(val)
    }

    return (
        <AutoComplete
            options={clubList.map((str) => { return { label: str, value: str } })}
            onSelect={onSelect}
            onChange={onChange}
            style={{width: 200}}
        />
    )
}

export default HighlightInput;