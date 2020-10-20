import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const state = {
  name: "",
  title: '',
  user: {}

};

const mutations = {
  setPrint(state, title) {
    //设置参数
    state.title = title;
  },
  setName(state, name) {
    state.name = name;
  },
  setUser(state, user) {
    state.user = user;
  }
}

const store = new Vuex.Store({
  state,
  modules,
  getters,
  mutations
})

export default store
