import instanceAPI from '~/utils/instance'

export default {
    userLists: () => {
        return instanceAPI.api.get(`/user/list`)
            .then(response => response.data)
    },
    register: (data) => {
        return instanceAPI.api.post(`/user/login`, data)
            .then(response => response.data)
    },
    login: (data) => {
        return instanceAPI.api.post(`/user/login`, data)
            .then(response => response.data)
    },
    selectRole: (data) => {
        return instanceAPI.api.post(`/user/selectRole`, data)
            .then(response => response.data)
    },
    getProfile: () => {
        return instanceAPI.api.get(`/user/getProfile`)
            .then(response => response.data)
    },
    changepassword: (data) => {
        return instanceAPI.api.post(`/user/changePassword`, data)
            .then(response => response.data)
    },
    logout: () => {
        return instanceAPI.api.post(`/user/logout`)
            .then(response => response.data)
    },
    userDetails: (id) => {
        return instanceAPI.api.get(`/user/${id}`)
            .then(response => response.data)
    },
    removeUser: (id)=> {
        return instanceAPI.api.delete(`/user/${id}`)
            .then(response => response.data)
    }
}

