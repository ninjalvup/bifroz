import axios from 'axios';
import { baseURL } from './api';

export default {
    //login auto
    getToken(form) {
        return axios
            .post(baseURL +`/member/login-game`, form)
            .then(response => response.data);
    },

    postUfa(form) {
        return axios
            .post(baseURL +`/member/launch-game`, form)
            .then(response => response.data);
    },
}