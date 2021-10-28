import { request } from "./API"
import { HOSTNAME } from '~/utils/API'

export default {
    userLists: () => {
        const url = `${HOSTNAME}/user`
        return request('get', url, {}, { Authorization: localStorage.getItem('token') })
    },
    register: (body) => {
        const url = `${HOSTNAME}/user/register`
        return request('post', url, body, null)
    },
    login: (body) => {
        const url = `${HOSTNAME}/user/login`
        return request('post', url, body, null)
    },
    selectRole: (role) => {
        const url = `${HOSTNAME}/user/selectRole`
        return request('post', url, { role }, { lineUserId: localStorage.getItem('lineUserId') })
    },
    getProfile: () => {
        const url = `${HOSTNAME}/user/data`
        return request('get', url, {}, { Authorization: localStorage.getItem('token') })
    },
    changepassword: (body) => {
        const url = `${HOSTNAME}/user/changePassword`
        return request('post', url, body, { Authorization: localStorage.getItem('token') })
    },
    logout: () => {
        const url = `${HOSTNAME}/user/logout`
        return request('post', url, {}, { lineUserId: localStorage.getItem('lineUserId'), Authorization: localStorage.getItem('token') })
    },
    userDetails: (id) => {
        console.log(id)
        const url = `${HOSTNAME}/user/${id}`
        return request('get', url, {}, { Authorization: localStorage.getItem('token') })
    },
    removeUser: (id)=> {
        const url = `${HOSTNAME}/user/${id}`
        return request('delete', url, {}, { Authorization: localStorage.getItem('token') })
    }
}

