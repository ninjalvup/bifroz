import axios from 'axios';
import { baseURL } from './api';
// const url = 'http://128.199.94.1:6001/api/member/';
// const url = 'http://localhost:3000/api/member/';

export default {
    getDepositByUsername(username) {
        return axios
            .get(baseURL + `/member/deposit/${username}`)
            .then(response => response.data)
    },
    getWithdrawByUsername(username) {
        return axios
            .get(baseURL + `/member/withdraw}/${username}`)
            .then(response => response.data)
    },
    changePasswordByUuid(uuid) {
        return axios
            .get(baseURL + `/member/change-password/${uuid}`)
            .then(response => response.data)
    },
    getEditUserByUuid(uuid) {
        return axios
            .get(baseURL + `/member/edit/${uuid}`)
            .then(response => response.data)
    },
    PostUserByUuid(formedit) {
        return axios
            .post(baseURL + `/member/update`,formedit)
            .then(response => response.data)
    }
}