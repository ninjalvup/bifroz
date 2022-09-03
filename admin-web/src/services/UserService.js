import axios from 'axios';
import { baseURL } from './api';
export default{
    profileEdit(uuid) {
        return axios
          .put(baseURL + `/user/${uuid}`,  {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access_token"),
            }
          })
          .then(response => response.data),
          console.log("EDITED PROFLIE");
      },
      getToken(){
        return localStorage.getItem('access_token')
      },
    
      getSecretContent() {
        return axios.get(baseURL + '/user/secret-route/').then(response => response.data);
      }
    ,
    getProfile(){
      return axios
      .get(baseURL + `/user/profile` ,  {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
        }
      })
      .then(response => response.data );
    }
}