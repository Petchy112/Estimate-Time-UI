import instanceAPI from "~/utils/instance"

export default {
    functionList: (platform) => {
        return instanceAPI.api.get(`/function/list?platform=${platform}`)
            .then(response => response.data)
    },
    functionDetails: (id) => {
        return instanceAPI.api.get(`/function/${id}`)
            .then(response => response.data)
    },
    createFunction: (data) => {
        return instanceAPI.api.post(`/function/add`, data)
            .then(response => response.data)
    },
    editFunction: (id, group, choices) => {
        return instanceAPI.api.post(`/function/${id}/edit`, group, choices)
            .then(response => response.data)
    },
    deleteFunction: (id) => {
        return instanceAPI.api.delete(`/function/${id}`)
            .then(response => response.data)
    }
}
