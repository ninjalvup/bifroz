
require('dotenv').config()
const axios = require('axios')
import { baseURL } from './api';
const TBS_API_VERIFY_OTP_URL = `${baseURL}/tbs/verifyotp`
const TBS_API_GET_OTP_URL = `${baseURL}/tbs/getotp`
// const TBS_API_VERIFY_OTP_URL = 'http://localhost:5002/api/tbs/verifyotp'
// const TBS_API_GET_OTP_URL = 'http://localhost:5002/api/tbs/getotp'

export default{
  getOTP(tel){
    console.log("getOTP");
    const requestOTP = async function (tel) {
    var result;
    try {
      var body = {
        key: '1741237395252078',
        secret: 'ea28f2c3cf8222077a7ed1a88378e7dc',
        tel: tel
      }
      const headers = {
        'Content-Type': 'application/json',
      }
      result = await axios.post(TBS_API_GET_OTP_URL, body, { headers: headers})
      sessionStorage.setItem('verifyObject', result);
    } catch (error) {
      result = error
    }
    return result
  }

  return requestOTP(tel)
},
 
verifyOTP(token, code){
  console.log("verifyOTP");
  const verifyOTP = async (token, code) => {
  var result;
  try {
    var body = {
      key: '1741237395252078',
      secret: 'ea28f2c3cf8222077a7ed1a88378e7dc',
      token: token,
      pin: code
    }
    const headers = {
      'Content-Type': 'application/json',
    }
    result = await axios.post(TBS_API_VERIFY_OTP_URL, body, {headers: headers})
    sessionStorage.setItem('verifyObject', result);
    }catch (error) {
      result = error;
    }
    return result
  }
  return verifyOTP(token, code)
},
}
