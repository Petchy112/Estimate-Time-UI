import { request } from "./API"
const HOSTNAME = 'http://localhost:4000'

export function index() {

    const url =`${HOSTNAME}/function`
    return request('get', url, {})
}
export function show(id) {
    const url =`${HOSTNAME}/function/${id}`
    return request('get', url, {})
}
export function create(group, choice) {
    console.log('NAME', group)
    console.log('BODY', choice)
    const url =`${HOSTNAME}/function/add`
    return request('post', url, { group, choice })
}
export function edit(id, group, choice) {
    console.log(group, choice)
    const url =`${HOSTNAME}/function/${id}/edit`
    return request('put', url, { group, choice })
}
export function del(id) {
    const url =`${HOSTNAME}/function/${id}`
    return request('delete', url, {})
}
