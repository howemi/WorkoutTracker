import Vue from 'vue'

import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://www.olympiate.com/api/mysql'
// axios.defaults.withCredentials = true
axios.defaults.headers.post['origin'] = 'http://www.olympiate.com'
axios.defaults.headers.get['origin'] = 'http://www.olympiate.com'
axios.defaults.headers.update['origin'] = 'http://www.olympiate.com'
axios.defaults.headers.delete['origin'] = 'http://www.olympiate.com'

Vue.use(require('vue-moment'))

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
