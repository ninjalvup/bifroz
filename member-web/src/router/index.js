import Vue from 'vue'
import VueRouter from 'vue-router'
// import { createRouter, createWebHashHistory } from 'vue-router'

import appLayout from '../components/layouts/app-layout.vue'
import redirect from '../components/pages/redirect.vue'

import backendLayout from '../components/layouts/app-backend.vue'
import Login from '../components/pages/login.vue'
// import Login from '../components/pages/loginimi.vue'
import Forgot from '../components/pages/forgotpassword.vue'
import Updatepassword from '../components/pages/updatepassword.vue'
import Register from '../components/pages/register.vue'
import Registerotp from '../components/pages/registerotp.vue'
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
import sharedLinkwithdraw from '../components/pages/backend/sharedLink/sharedLinkwithdraw.vue'
import sharedLink from '../components/pages/backend/sharedLink/sharedLink.vue'
import sharedincome from '../components/pages/backend/sharedLink/sharedincome.vue'
import withdrawInfo from '../components/pages/backend/withdraw/withdrawInfo.vue'
import decimal from '../components/pages/backend/deposit/decimalDeposit/decimal.vue'
import depositInfo from '../components/pages/backend/deposit/decimalDeposit/depositInfo.vue'
import userTree from '../components/pages/backend/userTree/treeChart.vue'
import withdrawIncome from '../components/pages/backend/withdrawIncome/incomeDetail.vue'
import incomeInfo from '../components/pages/backend/withdrawIncome/incomeInfo.vue'

import treeChart from '../components/pages/usertree.vue'



//connectgame router
import casino from '../components/pages/backend/game/casino/casino.vue'
import hit from '../components/pages/backend/game/hit/hit.vue'
import slot from '../components/pages/backend/game/slot/slot.vue'
import ying from '../components/pages/backend/game/ying/ying.vue'
import baccarat from '../components/pages/backend/game/baccarat/baccarat.vue'
import mv from '../components/pages/backend/game/mv/mv.vue'
// games
import aws from '../components/pages/backend/game/games/aws.vue'
import swg from '../components/pages/backend/game/games/swg.vue'
import kg from '../components/pages/backend/game/games/kg.vue'
import jl from '../components/pages/backend/game/games/jl.vue'
import km from '../components/pages/backend/game/games/km.vue'
import fc from '../components/pages/backend/game/games/fc.vue'
import funky from '../components/pages/backend/game/games/funky.vue'
import mg from '../components/pages/backend/game/games/mg.vue'
import gamatron from '../components/pages/backend/game/games/gamatron.vue'
import ep from '../components/pages/backend/game/games/ep.vue'
import pp from '../components/pages/backend/game/games/pp.vue'
import netent from '../components/pages/backend/game/games/netent.vue'
import joker from '../components/pages/backend/game/games/joker.vue'
import bpg from '../components/pages/backend/game/games/bpg.vue'
import bng from '../components/pages/backend/game/games/bng.vue'
import hab from '../components/pages/backend/game/games/hab.vue'
import kgl from '../components/pages/backend/game/games/kgl.vue'
import rlx from '../components/pages/backend/game/games/rlx.vue'
import ygg from '../components/pages/backend/game/games/ygg.vue'
import red from '../components/pages/backend/game/games/red.vue'
import qs from '../components/pages/backend/game/games/qs.vue'
import ids from '../components/pages/backend/game/games/ids.vue'
import tk from '../components/pages/backend/game/games/tk.vue'
import mav from '../components/pages/backend/game/games/mav.vue'
import ds from '../components/pages/backend/game/games/ds.vue'
import nlc from '../components/pages/backend/game/games/nlc.vue'
import ga from '../components/pages/backend/game/games/ga.vue'
import png from '../components/pages/backend/game/games/png.vue'
import pug from '../components/pages/backend/game/games/pug.vue'
import fng from '../components/pages/backend/game/games/fng.vue'
import nge from '../components/pages/backend/game/games/nge.vue'
import onextwo from '../components/pages/backend/game/games/onextwo.vue'
import hak from '../components/pages/backend/game/games/hak.vue'
import announce from '../components/pages/backend/announce/announce.vue'
//
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
  // mode: 'history',
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
          path: '/registerotp',
          name: 'registerotp', beforeEnter: guardMyroute2,
          component: Registerotp

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
          component: treeChart
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
          path: '/sharedincome',
          name: 'sharedincome', beforeEnter: guardMyroute,
          component: sharedincome
        },
        {
          path: '/sharedLinkwithdraw',
          name: 'sharedLinkwithdraw', beforeEnter: guardMyroute,
          component: sharedLinkwithdraw
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

        {
          path: '/casino',
          name: 'casino', beforeEnter: guardMyroute,
          component: casino
        },

        {
          path: '/hit',
          name: 'hit', beforeEnter: guardMyroute,
          component: hit
        },
        {
        path: '/mv',
        name: 'mv', beforeEnter: guardMyroute,
        component: mv
      },
        {
          path: '/slot',
          name: 'slot', beforeEnter: guardMyroute,
          component: slot
        },

        {
          path: '/ying',
          name: 'ying', beforeEnter: guardMyroute,
          component: ying
        },

        {
          path: '/baccarat',
          name: 'baccarat', beforeEnter: guardMyroute,
          component: baccarat
        },

        {
          path: '/joker',
          name: 'joker', beforeEnter: guardMyroute,
          component: joker
        },

        {
          path: '/onextwo',
          name: 'onextwo', beforeEnter: guardMyroute,
          component: onextwo
        },

        {
          path: '/aws',
          name: 'aws', beforeEnter: guardMyroute,
          component: aws
        },


        {
          path: '/bng',
          name: 'bng', beforeEnter: guardMyroute,
          component: bng
        },

        {
          path: '/bpg',
          name: 'bpg', beforeEnter: guardMyroute,
          component: bpg
        },


        {
          path: '/ds',
          name: 'ds', beforeEnter: guardMyroute,
          component: ds
        },


        {
          path: '/ep',
          name: 'ep', beforeEnter: guardMyroute,
          component: ep
        },


        {
          path: '/fc',
          name: 'fc', beforeEnter: guardMyroute,
          component: fc
        },


        {
          path: '/fng',
          name: 'fng', beforeEnter: guardMyroute,
          component: fng
        },

        {
          path: '/funky',
          name: 'funky', beforeEnter: guardMyroute,
          component: funky
        },


        {
          path: '/ga',
          name: 'ga', beforeEnter: guardMyroute,
          component: ga
        },


        {
          path: '/gamatron',
          name: 'gamatron', beforeEnter: guardMyroute,
          component: gamatron
        },




        {
          path: '/hab',
          name: 'hab', beforeEnter: guardMyroute,
          component: hab
        },

        {
          path: '/hak',
          name: 'hak', beforeEnter: guardMyroute,
          component: hak
        },

        {
          path: '/ids',
          name: 'ids', beforeEnter: guardMyroute,
          component: ids
        },

        {
          path: '/jl',
          name: 'jl', beforeEnter: guardMyroute,
          component: jl
        },



        {
          path: '/kg',
          name: 'kg', beforeEnter: guardMyroute,
          component: kg
        },


        {
          path: '/kgl',
          name: 'kgl', beforeEnter: guardMyroute,
          component: kgl
        },


        {
          path: '/km',
          name: 'km', beforeEnter: guardMyroute,
          component: km
        },


        {
          path: '/mav',
          name: 'mav', beforeEnter: guardMyroute,
          component: mav
        },

        {
          path: '/mg',
          name: 'mg', beforeEnter: guardMyroute,
          component: mg
        },

        {
          path: '/netent',
          name: 'netent', beforeEnter: guardMyroute,
          component: netent
        },

        {
          path: '/nge',
          name: 'nge', beforeEnter: guardMyroute,
          component: nge
        },


        {
          path: '/nlc',
          name: 'nlc', beforeEnter: guardMyroute,
          component: nlc
        },

        {
          path: '/png',
          name: 'png', beforeEnter: guardMyroute,
          component: png
        },

        {
          path: '/pp',
          name: 'pp', beforeEnter: guardMyroute,
          component: pp
        },

        {
          path: '/pug',
          name: 'pug', beforeEnter: guardMyroute,
          component: pug
        },

        {
          path: '/qs',
          name: 'qs', beforeEnter: guardMyroute,
          component: qs
        },


        {
          path: '/red',
          name: 'red', beforeEnter: guardMyroute,
          component: red
        },

        {
          path: '/rlx',
          name: 'rlx', beforeEnter: guardMyroute,
          component: rlx
        },


        {
          path: '/swg',
          name: 'swg', beforeEnter: guardMyroute,
          component: swg
        },




        {
          path: '/tk',
          name: 'tk', beforeEnter: guardMyroute,
          component: tk
        },
        {
          path: '/ygg',
          name: 'ygg', beforeEnter: guardMyroute,
          component: ygg
        },

        {
          path: '/announce',
          name: 'announce', beforeEnter: guardMyroute,
          component: announce
        },




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
