import { createStore } from 'vuex'
import CryptoJS from 'crypto-js'

export default createStore({
    state() {
        return {
            logs: [
                // {id: '1', mood: 'great', note: 'example', temp: 14, desc: 'clear sky', date: '01 Oct 2022', time: '12:00'}
            ],
            userAuth: false,
            userPin: '',
            salt: '628c8f5a8ff8e9a03525801c35929897'
        }
    },
    getters: {
        logs(state) {
            return state.logs
        },
        isAuth(state) {
            return state.userAuth
        },
        pin(state) {
            return state.userPin
        },
        salt(state) {
            return state.salt
        }
    },
    actions: {
        loadStore({ commit }) {
            if (localStorage.getItem('store')) {
                const decryptedLogs = CryptoJS.AES.decrypt(localStorage.getItem('store'), this.getters.pin)

                const logs = JSON.parse(decryptedLogs.toString(CryptoJS.enc.Utf8))

                commit('STORE_LOADED', logs)
            }
        },
        saveStore() {
            const encryptedLogs = CryptoJS.AES.encrypt(JSON.stringify(this.getters.logs), this.getters.pin)

            localStorage.setItem('store', encryptedLogs)
        },
        addLog({ commit }, log) {
            commit('LOG_ADDED', log)

            this.dispatch('saveStore')
        },
        loadAuth({ commit }) {
            if (sessionStorage.getItem('user-auth')) {
                const storedAuth = sessionStorage.getItem('user-auth')

                commit('AUTH_LOADED', storedAuth)
            }
        },
        enableAuth({ commit }) {
            sessionStorage.setItem('user-auth', true)

            commit('AUTH_ENABLED', true)
        },
        loadPin({ commit }) {
            if (localStorage.getItem('hash')) {
                const desaltedPin = CryptoJS.AES.decrypt(localStorage.getItem('hash'), this.getters.salt).toString(CryptoJS.enc.Utf8)

                commit('PIN_LOADED', desaltedPin)
            }
        },
        createPin({ commit }, pin) {
            // Encrypt the PIN with salt value and store in local storage
            const saltedPin = CryptoJS.AES.encrypt(pin, this.getters.salt)
            // This is not actual hashing, just a simple encryption so that the PIN is not stored in plain text
            localStorage.setItem('hash', saltedPin)

            this.dispatch('loadPin', pin)

            this.dispatch('enableAuth')
        },
        checkPin({ commit }, pinAttempt) {
            if (pinAttempt == this.getters.pin) {
                this.dispatch('enableAuth')
            }
        }
    },
    mutations: {
        STORE_LOADED(state, decryptedLogs) {
            state.logs = decryptedLogs
        },
        LOG_ADDED(state, newLog) {
            state.logs.unshift(newLog)
        },
        AUTH_LOADED(state, storedAuth) {
            state.userAuth = storedAuth
        },
        AUTH_ENABLED(state, enabled) {
            state.userAuth = enabled
        },
        PIN_LOADED(state, desaltedPin) {
            state.userPin = desaltedPin.toString(CryptoJS.enc.Utf8)
        }
    }
})