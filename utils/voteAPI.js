import { request } from '@/utils/API'
import { HOSTNAME } from '@/utils/API'

export function index() {
    const url =`${HOSTNAME}/vote`
    return request('get', url, {}, { Authorization: localStorage.getItem('token') })
}
export function show(round, platform) {
    const url =`${HOSTNAME}/vote/${round}?platform=${platform}`
    return request('get', url, {}, { Authorization: localStorage.getItem('token') })
}
export function sentVote(body) {
    const url =`${HOSTNAME}/vote/save`
    console.log(body)
    return request('post', url, { body }, { Authorization: localStorage.getItem('token') })
}
export function getDataForEstimate(platform) {
    const url =`${HOSTNAME}/vote/result/?platform=${platform}`
    return request('get', url, {}, { Authorization: localStorage.getItem('token') })
}
export function handleVote(action) {
    const url =`${HOSTNAME}/vote/controlVote/?action=${action}`
    return request('post', url, {}, { Authorization: localStorage.getItem('token') })
}
