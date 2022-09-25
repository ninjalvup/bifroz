// import axios from 'axios';
export default {
getOTP(tel){
    // console.log('getOTP'+tel)
    const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          key: '1741237395252078',
          secret: 'ea28f2c3cf8222077a7ed1a88378e7dc',
          msisdn: tel
        })
      };
      
      fetch('https://otp.thaibulksms.com/v2/otp/request', options)
        .then(response => response.json())
        .then(json =>{
            sessionStorage.setItem('objectGreeting', JSON.stringify(json));
        })
        // .then(response => console.log(response))
        .catch(err => console.error(err));

},

verifyOTP(token, code)
{
    // console.log(token)
    // console.log(code)
    const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          key: '1741237395252078',
          secret: 'ea28f2c3cf8222077a7ed1a88378e7dc',
          token: token,
          pin: code
        })
      };
    //   console.log(options)
      
      fetch('https://otp.thaibulksms.com/v2/otp/verify', options)
        .then(response => response.json())
        .then(json =>{
            sessionStorage.setItem('verifyObject', JSON.stringify(json));
        })
        // .then(response => console.log(response))
        .catch(err => console.error(err));
}

}
