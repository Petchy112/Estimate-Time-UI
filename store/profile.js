export const state = () => ({
    profile: {},
})

export const mutations = {
    setProfile(state, profile) {
        state.profile = profile
    },
    resetProfile(state) {
        state.profile = {}
    },
}
