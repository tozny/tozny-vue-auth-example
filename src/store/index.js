import Vue from 'vue'
import Vuex from 'vuex'
import Tozny from '@toznysecure/sdk/browser'
const realmName = process.env.VUE_APP_REALM_NAME;
const appName = process.env.VUE_APP_APP_NAME;
const brokerUrl = process.env.VUE_APP_BROKER_URL;
const registrationToken = process.env.VUE_APP_REGISTRATION_TOKEN;

const tozId = new Tozny.identity.Realm(
  realmName,
  appName,
  brokerUrl
)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toznyClient: false,
    name: ''
  },
  mutations: {
    SET_TOZNY_CLIENT(state, payload){
      state.toznyClient = payload
    },
    SET_NAME(state, token) {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace('-', '+').replace('_', '/')
      const claims = JSON.parse(window.atob(base64))
      state.name = claims['preferred_username'];
    },
    LOGOUT(state){
      state.name = '',
      state.toznyClient =  false,
      localStorage.clear()
    }

  },
  actions: {
    async setToznyClient({commit}, payload){
      commit('SET_TOZNY_CLIENT', payload)

    },
    logout({commit}){
      commit('LOGOUT')
    },
    async rehydrateTozny({commit}){
        const client = tozId.fromObject(localStorage.getItem('toznyClient'))
        commit('SET_TOZNY_CLIENT', client)
        const token = await client.token()
        commit('SET_NAME', token)
    },
    async login({commit}, payload){
      try{
        const res = await tozId.login(payload.email, payload.pass)
        localStorage.setItem('toznyClient',JSON.stringify(res.serialize()))
        commit('SET_TOZNY_CLIENT', res)
        const token = await res.token()
        commit('SET_NAME', token)
      }catch(err){
        if (err.message === 'Unauthorized') {
          return new Error('Incorrect login information');
        } else {
          return err.message;
        }
      }
    },
    async requestReset({commit}, payload){
      try{

        // Requesting a reset from the TozID service and since
        // our realm is configured to let TozID broker the reset.
        // Our email will be delivered by Tozny.

        // (if you toggle the setting OFF in your realm settings then this will fail)

        await tozId.initiateRecovery(payload.email)
      }catch(err){
        return err;
      }
    },
    async completeRecovery({commit}, payload){
      try{
        // First we verify the query parameters from the recovery link
        // and pass them to the complete recovery method and then
        // the next function performs the password change
        const res = await tozId.completeEmailRecovery(payload.otp, payload.noteId)
        await res.changePassword(payload.pass)
      }catch(err){
        return err;
      }
    },
    async register({commit}, payload){
      try{
        await tozId.register(payload.email, payload.pass, registrationToken, payload.email)
        // Registration creates the identity with the server. Use login to start a full session.
        const res = await tozId.login(payload.email, payload.pass)
        localStorage.setItem('toznyClient',JSON.stringify(res.serialize()))
        commit('SET_TOZNY_CLIENT', res)
        const token = await res.token()
        commit('SET_NAME', token)

      }catch(err){
        return err;
      }
    },

  },
  getters: {
    loggedIn: state => !!state.toznyClient
  }
})
