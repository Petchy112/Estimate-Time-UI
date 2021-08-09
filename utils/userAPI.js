import { request } from "./API"
const HOSTNAME = 'http://localhost:4000'

export function index() {
    const url = `${HOSTNAME}/user`
    return request('get', url, {})
}
export function register(body) {
    const url = `${HOSTNAME}/user/register`
    return request('post', url, body)
}
export function show(id) {
    console.log(id)
    const url = `${HOSTNAME}/user/${id}`
    return request('get', url, {})
}
export function del(id) {
    const url = `${HOSTNAME}/user/${id}`
    return request('delete', url, {})
}


