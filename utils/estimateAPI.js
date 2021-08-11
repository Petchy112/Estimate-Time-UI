import { request } from '@/utils/API'
const HOSTNAME = 'http://localhost:4000'

export function index() {
    const url =`${HOSTNAME}/estimate`
    return request('get', url, {}, { Authorization: localStorage.getItem('token') })
}
