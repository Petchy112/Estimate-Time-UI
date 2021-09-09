import { request } from "./API"
import { HOSTNAME } from '@/utils/API'

export function upload(images) {
    console.log(images)
    const url =`${HOSTNAME}/image/uploadImage`
    var bodyFormData = new FormData()
    bodyFormData.append('images', images)
    return request('post', url, bodyFormData, { Authorization: localStorage.getItem('token') })
}
