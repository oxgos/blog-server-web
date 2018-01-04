import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.prototype.$ajax = axios

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.path !== '/') {
    axios.get('/users/checklogin').then(res => {
      if (res.data.status === '1') {
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
