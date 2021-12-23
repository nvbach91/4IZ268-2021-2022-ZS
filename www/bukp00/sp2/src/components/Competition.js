import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { Empty } from 'antd'

import ResultsTable from './ResultTable'
import LastPassings from './LastPassings'
import ClassPicker from './ClassPicker'

import { useStore, useDataStore, usePersonalSettings } from '../hooks/useStore'

import { getClasses, getCompetitionInfo, getLastPassings } from '../services/resultsApi'


const compId = '20432';

const useSetInfiniteDataStore = (compId) => {

    const autoRefetch = usePersonalSettings((state) => state.autoRefetch)
    const refetchInterval = usePersonalSettings((state) => state.refetchInterval)

    const query = useQuery(
        ['passings', { comp: compId }],
        getLastPassings,
        {
            enabled: !!compId,
            refetchInterval: autoRefetch ? refetchInterval || 15000 : undefined,
        });

    const setLastPassings = useDataStore((state) => state.setLastPassings);

    useEffect(() => {
        if (query.data) {
            if (query.data.status === 'OK') {
                setLastPassings(query.data.passings)
            }
        }
    }, [query.data, setLastPassings])
}

const Competition = () => {

    const setTitle = useStore((state) => state.setTitle)
    const setSubtitle = useStore((state) => state.setSubtitle)

    const [selected, setSelected] = useState({ type: 'class', value: '' });

    const classesQuery = useQuery(['classes', { comp: compId }], getClasses);

    const competitionQuery = useQuery(['competition', { comp: compId }], getCompetitionInfo);

    useSetInfiniteDataStore(compId);

    useEffect(() => {
        if (competitionQuery.data) {
            setTitle(competitionQuery.data.name)
            setSubtitle(competitionQuery.data.date)
        }
    }, [competitionQuery.data, setTitle, setSubtitle])

    useEffect(() => {
        if (!selected.value.length) {
            if (classesQuery.data?.classes) {
                if (classesQuery.data.classes.length) {
                    setSelected({ type: 'class', value: classesQuery.data.classes[0].className })
                }
            }
        }
    }, [classesQuery.data, selected.value.length])

    if (!selected.value.length) {
        return (
          <>
            <div className={'empty-wrapper'}>
              <Empty description='Ještě nebyla načtena žádná data.'/>
            </div>
          </>
        )
    }

    return (
        <>
            <div className={'container'}>
                <div className={'passings'}>
                    {selected !== undefined ?
                        <LastPassings
                            selectedResults={selected}
                            setSelectedResults={setSelected}
                        /> : null}
                </div>
                <div className={'sidebar'}>
                    <ClassPicker
                        classList={classesQuery.data?.classes}
                        selectedResults={selected}
                        setSelectedResults={setSelected}
                    />
                </div>
                <div className={'data'}>
                    {selected !== undefined ?
                        <ResultsTable
                            competitionId={compId}
                            selectedResults={selected}
                            setSelectedResults={setSelected}
                        /> : null}
                </div>
            </div>
        </>
    )
}

export default Competition;