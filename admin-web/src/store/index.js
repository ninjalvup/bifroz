import Vue from 'vue'
import Vuex from 'vuex'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueSimpleAlert from "vue-simple-alert";
import VueClipboard from 'vue-clipboard2'


Vue.use(Vuex)
Vue.use(Toast)
Vue.use(VueSimpleAlert);
Vue.use(VueClipboard)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
