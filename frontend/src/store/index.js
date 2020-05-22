import Vue from 'vue'
import Vuex from 'vuex'

import Data from './modules/data'
import UI from './modules/ui'
import Search from './modules/search'
import User from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Data,
    UI,
    Search,
    User,
  }

})
