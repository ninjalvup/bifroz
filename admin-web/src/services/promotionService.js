import axios from 'axios';
import { baseURL } from './api';
const uuid = uuid

export default {
    createPromotion(promotion) {
        return axios
           .post(baseURL + `/promotion/`,promotion,  {
             headers: {
                 "Content-Type": "application/json",
                 Authorization: "Bearer " + localStorage.getItem("access_token"),
             }
           })
           .then(response => response)
 
       },
       editPromotion(uuid) {
        return axios
           .get(baseURL + `/promotion/${uuid}`,  {
           })
           .then(response => response)
       },    
       deletePromotion(uuid) {
        return axios
           .delete(baseURL + `/promotion/delete-condition/${uuid}`,  {
           })
           .then(response => response)
       },    
       putPromotion(uuid, form) {
        return axios
          .put(baseURL + `/promotion/${uuid}/`,form, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            }
    
          }, )
          .then(response => response.data)
      },
     
      

    getToken(){
        return localStorage.getItem('access_token')
      },
    
      getSecretContent() {
        return axios.get(baseURL + '/promotion/secret-route/').then(response => response.data);
      }
};