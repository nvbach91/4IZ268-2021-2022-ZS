import React from 'react'
import { List } from 'antd'

const ClassPicker = (props) => {

    const { classList, selectedResults, setSelectedResults } = props;

    if (!classList) {
        return null
    }

    return (
        <List
            bordered
            header={<h3 style={{textAlign: 'center'}}>Kat.</h3>}
            dataSource={classList}
            renderItem={(item) => {
                return (
                    <List.Item
                        className={[
                            'list-item',
                            item.className === selectedResults.value ? 'selected' : '']
                                .join(' ')}
                        onClick={() => setSelectedResults({type: 'class', value: item.className})}
                    >
                        {item.className}
                    </List.Item>
                )
            }}
            className={'list'}
        />
    )
}

export default ClassPicker;