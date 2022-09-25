import Vue from 'vue'
import VueRouter from 'vue-router'

import testonproject from "../components/pages/testonproject.vue";

import Login from "../components/Login.vue";


import dashboard from '../components/pages/dashboard/dashboard.vue'
import home from '../components/pages/home/Dashboard.vue'
import User from "../components/pages/User/User.vue";
import firstDeposit from "../components/pages/User/firstDeposit.vue";

import addUser from "../components/pages/User/addUser/addUser.vue";
import errorlist from "../components/pages/ErrorList/errorList.vue";

import backend from "../layouts/backend.vue";
import bankaccount from "../components/pages/bank_account/BankAccount.vue";
import addbankaccount from "../components/pages/bank_account/addbank/addbankaccount.vue";

import deposit from "../components/pages/payment/deposit/deposit.vue";
import profile from "../components/pages/profile/profile.vue";

import addprofile from "../components/pages/profile/addprofile/addprofile.vue";
import employee from "../components/pages/employee/employee.vue";
import decimalpoint from "../components/pages/decimalpoint/decimalpoint.vue";

import hiddendeposit from "../components/pages/summary/hidedeposit.vue";
import promotionreport from "../components/pages/summary/promotionreport.vue";
import paymentbyuser from "../components/pages/summary/paymentbyuser.vue";
import balancestatement from "../components/pages/summary/balancestatement.vue";
import graphregister from "../components/pages/summary/graphregister.vue";
import loseandprofit from "../components/pages/summary/lose-and-profit.vue";



import promotion from "../components/pages/promotion/promotion.vue";
import addpromotion from "../components/pages/promotion/addPromotion/addpromotion.vue";

import reportdeposit from "../components/pages/report/report_deposit/ReportDeposit.vue";
import affiliatesetting from "../components/pages/report/report_affiliate/setting_affiliate.vue";
import affiliatewithdraw from "../components/pages/report/report_affiliate/withdraw_affiliate.vue";
import affiliatetransaction from "../components/pages/report/report_affiliate/transaction_affiliate.vue";
import affiliatetree from "../components/pages/report/report_affiliate/treediagram-affiliate.vue";

import reportwithdraw from "../components/pages/report/report_withdraw/ReportWithdraw.vue";

import report from "../components/pages/report/report.vue";
import report_depositcreate_list from "../components/pages/report/report_depositcreate_list.vue";


import withdrawpending from "../components/pages/manageWithdraw/withdrawpending.vue";
import withdrawdisapprove from "../components/pages/manageWithdraw/withdrawdisapprove.vue";
import withdrawapproved from "../components/pages/manageWithdraw/withdrawapproved.vue";

import checkmember from "../components/pages/checkmember/checkmember.vue";
import withdraw from "../components/pages/withdraw/withdraw.vue";
import prefix from "../components/pages/prefix/prefix.vue";
import settingNew from "../components/pages/SettingNewAffiliate/SettingNew.vue";
import oldMember from "../components/pages/oldMember/oldMember.vue";
import menu from "../components/pages/menu/menu.vue";
import weekDeposit from "../components/pages/weekDeposit/weekDeposit.vue";
import criminalList from "../components/pages/criminalList/criminalList.vue";
import question from "../components/pages/question/question.vue";
import verifySetting from "../components/pages/verifySetting/verifySetting.vue";
import decimal from "./../components/pages/decimal/decimal.vue";
import withdrawranking from "../components/pages/withdraw_ranking/withdrawranking.vue";
import ebook from "../components/pages/guide/ebook.vue";
import smssetting from "../components/pages/guide/smssetting.vue";


Vue.use(VueRouter)
var isAuthenticated = false;

function guardMyroute(to, from, next) {

  if (localStorage.getItem('access_token'))
    isAuthenticated = true;
  else
    isAuthenticated = false;



  if (isAuthenticated === false) {
    next('/login');
    window.localStorage.clear();

    // go to '/login';
  } else {
    next(); // go to '/login';
  }
}

export default new VueRouter({

  routes: [{
      path: '/',
      redirect: 'login',
      component: Login,
      children: [{
          path: '/login',
          name: 'Login',
          component: Login

        }

      ]
    },

    {
      path: '/backend',
      component: backend,
      children: [{
          path: '/home',
          name: 'home',
          beforeEnter: guardMyroute,
          component: home
        },
        {
          path: '/user',
          name: 'user',
          beforeEnter: guardMyroute,
          component: User
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          beforeEnter: guardMyroute,
          component: dashboard
        },
        {
          path: '/errorlist',
          name: 'errorlist',
          beforeEnter: guardMyroute,
          component: errorlist

        },
        {
          path: '/adduser',
          name: 'adduser',
          beforeEnter: guardMyroute,
          component: addUser
        }, {
          path: '/withdrawranking',
          name: 'withdrawranking',
          beforeEnter: guardMyroute,
          component: withdrawranking
        },
        {
          path: '/testonproject',
          name: 'testonproject',
          beforeEnter: guardMyroute,
          component: testonproject
        },
        {
          path: '/bankaccount',
          name: 'bankaccount',
          beforeEnter: guardMyroute,
          component: bankaccount
        },
        {
          path: '/add_bank_account',
          name: 'add_bank_account',
          beforeEnter: guardMyroute,
          component: addbankaccount
        },

        {
          path: '/deposit',
          name: 'deposit',
          beforeEnter: guardMyroute,
          component: deposit
        },
        {
          path: '/withdraw',
          name: 'withdraw',
          beforeEnter: guardMyroute,
          component: withdraw
        },
        {
          path: '/profile',
          name: 'profile',
          beforeEnter: guardMyroute,
          component: profile
        },

        {
          path: '/decimalpoint',
          name: 'decimalpoint',
          beforeEnter: guardMyroute,
          component: decimalpoint
        },

        {
          path: '/employee',
          name: 'employee',
          beforeEnter: guardMyroute,
          component: employee
        },
        {
          path: '/hiddendeposit',
          name: 'hiddendeposit',
          beforeEnter: guardMyroute,
          component: hiddendeposit
        },

        {
          path: '/paymentbyuser',
          name: 'paymentbyuser',
          beforeEnter: guardMyroute,
          component: paymentbyuser
        },
        {
          path: '/firstDeposit',
          name: 'firstDeposit',
          beforeEnter: guardMyroute,
          component: firstDeposit
        }, 

        {
          path: '/balancestatement',
          name: 'balancestatement',
          beforeEnter: guardMyroute,
          component: balancestatement
        },

        {
          path: '/graphregister',
          name: 'graphregister',
          beforeEnter: guardMyroute,
          component: graphregister
        },


        {
          path: '/promotionreport',
          name: 'promotionreport',
          beforeEnter: guardMyroute,
          component: promotionreport
        },

        {
          path: '/report_depositcreate_list',
          name: 'report_depositcreate_list',
          beforeEnter: guardMyroute,
          component: report_depositcreate_list
        },
        {
          path: '/addprofile',
          name: 'addprofile',
          beforeEnter: guardMyroute,
          component: addprofile
        },
        {
          path: '/promotion',
          name: 'promotion',
          beforeEnter: guardMyroute,
          component: promotion
        },
        {
          path: '/addpromotion',
          name: 'addpromotion',
          beforeEnter: guardMyroute,
          component: addpromotion
        },
        {
          path: '/reportdeposit',
          name: 'reportdeposit',
          beforeEnter: guardMyroute,
          component: reportdeposit
        },

        {
          path: '/affiliatesetting',
          name: 'affiliatesetting',
          beforeEnter: guardMyroute,
          component: affiliatesetting
        },
        {
          path: '/affiliatetransaction',
          name: 'affiliatetransaction',
          beforeEnter: guardMyroute,
          component: affiliatetransaction
        },
        {
          path: '/affiliatewithdraw',
          name: 'affiliatewithdraw',
          beforeEnter: guardMyroute,
          component: affiliatewithdraw
        },
        {
          path: '/affiliatetree',
          name: 'affiliatetree',
          beforeEnter: guardMyroute,
          component: affiliatetree
        },

        {
          path: '/reportwithdraw',
          name: 'reportwithdraw',
          beforeEnter: guardMyroute,
          component: reportwithdraw
        },
        {
          path: '/report',
          name: 'report',
          beforeEnter: guardMyroute,
          component: report
        },
        {
          path: '/withdrawpending',
          name: 'withdrawpending',
          beforeEnter: guardMyroute,
          component: withdrawpending
        }, {
          path: '/withdrawdisapprove',
          name: 'withdrawdisapprove',
          beforeEnter: guardMyroute,
          component: withdrawdisapprove
        }, {
          path: '/withdrawapproved',
          name: 'withdrawapproved',
          beforeEnter: guardMyroute,
          component: withdrawapproved
        },
        {
          path: '/checkmember',
          name: 'checkmember',
          beforeEnter: guardMyroute,
          component: checkmember
        },
        {
          path: '/prefix',
          name: 'prefix',
          beforeEnter: guardMyroute,
          component: prefix
        },
        {
          path: '/settingNew',
          name: 'settingNew',
          beforeEnter: guardMyroute,
          component: settingNew
        },
        {
          path: '/oldMember',
          name: 'oldMember',
          beforeEnter: guardMyroute,
          component: oldMember
        },
        {
          path: '/menu',
          name: 'menu',
          beforeEnter: guardMyroute,
          component: menu
        },
        {
          path: '/weekDeposit',
          name: 'weekDeposit',
          beforeEnter: guardMyroute,
          component: weekDeposit
        },
        {
          path: '/decimal',
          name: 'decimal',
          beforeEnter: guardMyroute,
          component: decimal
        },
        {
          path: '/criminalList',
          name: 'criminalList',
          beforeEnter: guardMyroute,
          component: criminalList
        },
        {
          path: '/question',
          name: 'question',
          beforeEnter: guardMyroute,
          component: question
        },
        {
          path: '/verifySetting',
          name: 'verifySetting',
          beforeEnter: guardMyroute,
          component: verifySetting
        },
        {
          path: '/ebook',
          name: 'ebook',
          beforeEnter: guardMyroute,
          component: ebook
        },
        {
          path: '/smssetting',
          name: 'smssetting',
          beforeEnter: guardMyroute,
          component: smssetting
        }, {
          path: '/loseandprofit',
          name: 'loseandprofit',
          beforeEnter: guardMyroute,
          component: loseandprofit
        },

      ]
    }
  ]
})