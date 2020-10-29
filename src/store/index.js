import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    padindex: 0
  },
  mutations: {
    updatapadindex(state, paylod) {
      state.padindex = paylod
    }
  },
  actions: {
  },
  modules: {
  }
})
