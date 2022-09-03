import axios from 'axios';
import { baseURL } from './api';
export default {
//เพิ่มการฝาก Prompay
  addDeposit(amount) {
      console.log(amount);
    return axios
      .post(baseURL + '/deposit/qr-deposit', amount,  {
         headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
        }
      })
      .then(response => response.data);
  },

  //ถอน
  addWithdraw(amount) {
  return axios
    .post(baseURL + '/withdraw/withdraw', amount,  {
       headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
      }
    })
    .then(response => response.data);
},

//ฝากทศนิยม
decimalDeposit(amount) {
  console.log(amount);
return axios
  .post(baseURL + '/deposit/deposit', amount,  {
     headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
    }
  })
  .then(response => response.data);
},



//ฝากปกติ
regularDeposit(amount) {
 
return axios
  .post(baseURL + '/member/regulardeposit', amount,  {
     headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
    }
  })
  .then(response => response.data);
},

};