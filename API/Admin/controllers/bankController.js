const models = require("../models/index");
const { v4: uuidv4 } = require("uuid");
const axios = require('axios');

exports.index = async (req, res, next) => {
  try {
    const bank = await models.Main_Bank.findAll({
       order: [["id", "DESC"]],
    });

    res.status(200).json({
      data: bank,
    });
  } catch (error) {
    next(error);
  }
};

exports.mainBank = async (req, res, next) => {
  try {
    const bank = await models.Main_Bank.findAll({
       attributes: ['bank_name', 'bank_account_name', 'bank_number', 'amount'],
       where: { bank_type: 1 },
       order: [["id", "DESC"]],
    });

    res.status(200).json({
      data: bank,
    });
    
  } catch (error) {
    next(error);
  }
};

exports.bankWitdraw = async (req, res, next) => {
  try {
    
    const bank = await models.Main_Bank.findAll({
       attributes: ['bank_name', 'bank_account_name', 'bank_number'],
       where: { bank_type: 2 },
       order: [["id", "DESC"]],
    });

    res.status(200).json({
      data: bank,
    });
    
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const {
      bank_name,
      bank_account_name,
      bank_number,
      ip_address,
      bank_status,
      bank_type,
      bank_sms,
      status_system,
      username,
      password,
      account_sequence,
      account_set,
      type_deposit
    } = req.body;

    const exisUsername = await models.Main_Bank.findOne({
      where: { bank_number: bank_number },
    });

    if (exisUsername) {
      const error = new Error("มีข้อมูลหมายเลขบัญชีนี้แล้ว !");
      error.statusCode = 400;
      throw error;
    } 

    const bank = await models.Main_Bank.create({
      uuid: uuidv4(),
      bank_name: bank_name,
      bank_account_name: bank_account_name,
      bank_number: bank_number,
      ip_address: ip_address,
      bank_status: bank_status,
      bank_type: bank_type,
      bank_sms: bank_sms,
      status_system: status_system,
      type_deposit: type_deposit,
      username: username,
      password: password,
      account_sequence: account_sequence,
      account_set: account_set,
      amount: 0
    });

    res.status(201).json({
      message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};

exports.edit = async (req, res, next) => {
  try {
    const { uuid } = req.params;

    const bank = await models.Main_Bank.findOne({
      where: { uuid: uuid },
    });

    if (!bank) {
      const error = new Error("ไม่พบรหัสข้อมูลนี้");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      data: bank,
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const {
      uuid,
      bank_name,
      bank_account_name,
      bank_number,
      ip_address,
      bank_status,
      bank_type,
      bank_sms,
      status_system,
      username,
      password,
      account_sequence,
      account_set,
      type_deposit
    } = req.body;

  
    if (req.params.uuid !== uuid) {
      const error = new Error("รหัสข้อมูลไม่ถูกต้อง");
      error.statusCode = 400;
      throw error;
    }

    const bank = await models.Main_Bank.update(
      {
        bank_name: bank_name,
        bank_account_name: bank_account_name,
        bank_number: bank_number,
        ip_address: ip_address,
        bank_status: bank_status,
        bank_type: bank_type,
        bank_sms: bank_sms,
        status_system: status_system,
        username: username,
        password: password,
        account_sequence: account_sequence,
        account_set: account_set,
        type_deposit: type_deposit
      },
      {
        where: {
          uuid: uuid,
        },
      }
    );

    if (bank[0] === 0) {
      const error = new Error("ไม่พบรหัสข้อมูลนี้");
      error.statusCode = 404;
      throw error;
    } 
  
    res.status(200).json({
      message: "แก้ไขข้อมูลเรียบร้อย",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteBank = async (req, res, next) => {
  try {
    const { uuid } = req.params;

    const bank = await models.Main_Bank.findOne({ where: { uuid: uuid } });

    if (!bank) {
      const error = new Error("ไม่พบรหัสข้อมูลนี้");
      error.statusCode = 404;
      throw error;
    }

    // remove
    await models.Main_Bank.destroy({
      where: {
        uuid: uuid,
      },
    });

    res.status(200).json({
      message: "ลบข้อมูลเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateStatusSystem = async (req, res, next) => {
  try {

    const { uuid, status_system } = req.params;

    const bank = await models.Main_Bank.findOne({ where: { uuid: uuid } });

    if (!bank) {
      const error = new Error("ไม่พบรหัสข้อมูลนี้");
      error.statusCode = 404;
      throw error;
    }

    const StatusSystem = await models.Main_Bank.update(
      {
        status_system: status_system,
      },
      {
        where: {
          uuid: uuid,
        },
      }
    );

    res.status(200).json({
      message: "แก้ไขข้อมูลเรียบร้อย",
    });

  } catch (error) {
    next(error);
  }
}


// exports.insertAccountCurl = async (bank_name, username, password, account_number, account_name, account_type) => {
//   try {

//     const formData = new FormData();
//     formData.append("bank_name", bank_name);
//     formData.append("username", username);
//     formData.append("password", password);
//     formData.append("account_number", account_number);
//     formData.append("account_name", account_name);
//     formData.append("account_type", account_type.toLowerCase());
//     formData.append("id", "");
//     formData.append("crud", "2");
//     formData.append("has_key", "4jMmPayt0DPJIJkg5pEPG4ZmeJPed91E");

//     const response = await axios({
//       method: 'post',
//       url: 'http://128.199.214.40/curl/bank.php',
//       data: formData,
//       headers: {'Content-Type': `multipart/form-data; boundary=${formData._boundary}` }
//     });

//     console.log(response);

//    return response;
  
//   } catch (error) {
//     next(error);
//   }
// }

// exports.editAccountCurl = async (bank_name, username, password, account_number, id, account_name, account_type) => {
//   try {

//     const formData = new FormData();
//     formData.append("bank_name", bank_name);
//     formData.append("username", username);
//     formData.append("password", password);
//     formData.append("account_number", account_number);
//     formData.append("account_name", account_name);
//     formData.append("account_type", account_type.toLowerCase());
//     formData.append("id", id);
//     formData.append("crud", "1");
//     formData.append("has_key", "4jMmPayt0DPJIJkg5pEPG4ZmeJPed91E");

  
//     const response = await axios({
//       method: 'post',
//       url: 'http://128.199.214.40/curl/bank.php',
//       data: formData,
//       headers: {'Content-Type': `multipart/form-data; boundary=${formData._boundary}` }
//     });

//    return response;
  
//   } catch (error) {
    
//   }
// }

// exports.checkStatusSystem = async (req, res, next) => {
//   try {

//     let statusSystem = 1;

//     const bankStatusStart = await models.Main_Bank.findAll({
//       where: {
//         status_system: statusSystem,
//         bank_type: 1,
//       }
//     });

//     if(bankStatusStart.length > 0){
//       console.log("curl active : ", bankStatusStart.length);
//       for (let index = 0; index < bankStatusStart.length; index++) {
//         const bank = bankStatusStart[index];
//         let accout_type = bank.bank_name;
//         if(accout_type === "SCB") {
//           this.getStatementCurlScb(bank.bank_account_name);
//         } else if(accout_type === "KBANK") {
//           this.getStatementCurlKbank(bank.bank_account_name);
//         }
//       }

//     } else {
//       console.log("curl active : ", bankStatusStart.length);
//       console.log("status curl : inactive");
//       dateTime = new Date();
//       console.log("get statement: ", dateTime);
//     }
  
//   } catch (error) {
//     console.log(error);
//   }
// }

// exports.getStatementCurlScb = async (bank_account_name) => {
//   try {

//     dateTime = new Date();
//     console.log("status curl scb : active");
//     console.log("bank account name: ", bank_account_name);
//     console.log("get statement: ", dateTime);

//     const response = await axios({
//       method: 'get',
//       url: 'http://128.199.214.40/curl/index.php',
//     });

//     console.log(response.data);

//     return response.data;
  
//   } catch (error) {
//    console.log(error);
//   }
// }


// exports.getStatementCurlKbank = async (bank_account_name) => {
//   try {

//     dateTime = new Date();
//     console.log("status curl kbank : active");
//     console.log("bank account name: ", bank_account_name);
//     console.log("get statement: ", dateTime);

//     const response = await axios({
//       method: 'get',
//       url: 'http://128.199.214.40/curl/kbank_class/kb_array.php',
//     });

//     return response.data;
  
//   } catch (error) {
//    console.log(error);
//   }
// }

// // run get statement
// setInterval(this.checkStatusSystem, 120000)



