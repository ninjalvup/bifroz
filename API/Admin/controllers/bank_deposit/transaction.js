const axios = require('axios');
const models = require('../../models/index');
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
const { async } = require('crypto-random-string');
const askmebetController = require("../askmebetController");
const { Op } = require("sequelize");
const qs = require('qs');


exports.index = async (req, res, next) => {
    try {
      const scb_App = await models.Scb_App.findOne();

        res.status(200).json({
            data: scb_App
        });

    } catch (error) {
        next(error);
    }
    
}

exports.tranSaction = async (scb_App) => {
    try {
       let access_token;
       let dataresp;
       let current_time = moment().format("YYYY-MM-DD");
       console.log("current_time:",current_time);
   
     console.log(scb_App.device_Id);
     console.log(scb_App);

   

        // const scb_App = await models.Scb_App.findOne({
        //     where:{
        //       status_type: 1
        //     }
        //   });


        // edit
        // console.log("scb_App.accountFrom:",scb_App.accountFrom);
     
        // var datalogin = JSON.stringify({ deviceId: `${scb_App.device_Id}` });
        // var configlogin = {
        //   method: "post",
        //   url: "https://fasteasy.scbeasy.com:8443/v1/login/refresh",
        //   headers: {
        //     "Api-Refresh": `${scb_App.api_Refresh}`,
        //     "Content-Type": "application/json",
        //   },
        //   data: datalogin,
        // };
    
        // const resplogin = await axios(configlogin);
        // access_token = resplogin.data.data.access_token;

        // 
        // console.log("resplogin.data",resplogin.data);


        //new

        const url = 'https://fasteasy.scbeasy.com'
        const url_hash = 'https://hashpin.me-spin.com'
    let pin = '252588';
     let tilesVersion = '55';
     let AppVersion = '3.54.0/5744';
     let deviceId = scb_App.device_Id;
     let accountFrom = scb_App.accountFrom;



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
 
         
   
      var data = JSON.stringify({
        pageNumber: "1",
        accountNo: `${scb_App.accountFrom}`,
        endDate: `${current_time}`,
        startDate: `${current_time}`,
        pageSize: 20,
        productType: "2",
      });
   
  
      var config = {
        method: "post",
        url: "https://fasteasy.scbeasy.com/v2/deposits/casa/transactions",
        headers: {
          "Api-Auth": `${access_token}`,
          "Accept-Language": 'th',
          "Content-Type": 'application/json',
          
        },
        data: data,
      };
  
      const resp = await axios(config);
      //  console.log(resp.data.data.txnList);

      if (resp.data.data != null) {
        
   
      dataresp = resp.data.data.txnList;


 
    let startDate = moment().format("YYYY-MM-DD 00:00:00");
    let endDate = moment().format("YYYY-MM-DD 23:59:00");

    dataresp.forEach(async element => {

    const checklogs = await models.Transaction_SCB.findOne({
        where: {
            txnDateTime: element.txnDateTime,
            txnAmount: element.txnAmount,
            txnCurrency: element.txnCurrency,
            txnDebitCreditFlag: element.txnDebitCreditFlag,
            txnRemark: element.txnRemark,
            code: element.txnCode.code,
            description: element.txnCode.description,
            createdAt: {
                [Op.between]: [`${moment(startDate).format()}`, `${moment(endDate).format()}`],
              },
          
        },
       
      });

      if (checklogs == null) {
        let transaction_SCB = await models.Transaction_SCB.create({
            uuid: uuidv4(),
            txnDateTime: element.txnDateTime,
            txnAmount: element.txnAmount,
            txnCurrency: element.txnCurrency,
            txnDebitCreditFlag: element.txnDebitCreditFlag,
            txnRemark: element.txnRemark,
            code: element.txnCode.code,
            description: element.txnCode.description
           });

           if(element.txnDebitCreditFlag === 'C'){
              const doposit = await this.deposit(element.txnDateTime, element.txnAmount,element.txnRemark);
           }

           
         
      }

    
      
      });

    }else{
      console.log(resp.data.status.description);
    }
  
  
     return 'app'
    } catch (error) {
      console.log(error);
    }
  };


  exports.deposit = async (txnDateTime,txnAmount,txnRemark) => {
    try {

        let bank_date = "";
        let bank_time = "";
        let amount = "";
        let bank_tranfer = "";
        let bank_number = "";
        let create_by = "-";
        let fname = "";
        
        let bdate ;
        var btime;
        let bank;

        const status_sms = 0;
       
        console.log(txnDateTime,txnAmount,txnRemark);
        bank_date = txnDateTime.substring(0, 10);
        bank_time = txnDateTime.substring(11, 19);
        amount = txnAmount;

        bdate = moment(bank_date).format('DD/MM');
        btime = bank_time.substring(0, 5);
      
        let txnremark;
      
        const searchend = "รับโอนจาก";
        const indexOfend = txnRemark.indexOf(searchend);
        if (indexOfend !== -1) {
            txnremark = txnRemark.split(" ");  
            bank_tranfer = txnremark[1];
            let bank_numberto = txnremark[2].split("x");
            bank_number = bank_numberto[1];
             fname = txnremark[4];

       
        
             bank = bank_tranfer.toLowerCase();
        
           //scb
            const memberAccountBank = await models.Member_Account_Bank.findOne({
              attributes: ["member_uuid"],
              where: {
                bank_number: {
                  [Op.endsWith]: `%${bank_number}%`,
                },
                bank_account_name: {
                  [Op.like]: `%${fname}%`,
                }
                ,
                bank_name: {
                  [Op.like]: `%${bank}%`,
                }
              },
            });

            // console.log("memberAccountBank:",memberAccountBank);

            if (memberAccountBank !== null) {


            
             

              if(bank_tranfer == 'KTB'){
                bank_tranfer = 'KTBA'
              } 
              if(bank_tranfer == 'KBANK'){
                bank_tranfer = 'KBNK'
              }
              if(bank_tranfer == 'GSB'){
                bank_tranfer = 'GSBA'
              }
              if(bank_tranfer == 'BBL'){
                bank_tranfer = 'BBLA'
              }
              if(bank_tranfer == 'BAY'){
                bank_tranfer = 'BAYA'
              }
              if(bank_tranfer == 'TMB'){
                bank_tranfer = 'TMBA'
              }
              if(bank_tranfer == 'UOBT'){
                bank_tranfer = 'UOB'
              }
    
              const existSms = await models.Sms_Transaction.findOne({
                where: {
                  bank_date: bdate,
                  bank_time: btime,
                  amount: `${amount}.00`,
                  bank_tranfer: {
                    [Op.like]: `${bank_tranfer}`
                  }
                }
              });


    
              if (existSms) {
                return 'not null'
              }
    
              const smsTransaction = await models.Sms_Transaction.create({
                uuid: uuidv4(),
                title_tranfer: 'app',
                bank_date: bdate,
                bank_time: btime,
                amount: `${amount}.00`,
                bank_tranfer: bank_tranfer,
                sms_content: txnRemark,
                status: 1,
              });
    
              this.approvedSmsSCBAuto(
                `${amount}.00`,
                memberAccountBank.member_uuid,
                bdate,
                btime,
                create_by,
                smsTransaction.uuid
              );
    
              return 'ok'
            } else {
          
                if (bank_tranfer === "") {
                    bank_tranfer = "SCB";
                }

                
  
                if(bank_tranfer == 'KTB'){
                  bank_tranfer = 'KTBA'
                } 
                if(bank_tranfer == 'KBANK'){
                  bank_tranfer = 'KBNK'
                }
                if(bank_tranfer == 'GSB'){
                  bank_tranfer = 'GSBA'
                }
                if(bank_tranfer == 'BBL'){
                  bank_tranfer = 'BBLA'
                }
                if(bank_tranfer == 'BAY'){
                  bank_tranfer = 'BAYA'
                }
                if(bank_tranfer == 'TMB'){
                  bank_tranfer = 'TMBA'
                }
                if(bank_tranfer == 'UOBT'){
                  bank_tranfer = 'UOB'
                }
    
                const existSms = await models.Sms_Transaction.findOne({
                  where: {
                    bank_date: bdate,
                    bank_time: btime,
                    amount: `${amount}.00`,
                    bank_tranfer: {
                      [Op.like]: `${bank_tranfer}`
                    }
                  
                  }
                });
    
                if (existSms) {
               

                  return 'null'
                }
    
                const smsTransaction = await models.Sms_Transaction.create({
                  uuid: uuidv4(),
                  title_tranfer: 'app',
                  bank_date: bdate,
                  bank_time: btime,
                  amount: `${amount}.00`,
                  bank_tranfer: bank_tranfer,
                  sms_content: txnRemark,
                  status: status_sms,
                });
    
                return 'bank';
          
                }



        }else{


          console.log("K9x");

            txnremark = txnRemark.split(" ");
           
            bank_tranfer = txnremark[1].split("(");
            bank_tranfer = bank_tranfer[1].split(")");
            bank_tranfer = bank_tranfer[0];

            let bank_numbertoo = txnremark[2].split("/");
            let bank_numbertree = bank_numbertoo[1].split("x");
            bank_number = bank_numbertree[0].substring(1, 19);


            if (bank_tranfer === "GSBA") {
              bank = "gsb";
            } else {
              bank = bank_tranfer.toLowerCase();
            }
    
            if (bank_tranfer === "TBNK") {
              bank = "tbank";
            } else {
              bank = bank_tranfer.toLowerCase();
            }

           

            if(bank_tranfer == 'KTB'){
              bank_tranfer = 'KTBA'
            } 
            if(bank_tranfer == 'KBANK'){
              bank_tranfer = 'KBNK'
            }
            if(bank_tranfer == 'GSBA'){
              bank_tranfer = 'GSB'
            }
            if(bank_tranfer == 'BBL'){
              bank_tranfer = 'BBLA'
            }
            if(bank_tranfer == 'BAYA'){
              bank_tranfer = 'BAY'
            }
            if(bank_tranfer == 'TMBA'){
              bank_tranfer = 'TMB'
            }
            if(bank_tranfer == 'UOBT'){
              bank_tranfer = 'UOB'
            }
      
            bank = bank_tranfer.toLowerCase();
            const memberAccountBank = await models.Member_Account_Bank.findAll({
              attributes: ["member_uuid"],
              where: {
                bank_number: {
                  [Op.endsWith]: `${bank_number}`,
                },
                // bank_name: {
                //   [Op.or]: [`%${bank}%`, `%${bank_tranfer}%`],  
                // }
              },
            });
            console.log(memberAccountBank);
    
    
            if (memberAccountBank.length == 1) {
    
              const existSms = await models.Sms_Transaction.findOne({
                where: {
                  bank_date: bdate,
                  bank_time: btime,
                  amount: `${amount}.00`,
                  bank_tranfer: {
                    [Op.like]: `${bank_tranfer}`
                  }
                }
              });
    
              if (existSms) {
                return 'not null'
              }
    
              const smsTransaction = await models.Sms_Transaction.create({
                uuid: uuidv4(),
                title_tranfer: 'app',
                bank_date: bdate,
                bank_time: btime,
                amount: `${amount}.00`,
                bank_tranfer: bank_tranfer,
                sms_content: txnRemark,
                status: 1,
              });
    
              this.approvedSmsSCBAuto(
                `${amount}.00`,
                memberAccountBank[0].member_uuid,
                bdate,
                btime,
                create_by,
                smsTransaction.uuid
              );
    
              return 'ok'
            } else {
          
                if (bank_tranfer === "") {
                    bank_tranfer = "SCB";
                }

                
           
    
                const existSms = await models.Sms_Transaction.findOne({
                  where: {
                    bank_date: bdate,
                    bank_time: btime,
                    amount: `${amount}.00`,
                    bank_tranfer: {
                      [Op.like]: `${bank_tranfer}`
                    }
                  }
                });
    
                if (existSms) {
               

                  return 'null'
                }
    
                const smsTransaction = await models.Sms_Transaction.create({
                  uuid: uuidv4(),
                  title_tranfer: 'app',
                  bank_date: bdate,
                  bank_time: btime,
                  amount: `${amount}.00`,
                  bank_tranfer: bank_tranfer,
                  sms_content: txnRemark,
                  status: status_sms,
                });
    
                return 'bank';
          
            }
            
           
        }

        

        // console.log("bank_date:",bank_date);
        // console.log("bank_time:",bank_time);
        // console.log("amount:",amount);
        // console.log("bank_tranfer:",bank_tranfer);
        // console.log("bank_number:",bank_number);


    } catch (error) {
        next(error);
    }
    
}


exports.approvedSmsSCBAuto = async (
    amount,
    member_uuid,
    bank_date,
    bank_time,
    create_by,
    sms_transaction_uuid
  ) => {
    try {
      let totalAmount = 0;
      let response;
      let bankMemeber;
      let bonus;
      let resp;


      console.log("yes");
  
      let member = await models.Member.findOne({
        attributes: ["uuid", "_id", "bonus", "sb_username",],
        where: { uuid: member_uuid },
      });
  
      if (member.bonus === 1) {
        resp = await this.mapBonusPromotion(member.uuid, amount);
        bonus = resp.bonus;
        console.log(bonus);
      } else {
  
        resp = await models.Promotion.findOne({
          where: {
            turnnotpro: 1,
          },
        });
  
        bonus = resp.max_bonus;
        console.log(bonus);
      }
  
      const time = `${bank_date} ${bank_time}`;
      //let amountConv = amount.replace(/,/g, ''); //",",""
     
      let amountConv1 = amount.toString();
      console.log(amountConv1);
      let amountConv = amountConv1.replace(/,/g, '');
      console.log(amountConv);

      totalAmount = (parseFloat(amountConv) + parseFloat(bonus));
  
      if (member === null) {
        const error = new Error("Not Found Member");
        error.statusCode = 404;
        throw error;
      }
  
      bankMemeber = await models.Member_Account_Bank.findOne({
        attributes: ["uuid"],
        where: { member_uuid: member.uuid },
      });
  
      const existTransaction = await models.Member_Account_Bank_Transaction.findOne({
        where: {
          bank_time: time,
          amount: amountConv,
          transaction_status: "manual",
          username: member.sb_username,
        }
      });
  
      if (existTransaction) {
        const error = new Error("Transaction  Repeat !!!!");
        error.statusCode = 400;
        throw error;
      }
  
      response = await askmebetController.deposit(totalAmount, member.sb_username); // member._id
  
      // insert transaction
      const account_transection = await models.Member_Account_Bank_Transaction.create(
        {
          uuid: uuidv4(),
          amount: amountConv,
          bank: bankMemeber.uuid,
          bonus_credit: bonus,
          credit_before: response.result[0].beforeBalance,
          credit_after: response.result[0].afterBalance,
          transaction_type: "1",
          bank_time: time,
          create_by: create_by,
          annotation: "-",
          ref: response.result[0].ref,
          transaction_status: "Success",
          username: member.sb_username,
          promotion_uuid: resp.uuid,
          sms_transaction_uuid: sms_transaction_uuid,
        }
      );
  
      // affiliate deposit
      const affiliateDeposit = await this.affiliateDeposit(member.sb_username, amountConv);
      ///////////////////////
  
      const refDeposit = await this.addRefDeposit(
        member.sb_username,
        account_transection.ref,
        account_transection.uuid,
      );
      //}
    } catch (error) {
      console.log(error);
    }
  };


  exports.affiliateDeposit = async (username, amount) => {
    try {
  
      // get percent affiliate %
      const affiliateSetting = await models.Affiliate_Setting.findOne({
        where: {
          id: 1
        }
      });
  
      const member = await models.Member.findOne({
        where: {
          sb_username: username
        }
      });
  
      const affiliateDeposit = await models.Affiliate_Deposit.create({
        uuid: uuidv4(),
        member_uuid_member: member.uuid,
        amount: amount,
        percent_value: affiliateSetting.percent_value,
        status: 0
      });
  
  
      return affiliateDeposit;
  
  
    } catch (error) { }
  };




  exports.mapBonusPromotion = async (memberUUID, amount) => {
    try {
  
      console.log(amount);
  
      let bonusPromotion;
      let today = moment().format("YYYY-MM-DD");
      let first_today_deposit = `${today} 00:00:00`;
      let second_today_deposit = `${today} 23:59:00`;
  
      member = await models.Member.findOne({
        where: {
          uuid: memberUUID,
        },
      });
  
  
      // check new member
      let registerDate = moment(member.register_date).format("YYYY-MM-DD");
  
      if (registerDate === today && member.new_member === "1") {
  
        let checkBonus = await models.Promotion.findOne({
          where: { promotion_type_id: 1, status: 1 },
        });
  
        if (checkBonus !== null) {
  
          const member = await models.Member.update(
            {
              new_member: "0",
            },
            {
              where: {
                uuid: memberUUID,
              },
            }
          );
  
  
          if (checkBonus.bonus_type_id === 2) {
  
            console.log(`Bonus: ${checkBonus.bonus_type_id}`);
  
            bonusPromotion = await models.Promotion.findOne({
              where: { promotion_type_id: 1, status: 1, bonus_type_id: 2 },
              include: [
                {
                  model: models.Promotion_Condition,
                  as: "promotion_conditions",
                  where: {
                    min_deposit: {
                      [Op.lte]: amount,
                    },
                    max_deposit: {
                      [Op.gte]: amount,
                    },
                  },
                },
              ],
            });
  
            if (bonusPromotion !== null) {
  
              let precentBonus = 100 / bonusPromotion.promotion_conditions[0].max_bonus;
              let bonusTotal = (amount / precentBonus);
              let promotion = bonusPromotion.promotion_conditions[0].promotion_uuid;
              let result;
  
              if (bonusTotal > bonusPromotion.max_bonus) {
  
                result = {
                  "bonus": bonusPromotion.max_bonus,
                  "uuid": promotion
                }
  
              } else {
  
                result = {
                  "bonus": bonusTotal,
                  "uuid": promotion
                }
  
              }
  
              return result;
  
            } else {
  
              let bonusDefault = await models.Promotion.findOne({
                where: {
                  turnnotpro: 1,
                },
              });
  
              let result = {
                "bonus": bonusDefault.max_bonus,
                "uuid": bonusDefault.uuid
              }
  
              return result;
  
            }
  
  
          } else {
  
            console.log(`Bonus: ${checkBonus.bonus_type_id}`);
            bonusPromotion = await models.Promotion.findOne({
              where: { promotion_type_id: 1, status: 1, bonus_type_id: 1 },
              include: [
                {
                  model: models.Promotion_Condition,
                  as: "promotion_conditions",
                  where: {
                    min_deposit: {
                      [Op.lte]: amount,
                    },
                    max_deposit: {
                      [Op.gte]: amount,
                    },
                  },
                },
              ],
            });
  
            if (bonusPromotion !== null) {
              let bonusTotal = bonusPromotion.promotion_conditions[0].max_bonus;
              let promotion = bonusPromotion.promotion_conditions[0].promotion_uuid;
              let result = {
                "bonus": bonusTotal,
                "uuid": promotion
              }
  
              return result;
            } else {
  
              let bonusDefault = await models.Promotion.findOne({
                where: {
                  turnnotpro: 1,
                },
              });
  
              let result = {
                "bonus": bonusDefault.max_bonus,
                "uuid": bonusDefault.uuid
              }
  
              return result;
  
            }
  
          }
        } else {
  
          let bonusDefault = await models.Promotion.findOne({
            where: {
              turnnotpro: 1,
            },
          });
  
          let result = {
            "bonus": bonusDefault.max_bonus,
            "uuid": bonusDefault.uuid
          }
  
          return result;
        }
  
  
  
      }
      ///////////////////////////////////////////////////////////////////////////////
  
      // check รายการฝากแรกของวัน //
  
      let checkBonus = await models.Promotion.findOne({
        where: { promotion_type_id: 2, status: 1 },
      });
  
      if (checkBonus !== null) {
  
        const refLatest = await models.Ref_Deposit.findAll({
          limit: 1,
          where: {
            username: member.sb_username,
            createdAt: {
              [Op.between]: [first_today_deposit, second_today_deposit],
            },
          },
        });
  
        if (refLatest.length > 0) {
  
          let bonusDefault = await models.Promotion.findOne({
            where: {
              turnnotpro: 1,
            },
          });
  
          let result = {
            "bonus": bonusDefault.max_bonus,
            "uuid": bonusDefault.uuid
          }
  
          return result;
  
        } else {
  
          if (checkBonus.bonus_type_id === 2) {
  
            bonusPromotion = await models.Promotion.findOne({
              where: { promotion_type_id: 2, status: 1, bonus_type_id: 2 },
              include: [
                {
                  model: models.Promotion_Condition,
                  as: "promotion_conditions",
                  where: {
                    min_deposit: {
                      [Op.lte]: amount,
                    },
                    max_deposit: {
                      [Op.gte]: amount,
                    },
                  },
                },
              ],
            });
  
            if (bonusPromotion !== null) {
  
              let precentBonus = 100 / bonusPromotion.promotion_conditions[0].max_bonus;
              let bonusTotal = (amount / precentBonus);
              let promotion = bonusPromotion.promotion_conditions[0].promotion_uuid;
              let result;
  
              if (bonusTotal > bonusPromotion.max_bonus) {
  
                result = {
                  "bonus": bonusPromotion.max_bonus,
                  "uuid": promotion
                }
  
              } else {
  
                result = {
                  "bonus": bonusTotal,
                  "uuid": promotion
                }
  
              }
  
              return result;
  
            } else {
  
              let bonusDefault = await models.Promotion.findOne({
                where: {
                  turnnotpro: 1,
                },
              });
  
              let result = {
                "bonus": bonusDefault.max_bonus,
                "uuid": bonusDefault.uuid
              }
  
              return result;
  
            }
  
          } else {
  
            console.log(`Bonus: ${checkBonus.bonus_type_id}`);
            bonusPromotion = await models.Promotion.findOne({
              where: { promotion_type_id: 2, status: 1, bonus_type_id: 1 },
              include: [
                {
                  model: models.Promotion_Condition,
                  as: "promotion_conditions",
                  where: {
                    min_deposit: {
                      [Op.lte]: amount,
                    },
                    max_deposit: {
                      [Op.gte]: amount,
                    },
                  },
                },
              ],
            });
  
            if (bonusPromotion !== null) {
              let bonusTotal = bonusPromotion.promotion_conditions[0].max_bonus;
              let promotion = bonusPromotion.promotion_conditions[0].promotion_uuid;
              let result = {
                "bonus": bonusTotal,
                "uuid": promotion
              }
  
              return result;
            } else {
  
              let bonusDefault = await models.Promotion.findOne({
                where: {
                  turnnotpro: 1,
                },
              });
  
              let result = {
                "bonus": bonusDefault.max_bonus,
                "uuid": bonusDefault.uuid
              }
  
              return result;
  
            }
  
          }
  
        }
  
      } else {
  
        let bonusDefault = await models.Promotion.findOne({
          where: {
            turnnotpro: 1,
          },
        });
  
        let result = {
          "bonus": bonusDefault.max_bonus,
          "uuid": bonusDefault.uuid
        }
  
        return result;
  
      }
  
  
    } catch (error) {
      console.log(error);
    }
  };


  exports.addRefDeposit = async (username, ref, accounTransectionUUID) => {
    try {
      const refDeposit = await models.Ref_Deposit.create({
        uuid: uuidv4(),
        username: username,
        ref: ref,
        acc_bank_transaction_uuid: accounTransectionUUID,
        status: 0,
      });
  
      return refDeposit;
    } catch (error) { }
  };


  
  exports.setInterv = async () => {


          
    const scb_App = await models.Scb_App.findAll({
        where:{
          status_type: 1 // ฝาก
        }
      });

      // console.log("scb_app:",scb_App);

      scb_App.forEach(async (item) => {
          if(item.status == 1){
          
            const data = {
              uuid:item.uuid,
              api_Refresh: item.api_Refresh,
              device_Id:item.device_Id,
              status: item.status,
              status_type: item.status_type,
              bank_name_app: item.bank_name_app,
              bank_account_name_app: item.bank_account_name_app,
              username: item.username,
              password: item.password,
              accountFrom: item.accountFrom
            }
            await this.tranSaction(data);

          }
        //  console.log(item.uuid);
        

     });



  





  };




   //setInterval( this.setInterv, 5000);



