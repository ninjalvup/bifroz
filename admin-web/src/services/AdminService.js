import axios from 'axios';
import { baseURL } from './api';

export default {
    editAdmin(uuid){
        return axios
        .put(baseURL + `user/${uuid}`)
        .then(response => response.data),
        console.log("COMPLETE");
    }
}


// logout() {
//     const removeToken = localStorage.removeItem("access_token");
//     if (removeToken == null) {
//       this.$router.push("/login");
//     }
//   },