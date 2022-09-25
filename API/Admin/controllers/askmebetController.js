const axios = require('axios');

const urlConfig = "http://localhost:5000";

exports.creatUser = async (tel, password, contact) => {
  try {

    const response = await axios.post(`${urlConfig}/api/register`, {
      "tel": tel,
      "password": password,
      "contact": contact,
   });

   console.log(response);

    return response;

  } catch (error) {
    console.log(error);
  }
};

exports.getCredit = async (user) => {
  try {

    const response = await axios.get(`${urlConfig}/api/credit/${user}`);

    return response.data;

  } catch (error) {}
};

exports.deposit = async (amount, username) => {
  try {

    console.log(amount, username);

    const response = await axios.post(`${urlConfig}/api/add-deposit`, {
            "amount": amount,
            "username": username
    });

    console.log(response);

    return response.data;

  } catch (error) {
    throw error;
  }
};

exports.withdraw = async (amount, username) => {
  try {

    const response = await axios.post(`${urlConfig}/api/add-withdraw`, {
        "amount": amount,
        "username": username
      }
    );

    console.log(response);

    return response;

  } catch (error) {
     throw error;
  }
};

exports.winlose = async (username, refId, dateTimeFrom, dateTimeTo) => {
  try {

    const response = await axios.post(`${urlConfig}/api/winlost`, {
      "username": username ,
      "refId": refId,
      "dateTimeFrom": dateTimeFrom,
      "dateTimeTo": dateTimeTo
    });

    console.log(response);

    return response;

  } catch (error) {
    console.log(error);
  }
};

exports.resetPassword = async (username, newPassword) => {
  try {

    const response = await axios.post(`${urlConfig}/api/reset-password`, {
      "username": username ,
      "newPassword": newPassword,
    });

    console.log(response);

    return response;

  } catch (error) {
    console.log(error);
  }
};

