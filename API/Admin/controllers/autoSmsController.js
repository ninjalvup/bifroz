const models = require("../models/index");
const { v4: uuidv4 } = require("uuid");
const askmebetController = require("./askmebetController");
const { Op } = require("sequelize");
const moment = require("moment");
const urlConfig = "http://localhost:5000";
const axios = require("axios")
const bankdepositController = require("./bank_deposit/transaction");

exports.insertSms = async (req, res, next) => {
  try {



    const scb_App = await models.Scb_App.findOne({
      where:{
        status_type: 1
      }
    });
    if(scb_App.status != 1){

    const status_sms = 0; // status sms

    const { phoneNumber, sms } = req.body;
    const key = req.params.key;

    let bank_date = "";
    let bank_time = "";
    let amount = "";
    let bank_tranfer = "";
    let bank_number = "";
    let create_by = "-";

    let spsms = sms.split(" ");
    const search = "โอนเข้า";
    const indexOf = spsms[0].indexOf(search);
    const searchend = "ถอน";
    const indexOfend = spsms[0].indexOf(searchend);

    const smsOtp = "โอนเงินไปบ/ช";
    const smsOtp2 = "ยอดเงินใช้ได้บ/ช";
    const smsTranfer = "หากสงสัยโทร.027776780";
    if (spsms[0] === smsOtp) {
      const error = new Error("โอนเงิน");
      error.statusCode = 400;
      throw error;
    }

    if (`${spsms[4]}${spsms[5]}` === smsTranfer) {
      const error = new Error("โอนเงิน");
      error.statusCode = 400;
      throw error;
    }

    if (spsms[0] === smsOtp) {
      const error = new Error("โอนเงิน");
      error.statusCode = 400;
      throw error;
    }

    if (spsms[0] === smsOtp2) {
      const error = new Error("ยอดเงินใช้ได้");
      error.statusCode = 400;
      throw error;
    }

    /////////////////////////////////

    if (indexOfend !== -1) {
      const error = new Error("ถอน");
      error.statusCode = 400;
      throw error;
    }

    if (indexOf !== -1) {
      amount = spsms[3];
      bank_tranfer = "bk";
      bank_number = "";
      let spsms1 = spsms[6].split(",");
      let sdate = spsms1[0].split("/");
      bank_date = sdate[0].substring(1, 3) + "/" + sdate[1];
      bank_time = spsms1[1].substring(0, 5);
    } else {
      let spsms1 = spsms[0].split("@");

      bank_date = spsms1[0];
      bank_time = spsms1[1];
      amount = spsms[1];

      const searchTerm = "จาก";
      const indexOfFirst = spsms[2].indexOf(searchTerm);
      if (indexOfFirst != -1) {
        let smssup = spsms[2].substring(3, 15);
        let spsms2 = smssup.split("/");
        let accBank = spsms2[1].split("x");
        bank_tranfer = spsms2[0];
        bank_number = accBank[1];

        let bank;

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

        const memberAccountBank = await models.Member_Account_Bank.findOne({
          attributes: ["member_uuid"],
          where: {
            bank_number: {
              [Op.like]: `%${bank_number}%`,
            }
          },
        });


        if (memberAccountBank !== null) {

          const existSms = await models.Sms_Transaction.findOne({
            where: {
              bank_date: bank_date,
              bank_time: bank_time,
              amount: amount,
              bank_tranfer: bank_tranfer,
              sms_content: sms,
            }
          });

          if (existSms) {
            const error = new Error("SMS  Repeat !!!!");
            error.statusCode = 400;
            throw error;
          }

          const smsTransaction = await models.Sms_Transaction.create({
            uuid: uuidv4(),
            phone_number: phoneNumber,
            bank_date: bank_date,
            bank_time: bank_time,
            amount: amount,
            bank_tranfer: bank_tranfer,
            sms_content: sms,
            status: 1,
          });

          this.approvedSmsSCBAuto(
            amount,
            memberAccountBank.member_uuid,
            bank_date,
            bank_time,
            create_by,
            smsTransaction.uuid
          );

          res.status(201).json({
            message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
            data: smsTransaction,
          });
        } else {
          if (key === "bfz") {
            if (bank_tranfer === "") {
              bank_tranfer = "SCB";
            }

            const existSms = await models.Sms_Transaction.findOne({
              where: {
                bank_date: bank_date,
                bank_time: bank_time,
                amount: amount,
                bank_tranfer: bank_tranfer,
                sms_content: sms,
              }
            });

            if (existSms) {
              const error = new Error("SMS  Repeat !!!!");
              error.statusCode = 400;
              throw error;
            }

            const smsTransaction = await models.Sms_Transaction.create({
              uuid: uuidv4(),
              phone_number: phoneNumber,
              bank_date: bank_date,
              bank_time: bank_time,
              amount: amount,
              bank_tranfer: bank_tranfer,
              sms_content: sms,
              status: status_sms,
            });

            res.status(201).json({
              message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
              data: smsTransaction,
            });
          } else {
            const error = new Error("key invalid");
            error.statusCode = 401;
            throw error;
          }
        }
      } else {
        if (key === "bfz") {
          if (bank_tranfer === "") {
            bank_tranfer = "SCB";
          }

          const existSms = await models.Sms_Transaction.findOne({
            where: {
              bank_date: bank_date,
              bank_time: bank_time,
              amount: amount,
              bank_tranfer: bank_tranfer,
              sms_content: sms,
            }
          });

          if (existSms) {
            const error = new Error("SMS  Repeat !!!!");
            error.statusCode = 400;
            throw error;
          }

          const smsTransaction = await models.Sms_Transaction.create({
            uuid: uuidv4(),
            phone_number: phoneNumber,
            bank_date: bank_date,
            bank_time: bank_time,
            amount: amount,
            bank_tranfer: bank_tranfer,
            sms_content: sms,
            status: status_sms,
          });

          res.status(201).json({
            message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
            data: smsTransaction,
          });
        } else {
          const error = new Error("key invalid");
          error.statusCode = 401;
          throw error;
        }
      }
    }

  }
  } catch (error) {
    next(error);
  }
};

exports.getSmsListSCB = async (req, res, next) => {
  try {

    let today = moment().format("YYYY-MM-DD");
    let first_today_deposit = `${today} 00:00:00`;
    let second_today_deposit = `${today} 23:59:00`;

    const smsTransaction = await models.Sms_Transaction.findAll({
      order: [["id", "DESC"]],
      include: [
        {
          model: models.Member_Account_Bank_Transaction,
          as: "member_account_bank_transaction",
          include: [
            {
              model: models.Member_Account_Bank,
              as: "member_account_banks",
            },
          ],
        },
      ],
      where: {
        createdAt: {
          [Op.between]: [first_today_deposit, second_today_deposit],
        },
      }

    });

    res.status(200).json({
      data: smsTransaction,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSmsListSCBStatusWait = async (req, res, next) => {
  try {

    let today = moment().format("YYYY-MM-DD");
    let first_today_deposit = `${today} 00:00:00`;
    let second_today_deposit = `${today} 23:59:00`;

    const smsTransaction = await models.Sms_Transaction.findAll({
      order: [["id", "DESC"]],
      include: [
        {
          model: models.Member_Account_Bank_Transaction,
          as: "member_account_bank_transaction",
          include: [
            {
              model: models.Member_Account_Bank,
              as: "member_account_banks",
            },
          ],
        },
      ],
      where: {
        createdAt: {
          [Op.between]: [first_today_deposit, second_today_deposit],
        },
        status: 0
      }

    });

    res.status(200).json({
      data: smsTransaction,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSmsListSCBStatusSuccess = async (req, res, next) => {
  try {

    let today = moment().format("YYYY-MM-DD");
    let first_today_deposit = `${today} 00:00:00`;
    let second_today_deposit = `${today} 23:59:00`;

    const smsTransaction = await models.Sms_Transaction.findAll({
      order: [["id", "DESC"]],
      include: [
        {
          model: models.Member_Account_Bank_Transaction,
          as: "member_account_bank_transaction",
          include: [
            {
              model: models.Member_Account_Bank,
              as: "member_account_banks",
            },
          ],
        },
      ],
      where: {
        createdAt: {
          [Op.between]: [first_today_deposit, second_today_deposit],
        },
        status: 1
      }

    });

    res.status(200).json({
      data: smsTransaction,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSmsSCBByUUID = async (req, res, next) => {
  try {
    const uuid = req.params.uuid;

    const smsTransaction = await models.Sms_Transaction.findOne({
      where: {
        uuid: uuid,
      },
      attributes: ["uuid", "bank_tranfer", "bank_date", "bank_time", "amount"],
    });

    res.status(200).json({
      data: smsTransaction,
    });
  } catch (error) {
    next(error);
  }
};

exports.approvedSmsSCB = async (req, res, next) => {
  try {
    const statusApproved = 1;
    const uuid = req.params.uuid;
    let totalAmount = 0;
    let response;
    let bankMemeber;
    let bonus;
    let resp;

    const { amount, username, bank_date, bank_time, create_by } = req.body;

    let member = await models.Member.findOne({
      attributes: ["uuid", "_id", "bonus"],
      where: { sb_username: username },
    });

    if (member === null) {
      const error = new Error("ไม่พบรหัสข้อมูลนี้");
      error.statusCode = 404;
      throw error;
    }

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
    }

    const time = `${bank_date} ${bank_time}`;
    let amountConv = amount.replace(/,/g, '');
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

    const smsTransaction = await models.Sms_Transaction.update(
      {
        status: statusApproved,
      },
      {
        where: {
          uuid: uuid,
        },
      }
    );

    response = await askmebetController.deposit(totalAmount, username); // member._id

    //console.log(response)

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
        username: username,
        promotion_uuid: resp.uuid,
        sms_transaction_uuid: uuid, //
      }
    );

    const refDeposit = await this.addRefDeposit(
      username,
      account_transection.ref,
      account_transection.uuid
    );

    // check ref
    const checkRef = await models.Affiliate_Deposit.findOne({
      where: {
        member_uuid_member:  member.uuid
      },
      order: [
       ['id', 'desc']
      ],
      limit: 1
    })


    console.log("ck: ", checkRef);

    if (checkRef != null) {

          // diff date, Dew
    const date1 = new Date(checkRef.createdAt)
    const date2 = new Date()
    const diffTime = Math.abs(date2 - date1)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      // get total_turn
      let validAmount = ''
      if (diffDays < 8) { // วันที่ check ต้องน้อยกว่า 8 วัน
        const  response = await axios.post(`${urlConfig}/api/winLost`, {
          username: username,
          refId : checkRef.ref
        }, {
          headers: {
          'Content-Type': 'application/json',
          }
        }).then(response => response.data)

        validAmount = response.data.result.result.summary.validAmount // set total_turn
      } else {
        validAmount = 0
      }

      // update total_turn
      await models.Affiliate_Deposit.update({
        turnover: validAmount
      }, {
        where: {
          ref: checkRef.ref
        }
      })
    }

   // affiliate deposit
   const affiliateDeposit = await this.affiliateDeposit(username, amountConv, account_transection.ref);
   ///////////////////////
    res.status(200).json({
      message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
      smsTransaction: smsTransaction,
      account_transection: account_transection,
      refDeposit: refDeposit,
      affiliateDeposit: affiliateDeposit
    });

  } catch (error) {
    next(error);
  }
};

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

    let member = await models.Member.findOne({
      attributes: ["uuid", "_id", "bonus", "sb_username",],
      where: { uuid: member_uuid },
    });

    if (member.bonus === 1) {
      resp = await this.mapBonusPromotion(member.uuid, amount);
      console.log("rest prom1: ", resp);
      bonus = resp.bonus;
      console.log(bonus);
    } else {

      resp = await models.Promotion.findOne({
        where: {
          turnnotpro: 1,
        },
      });

      bonus = resp.max_bonus;
      console.log("rest prom2: ", resp);
      console.log(bonus);
    }

    const time = `${bank_date} ${bank_time}`;
    let amountConv = amount.replace(/,/g, '');
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



    // check ref
    const checkRef = await models.Affiliate_Deposit.findOne({
      where: {
        member_uuid_member: member.uuid
      },
      order: [
       ['id', 'desc']
      ],
      limit: 1
    })


    if (checkRef != null) {


       // diff date, Dew
    const date1 = new Date(checkRef.createdAt)
    const date2 = new Date()
    const diffTime = Math.abs(date2 - date1)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      // get total_turn
      let validAmount = ''
      if (diffDays < 8) {
        const  response = await axios.post(`${urlConfig}/api/winLost`, {
          username: username,
          refId: checkRef.ref,
        }, {
          headers: {
          'Content-Type': 'application/json',
          }
        }).then(response => response.data)

        validAmount = response.data.result.result.summary.validAmount // set total_turn
      } else {
        validAmount = 0
      }

      // update total_turn
      await models.Affiliate_Deposit.update({
        turnover: validAmount
      }, {
        where: {
          ref: checkRef.ref
        }
      })
    }

    // affiliate deposit
    const affiliateDeposit = await this.affiliateDeposit(username, amountConv, account_transection.ref);
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

exports.checkExistTransaction = async (
  bank_date,
  bank_time,
  amount,
  username
) => {
  try {
    let bank_data_time = `${bank_date} ${bank_time}`;

    const existTransaction = await models.Member_Account_Bank_Transaction.findOne(
      {
        where: {
          username: username,
          amount: amount,
          bank_time: bank_data_time,
        },
      }
    );

    if (existTransaction === null) {
      return true;
    } else {
      return false;
    }
  } catch (error) { }
};

// exports.mapBonusPromotion = async (memberUUID, amount) => {
//   try {

//     console.log(amount);

//     let bonusPromotion;
//     let today = moment().format("YYYY-MM-DD");
//     let first_today_deposit = `${today} 00:00:00`;
//     let second_today_deposit = `${today} 23:59:00`;

//     member = await models.Member.findOne({
//       where: {
//         uuid: memberUUID,
//       },
//     });


//     // check new member
//     let registerDate = moment(member.register_date).format("YYYY-MM-DD");

//     if (registerDate === today && member.new_member === "1") {

//       let checkBonus = await models.Promotion.findOne({
//         where: { promotion_type_id: 1, status: 1 },
//       });

//       if (checkBonus !== null) {

//         const member = await models.Member.update(
//           {
//             new_member: "0",
//           },
//           {
//             where: {
//               uuid: memberUUID,
//             },
//           }
//         );


//         if (checkBonus.bonus_type_id === 2) {

//           console.log(`Bonus: ${checkBonus.bonus_type_id}`);

//           bonusPromotion = await models.Promotion.findOne({
//             where: { promotion_type_id: 1, status: 1, bonus_type_id: 2 },
//             include: [
//               {
//                 model: models.Promotion_Condition,
//                 as: "promotion_conditions",
//                 where: {
//                   min_deposit: {
//                     [Op.lte]: amount,
//                   },
//                   max_deposit: {
//                     [Op.gte]: amount,
//                   },
//                 },
//               },
//             ],
//           });

//           if (bonusPromotion !== null) {

//             let precentBonus = 100 / bonusPromotion.promotion_conditions[0].max_bonus;
//             let bonusTotal = (amount / precentBonus);
//             let promotion = bonusPromotion.promotion_conditions[0].promotion_uuid;
//             let result;

//             if (bonusTotal > bonusPromotion.max_bonus) {

//               result = {
//                 "bonus": bonusPromotion.max_bonus,
//                 "uuid": promotion
//               }

//             } else {

//               result = {
//                 "bonus": bonusTotal,
//                 "uuid": promotion
//               }

//             }

//             return result;

//           } else {

//             let bonusDefault = await models.Promotion.findOne({
//               where: {
//                 turnnotpro: 1,
//               },
//             });

//             let result = {
//               "bonus": bonusDefault.max_bonus,
//               "uuid": bonusDefault.uuid
//             }

//             return result;

//           }


//         } else {

//           console.log(`Bonus: ${checkBonus.bonus_type_id}`);
//           bonusPromotion = await models.Promotion.findOne({
//             where: { promotion_type_id: 1, status: 1, bonus_type_id: 1 },
//             include: [
//               {
//                 model: models.Promotion_Condition,
//                 as: "promotion_conditions",
//                 where: {
//                   min_deposit: {
//                     [Op.lte]: amount,
//                   },
//                   max_deposit: {
//                     [Op.gte]: amount,
//                   },
//                 },
//               },
//             ],
//           });

//           if (bonusPromotion !== null) {
//             let bonusTotal = bonusPromotion.promotion_conditions[0].max_bonus;
//             let promotion = bonusPromotion.promotion_conditions[0].promotion_uuid;
//             let result = {
//               "bonus": bonusTotal,
//               "uuid": promotion
//             }

//             return result;
//           } else {

//             let bonusDefault = await models.Promotion.findOne({
//               where: {
//                 turnnotpro: 1,
//               },
//             });

//             let result = {
//               "bonus": bonusDefault.max_bonus,
//               "uuid": bonusDefault.uuid
//             }

//             return result;

//           }

//         }
//       } else {

//         let bonusDefault = await models.Promotion.findOne({
//           where: {
//             turnnotpro: 1,
//           },
//         });

//         let result = {
//           "bonus": bonusDefault.max_bonus,
//           "uuid": bonusDefault.uuid
//         }

//         return result;
//       }



//     }
//     ///////////////////////////////////////////////////////////////////////////////

//     // check รายการฝากแรกของวัน //

//     let checkBonus = await models.Promotion.findOne({
//       where: { promotion_type_id: 2, status: 1 },
//     });

//     if (checkBonus !== null) {

//       const refLatest = await models.Ref_Deposit.findAll({
//         limit: 1,
//         where: {
//           username: member.sb_username,
//           createdAt: {
//             [Op.between]: [first_today_deposit, second_today_deposit],
//           },
//         },
//       });

//       if (refLatest.length > 0) {

//         let bonusDefault = await models.Promotion.findOne({
//           where: {
//             turnnotpro: 1,
//           },
//         });

//         let result = {
//           "bonus": bonusDefault.max_bonus,
//           "uuid": bonusDefault.uuid
//         }

//         return result;

//       } else {

//         if (checkBonus.bonus_type_id === 2) {

//           bonusPromotion = await models.Promotion.findOne({
//             where: { promotion_type_id: 2, status: 1, bonus_type_id: 2 },
//             include: [
//               {
//                 model: models.Promotion_Condition,
//                 as: "promotion_conditions",
//                 where: {
//                   min_deposit: {
//                     [Op.lte]: amount,
//                   },
//                   max_deposit: {
//                     [Op.gte]: amount,
//                   },
//                 },
//               },
//             ],
//           });

//           if (bonusPromotion !== null) {

//             let precentBonus = 100 / bonusPromotion.promotion_conditions[0].max_bonus;
//             let bonusTotal = (amount / precentBonus);
//             let promotion = bonusPromotion.promotion_conditions[0].promotion_uuid;
//             let result;

//             if (bonusTotal > bonusPromotion.max_bonus) {

//               result = {
//                 "bonus": bonusPromotion.max_bonus,
//                 "uuid": promotion
//               }

//             } else {

//               result = {
//                 "bonus": bonusTotal,
//                 "uuid": promotion
//               }

//             }

//             return result;

//           } else {

//             let bonusDefault = await models.Promotion.findOne({
//               where: {
//                 turnnotpro: 1,
//               },
//             });

//             let result = {
//               "bonus": bonusDefault.max_bonus,
//               "uuid": bonusDefault.uuid
//             }

//             return result;

//           }

//         } else {

//           console.log(`Bonus: ${checkBonus.bonus_type_id}`);
//           bonusPromotion = await models.Promotion.findOne({
//             where: { promotion_type_id: 2, status: 1, bonus_type_id: 1 },
//             include: [
//               {
//                 model: models.Promotion_Condition,
//                 as: "promotion_conditions",
//                 where: {
//                   min_deposit: {
//                     [Op.lte]: amount,
//                   },
//                   max_deposit: {
//                     [Op.gte]: amount,
//                   },
//                 },
//               },
//             ],
//           });

//           if (bonusPromotion !== null) {
//             let bonusTotal = bonusPromotion.promotion_conditions[0].max_bonus;
//             let promotion = bonusPromotion.promotion_conditions[0].promotion_uuid;
//             let result = {
//               "bonus": bonusTotal,
//               "uuid": promotion
//             }

//             return result;
//           } else {

//             let bonusDefault = await models.Promotion.findOne({
//               where: {
//                 turnnotpro: 1,
//               },
//             });

//             let result = {
//               "bonus": bonusDefault.max_bonus,
//               "uuid": bonusDefault.uuid
//             }

//             return result;

//           }

//         }

//       }

//     } else {

//       let bonusDefault = await models.Promotion.findOne({
//         where: {
//           turnnotpro: 1,
//         },
//       });

//       let result = {
//         "bonus": bonusDefault.max_bonus,
//         "uuid": bonusDefault.uuid
//       }

//       return result;

//     }


//   } catch (error) {
//     console.log(error);
//   }
// };

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

        let member = await models.Member.update(
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

      let refLatest = await models.Ref_Deposit.findAll({
        limit: 1,
        where: {
          username: member.sb_username,
          createdAt: {
            [Op.between]: [first_today_deposit, second_today_deposit],
          },
        },
      });

      if (refLatest.length > 0) {


        // ฝากทั้งวัน
        let checkBonusEvery = await models.Promotion.findOne({
          where: { promotion_type_id: 3, status: 1 },
        });
        
  
        if(checkBonusEvery !== null) {
  
          if (checkBonusEvery.bonus_type_id === 2) {
  
            bonusPromotion = await models.Promotion.findOne({
              where: { promotion_type_id: 3, status: 1, bonus_type_id: 2 },
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
  
            console.log(`Bonus: ${checkBonusEvery.bonus_type_id}`);
            bonusPromotion = await models.Promotion.findOne({
              where: { promotion_type_id: 3, status: 1, bonus_type_id: 1 },
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

      let checkBonusEvery = await models.Promotion.findOne({
        where: { promotion_type_id: 3, status: 1 },
      });
      

      if(checkBonusEvery !== null) {

        if (checkBonusEvery.bonus_type_id === 2) {

          bonusPromotion = await models.Promotion.findOne({
            where: { promotion_type_id: 3, status: 1, bonus_type_id: 2 },
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

          console.log(`Bonus: ${checkBonusEvery.bonus_type_id}`);
          bonusPromotion = await models.Promotion.findOne({
            where: { promotion_type_id: 3, status: 1, bonus_type_id: 1 },
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

  
  } catch (error) {
    console.log(error);
  }
};

exports.hideSmsSCB = async (req, res, next) => {
  try {
    const status = 2;  // hide
    const uuid = req.params.uuid;

    const smsTransaction = await models.Sms_Transaction.update(
      {
        status: status,
      },
      {
        where: {
          uuid: uuid,
        },
      }
    );

    res.status(200).json({
      message: "แก้ไขข้อมูลเรียบร้อยแล้ว",
      smsTransaction: smsTransaction,
    });

  } catch (error) {
    next(error)
  }
}

exports.showSmsSCB = async (req, res, next) => {
  try {
    const status = 0;  // show
    const uuid = req.params.uuid;

    const smsTransaction = await models.Sms_Transaction.update(
      {
        status: status,
      },
      {
        where: {
          uuid: uuid,
        },
      }
    );

    res.status(200).json({
      message: "แก้ไขข้อมูลเรียบร้อยแล้ว",
      smsTransaction: smsTransaction,
    });

  } catch (error) {
    next(error)
  }
}

exports.affiliateDeposit = async (username, amount, ref) => {
  try {
    // get percent affiliate %
    const affiliateSetting = await models.Affiliate_Setting.findOne({
      where: {
        id: 1,
      },
    });

    const member = await models.Member.findOne({
      where: {
        sb_username: username,
      },
    });

    const affiliateDeposit = await models.Affiliate_Deposit.create({
      uuid: uuidv4(),
      member_uuid_member: member.uuid,
      amount: amount,
      percent_value: affiliateSetting.percent_value,
      status: 0,
      turnover: 0,
      ref: ref
    });

    return affiliateDeposit;
  } catch (error) {}
};


exports.insertKbankSms = async (req, res, next) => {
  try {
    const status_sms = 0; // status sms

    const { phoneNumber, sms } = req.body;
    const key = req.params.key;

    // regex
    const regex = new RegExp("เงินออก");
    if (regex.test(sms)) {
      const error = new Error("SMS  เงินออก !!!!");
      error.statusCode = 400;
      throw error;
    }

    //logs

    const transactions_Curls = await models.Transactions_Curl.create({
      transfer_from_bank: sms,
    });

    let trandeposits;
    let moneyamount;

    let bank_date = "";
    let bank_time = "";
    let amount = "";
    let bank_tranfer = "";
    let bonus;
    let resp;
    let bank_number = "";
    let create_by = "-";

    let spsms = sms.split(" ");

    const search = "โอนเข้า";
    const indexOf = spsms[0].indexOf(search);
    const searchend = "ถอน";
    const indexOfend = spsms[0].indexOf(searchend);

    console.log("indexOf:::", indexOf);

    const smsOtp = "โอนเงินไปบ/ช";
    const smsTranfer = "หากสงสัยโทร.027776780";
    if (spsms[0] === smsOtp) {
      const error = new Error("โอนเงิน");
      error.statusCode = 400;
      throw error;
    }

    if (`${spsms[4]}${spsms[5]}` === smsTranfer) {
      const error = new Error("โอนเงิน");
      error.statusCode = 400;
      throw error;
    }

    if (spsms[0] === smsOtp) {
      const error = new Error("โอนเงิน");
      error.statusCode = 400;
      throw error;
    }

    if (indexOfend !== -1) {
      const error = new Error("ถอน");
      error.statusCode = 400;
      throw error;
    }

    if (indexOf !== -1) {
      amount = spsms[3].replace(",", "");
      console.log("amount:", amount);
      bank_tranfer = "bk";
      let spsms1 = spsms[6].split(",");
      let sdate = spsms1[0].split("/");
      bank_date = sdate[0].substring(1, 3) + "/" + sdate[1];
      bank_time = spsms1[1].substring(0, 5);
    } else {
      const searchTermad = "@";
      const indexOfFirstad = spsms[0].indexOf(searchTermad);
      if (indexOfFirstad == -1) {
        bank_date = spsms[0].substring(0, 5);
        bank_time = spsms[1];

        let checkkbank = "รับโอนจาก";
        let ckkb = spsms[3].indexOf(checkkbank);

        if (ckkb != -1) {
          var NUMERIC = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
          bank_tranfer = spsms[3].match(NUMERIC);
          bank_tranfer = bank_tranfer[0];
          moneyamount = spsms[4].replace(",", "");

          amount = moneyamount;
        } else {
          moneyamount = spsms[3].substring(8, 30);
          moneyamount = moneyamount.replace(",", "");

          amount = moneyamount;
        }
      } else {
        let spsms1 = spsms[0].split("@");
        bank_date = spsms1[0].substring(0, 5);
        bank_time = spsms1[1];
        moneyamount = spsms[1].replace(",", "");

        amount = moneyamount;
      }

      const searchTerm = "จาก";
      const indexOfFirst = spsms[2].indexOf(searchTerm);
      if (indexOfFirst != -1) {
        let smssup = spsms[2].substring(3, 15);
        let spsms2 = smssup.split("/");
        bank_tranfer = spsms2[0];
      }
    }

    var NUMERIC_REGEXP = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
    amount = amount.match(NUMERIC_REGEXP);
    amount = amount[0];

    bank_number = bank_tranfer;

    let checkintran;

    console.log(
      "bank_date:",
      bank_date,
      "bank_time:",
      bank_time,
      "amount:",
      amount,
      "sms:",
      sms
    );

    if (key === "bfz") {
      //check decimal

      var result = amount - Math.floor(amount) !== 0;

      if (result) {
        let datetimelast = moment();
        // console.log(datetimelast2);
        // let diff = Math.abs(datetimelast2 - datetimelast);
        // var minutes = Math.floor((diff/1000)/60);
        // console.log(diff);
        let al = Math.abs(datetimelast - 240000);
        let wdate = moment(al);

        const checkintran =
          await models.Member_Account_Bank_Transaction.findOne({
            where: {
              transaction_type: 1,
              amount: amount,
              transaction_status: 0,
              createdAt: {
                [Op.between]: [
                  `${moment(wdate).format()}`,
                  `${moment(datetimelast).format()}`,
                ],
              },
            },
          });
        // console.log(":checkintran:", checkintran);
        console.log("amount::::", amount);

        if (checkintran) {
          let member = await models.Member.findOne({
            attributes: ["uuid", "_id", "bonus"],
            where: { sb_username: checkintran.username },
          });

          let bankaccountfind = await models.Member_Account_Bank.findOne({
            where: {
              member_uuid: member.uuid,
            },
          });

          //checktwo
          const checktwoexistSms = await models.Sms_Transaction.findOne({
            where: {
              bank_date: bank_date,
              bank_time: bank_time,
              amount: amount,
              bank_tranfer: {
                [Op.like]: bankaccountfind.bank_name,
              },
              // bank_tranfer: bank_tranfer,
              // sms_content: sms,
            },
          });

          if (checktwoexistSms) {
            const error = new Error("SMS  Repeat !!!!");
            error.statusCode = 400;
            throw error;
          } else {
            const smsTransaction = await models.Sms_Transaction.create({
              uuid: uuidv4(),
              phone_number: phoneNumber,
              bank_date: bank_date,
              bank_time: bank_time,
              amount: amount,
              bank_tranfer: bankaccountfind.bank_name,
              title_tranfer: "ทศนิยม",
              sms_content: sms,
              status: 1,
            });

            // แปลง int
            let amountconvert = parseInt(amount);
            await this.approvedSmsSCBAuto(
              amount,
              member.uuid,
              bank_date,
              bank_time,
              create_by,
              smsTransaction.uuid
            );

            const checkintran2 =
              await models.Member_Account_Bank_Transaction.destroy({
                where: {
                  uuid: checkintran.uuid,
                },
              });
            res.status(201).json({
              message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
              data: smsTransaction,
            });
          }
        } else {
          const existSmsde = await models.Sms_Transaction.findOne({
            where: {
              bank_date: bank_date,
              bank_time: bank_time,
              amount: amount,
              bank_tranfer: {
                [Op.like]: "kbnk",
              },
              // bank_tranfer: bank_tranfer,
              // sms_content: sms,
            },
          });

          if (existSmsde) {
            const error = new Error("SMS  Repeat !!!!");
            error.statusCode = 400;
            throw error;
          }
          const smsTransaction = await models.Sms_Transaction.create({
            uuid: uuidv4(),
            phone_number: phoneNumber,
            bank_date: bank_date,
            bank_time: bank_time,
            amount: amount,
            bank_tranfer: "kbnk",
            sms_content: sms,
            title_tranfer: "ทศนิยม",
            status: 0,
          });

          const error = new Error("no money user");
          error.statusCode = 400;
          throw error;
        }
      } else {
        //endde

        if (bank_number) {
          const memberAccountBank = await models.Member_Account_Bank.findOne({
            attributes: ["member_uuid", "bank_name"],
            where: {
              bank_number: {
                [Op.like]: `%${bank_number}%`,
              },
            },
          });

          if (memberAccountBank !== null) {
            const existSms = await models.Sms_Transaction.findOne({
              where: {
                bank_date: bank_date,
                bank_time: bank_time,
                amount: amount,
                bank_tranfer: {
                  [Op.like]: memberAccountBank.bank_name,
                },
                // bank_tranfer: bank_tranfer,
                // sms_content: sms,
              },
            });

            if (existSms) {
              const error = new Error("SMS  Repeat !!!!");
              error.statusCode = 400;
              throw error;
            }

            const smsTransaction = await models.Sms_Transaction.create({
              uuid: uuidv4(),
              phone_number: phoneNumber,
              bank_date: bank_date,
              bank_time: bank_time,
              amount: amount,
              bank_tranfer: memberAccountBank.bank_name,
              sms_content: sms,
              status: 1,
            });

            // แปลง int
            let amountconvert = parseInt(amount);
            this.approvedSmsSCBAuto(
              amount,
              memberAccountBank.member_uuid,
              bank_date,
              bank_time,
              create_by,
              smsTransaction.uuid
            );

            res.status(201).json({
              message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
              data: smsTransaction,
            });
          } else {
            bank_tranfer = "kbnk";

            const existSms = await models.Sms_Transaction.findOne({
              where: {
                bank_date: bank_date,
                bank_time: bank_time,
                amount: amount,
                bank_tranfer: {
                  [Op.like]: bank_tranfer,
                },
                // bank_tranfer: bank_tranfer,
                // sms_content: sms,
              },
            });

            if (existSms) {
              const error = new Error("SMS  Repeat !!!!");
              error.statusCode = 400;
              throw error;
            }

            const smsTransaction = await models.Sms_Transaction.create({
              uuid: uuidv4(),
              phone_number: phoneNumber,
              bank_date: bank_date,
              bank_time: bank_time,
              amount: amount,
              bank_tranfer: bank_tranfer,
              sms_content: sms,
              status: status_sms,
            });

            res.status(201).json({
              message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
              data: smsTransaction,
            });
          }
        } else {
          console.log("not banknumber");

          bank_tranfer = "kbnk";

          const existSms = await models.Sms_Transaction.findOne({
            where: {
              bank_date: bank_date,
              bank_time: bank_time,
              amount: amount,
              bank_tranfer: {
                [Op.like]: bank_tranfer,
              },
              // bank_tranfer: bank_tranfer,
              // sms_content: sms,
            },
          });

          if (existSms) {
            const error = new Error("SMS  Repeat !!!!");
            error.statusCode = 400;
            throw error;
          }

          const smsTransaction = await models.Sms_Transaction.create({
            uuid: uuidv4(),
            phone_number: phoneNumber,
            bank_date: bank_date,
            bank_time: bank_time,
            amount: amount,
            bank_tranfer: bank_tranfer,
            sms_content: sms,
            status: status_sms,
          });

          res.status(201).json({
            message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
            data: smsTransaction,
          });
        }
      }
    } else {
      const error = new Error("key invalid");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};


setInterval(bankdepositController.setInterv, 60000);



