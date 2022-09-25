// import axios from 'axios';
// import { baseURL } from './api';

// // const url = 'http://localhost:6001/api/member';
// // const url = 'http://128.199.94.1:6001/api/member';

// export default {
//     getCheckByUuid(username) {
//         return axios
//             .get(baseURL + `/member/check-data/${username}`)
//             .then(response => response.data);
//     },
//     getMember(){
//         return axios
//         .get(baseURL + `/member/`)
//         .then(response => response.data);
//     }
// }

///////////////
import axios from 'axios';
import { baseURL } from './api';

// const url = 'http://localhost:6001/api/member';
// const url = 'http://128.199.94.1:6001/api/member';

export default {
        getCheckByUuid(username) {
        return axios
            .get(baseURL + `/member/check-data/${username}`)
            .then(response => response.data);
    },
    getCheckByUuid_X(username) {
        const username_val = username.value
        return axios
            .get(baseURL + `/member/check-data/${username_val}`)
            .then(response => response.data);
            
    },
    getMember(){
        return axios
        .get(baseURL + `/member/`)
        .then(response => response.data);
    }
}