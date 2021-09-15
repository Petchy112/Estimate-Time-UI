export const state = () => ({
    dialog: {
        isShow: false,
        title: '',
        message: ''
    },
    line: {
        pictureUrl: null,
        displayName: null,
        userId: null
    },
    user: {
        role: '',
        accessToken: ''
    },
    register: {
        firstname: '',
        lastname: '',
        password: '',
        confirmPassword: '',
        email: '',
        role: '',
    },
    login: {
        email: '',
        password: '',
    },
    selectedEstimate: {
        selectedChoice: [],
        platform: 'WEBSITE',
        estimateTime: 0,
        projectName: '',
        qty: 1,
        size: ''
    }

})
export const getters = {
    getDialog(state) {
        return state.dialog
    },
    getUser(state) {
        return state.user
    },
    getRegister(state) {
        return state.register
    },
    getLogin(state) {
        return state.login
    },
    getLine(state) {
        return state.line
    },
    getSelectedEstimate(state) {
        return state.selectedEstimate
    }
}
export const mutations = {
    SET_DIALOG(state, data) {
        state.dialog = {
            ...state.dialog,
            ...data
        }
    },
    SET_REGISTER(state, data) {
        state.register = {
            ...state.register,
            ...data
        }
    },
    SET_USER(state, data) {
        state.user = {
            ...state.user,
            ...data
        }
    },
    SET_LOGIN(state, data) {
        state.login = {
            ...state.login,
            ...data
        }
    },
    SET_LINE(state, data) {
        state.line = {
            ...state.line,
            ...data
        }
    },
    SET_SELECTED_ESTIMATE(state, data) {
        state.selectedEstimate = {
            ...state.selectedEstimate,
            ...data
        }
    }
}
export const actions = {
    setDialog({ commit }, data) {
        commit('SET_DIALOG', data)
    },
    setUser({ commit }, data) {
        commit('SET_USER', data)
    },
    setRegister({ commit }, data) {
        commit('SET_REGISTER', data)
    },
    setLogin({ commit }, data) {
        commit('SET_LOGIN', data)
    },
    setLine({ commit }, data) {
        commit('SET_LINE', data)
    },
    setSelectedEstimate({ commit }, data) {
        commit('SET_SELECTED_ESTIMATE', data)
    }
}
