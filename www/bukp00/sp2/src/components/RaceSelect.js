import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { List, Skeleton } from 'antd'
import VirtualList from 'rc-virtual-list'
import { useNavigate } from 'react-router-dom'

import { useRace } from '../hooks/useStore'
import { getCompetitions } from '../services/resultsApi'

const RaceSelect = () => {

    const setRace = useRace((state) => state.setCurrentRace)

    const query = useQuery(['competitions'], getCompetitions)
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)

    const height = window.innerHeight - 64 - 82 - 60

    const navigate = useNavigate()

    useEffect(() => {
        if (query.data?.competitions) {
            setData(query.data.competitions.slice(0, 100))
        }
    }, [query.data])

    useEffect(() => {
        if (query.data?.competitions) {
            setData(query.data?.competitions.slice(0, page * 100))
        }
    }, [page, query.data])

    const appendData = () => {
        setPage(page + 1)
    }

    const onScroll = e => {
        if (e.target.scrollHeight - e.target.scrollTop < height + 5) {
            appendData()
        }
    }

    const onClick = (race) => {
        setRace(race.id)
        navigate('/~bukp00/sp2/' + race.id)
    }

    return (
        <>
            {
                query.data?.competitions ?
                    <div className='select-list'>
                        <List>
                            <VirtualList
                                key='list'
                                data={data}
                                height={height}
                                itemHeight={47}
                                itemKey='id'
                                onScroll={onScroll}
                            >
                                {item => (
                                    <List.Item key={item.id} onClick={() => onClick(item)}>
                                        <List.Item.Meta
                                            title={<span>{item.name}</span>}
                                            description={item.organizer + ', ' + item.date}
                                        />
                                    </List.Item>
                                )}
                            </VirtualList>
                        </List>
                    </div> :
                    <div className='select-list-loading'>
                        <Skeleton />
                    </div>
            }
        </>
    )
}

export default RaceSelect;
