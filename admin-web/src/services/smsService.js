import axios from 'axios';
import {
    baseURL
} from './api';

export default {
    getScbSmsTransactionWait() {
        return axios
            .get(baseURL + `/sms/scb/sms-transaction/list-wait` , {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("access_token"),
                }
        
              },)
            .then(response => response.data);

    },
    getScbSmsTransactionSuccess() {
        return axios
            .get(baseURL + `/sms/scb/sms-transaction/list-success`, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("access_token"),
                }
        
              },)
            .then(response => response.data);

    },
    getScbSmsTransaction() {
        return axios
            .get(baseURL + `/sms/scb/sms-transaction`)
            .then(response => response.data);

    },

    getCurlByIDAPI(id) {
        return axios
            .get(baseURL + `/curl/curl-transaction/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                }

            }, )
            .then(response => response.data);

    },

    getScbSmsTransactionByUuid(uuid) {
        return axios
            .get(baseURL + `/sms/scb/sms-transaction` + `/${uuid}`)
            .then(response => response.data);

    },
    getDepositList() {
        return axios
            .get(baseURL + `/member_transaction/deposit-pending-list`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                }

            }, )
            .then(response => response.data);
    },

    // curl

    getCurl() {
        return axios
            .get(baseURL + `/curl/scb/curl-transaction`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                }

            }, )
            .then(response => response.data);
    },

    getCurlNoaccount() {
        return axios
            .get(baseURL + `/curl/scb/curl-transaction-notaccount`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                }

            }, )
            .then(response => response.data);
    },

    // truemoney

    getTruemoney() {
        return axios
            .get(baseURL + `/truemoney/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                }

            }, )
            .then(response => response.data);
    },
    getTruemoneyNoaccount() {
        return axios
            .get(baseURL + `/truemoney/truemoney-notaccount`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                }

            }, )
            .then(response => response.data);
    },
    getTruemoneyIDAPI(uuid) {
        return axios
            .get(baseURL + `/truemoney/truemoney-transaction/${uuid}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                }

            }, )
            .then(response => response.data);

    },
    /////////////////////////////POST//////////////////////////////
    postSmsTransaction(uuid, form) {
        return axios
            .post(baseURL + `/sms/scb/sms-transaction/approved-deposit/${uuid}`, form, )
            .then(response => response.data);

    },
    // postCurlTransaction(id,form){
    //     return axios
    //     .post(baseURL + `/curl/curl-transaction/approved-deposit/${id}`,form,)
    //     .then(response => response.data);

    // },
    postTrueTransaction(uuid, form) {
        return axios
            .post(baseURL + `/truemoney/truemoney-transaction/approved-deposit/${uuid}`, form, )
            .then(response => response.data);

    },
    postHiddenBack(uuid) {
        return axios
            .post(baseURL + `/sms/scb/sms-transaction/show` + `/${uuid}`)
            .then(response => response.data);

    },
    postShowByUUID(uuid) {
        return axios
            .post(baseURL + `/sms/scb/sms-transaction/hide` + `/${uuid}`)
            .then(response => response.data);
    },


}