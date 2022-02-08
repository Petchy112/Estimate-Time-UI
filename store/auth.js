export const state = () => ({
    access_token: null,
})

export const mutations = {
    setAuth(state, authData) {
        state.access_token = authData.accessToken
    },
    resetAuth(state) {
        state.access_token = null
    },
}
