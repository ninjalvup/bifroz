import axios from 'axios';
import { baseURL } from './api';
export default {
  //เเกไขโปรไฟล์
  profileEdit(profile) {
    return axios
      .put(baseURL + '/member/update', profile,  {
         headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
        }
      })
      .then(response => response.data);
  },
  //สวิสโบนัส
  bonusUpdate(bonus){
    return axios
    .put(baseURL +'/promotion/bonus', bonus, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
      }
    })
  },
  //ดึงยอด
  getCredit(){
    return axios
    .get(baseURL +'/credit/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
      }
    })
  }

};