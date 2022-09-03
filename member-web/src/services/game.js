//เชื่อมเกม
import axios from 'axios';
const endpoint = 'https://ukingbet.secure-restapi.com';
export default {
  getGame() {
    return axios
      .get('https://ukingbet.secure-restapi.com/ambgame2/getGameList', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
      })
      .then(response => response.data);
  },
  getGameAll() {
    console.log();
    return axios
      .get('https://ukingbet.secure-restapi.com/game/getProductList', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
      })
      .then(response => response.data);
  },
  playSlotxo(gameForm) {
    return axios
      .post(endpoint + '/slot-xo/forward-to-game', gameForm, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
      })
      .then(response => response.data);
  },
  playSpade(gameId) {
    return axios
      .get(endpoint + `/spg/login?GameId=${gameId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
      })
      .then(response => response.data);
  },
  playAsemebet(gameId) {
    return axios
      .get(endpoint + `/ds/login?GameId=${gameId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
      })
      .then(response => response.data);
  },
  playAmeba(gameId) {
    return axios
      .get(endpoint + `/ameba/login?GameId=${gameId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
      })
      .then(response => response.data);
  },
  playGamatron(gameForm) {
    return axios
      .post(endpoint + `/ganapati/forward-to-game`, gameForm, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
      })
      .then(response => response.data);
  },
  playPG(gameForm) {
    return axios
      .post(endpoint + `/pg/forward-to-game`, gameForm, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
      })
      .then(response => response.data);
  },
  playLive22(gameId) {
    return axios
      .get(endpoint + `/live22/gameLogin?ClientType=0&GameId=${gameId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
      })
      .then(response => response.data);
  },
};