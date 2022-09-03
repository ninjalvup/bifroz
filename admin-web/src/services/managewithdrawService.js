import axios from 'axios';
import { baseURL } from './api';
// const url = `http://128.199.94.1:6001/api/member_transaction`;
// const url = `http://localhost:3000/api/member_transaction`;


export default {
    getWithdrawPending(start_date,end_date,status,username) {
        return axios
            .get(baseURL + `/member_transaction/withdraw-pending-list?start_date=${start_date}&end_date=${end_date}&status=${status}&username=${username}`)
            .then(response => response.data);
    },
    getWithdrawDisApprove() {
        return axios
            .get(baseURL + `/member_transaction/withdraw-dis-approve-list`)
            .then(response => response.data);
    },
    getWithdrawApproved() {
        return axios
            .get(baseURL + `/member_transaction/withdraw-approved-list`)
            .then(response => response.data);
    },
    getWithdrawByUuid(uuid) {
        return axios
            .get(baseURL + `/member_transaction/show-withdraw/${uuid}`)
            .then(response => response.data);
    },
    postApprovedWithdraw() {
        return axios
            .post(baseURL + `/member_transaction/approved-withdraw`)
            .then(response => response.data);
    },
    getDepositList() {
        return axios
            .get(baseURL + `/member_transaction/deposit-pending-list`)
            .then(response => response.data);
    },
    postapproveWithdrawAuto(form){
        return axios
        .post(baseURL + `/member_transaction/approve-withdraw-auto`,form)
        .then(response => response.data);
    },
    postUpdateStatus(form) {
        return axios
            .post(baseURL + `/member_transaction/approve-withdraw-auto/update-status`,form)
            .then(response => response.data);
    },
    // postUpdate(){
    //     return axios
    //     .post(baseURL + `/member_transaction/approve-withdraw-auto`)
    //     .then(response => response.data);
    // }
    }
