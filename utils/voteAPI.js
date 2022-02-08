import instanceAPI from "~/utils/instance"

export default {
    resultLists: () => {
        return instanceAPI.api.get(`/vote`)
            .then(response => response.data)
    },
    resultDetails: (round, platform) => {
        return instanceAPI.api.get(`/vote/${round}/?platform=${platform}`)
            .then(response => response.data)
    },
    sentVote: (data) => {
        return instanceAPI.api.post(`/vote/save`, data)
            .then(response => response.data)
    },
    getDataForEstimate: (platform) => {
        return instanceAPI.api.get(`/vote/result?platform=${platform}`)
            .then(response => response.data)
    },
    handleVote: (action) => {
        return instanceAPI.api.post(`/vote/controlVote/?action=${action}`)
            .then(response => response.data)
    },
}
