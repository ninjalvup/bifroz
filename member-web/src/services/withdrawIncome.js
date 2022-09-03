import axios from 'axios';
import { baseURL } from './api';

export default {
    getDataWithdrawIncome() {
        return axios.get(baseURL + `/income/income-data`).then(response => response.data);
    },

    fnWithdrawIncome(form) {
        return axios.post(baseURL + `/income/withdraw-income`, form).then(response => response.data);
    },

    getDataUser() {
        return axios.get(baseURL + `/income/income-data-user`).then(response => response.data);
    },
};