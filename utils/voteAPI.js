import instanceAPI from "~/utils/instance"

export default {
    resultLists: () => {
        return instanceAPI.api.get(`/vote/list`)
            .then(response => response.data)
    },
    resultDetails: (round, platform) => {
        return instanceAPI.api.get(`/vote/${round}/detail?platform=${platform}`)
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
    handleVote: () => {
        return instanceAPI.api.post(`/vote/controlVote`)
            .then(response => response.data)
    },
}
