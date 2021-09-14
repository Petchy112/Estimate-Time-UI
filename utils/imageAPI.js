import { request } from "./API"
import { HOSTNAME } from '@/utils/API'

export function upload(image) {
    const url =`${HOSTNAME}/image/uploadChoiceImage`
    var bodyFormData = new FormData()
    bodyFormData.append('images', image)
    return request('post', url, bodyFormData, { Authorization: localStorage.getItem('token') })
}

export function uploadProfile(images) {
    const url =`${HOSTNAME}/image/uploadUserImage`
    var bodyFormData = new FormData()
    bodyFormData.append('images', images)
    return request('post', url, bodyFormData, { Authorization: localStorage.getItem('token') })
}

export function getImage(userId) {
    const url =`${HOSTNAME}/image/getImage?userId=${userId}`
    return request('get', url, {}, null)
}

// export function getChoiceImage(choiceId) {
//     const url =`${HOSTNAME}/image/getImage?imageId=${choiceId}`
//     return request('get', url, {}, { Authorization: localStorage.getItem('token') })
// }
