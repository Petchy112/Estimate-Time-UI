export const state = () => ({
    selectedChoice: [],
    platform: '',
    estimateTime: 0,
    projectName: '',
    qty: 0,
})

export const mutations = {
    setEstimateData(state, data) {
        state.selectedChoice = data.selectedChoice
        state.platform = data.platform
        state.estimateTime = data.estimateTime
        state.projectName = data.projectName
        state.qty = data.qty
    },
    resetEstimateData(state) {
        state.selectedChoice = []
        state.platform = ''
        state.estimateTime = 0
        state.projectName = ''
        state.qty = 0
    },
}
