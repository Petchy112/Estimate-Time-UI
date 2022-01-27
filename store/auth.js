export const state = () => ({
    access_token: null,
    refresh_token: null,
    role: null,
    pictureUrl: null,
    displayName: null,
    userId: null
})

export const mutations = {
    setAuth(state, authData) {
        state.accessToken = authData.accessToken
        state.refreshToken = authData.refreshToken
        state.role = authData.role
        state.pictureUrl = authData.pictureUrl
        state.displayName = authData.displayName
        state.userId = authData.userId
    },
    resetAuth(state) {
        state.accessToken = null
        state.refreshToken = null
        state.role = null
        state.pictureUrl = null
        state.displayName = null
        state.userId = null
    },
}
