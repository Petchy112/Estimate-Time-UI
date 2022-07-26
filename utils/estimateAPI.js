import instanceAPI from '~/utils/instance'

export default {
    estimateLists: () => {
        return instanceAPI.api.get(`/estimate/list`)
            .then(response => response.data)
    },
    estimateDetail: (id) => {
        return instanceAPI.api.get(`/estimate/${id}/detail`)
            .then(response => response.data)
    },
    sentEstimate: (data)=> {
        return instanceAPI.api.post(`/estimate/save`, data)
            .then(response => response.data)
    }
}
