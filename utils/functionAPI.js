import { request } from "./API"
import { HOSTNAME } from '~/utils/API'

export default {
    functionList: (platform) => {
        const url =`${HOSTNAME}/function?platform=${platform}`
        return request('get', url, {}, { Authorization: localStorage.getItem('token') })
    },
    functionDetails: (id) => {
        const url =`${HOSTNAME}/function/${id}`
        return request('get', url, {}, { Authorization: localStorage.getItem('token') })
    },
    createFunction: (group, platform, choice) => {
        console.log(group, platform, choice)
        const url =`${HOSTNAME}/function/add`
        return request('post', url, { group, platform, choice }, { Authorization: localStorage.getItem('token') })
    },
    editFunction: (id, group, choice) => {
        console.log(group, choice)
        const url =`${HOSTNAME}/function/${id}/edit`
        return request('put', url, { group, choice }, { Authorization: localStorage.getItem('token') })
    },
    deleteFunction: (id) => {
        const url =`${HOSTNAME}/function/${id}`
        return request('delete', url, {}, { Authorization: localStorage.getItem('token') })
    }
}
