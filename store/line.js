export const state = () => ({
    lineUserId: null,
    displayName: null,
    picture: null
})

export const mutations = {
    setLine(state, lineData) {
        state.lineUserId = lineData.userId
        state.displayName = lineData.displayName
        state.picture = lineData.pictureUrl

    },
    resetLine(state) {
        state.lineUserId = null
        state.displayName = null
        state.picture = null

    },
}
