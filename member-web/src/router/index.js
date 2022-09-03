import Vue from 'vue'
import VueRouter from 'vue-router'

import appLayout from '../components/layouts/app-layout.vue'
import redirect from '../components/pages/redirect.vue'

import backendLayout from '../components/layouts/app-backend.vue'
import Login from '../components/pages/login.vue'
// import Login from '../components/pages/loginimi.vue'
import Forgot from '../components/pages/forgotpassword.vue'
import Updatepassword from '../components/pages/updatepassword.vue'
import Register from '../components/pages/register.vue'
import home from '../components/pages/backend/home/home.vue'
import Profile from '../components/pages/backend/profile/profile.vue'
import changPassword from '../components/pages/backend/profile/chang-password.vue'
import editProfile from '../components/pages/backend/profile/edit-profile.vue'
import addDeposit from '../components/pages/backend/deposit/add-deposit.vue'
import withdraw from '../components/pages/backend/withdraw/withdraw.vue'
import report from '../components/pages/backend/report/report.vue'
import promotion from '../components/pages/backend/promotion/promotion.vue'
import depositlist from '../components/pages/backend/deposit/depositlist.vue'
import bank from '../components/pages/backend/deposit/bank.vue'
import banktrue from '../components/pages/backend/deposit/bank-true.vue'
import bankInfo from '../components/pages/backend/deposit/bank-Info.vue'
import trueInfo from '../components/pages/backend/deposit/true-info.vue'
import banklist from '../components/pages/backend/deposit/bank-list.vue'
import truewallet from '../components/pages/backend/deposit/truewallet.vue'
import sharedLink from '../components/pages/backend/sharedLink/sharedLink.vue'
import withdrawInfo from '../components/pages/backend/withdraw/withdrawInfo.vue'
import decimal from '../components/pages/backend/deposit/decimalDeposit/decimal.vue'
import depositInfo from '../components/pages/backend/deposit/decimalDeposit/depositInfo.vue'
import userTree from '../components/pages/backend/userTree/treeChart.vue'
import withdrawIncome from '../components/pages/backend/withdrawIncome/incomeDetail.vue'
import incomeInfo from '../components/pages/backend/withdrawIncome/incomeInfo.vue'

import Usertree from '../components/pages/usertree.vue'



//connectgame router
// import casino from '../components/pages/backend/game/casino/casino'
// import ambPoker from '../components/pages/backend/game/ambpoker/ambPoker'
// import slot from '../components/pages/backend/game/slot/slot'
// import slotxo from '../components/pages/backend/game/slot/gameslot/slotxo'
// import spadeGaming from '../components/pages/backend/game/slot/gameslot/spade_gaming'
// import askmebet from '../components/pages/backend/game/slot/gameslot/askmebet'
// import ameba from '../components/pages/backend/game/slot/gameslot/ameba'
// import gamatron from '../components/pages/backend/game/slot/gameslot/gamatron'
// import pgSlot from '../components/pages/backend/game/slot/gameslot/pg_slot'
// import live22 from '../components/pages/backend/game/slot/gameslot/live22'


Vue.use(VueRouter)
  

function guardMyroute(to, from, next) {  
  var isAuthenticated = false;

  if (sessionStorage.getItem('access_token'))
    isAuthenticated = true;
  else
    isAuthenticated = false;
  if (isAuthenticated) {
    next(); // allow to enter route
  }
  else {
    next('/'); // go to '/login';
  }
}

function guardMyroute2(to, from, next) {
  var isAuthenticated = false;

  if (sessionStorage.getItem('access_token'))
    isAuthenticated = false;
  else
    isAuthenticated = true;
  if (isAuthenticated) {
    next(); // allow to enter route
  }
  else {
    next('/home'); // go to '/login';
  }
}

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: 'login',
      component: appLayout,
      children: [
        {
          path: '/login',
          name: 'Login', beforeEnter: guardMyroute2,
          component: Login
        },
        {
          path: '/register',
          name: 'register', beforeEnter: guardMyroute2,
          component: Register

        },
        {
          path: '/redirect',
          name: 'redirect', beforeEnter: guardMyroute2,
          component: redirect
        },
        {
          path: '/forgotpassword',
          name: 'forgotpassword', beforeEnter: guardMyroute2,
          component: Forgot
        },

        {
          path: '/updatepassword',
          name: 'updatepassword', beforeEnter: guardMyroute2,
          component: Updatepassword
        },

        {
          path: '/userstree',
          name: 'userstree', beforeEnter: guardMyroute2,
          component: Usertree
        },
   

      ]
    },
    {
      path: '/backend', component: backendLayout,
      children: [
        {
          path: '/home',
          name: 'home', beforeEnter: guardMyroute,
          component: home
        },
        {
          path: '/profile',
          name: 'profile', beforeEnter: guardMyroute,
          component: Profile
        },
        {
          path: '/changPassword',
          name: 'changPassword', beforeEnter: guardMyroute,
          component: changPassword
        },
        {
          path: '/editProfile',
          name: 'editProfile', beforeEnter: guardMyroute,
          component: editProfile
        },
        {
          path: '/addDeposit',
          name: 'addDeposit', beforeEnter: guardMyroute,
          component: addDeposit
        },
        {
          path: '/withdraw',
          name: 'withdraw', beforeEnter: guardMyroute,
          component: withdraw
        },
        {
          path: '/report',
          name: 'report', beforeEnter: guardMyroute,
          component: report
        },
        {
          path: '/promotion',
          name: 'promotion', beforeEnter: guardMyroute,
          component: promotion
        },
        {
          path: '/depositlist',
          name: 'depositlist', beforeEnter: guardMyroute,
          component: depositlist
        },
        {
          path: '/bank',
          name: 'bank', beforeEnter: guardMyroute,
          component: bank
        },
        {
          path: '/banktrue',
          name: 'banktrue', beforeEnter: guardMyroute,
          component: banktrue
        },
        {
          path: '/bankInfo',
          name: 'bankInfo', beforeEnter: guardMyroute,
          component: bankInfo
        },
        {
          path: '/trueInfo',
          name: 'trueInfo', beforeEnter: guardMyroute,
          component: trueInfo
        },
        {
          path: '/banklist',
          name: 'banklist', beforeEnter: guardMyroute,
          component: banklist
        },
        {
          path: '/truewallet',
          name: 'truewallet', beforeEnter: guardMyroute,
          component: truewallet
        },
        {
          path: '/sharedLink',
          name: 'sharedLink', beforeEnter: guardMyroute,
          component: sharedLink
        },
        {
          path: '/withdrawInfo',
          name: 'withdrawInfo', beforeEnter: guardMyroute,
          component: withdrawInfo
        },
        {
          path: '/decimal',
          name: 'decimal', beforeEnter: guardMyroute,
          component: decimal
        },
        {
          path: '/depositInfo',
          name: 'depositInfo', beforeEnter: guardMyroute,
          component: depositInfo
        },
        {
          path: '/userTree',
          name: 'userTree', beforeEnter: guardMyroute,
          component: userTree
        },
        {
          path: '/withdrawIncome',
          name: 'withdrawIncome', beforeEnter: guardMyroute,
          component: withdrawIncome
        },
        {
          path: '/incomeInfo',
          name: 'incomeInfo', beforeEnter: guardMyroute,
          component: incomeInfo
        },
        
        //connectgame uncomment here

        // {
        //   path: '/casino',
        //   name: 'casino', beforeEnter: guardMyroute,
        //   component: casino
        // },
        // {
        //   path: '/ambPoker',
        //   name: 'ambPoker', beforeEnter: guardMyroute,
        //   component: ambPoker
        // },
        // {
        //   path: '/slot',
        //   name: 'slot', beforeEnter: guardMyroute,
        //   component: slot
        // },
        // {
        //   path: '/slotxo',
        //   name: 'slotxo', beforeEnter: guardMyroute,
        //   component: slotxo
        // },
        // {
        //   path: '/spadeGaming',
        //   name: 'spadeGaming', beforeEnter: guardMyroute,
        //   component: spadeGaming
        // },
        // {
        //   path: '/askmebet',
        //   name: 'askmebet', beforeEnter: guardMyroute,
        //   component: askmebet
        // },
        // {
        //   path: '/ameba',
        //   name: 'ameba', beforeEnter: guardMyroute,
        //   component: ameba
        // },
        // {
        //   path: '/gamatron',
        //   name: 'gamatron', beforeEnter: guardMyroute,
        //   component: gamatron
        // },
        // {
        //   path: '/pgSlot',
        //   name: 'pgSlot', beforeEnter: guardMyroute,
        //   component: pgSlot
        // },
        // {
        //   path: '/live22',
        //   name: 'live22', beforeEnter: guardMyroute,
        //   component: live22
        // },
      ]
    }
  ]

})