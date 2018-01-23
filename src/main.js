import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import { getCookie } from './util/cookies'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(mavonEditor)

Vue.prototype.$ajax = axios

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let sessionId = getCookie('sessionId')
  if (to.path !== '/') {
    axios.post('/users/checklogin', {
        'sessionId': sessionId
    }).then(response => {
      let res = response.data
      if (res.status === '1') {
        if (!store.state.userId) {
          store.commit('SET_USERID', res.result._id)
          store.commit('SET_USERNAME', res.result.info.username)
          store.commit('SET_AVATAR', res.result.info.avatar)
          store.commit('SET_INFOID', res.result.info._id)
          store.commit('SET_ROLE', res.result.role)
        }
        next()
      } else {
        next('/')
      }
    })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
