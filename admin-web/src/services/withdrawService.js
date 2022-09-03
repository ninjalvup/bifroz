import axios from 'axios';
import { baseURL } from './api';
export default {
    getCheckByUsername(username) {
        return axios
            .get(baseURL + `/member_transaction/check-data/${username}`)
            .then(response => response.data);

    },
}