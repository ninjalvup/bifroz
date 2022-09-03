import Vue from 'vue'
import Vuex from 'vuex'
import Toast from "vue-toastification";
import Vuelidate from "vuelidate";
import "vue-toastification/dist/index.css";
import VueClipboard from 'vue-clipboard2'
import VueExpandableImage from 'vue-expandable-image'
Vue.use(Vuex)
Vue.use(Toast)
Vue.use(Vuelidate);
Vue.use(VueClipboard);
Vue.use(VueExpandableImage);

export default new Vuex.Store({
  state: {
    money: null,
    hrefLine: null,
  },
  mutations: {

  },


  actions: {

  },
  modules: {

  }
})