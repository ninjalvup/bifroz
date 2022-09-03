import axios from 'axios';
import {
    baseURL
} from './api';
// const url = 'http://128.199.94.1:6001/api/report';
export default {
    getCreateDepositList(start_date,end_date,username) {
        return axios
            .get(baseURL + `/report/create-deposit-list?start_date=${start_date}&end_date=${end_date}&username=${username}`)
            .then(response => response.data);
    },
    getWithdrawRanking() {
        return axios
            .get(baseURL + `/report/rank-withdraw`)
            .then(response => response.data);
    },
    getDepositRanking() {
        return axios
            .get(baseURL + `/report/rank-deposit`)
            .then(response => response.data);
    },
    getDepoditReport() {
        return axios
            .get(baseURL + `/report/deposit`)
            .then(response => response.data);
    },


    getWithdrawReport() {
        return axios
            .get(baseURL + `/report/withdraw`)
            .then(response => response.data);
    },
    summaryPromotionAPI(start_date, end_date) {
        return axios
            .get(baseURL + `/report/summary-promotion/?start_date=${start_date}&end_date=${end_date}`)
            .then(response => response.data);
    },

    getReportByPerson() {
        return axios
            .get(baseURL + `/report/person`)
            .then(response => response.data);
    },

    getReportByDecimal() {
        return axios
            .get(baseURL + `/report/decimal`)
            .then(response => response.data);
    },

    getReportByProfitLoss(start_date, end_date) {
        return axios
            .get(baseURL + `/report/profit-loss?start_date=${start_date}&end_date=${end_date}`)
            .then(response => response.data);
    },
    getReportHideList(start_date, end_date) {
        return axios
            .get(baseURL + `/report/sms-hide-list/?start_date=${start_date}&end_date=${end_date}`)
            .then(response => response.data);
    },



}