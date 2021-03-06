import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
    new VuexPersistence({
        key: 'Estimate_Time',
        reducer: state => ({
            auth: state.auth,
            profile: state.profile,
            line: state.line,
            estimate: state.estimate
        })
    }).plugin(store)
}
