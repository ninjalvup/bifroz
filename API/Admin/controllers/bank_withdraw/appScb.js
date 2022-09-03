const axios = require('axios');
const models = require('../../models/index');
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
const { Op } = require("sequelize");
const QRCode =  require('qrcode');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const config = require('../../config/index');
const { async } = require('crypto-random-string');
const qs = require('qs');



exports.withdraw = async (data) => {
    try {

     let responsfn;

     console.log(
     data.amount,
     data.uuid,
     data.bank_name,
     data.bank_number );
     let  accountTo =  data.bank_number;
     let  amount = data.amount;
     let  bank = data.bank_name ;
     let  transaction_uuid = data.uuid ;
     let  totalAvailableBalance;
     let access_token;

    //  check
    let startDate = moment();
    let endDate = moment().format("YYYY-MM-DD HH:mm:ss");

    let al = Math.abs(startDate - 240000);
    let wdate = moment(al);
    // console.log("wdate:",wdate);
    // console.log("startDate:",startDate);
    // console.log("`${moment(wdate).format()}`:",moment(wdate).format());
    // console.log("`${moment(endDate).format()}`:",`${moment(endDate).format()}`);

    const checklogs = await models.Log_Transaction_Scb.findOne({
      where: {
        accountTo: accountTo,amount: amount,bank:bank,transaction_uuid: transaction_uuid,
        createdAt: {
          [Op.between]: [`${moment(wdate).format()}`, `${moment(endDate).format()}`],
        },
      },
     
    });
    
    console.log("checklogs;",checklogs);
    if(checklogs == null){
       // loginscb
    
     const scb_App = await models.Scb_App.findOne({
      where:{
        status_type: 0
      }
    });

    //  edit

    const url = 'https://fasteasy.scbeasy.com'
    const url_hash = 'https://hashpin.me-spin.com'

     let pin = scb_App.api_Refresh;
     let tilesVersion = '55';
     let AppVersion = '3.54.0/5744';
     let deviceId = scb_App.device_Id;
     let accountFrom = scb_App.accountFrom;
    //  var datalogin = JSON.stringify({ deviceId: `${scb_App.device_Id}` });


     const response = await axios.post(`${url}/v3/login/preloadandresumecheck`, {

         "deviceId": `${deviceId}`,
         "jailbreak": "0",
         "tilesVersion":`${tilesVersion}`,
         "isLoadGeneralConsent":"1",
         "userMode": "INDIVIDUAL"
         
     },
     {
         headers: {
             "Accept-Language": "th",
             "User-Agent": `Android/10;FastEasy/${AppVersion}`,
             "Content-Type":"application/json; charset=UTF-8"
         },
     });

     console.log(response.headers);
     console.log(response.data);

     let api_auth = response.headers["api-auth"];

    //  edit

     const response_preAuth = await axios.post(`${url}/isprint/soap/preAuth`, {

         "loginModuleId": "PseudoFE"
     },
     {
         headers: {
             "Api-Auth": api_auth
         },
     });

     console.log(response_preAuth.data); //e2ee
     let pseudoOaepHashAlgo = response_preAuth.data.e2ee.pseudoOaepHashAlgo
     let pseudoSid = response_preAuth.data.e2ee.pseudoSid
     let pseudoRandom = response_preAuth.data.e2ee.pseudoRandom
     let pseudoPubKey = response_preAuth.data.e2ee.pseudoPubKey


     const response_hashpin = await axios.post(`${url_hash}/pin/encrypt`, qs.stringify({

         'Sid': `${pseudoSid}` ,
         'ServerRandom': `${pseudoRandom}` ,
         'pubKey': `${pseudoPubKey}` ,
         'pin': `${pin}`,
         'hashType': `${pseudoOaepHashAlgo}` 
     }),
     {
         headers: {
             "Content-Type": "application/x-www-form-urlencoded"
         },
     });

     console.log(response_hashpin.data);
     let pseudoPin = response_hashpin.data

     const response_fasteasylogin = await axios.post(`${url}/v1/fasteasy-login`, {

         "deviceId": `${deviceId}`,
         "pseudoPin": `${pseudoPin}`,
         "pseudoSid": `${pseudoSid}`
         
         
     },
     {
         headers: {
             "Api-Auth": api_auth,
             "user-agent": `Android/10;FastEasy/${AppVersion}`,
             "Accept-Language": "th",
             "scb-channel":  "APP",
             "Content-Type":"application/json;"
         },
     });

     console.log(response_fasteasylogin.data);



    //  var configlogin = {
    //    method: "post",
    //    url: "https://fasteasy.scbeasy.com:8443/v1/login/refresh",
    //    headers: {
    //      "Api-Refresh": `${scb_App.api_Refresh}`,
    //      "Content-Type": "application/json",
    //    },
    //    data: datalogin,
    //  };
 
    //  const resplogin = await axios(configlogin);
     access_token = response_fasteasylogin.headers["api-auth"];;
      // console.log("resplogin.data",resplogin.data);
 
       let uuid = uuidv4();
           // insert
           const logs = await models.Log_Transaction_Scb.create({
             uuid: uuid,
             transaction_uuid: transaction_uuid,
             accountTo: accountTo,
             amount: amount,
             bank: bank,
             status: response_fasteasylogin.data.status.description
            });


      
      //checkbalance
      var datab = JSON.stringify({
        depositList: [{ accountNo:  `${scb_App.accountFrom}` }],
        numberRecentTxn: 2,
        tilesVersion: "26",
      });
      console.log(data);
      console.log(access_token);
  
      var configb = {
        method: "post",
        url: "https://fasteasy.scbeasy.com/v2/deposits/summary",
        headers: {
          "Api-Auth": `${access_token}`,
          "Content-Type": "application/json",
        },
        data: datab,
      };
  
      const respb = await axios(configb);
      console.log("balance:",respb.data.totalAvailableBalance);

      totalAvailableBalance = respb.data.totalAvailableBalance;
 
 
 
 
     // verification withdraw
     let accountToBankCode = await this.code(bank);
     let transferType = "ORFT";
 
     if (accountToBankCode == "014") {
       transferType = "3RD";
     }
 
     var dataverification = JSON.stringify({
       accountFrom: `${accountFrom}`,
       accountFromType: "2",
       accountTo: `${accountTo}`,
       accountToBankCode: `${accountToBankCode}`,
       amount: `${amount}`,
       annotation: null,
       transferType: `${transferType}`,
     });
     console.log(dataverification);
 
     var configverification = {
       method: "post",
       url: "https://fasteasy.scbeasy.com/v2/transfer/verification",
       headers: {
         "Api-Auth": `${access_token}`,
         "Content-Type": "application/json",
       },
       data: dataverification,
     };
 
     const respverification = await axios(configverification);
     console.log("respverification:",respverification);
 
 
       // verification confirmation
     let check = respverification.data.status.description;
 
 
     console.log("check:", check);
 
     if (check == "จำนวนเงินในบัญชีไม่เพียงพอ กรุณาเลือกบัญชีอื่น") {
     
       responsfn =  "จำนวนเงินในบัญชีไม่เพียงพอ กรุณาเลือกบัญชีอื่น";
       let statusProcessfail = await models.Member_Account_Bank_Transaction.update(
        {
          annotation: responsfn,
          transaction_status: 'Reject'
        },
        {
          where: {
            uuid: transaction_uuid,
          },
        }
      );

       return responsfn;
     }
  
 
     let accountFromName = respverification.data.data.accountFromName;
     let accountToName = respverification.data.data.accountToName;
     let transactionToken = respverification.data.data.transactionToken;
     
 
     var dataconf = JSON.stringify({
       accountFrom: `${accountFrom}`,
       accountFromName: `${accountFromName}`,
       accountFromType: "2",
       accountTo: `${accountTo}`,
       accountToBankCode: `${accountToBankCode}`,
       accountToName: `${accountToName}`,
       amount: `${parseInt(amount)}`,
       botFee: 0.0,
       channelFee: 0.0,
       fee: 0.0,
       feeType: "IR",
       pccTraceNo: null,
       scbFee: 0.0,
       sequence: null,
       terminalNo: null,
       transactionToken: `${transactionToken}`,
       transferType: `${transferType}`,
     });
     console.log(dataconf);
 
     var configconf = {
       method: "post",
       url: "https://fasteasy.scbeasy.com/v3/transfer/confirmation",
       headers: {
         "Api-Auth": `${access_token}`,
         "Content-Type": "application/json",
       },
       data: dataconf,
     };
 
     const respconf = await axios(configconf);
 
         //check tel
         const logger = await models.Log_Transaction_Scb.update({
        
           accountToName: accountToName,
           totalAvailableBalance: totalAvailableBalance,
           transactionDateTime: respconf.data.data.transactionDateTime,
           remainingBalance: respconf.data.data.remainingBalance,
           QRstring:  respconf.data.data.additionalMetaData.paymentInfo[0].QRstring,
           status:  respconf.data.status.description
          },
          {
           where: { uuid: uuid }
          }
       );
 
     console.log("respconf:", respconf.data);


     responsfn = respconf.data.status.description;

     
    let byAuto = "ออโต้";
    let auto_status = 'Withdraw Success';
    let success = 'Success';

    const qr = await QRCode.toDataURL(`${respconf.data.data.additionalMetaData.paymentInfo[0].QRstring}`);
 
    const urlqr  = `${config.DOMAIN}/qrcode/${await saveImageToDisk(qr)}`;


    let current_time = moment().format("YYYY-MM-DD HH:mm:ss");
    let statusProcess = await models.Member_Account_Bank_Transaction.update(
      {
        credit_bank_before: totalAvailableBalance,
        credit_bank_after: respconf.data.data.remainingBalance,
        annotation:`${accountFromName} เลขบัญชี: ${accountFrom} โอนเงินจำนวน ${amount} บาท ไปเลขบัญชี ${accountTo} ของ ${accountToName}`,
        create_by: byAuto,
        auto_status: auto_status,
        transaction_status: success,
        updatedAt: current_time,
        transaction_slip: urlqr
      },
      {
        where: {
          uuid: transaction_uuid,
        },
      }
    );

     return responsfn;
    }else {
        // insert
        const log = await models.Log_Transaction_Scb.create({
          uuid: uuidv4(),
    
          status: "มีรายการถอนซ้ำ จำนวนเงินเลขบัญชีและธนาคารเดียวกันภายใน 4 นาที วันนี้"
         });
    }
  
  
    } catch (error) {
      console.log(error);
      return error;
    }
};



exports.code = async (bank) => {
  try {
    let bankName = bank.trim();

    // if (value == "ไทยพาณิชย์") {
    //   return "014";
    // }

    // if (value == "กรุงเทพ") {
    //   return "002";
    // }

    // if (value == "กสิกรไทย") {
    //   return "004";
    // }

    // if (value == "กรุงไทย") {
    //   return "006";
    // }

    // if (value == "ทหารไทย") {
    //   return "011";
    // }

    // if (value == "กรุงศรีฯ") {
    //   return "025";
    // }
    // if (value == "ออมสิน") {
    //   return "030";
    // }

    // if (value == "ธนชาติ") {
    //   return "065";
    // }

    // if (value == "ธ.ก.ส") {
    //   return "034";
    // }
    // if (value == "ยูโอบี") {
    //   return "024";
    // }
    // if (value == "อาคารสงเคราะห์") {
    //   return "033";
    // }
    // if (value == "ซีไอเอ็มบี") {
    //   return "022";
    // }
    // if (value == "ซิตี้แบงก์") {
    //   return "017";
    // }
    // if (value == "ดอยซ์แบงค์") {
    //   return "032";
    // }
    // if (value == "เอชเอสบีซี") {
    //   return "031";
    // }
    // if (value == "ไอซีบีซี") {
    //   return "070";
    // }
    // if (value == "ธนาคารอิสลาม") {
    //   return "066";
    // }
    // if (value == "เกีนรตินาคินภัทร") {
    //   return "069";
    // }
    // if (value == "แลนด์แอนด์เฮ้าส์") {
    //   return "024";
    // }
    // if (value == "มิซูโฮ") {
    //   return "039";
    // }
    // if (value == "สแตนดาร์ดชาร์ดตอร์ด") {
    //   return "020";
    // }
    // if (value == "ซูมิโตโม") {
    //   return "018";
    // }
    // if (value == "ไทยเครดิต") {
    //   return "071";
    // }
    // if (value == "ทิสโก้") {
    //   return "064";
    // }

    if (bankName === "scb") {
      return "014";
    } else if (bankName === "kbnk") {
      return "004";
    } else if (bankName === "bbla") {
      return "002";
    } else if (bankName === "ktba") {
      return "006";
    } else if (bankName === "BAAC") {
      return "034";
    } else if (bankName === "ttb" || bankName === "tmb") {
      return "011";
    } else if (bankName === "ICBC") {
      return "070";
    } else if (bankName === "TCD") {
      return "071";
    } else if (bankName === "CITI") {
      return "017";
    } else if (bankName === "CIMB") {
      return "022";
    } else if (bankName === "UOB") {
      return "024";
    } else if (bankName === "bay") {
      return "025";
    } else if (bankName === "gsb") {
      return "030";
    } else if (bankName === "HSBC") {
      return "031";
    } else if (bankName === "MIZUHO") {
      return "039";
    } else if (bankName === "GHB") {
      return "033";
    } else if (bankName === "LHBANK") {
      return "073";
    } else if (bankName === "TBANK") {
      return "065";
    } else if (bankName === "TISCO") {
      return "067";
    } else if (bankName === "KKP") {
      return "069";
    } else if (bankName === "IBANK") {
      return "066";
    }
  } catch (error) {
    throw error;
  }
};





exports.index = async (req, res, next) => {
    try {
      const scb_App = await models.Scb_App.findAll();

        res.status(200).json({
            data: scb_App
        });

    } catch (error) {
        next(error);
    }
    
}

exports.createScb = async (req, res, next) => {
  try {

    const {api_Refresh,device_Id,accountFrom,status_type,bank_name_app,status,bank_account_name_app,username,password} = req.body;
    
    let scbapp ;
    const scb_AppfindOne = await models.Scb_App.findOne({
      where:{
        status_type: status_type
      }
    });
    if(scb_AppfindOne == null){
      const scb_App = await models.Scb_App.create({
        uuid: uuidv4(),
        api_Refresh: api_Refresh,
        device_Id: device_Id,
        status: status,
        status_type: status_type,
        bank_name_app: bank_name_app,
        bank_account_name_app:bank_account_name_app,
        username:username,
        password:password,
        accountFrom: accountFrom
      });
     
      scbapp = "Create Success"
    }else{
      scbapp = "Not Success มี data in table"
    }
   

      res.status(200).json({
          data: scbapp
      });

  } catch (error) {
      next(error);
  }
  
}


exports.updateScb = async (req, res, next) => {
  try {
    const {api_Refresh,device_Id,accountFrom,bank_name_app,status_type,status,bank_account_name_app,username,password} = req.body;
    const {uuid} = req.params;
  
        const scb_App = await models.Scb_App.update({
        api_Refresh: api_Refresh,
        device_Id: device_Id,
        status: status,
        status_type: status_type,
        bank_name_app: bank_name_app,
        bank_account_name_app:bank_account_name_app,
        username:username,
        password:password,
        accountFrom: accountFrom
      },
      {
        where: {
          uuid: uuid,
        },
      }
      );
     
     
   
   

      res.status(200).json({
          data: "update Success"
      });

  } catch (error) {
      next(error);
  }
  
}

exports.getUUid = async (req, res, next) => {
  try {
    const logs = await models.Scb_App.findAll({
      attributes: ["uuid","status","status_type","bank_account_name_app","bank_name_app"],
    });

    res.status(200).json({
      data: logs
  });
    
  } catch (error) {
    next(error);
  }
  
}

exports.updateStatus = async (req, res, next) => {
  try {
    const {status} = req.body;
    const {uuid} = req.params;
    let scbapp ;
    
    console.log("uuid:",uuid,status);
 
      const scb_App = await models.Scb_App.update({
         status: status
      },
      {
        where: {
          uuid: uuid,
        },
      }
      );
     
      scbapp = "update Success"
   
      res.status(200).json({
          data: scbapp
      });

  } catch (error) {
      next(error);
  }
  
}


exports.logTransaction = async (req, res, next) => {
  try {

      const logs = await models.Log_Transaction_Scb.findAll();
     
      res.status(200).json({
          data: logs
      });

  } catch (error) {
      next(error);
  }
  
}







async function saveImageToDisk(baseImage) {
  console.log("baseImage:",baseImage);
 
  const projectPath = path.resolve('./') ;
 
  const uploadPath = `${projectPath}/public/images/qrcode/`;
  console.log(uploadPath);

  const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));

  console.log("ext:",ext);

  let filename = '';
  if (ext === 'svg+xml') {
      filename = `${uuidv4()}.svg`;
  } else {
      filename = `${uuidv4()}.${ext}`;
  }

  let image = decodeBase64Image(baseImage);

  await writeFileAsync(uploadPath+filename, image.data, 'base64');

  return filename;
}

function decodeBase64Image(base64Str) {
  var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var image = {};
  if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string');
  }

  image.type = matches[1];
  image.data = matches[2];

  return image;
}
