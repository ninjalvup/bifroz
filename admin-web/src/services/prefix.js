import axios from 'axios';
import { baseURL } from './api';
// const url = 'http://128.199.94.1:6001/api/combine';
export default {
  getCombine() {
    return axios
      .get(baseURL + `/combine/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        }

      }, {
      })
      .then(response => response)
  },
  
 putSetting(uuid,form) {
    return axios
      .put(baseURL + `/combine/setting/${uuid}`,form, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        }

      }, {
      })
      .then(response => response)
  },
};