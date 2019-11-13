// This auth file is intetionally kept simple and designed to only
// return a standard JWT on demand.  The hydration from from
// local storage is done in our vuex store as an action

import store from './store'

export default {

  async getToken () {
    // Call this to get a token to set as a global bearer token when calling your own API
    // Tozny will handle automatically refreshing this token for you if needed

    try{
      const token = await store.state.toznyClient.token()
      return token;
    }catch(err){
      console.log("Unable to get token")
      return false;
    }
  },
}
