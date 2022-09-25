
require('dotenv').config()
export default{

verifyOTP(code,token){
  // console.log(code)
  // console.log(token)
  const accountSid = '1741237395252078';
  const authToken = 'ea28f2c3cf8222077a7ed1a88378e7dc';

  const thaibulksmsApi = require('thaibulksms-api')

  const options = {
    apiKey: accountSid,
    apiSecret: authToken,
  }

  const otp = thaibulksmsApi.otp(options)

  const verifyOTP = async (token, code) => {
    try {
        console.log('get in try')

      const otpresponse = await otp.verify(token, code)
      // const GetotpResponse = JSON.stringify(otpresponse.data);
      // localStorage.setItem('verifyObject', GetotpResponse);
      console.log(otpresponse)
    }catch (error) {console.error(error)}

}
verifyOTP(token, code)
}
}