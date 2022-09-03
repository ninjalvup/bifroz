//เข้าสู่ระบบเพื่อเล่นเกม
import axios from 'axios';
export default {

  loginGame(gameForm){
    return axios
    .post('https://ukingbet-agent.askmebet.cloud/spa/member/login', gameForm, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
      }
    })
    .then(response => response.data);
  }

};