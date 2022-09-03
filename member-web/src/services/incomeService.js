import axios from 'axios';
import { baseURL } from './api';

export default {
    getIncome() {
        return axios.get(baseURL + `/withdraw/withdraw-income`).then(response => response.data);
    },
};