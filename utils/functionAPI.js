import instanceAPI from "~/utils/instance"

export default {
    functionList: (platform) => {
        return instanceAPI.api.get(`/function?platform=${platform}`)
            .then(response => response.data)
    },
    functionDetails: (id) => {
        return instanceAPI.api.get(`/function/${id}`)
            .then(response => response.data)
    },
    createFunction: (group, platform, choice) => {
        return instanceAPI.api.post(`/function/add`, group, platform, choice)
            .then(response => response.data)
    },
    editFunction: (id, group, choice) => {
        return instanceAPI.api.post(`/function/${id}/edit`, group, choice)
            .then(response => response.data)
    },
    deleteFunction: (id) => {
        return instanceAPI.api.delete(`/function/${id}`)
            .then(response => response.data)
    }
}
