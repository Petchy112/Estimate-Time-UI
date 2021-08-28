export const state = () => ({
    line: {
        pictureUrl: null,
        displayName: null,
        userId: null
    },
    user: {
        firstname: '',
        lastname: '',
        role: '',
        email: '',
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
    }
})
export const getters = {
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
    }
}
export const mutations = {
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
    }
}
export const actions = {
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
    }
}
