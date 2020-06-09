import Vue from 'vue'

import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://olympiate.com/api/mysql/'
axios.defaults.withCredentials = true

Vue.use(require('vue-moment'))

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
