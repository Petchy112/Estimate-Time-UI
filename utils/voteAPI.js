import { request } from '@/utils/API'
const HOSTNAME = 'http://localhost:4000'

export function index() {
    const url =`${HOSTNAME}/vote`
    return request('get', url, {}, { Authorization: localStorage.getItem('token') })
}
export function show(date, platform) {
    const url =`${HOSTNAME}/vote/${date}?platform=${platform}`
    return request('get', url, {}, { Authorization: localStorage.getItem('token') })
}
export function sentVote(fid, body) {
    const url =`${HOSTNAME}/vote/${fid}/save`
    console.log(fid, body)
    return request('post', url, { body }, { Authorization: localStorage.getItem('token') })
}
export function getDataForEstimate(platform) {
    const url =`${HOSTNAME}/vote/?platform=${platform}`
    return request('get', url, {}, { Authorization: localStorage.getItem('token') })
}
