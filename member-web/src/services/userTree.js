import axios from 'axios';
import { baseURL } from './api';

export default {
    getSearchTree() {
        return axios.get(baseURL + `/userTree/search-tree`).then(response => response.data);
    },

    getSearchTreeUUID(uuid) {
        return axios.get(baseURL + `/userTree/search-tree-uuid/${ uuid }`).then(response => response.data);
    },
};