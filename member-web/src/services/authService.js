import axios from 'axios';
import { baseURL } from './api';
export default {
  //login auto
  loginAdmin(credentials) {
    console.log(credentials);
    return axios
      .post(baseURL + '/member/login', credentials)
      .then(response => response.data);
  },
  //เปลี่ยนรหัสผ่าน
  changPassword(password) {
    return axios
      .put(baseURL + '/member/updatepassword',password, {
         headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
        }
      })
      .then(response => response.data);
  },
  //สมัครสมาชิก
  registerUser(member){
    return axios
      .post(baseURL + '/member/register' ,member, {
        headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
       }
     })
      .then(response => response.data);
  },
  forgotPassword(data){
  
    return axios
    .post(baseURL + '/member/forgotpassword' ,data, {
      headers: {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
     }
   })
    .then(response => response.data);
  },

  updatepw(data){

    return axios
    .post(baseURL + '/member/updatepw' ,data, {
      headers: {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
     }
   })
    .then(response => response.data);
  },
  getToken(){
    return sessionStorage.getItem('token')
  },

  // getSecretContent() {
  //   return axios.get(url + 'secret-route/').then(response => response.data);
  // }
};