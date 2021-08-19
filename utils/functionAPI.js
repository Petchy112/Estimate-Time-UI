import { request } from "./API"
const HOSTNAME = 'http://localhost:4000'

export function index() {
    const url =`${HOSTNAME}/function`
    return request('get', url, {}, { Authorization: localStorage.getItem('token') })
}
export function show(id) {
    const url =`${HOSTNAME}/function/${id}`
    return request('get', url, {}, { Authorization: localStorage.getItem('token') })
}
export function create(group, platform, choice) {
    console.log(group, platform, choice)
    const url =`${HOSTNAME}/function/add`
    return request('post', url, { group, platform, choice }, { Authorization: localStorage.getItem('token') })
}
export function edit(id, group, choice) {
    console.log(group, choice)
    const url =`${HOSTNAME}/function/${id}/edit`
    return request('put', url, { group, choice }, { Authorization: localStorage.getItem('token') })
}
export function del(id) {
    const url =`${HOSTNAME}/function/${id}`
    return request('delete', url, {}, { Authorization: localStorage.getItem('token') })
}
