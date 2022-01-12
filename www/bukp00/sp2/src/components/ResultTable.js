import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Table, Skeleton, Empty } from 'antd'
import { useLocation } from 'react-router-dom'

import { getResults } from '../services/resultsApi'
import { useDataStore, usePersonalSettings } from '../hooks/useStore'

const ResultsTable = (props) => {

    const { selectedResults, setSelectedResults } = props

    const location = useLocation()

    const compId = location.pathname.slice(location.pathname.lastIndexOf('/') + 1)

    const highlightClub = usePersonalSettings((state) => state.highlightClub)
    const clubList = useDataStore((store) => store.clubList)
    const setClubList = useDataStore((store) => store.setClubList)
    const autoRefetch = usePersonalSettings((state) => state.autoRefetch)
    const refetchInterval = usePersonalSettings((state) => state.refetchInterval)

    const { data, isLoading, isError } = useQuery(
        ['class', { comp: compId, type: selectedResults.type, value: selectedResults.value }],
        getResults,
        {
            refetchInterval: autoRefetch ? refetchInterval || 15000 : undefined,
        }
    )

    useEffect(() => {
        if (Array.isArray(data?.results)) {
            const clubs = []
            data.results.forEach((record) => {
                if (!clubList.includes(record.club) && !clubs.includes(record.club)) {
                    clubs.push(record.club)
                }
            });
            if (clubs.length) {
                setClubList([...clubList, ...clubs])
            }
        }
    }, [data, clubList, setClubList])

    if (!selectedResults.value.length) {
        return <Empty />
    }

    if (isLoading) {
        return (
            <Skeleton active title />
        )
    }

    if (isError) {
        return (
            <div>Failed to fetch data</div>
        )
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'place',
            key: '#',
            render: (text) => text,
            width: '35px',
            align: 'center'
        }, {
            title: 'Jméno',
            dataIndex: 'name',
            key: 'name'
        }
    ]

    if (selectedResults.type === 'class') {
        columns.push({
            title: 'Klub',
            dataIndex: 'club',
            key: 'club',
            render: (text) => {
                return (
                    <button onClick={() => setSelectedResults({ type: 'club', value: text })}>{text}</button>
                )
            }
        })
    } else {
        columns.push({
            title: 'Kat.',
            dataIndex: 'class',
            key: 'class',
            render: (text) => {
                return (
                    <button onClick={() => setSelectedResults({ type: 'class', value: text })}>{text}</button>
                )
            }
        })
    }

    columns.push({
        title: 'Start',
        dataIndex: 'start',
        key: 'start',
        render: (text) => {
            return formatTime(text);
        }
    })

    if (data) {
        if (Array.isArray(data.splitcontrols)) {
            if (data.splitcontrols.length) {
                data.splitcontrols.forEach((obj) => {
                    columns.push({
                        title: obj.name,
                        dataIndex: obj.code,
                        key: obj.code,
                        render: (obj) => {
                            return (
                                formatSplitResult(obj))
                        }
                    })
                })
            }
        }
        columns.push({
            title: 'Cíl',
            dataIndex: 'result',
            key: 'result',
            render: (obj) => {
                return (
                    translateFinishTime(obj)
                )
            }
        })
        columns.push({
            title: 'Ztráta',
            dataIndex: 'timeplus',
            key: 'timeplus',
            render: (obj) => {
                return (
                    translateFinishTime(obj)
                )
            }
        })
    }

    const tableData = { ...data };

    if (data?.splitcontrols?.length) {
        tableData.results = data.results.map((obj) => {
            const adjusted = { ...obj };
            data.splitcontrols.forEach((splitControl) => {
                adjusted[splitControl.code] = {
                    time: obj.splits[splitControl.code],
                    place: obj.splits[splitControl.code + '_place'],
                    timeplus: obj.splits[splitControl.code + '_timeplus']
                }
            })
            return adjusted;
        })
    }

    const keyData = tableData.results.map((obj, index) => {
        return { ...obj, key: index }
    })

    const getRowClassName = (record, index) => {
        const isOdd = (num) => {
            return num % 2
        }

        const classNames = []

        if (isOdd(index)) {
            classNames.push('odd')
        }

        if (highlightClub?.length && record.club?.toLowerCase() === highlightClub.toLowerCase()) {
            classNames.push('highlight')
        }

        return classNames.join(' ')
    }

    return (
        <Table
            columns={columns}
            dataSource={keyData}
            pagination={false}
            size='small'
            bordered
            rowClassName={(record, index) => getRowClassName(record, index)}
            scroll={{ y: 'calc(100vh - 270px - 2.55rem)', x: true }}
        />
    )
}

export default ResultsTable;

function formatTime(num, format = 'hh:mm:ss') {

    if (num === undefined || num === null || typeof num === 'string') return ''

    const hours = Math.floor(num / (100 * 3600))
    const min = Math.floor((num / 100 - hours * 3600) / 60)
    const sec = Math.floor(num / 100 - hours * 3600 - min * 60)

    if (format === 'hh:mm:ss') {
        return (`${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`)
    }
    else if (format === 'mm:ss') {
        return (`${(min + hours * 60).toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`)
    } else return (`${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
    )
}

const formatSplitResult = (splitResult) => {

    if (splitResult.time === "" || splitResult.time === undefined || !splitResult.time) {
        return null
    }

    return (
        <span>
            {formatTime(splitResult.time, 'mm:ss')}
            <br />
            +{formatTime(splitResult.timeplus, 'mm:ss')}({splitResult.place})
        </span>
    )
}


const translateFinishTime = (time) => {
    if (time === '+ej start' || time === 'ej start') {
        return (
            'dns'
        )
    }

    if (time === '+utgått' || time === 'utgått') {
        return (
            'dnf'
        )
    }

    if (time === '+felst.' || time === 'felst.') {
        return (
            'mp'
        )
    }

    return time
}