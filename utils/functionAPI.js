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
export function create(name, body) {
    console.log('NAME', name)
    console.log('BODY', body)
    const url =`${HOSTNAME}/function/add`
    return request('post', url, { name, body })
}
