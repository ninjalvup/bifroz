const axios = require('axios');

const urlConfig = "http://localhost:5000";

exports.creatUser = async (tel, password, contact) => {
  try {

    console.log(tel, password, contact);

    const response = await axios.post(`${urlConfig}/api/askmebet/register`, {
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

    const response = await axios.get(`${urlConfig}/api/askmebet/credit/${user}`);

    return response.data;

  } catch (error) {}
};

exports.deposit = async (amount, _id) => {
  try {

    console.log(amount, _id);
  
    const response = await axios.post(`${urlConfig}/api/askmebet/add-deposit`, {
            "amount": amount,
            "id": _id
    });

    console.log(response);

    return response.data;

  } catch (error) {
    throw error;
  }
};

exports.withdraw = async (amount, _id) => {
  try {

    const response = await axios.post(`${urlConfig}/api/askmebet/add-withdraw`, {
        "amount": amount,
        "id": _id
      }
    );

    console.log(response);

    return response;

  } catch (error) {
     throw error;
  }
};

exports.winlose = async (username, groupId, dateTimeFrom, dateTimeTo) => {
  try {

    const response = await axios.post(`${urlConfig}/api/askmebet/winlost`, {
      "username": username , 
      "group_id": groupId,
      "dateTimeFrom": dateTimeFrom, 
      "dateTimeTo": dateTimeTo 
    });

    console.log(response);

    return response;

  } catch (error) {
    console.log(error);
  }
};

exports.resetPassword = async (username, password) => {
  try {

    const response = await axios.post(`${urlConfig}/api/askmebet/reset-password`, {
      "username": username , 
      "password": password,
    });

    console.log(response);

    return response;

  } catch (error) {
    console.log(error);
  }
};

