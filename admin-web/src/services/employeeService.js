import axios from 'axios';
import { baseURL } from './api';
// const url = 'http://128.199.94.1:6001/api/user';
// const url = 'http://localhost:3000/api/user';
export default {
    getAllList() {
        return axios
        .get(baseURL + `/user/`)
        .then(response => response.data)
    },
    getEditList(uuid) {
        return axios
        .get(baseURL + `/user/${uuid}`)
        .then(response => response.data)
    },
    postEditList(formedit) {
        return axios
        .post(baseURL + `/user/update`,formedit)
        .then(response => response.data)
    },
    deleteList(uuid) {
        return axios
        .delete(baseURL + `/user/${uuid}`)
        .then(response => response.data)
    },
    
    getToken() {
        return localStorage.getItem('access_token')
    },
}