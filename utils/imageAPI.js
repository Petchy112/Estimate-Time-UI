import { request } from "./API"
import { HOSTNAME } from '~/utils/API'

export default {
    upload: (image) => {
        const url =`${HOSTNAME}/image/upload`
        var bodyFormData = new FormData()
        bodyFormData.append('images', image)
        return request('post', url, bodyFormData, { Authorization: localStorage.getItem('token') })
    },
    uploadProfile: (images) => {
        const url =`${HOSTNAME}/image/uploadProfile`
        var bodyFormData = new FormData()
        bodyFormData.append('images', images)
        return request('post', url, bodyFormData, { Authorization: localStorage.getItem('token') })
    }
}

