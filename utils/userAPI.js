import { request } from "./API"
const HOSTNAME = 'http://localhost:4000'

export function index() {
    const url = `${HOSTNAME}/user`
    return request('get', url, {}, { Authorization: localStorage.getItem('token') })
}
export function register(body) {
    const url = `${HOSTNAME}/user/register`
    return request('post', url, body, null)
}
export function login(body) {
    const url = `${HOSTNAME}/user/login`
    return request('post', url, body, null)
}
export function getProfile() {
    const url = `${HOSTNAME}/user/data`
    return request('get', url, {}, { Authorization: localStorage.getItem('token') })
}
export function logout() {
    const url = `${HOSTNAME}/user/logout`
    return request('post', url, {}, { Authorization: localStorage.getItem('token') })
}
export function show(id) {
    console.log(id)
    const url = `${HOSTNAME}/user/${id}`
    return request('get', url, {}, { Authorization: localStorage.getItem('token') })
}
export function del(id) {
    const url = `${HOSTNAME}/user/${id}`
    return request('delete', url, {}, { Authorization: localStorage.getItem('token') })
}


