import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations'
Vue.use(Vuex)

const state = {
    userName: ''
}

export default new Vuex.Store({
    state,
    mutations
})
