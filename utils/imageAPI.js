import instanceAPI from "~/utils/instance"

export default {
    upload: (image) => {
        return instanceAPI.api.post(`/image/upload`, image)
            .then(response => response.data)
    },
    uploadProfile: (images) => {
        return instanceAPI.api.post(`/image/uploadProfile`, images)
            .then(response => response.data)
    }
}

