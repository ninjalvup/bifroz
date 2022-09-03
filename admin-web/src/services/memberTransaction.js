import axios from 'axios';
import { baseURL } from './api';
// const url = 'http://128.199.94.1:6001/api';
export default {
  postReQueue() {

    return axios
      .post(baseURL + `/member_transaction/requeue`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        }
      }, 
      )
      .then(response => response)
  },
  weekDeposit(username,start_date,end_date) {

    return axios
      .post(baseURL + `/member_transaction/check-seven-day/?start_date=${start_date}&end_date=${end_date}`,username, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        }
      }, 
      )
      .then(response => response)
  },
  
};