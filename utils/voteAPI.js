import { HOSTNAME } from '~/utils/API'
import { request } from "./API"

export default {
    resultLists: () => {
        const url =`${HOSTNAME}/vote`
        return request('get', url, {}, { Authorization: localStorage.getItem('token') })
    },
    resultDetails: (round, platform) => {
        const url =`${HOSTNAME}/vote/${round}?platform=${platform}`
        return request('get', url, {}, { Authorization: localStorage.getItem('token') })
    },
    sentVote: (body) => {
        console.log(body)
        const url =`${HOSTNAME}/vote/save`
        return request('post', url, { body }, { Authorization: localStorage.getItem('token') })
    },
    getDataForEstimate: (platform) => {
        const url =`${HOSTNAME}/vote/result/?platform=${platform}`
        return request('get', url, {}, { Authorization: localStorage.getItem('token') })
    },
    handleVote: (action) => {
        const url =`${HOSTNAME}/vote/controlVote/?action=${action}`
        return request('post', url, {}, { Authorization: localStorage.getItem('token') })
    },
}
