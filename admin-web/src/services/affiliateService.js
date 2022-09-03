import axios from 'axios';
import { baseURL } from './api';

export default {
    getDataSetting() {
        return axios.get(baseURL + `/affiliate/get-data-setting`).then(response => response.data);
    },

    getSearchData(formSearch) {
        return axios.post(baseURL + `/affiliate/search-data`, formSearch).then(response => response.data);
    },

    getSearchUserData(form) {
        return axios.post(baseURL + `/affiliate/check-data`, form).then(response => response.data);
    },

    getSearchUserTree(form) {
        return axios.post(baseURL + `/affiliate/check-data-tree`, form).then(response => response.data);
    },

    getSearchTreeLink(uuid) {
        return axios.get(baseURL + `/affiliate/check-data-tree-link/${uuid}`).then(response => response.data);
    },

    getSearchTreeTable(form){
        return axios.post(baseURL + `/affiliate/check-data-tree-table`, form).then(response => response.data);
    },

    getSearchDataFn(status){
        return axios.get(baseURL + `/affiliate/search-data-date/${ status }`).then(response => response.data);
    },

    getaffiliateCancel(data){
        return axios.post(baseURL + `/affiliate/affiliate-cancel/`, data).then(response => response.data);
    },

    getUserFirstDeposit() {
        return axios.get(baseURL + `/affiliate/get-data-user`).then(response => response.data);
    },
}