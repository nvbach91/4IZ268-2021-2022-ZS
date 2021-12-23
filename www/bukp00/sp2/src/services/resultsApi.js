import axios from 'axios'
import { queryClient } from '../App';

export const resultsApiUrl = 'https://liveresultat.orientering.se/api.php'
/*
export const getClassResults = ({ queryKey }) => {

    const [_key, { comp, className }] = queryKey;

    return axios.get(`${resultsApiUrl}?method=getclassresults&comp=${comp}&class=${className}`)
        .then((res) => res.data)
}

export const getClubResults = ({ queryKey }) => {

    const [_key, { comp, clubName }] = queryKey;

    return axios.get(`${resultsApiUrl}?method=getclubresults&comp=${comp}&club=${clubName}`)
        .then((res) => res.data)
}
*/
export const getResults = ({ queryKey }) => {

    const [_key, { comp, type, value }] = queryKey;

    if (!comp || !value) {
        throw new Error('No competition or class selected')
    }

    const cacheData = queryClient.getQueryData(queryKey)

    if (type === 'club') {
        return axios.get(
            `${resultsApiUrl}?method=getclubresults&comp=${comp}&club=${value}&last_hash=${cacheData?.hash}`
        )
            .then((res) => {
                if (res.data?.status === 'NOT MODIFIED') {
                    return cacheData
                } else return res.data
            })
    } else {
        return axios.get(
            `${resultsApiUrl}?method=getclassresults&comp=${comp}&class=${value}&last_hash=${cacheData?.hash}`
        )
            .then((res) => {
                if (res.data?.status === 'NOT MODIFIED') {
                    return cacheData
                } else return res.data
            })
    }
}

export const getClasses = ({ queryKey }) => {

    const [_key, { comp }] = queryKey

    if (!comp) {
        return null
    }

    const cacheData = queryClient.getQueryData(queryKey)

    return axios.get(`${resultsApiUrl}?method=getclasses&comp=${comp}&last_hash=${cacheData?.hash}`)
        .then((res) => {
            if (res.data?.status === 'NOT MODIFIED') {
                return cacheData
            } else return res.data
        })
}

export const getLastPassings = ({ queryKey }) => {

    const [_key, { comp }] = queryKey

    if (!comp) {
        return null
    }

    const cacheData = queryClient.getQueryData(queryKey)

    return axios.get(`${resultsApiUrl}?method=getlastpassings&comp=${comp}&last_hash=${cacheData?.hash}`)
        .then((res) => {
            if (res.data?.status === 'NOT MODIFIED') {
                return cacheData
            } else return res.data
        })
}

export const getCompetitionInfo = ({ queryKey }) => {

    const [_key, { comp }] = queryKey

    if (!comp) {
        return null
    }

    return axios.get(`${resultsApiUrl}?method=getcompetitioninfo&comp=${comp}`)
        .then((res) => res.data)
}