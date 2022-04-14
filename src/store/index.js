import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken;
    },
    deleteToken(state) {
      state.token = null;
    },
  },
  actions: {
    storeToken(context, newToken) {
      context.commit('setToken', newToken);
    },
    deleteToken(context) {
      if (context.getters.loggedIn) {
        context.commit('deleteToken');
      }
    },
  },
  modules: {
  },
});
