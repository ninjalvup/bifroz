import axios from 'axios';
import { baseURL } from './api';
// const url = 'http://128.199.94.1:6001/api/member';
export default {
  oldUser(oldMember) {

    return axios
      .post(baseURL + `/member/old-member`,oldMember, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        }

      }, {
      })
      .then(response => response)
  },
};