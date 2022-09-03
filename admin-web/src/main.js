// src/main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Axios from 'axios';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueFilterDateFormat from 'vue-filter-date-format';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import moment from 'moment'
import {
  extendMoment
} from 'moment-range';
import carousel from 'vue-owl-carousel'

import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '../node_modules/vue-ads-pagination/dist/vue-ads-pagination.css';
import VueAdsPagination, { VueAdsPageButton } from 'vue-ads-pagination';
import JwPagination from 'jw-vue-pagination';
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'


Vue.use(VueSidebarMenu)
Vue.prototype.moment = moment;
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
Vue.component('jw-pagination', JwPagination);
var numeral = require("numeral");
Vue.config.productionTip = false;

// set auth header
Axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.getItem('access_token');



Vue.filter('formatDate', function (value) {
  return moment(String(value)).format('DD/MM/YYYY HH:mm:ss')
})
Vue.filter('formatDate2', function (value) {
  return moment(String(value)).format('DD/MM/YYYY hh:mm:ss')
})
Vue.filter('formatTell', function (value) {
  let cleaned = ('' + value).replace(/\D/g, '');
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return match[1] + '-' + match[2] + '-' + match[3]
  }
  return null
})
// Vue.filter('formatCredit', function (value) {
//   return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
// })
Vue.filter("formatNumber", function (value) {
  return numeral(value).format("0.00"); // displaying other groupings/separators is possible, look at the docs
});
Vue.filter("integerNumber", function (value) {
  return numeral(value).format("0"); // displaying other groupings/separators is possible, look at the docs
});
new Vue({
  extendMoment,VueAdsPagination,VueAdsPageButton,
  router,
  VueFilterDateFormat,
  store,
  moment,
  carousel,
  Toast,
  render: h => h(App)
}).$mount('#app');