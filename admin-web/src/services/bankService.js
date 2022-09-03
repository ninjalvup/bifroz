import axios from 'axios';
import {
  baseURL
} from './api';
// // const url = 'http://localhost:3000/api/bank';
// const url = 'http://128.199.94.1:6001/api/bank';


export default {

  getBankList() {
    return axios
      .get(baseURL + `/bank/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        }
      }, {})
      .then(response => response)
  },

  getBankAPIAccount() {
    return axios
      .get(baseURL + `/bank/account`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        }

      }, {})
      .then(response => response)
  },

  getBankAPI() {
    return axios
      .get(baseURL + `/bank/account-withdraw`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        }

      }, {})
      .then(response => response)
  },

  systemStatus(uuid, status_system) {
    return axios
      .put(baseURL + `/bank/system/${uuid}/${status_system}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        }

      }, )
      .then(response => response.data)
  },

  deleteBank(uuid) {
    return axios
      .delete(baseURL + `/bank/${uuid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        }

      }, )
      .then(response => response.data),
      console.log("DELETED");
  },
  bankEdit(uuid) {
    return axios
      .get(baseURL + `/bank/${uuid}`, {

      })
      .then(response => response)

  },
  submitForm(uuid, form) {
    return axios
      .put(baseURL + `/bank/${uuid}`, form)
      .then(response => response)

  },
  postAddbank(form) {
    return axios
      .post(baseURL + `/bank/`, form, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        }

      }, {})
      .then(response => response)
  },

  // ------------------SCB-APP------------------


  getAppBank() {
    return axios
      .get(baseURL + `/bank/scb`)
      .then(response => response)
  },

  getStatusAppBank() {
    return axios
      .get(baseURL + `/bank/status`)
      .then(response => response)
  },

  putUpdateStatusApp(uuid, form) {
    return axios
      .put(baseURL + `/bank/updatestatus/${uuid}`, form)
      .then(response => response)
  },
  postAppBank(form) {
    return axios
      .post(baseURL + `/bank/createscb`, form, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        }

      }, )
      .then(response => response)
  },
  putUpdateAppBank(uuid, form) {
    return axios
      .put(baseURL + `/bank/updatescb/${uuid}`, form)
      .then(response => response)
  },

  getToken() {
    return localStorage.getItem('access_token')
  },

  getSecretContent() {
    return axios.get(baseURL + '/bank/secret-route/').then(response => response.data);
  }
};