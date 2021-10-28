import { request } from '~/utils/API'
import { HOSTNAME } from '~/utils/API'

export default {
    estimateLists: () => {
        const url =`${HOSTNAME}/estimate`
        return request('get', url, {}, { Authorization: localStorage.getItem('token') })
    },
    estimateDetail: (id) => {
        const url = `${HOSTNAME}/estimate/${id}`
        return request('get', url, {}, { Authorization: localStorage.getItem('token') })
    },
    sentEstimate: (body)=> {
        const url =`${HOSTNAME}/estimate/save`
        return request('post', url, body, { Authorization: localStorage.getItem('token') })
    }
}
