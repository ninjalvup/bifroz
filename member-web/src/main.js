import Vue from 'vue'
import jQuery from 'jquery';
import App from './App.vue'
import router from './router';
import store from './store';
import Axios from 'axios';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import Vuelidate from "vuelidate";
import SimpleVueValidation from 'simple-vue-validator';
import moment from 'moment'
import VueTree from '@ssthouse/vue-tree-chart'
Vue.prototype.moment = moment;
var numeral = require("numeral");
Vue.component('vue-tree', VueTree);


  Vue.filter("formatNumber", function (value) {
    return numeral(value).format("0.00"); // displaying other groupings/separators is possible, look at the docs
  });
  Vue.filter('formatDate', function (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  })

Vue.config.productionTip = false
Axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.access_token}`;
new Vue({
  router,
  store,
  jQuery,
  Vuelidate,
  SimpleVueValidation,
  Toast,
  render: h => h(App),
}).$mount('#app')
