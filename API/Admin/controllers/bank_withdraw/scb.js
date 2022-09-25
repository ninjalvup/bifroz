const axios = require('axios');

exports.login = async (username, password) => {
    try {

        console.log(username, password);
  
        const response = await axios.post(`http://178.128.98.24/login`, {
            "username": username,
            "password": password,
         });
      
         console.log(response);
        return response;
  
    } catch (error) {
      console.log(error);
    }
};

exports.withdraw = async (bankcode, bankaccount, amount, uuid) => {
    try {

        console.log(bankcode, bankaccount, amount, uuid);
  
        const response = await axios.post(`http://178.128.98.24/withdraw`, {
            "bankcode": bankcode,
            "bankaccount": bankaccount,
            "amount": amount,
            "uuid": uuid
         });
      
        return response;
  
    } catch (error) {
      
    }
};


exports.smsOTP = async (smsOTP) => {
    try {
    console.log("otp1");
        const response = await axios.post(`http://178.128.98.24/OTP`, {
            "smsOTP": smsOTP,
         });
         console.log("otp2");
      
        return response;
  
    } catch (error) {
      
    }
};
  
  
