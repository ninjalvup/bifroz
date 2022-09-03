import axios from 'axios';
import { baseURL } from './api';
export default {
  loginAdmin(user) {
    return axios
      .post(baseURL + '/user/login', user ,{
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        }

      },)
      .then(response => response.data);
  },
  addUser(users){
     axios
      .post(baseURL + '/user/',users )
      .then(response => response.data);
      
  },
  getToken(){
    return localStorage.getItem('access_token')
  },

  // getSecretContent() {
  //   return axios.get(url + 'secret-route/').then(response => response.data);
  // }
};