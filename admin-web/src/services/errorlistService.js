// import axios from 'axios';
// const url = 'http://128.199.94.1:6001/api/err_list';
// export default {
//     fixedError() {
//         return axios
//             .post(url + `/`, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: 'Bearer'  + localStorage.getItem("access_token"),
//                 }
               
//             },
//            )
//             .then(response => response.data),
//             console.log("FIXED");
//     },
   
//     getToken(){
//         return localStorage.getItem('access_token')
//       },
    
//       getSecretContent() {
//         return axios.get(url + 'secret-route/').then(response => response.data);
//       }
// };
