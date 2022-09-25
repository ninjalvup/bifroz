
const md5 = require('md5');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const models = require('../models/index');
const { validationResult } = require('express-validator');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const config_env = require('../config/index');
const e = require('express');
const error_list_turnover = require('../models/error_list_turnover');
const main_bank = require('../models/main_bank');
const moment = require('moment');
const tbs  = require('../services/tbsService.js')
const TBS_REQUEST_OTP='https://otp.thaibulksms.com/v2/otp/request'
const TBS_VERIFY_OTP='https://otp.thaibulksms.com/v2/otp/verify'
const key = config_env.KEY;
const agent = config_env.AGENT;
const hash = config_env.HASH;


const urlConfig = config_env.URL_CONFIG;


exports.createUser = async (tel, password, first_name, last_name) => {

  try {

    console.log("=createUser=", `${urlConfig}/api/register`);
    const contact = `${first_name} ${last_name}`;
    // const hashText = md5(`${tel}:${password}:${agent}`);

    const response = await axios.post(`${urlConfig}/api/register`, {
      tel: tel,
      password: password,
      contact: contact,

    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response;

  } catch (error) {
    return error
  }

}

exports.resetPassword = async (username, password) => {

  try {

    const response = await axios.post(`${urlConfig}/api/reset-password`, {
      username: username,
      newPassword: password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log("response:", response);

    return response;

  } catch (error) {
    return error
  }

}

exports.withdrawcredit = async (amount, username) => {
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

exports.winlose = async (dateTimeFrom, dateTiemTo, username) => {
  try {

    const date = new Date();
    const today = moment(date).format("YYYY-MM-DD");

    const resp = await axios({
      method: "post",
      url: `${urlConfig}/api/winlost`,
      data: {
        dateTimeFrom: today,
        dateTimeTo: today,
        username: username,
      }
    });

    return resp;

  } catch (error) {

  }
};


exports.getCredit = async (req, res, next) => {
  try {


    const member = await models.Member.findOne({
      attributes: { exclude: ['password'] },
      where: {
        uuid: req.user.uuid,
      },
    });

    const sb_username = member.sb_username;

    const response = await axios.get(`${urlConfig}/api/credit/${sb_username}`);


    res.status(200).json({
      data: {
        credit: response.data.current_credit[0].balance
      }
    });


  } catch (error) {

  }
};


exports.creditget = async (sb_username) => {
  try {

    const response = await axios.get(`${urlConfig}/api/credit/${sb_username}`);


    return response.data.current_credit[0].balance;


  } catch (error) {
    next(error);

  }
}

// new path
exports.launchGame = async (username, password) => {
  try {

    const response = await axios.post(`${urlConfig}/api/launch`, {
      username: username,
      password: password
    });

    console.log(response);

    return response.data

  } catch (error) {
    next(error);

  }
}

exports.getmemberone = async (sb_username) => {
  try {

    console.log(sb_username);
    const member = await models.Member.findOne({
      attributes: { exclude: ['password'] },
      where: {
        sb_username: sb_username,
      },
    });



    return member;


  } catch (error) {
    next(error);

  }
}

exports.getreflatest = async (sb_username) => {
  try {
    const reflast = await models.Ref_deposits.findAll({
      limit: 1,
      where: {
        username: sb_username,
        status: 0
      },
      order: [["createdAt", "DESC"]],
    });



    return reflast;


  } catch (error) {
    next(error);

  }
}

exports.getref = async (sb_username) => {
  try {

    const reflast = await models.Ref_deposits.findOne({
      where: {
        username: sb_username,
        status: 0
      },
      order: [["createdAt", "DESC"]],

    });


    return reflast;


  } catch (error) {
    next(error);

  }
}


// exports.withdraw = async (req, res, next) => {

//   try {

//     const { amount } = req.body;
//     //validation
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
//       error.statusCode = 422;
//       error.validation = errors.array();
//       throw error;
//     }

//     const username = req.user.sb_username;

//     const combine = await models.Combine.findOne();
//     const creditba = await this.creditget(username);

//     let bank_time = moment().locale("th").format("YYYY-MM-DD HH:mm:ss");

//     if (combine.status_auto === 1) {

//       if (creditba <= combine.dataValues.credit_min) {
//         const error = new Error(`จำนวนเครดิตขั้นต่ำที่สามารถถอนได้ ${combine.dataValues.credit_min} `);
//         error.statusCode = 422;
//         error.validation = errors.array();
//         throw error;
//       }

//       if (amount >= combine.dataValues.credit_max) {

//         const error = new Error(`จำนวนเงินมากที่สุดที่จะไม่ทำการอณุมัติออโต้ ${combine.dataValues.credit_max}`);
//         error.statusCode = 422;
//         error.validation = errors.array();
//         throw error;

//       }
//     }


//     let datetimelast = moment();
//     let datecurrent = moment(datetimelast).format('YYYY-MM-DD');

//     const countwithdraw = await models.Member_account_bank_transaction.findAndCountAll({
//       where: {

//         username: username,
//         transaction_type: 2,
//         createdAt: {
//           [Op.between]: [`${datecurrent}T11:00:00.000Z`, `${datecurrent}T23:59:00.000Z`],
//         }


//       }
//     })



//     if (combine.status_amount === 1) {
//       if (countwithdraw.count > combine.amount) {
//         const error = new Error(`จำกัดจำนวนครั้งต่อวัน ${combine.amount}`);
//         error.statusCode = 422;
//         error.validation = errors.array();
//         throw error;
//       }
//     }

//     let check_withdraw;

//     const creditwithdraw = await this.withdrawcredit(amount, req.user.sb_username);

//     const member_account_bank = await models.Member_account_bank.findOne({
//         where: {
//           member_uuid: req.user.uuid
//         },
//     });

//       const membertran = await models.Member_account_bank_transaction.create({
//         uuid: uuidv4(),
//         amount: amount,
//         credit_before: creditwithdraw.data.result[0].beforeBalance,
//         credit_after: creditwithdraw.data.result[0].afterBalance,
//         ref: creditwithdraw.data.result[0].ref,
//         bank: member_account_bank.uuid,
//         transaction_status: "Approve",
//         transaction_type: '2', //ผากหรือถอน
//         username: req.user.sb_username,
//         bank_time: bank_time
//       });

//       check_withdraw = "รออนุมัติ";
//       console.log("ok");



//     return res.status(200).json({
//         data: check_withdraw
//     });

//   } catch (error) {
//     next(error);

//   }

// }

exports.withdraw = async (req, res, next) => {
  try {
    const { amount } = req.body;
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    const username = req.user.sb_username;
    let winLost, depositAll, error_listone;

    const combine = await models.Combine.findOne();
    const creditba = await this.creditget(username);

    if (combine.status_auto === 1) {
      if (creditba <= combine.dataValues.credit_min) {
        const error = new Error(
          `จำนวนเครดิตขั้นต่ำที่สามารถถอนได้ ${combine.dataValues.credit_min} `
        );
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
      }

      if (amount >= combine.dataValues.credit_max) {
        const error = new Error(
          `จำนวนเงินมากที่สุดที่จะไม่ทำการอณุมัติออโต้ ${combine.dataValues.credit_max}`
        );
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
      }
    }

    let datetimelast = moment();
    let datecurrent = moment(datetimelast).format("YYYY-MM-DD");

    const countwithdraw =
      await models.Member_account_bank_transaction.findAndCountAll({
        where: {
          username: username,
          transaction_type: 2,
          createdAt: {
            [Op.between]: [
              `${datecurrent}T11:00:00.000Z`,
              `${datecurrent}T23:59:00.000Z`,
            ],
          },
        },
      });

    console.log("1111");

    if (combine.status_amount === 1) {
      if (countwithdraw.count > combine.amount) {
        const error = new Error(`จำกัดจำนวนครั้งต่อวัน ${combine.amount}`);
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
      }
    }

    console.log("222");
    const refall = await models.Ref_deposits.findAll({
      where: {
        username: username,
        status: 0,
      },
    });

    console.log("33333");

    const ref = await this.getref(username);
    console.log("4444");
    // let datetime = moment(ref.createdAt).format('YYYY-MM-DD HH:mm:ss');
    let timelast = moment().add(543);
    let todaydate = moment().locale("th").format("YYYY-MM-DD");
    let todaytime = moment().locale("th").format("23:59:59");
    console.log("55555");
    let t = "T";
    let z = ".000Z";

    let start_datef =
      moment(ref.createdAt).subtract(1, "days").format("YYYY-MM-DD") +
      t +
      "00:00:00" +
      z;
    let start_datelast = todaydate + t + todaytime + z;
    console.log("66666");

    console.log(start_datef);
    console.log("ref.createdAt:", start_datef);
    console.log("datetimelast:", start_datelast);

    const winLostsum = await this.winlose(
      start_datef,
      start_datelast,
      username,
    );
    console.log(winLostsum.data);

    console.log("77777");
    console.log("======");
    console.log(
      "winlost2:",
      winLostsum.data.data.result.result.summary.validAmount
    );
    console.log("credit:", creditba);
    console.log("====================================1");

    let moneysumcheck = 0;
    let checkamount = 0;
    let checkmax_withdraw = 0;
    let sum_withdraw = 0;
    let check_turn = 0;
    console.log("====================================");
    console.log("refall:", refall);
    console.log("====================================");
    //checksumm
    for (i = 0; i < refall.length; i++) {
      error_listone = await this.getError_turnover(refall[i].uuid);
      depositAll = await getDepositAll(refall[i].username, refall[i].ref);

      if (error_listone == null) {
        deAll = depositAll.depositall;
        promo = depositAll.promotion;

        if (promo.turn_type == 1) {
          checkamount = (deAll.bonus_credit + deAll.amount) * promo.turn_win;
          check_turn = 1;
          console.log("checkamount turnwin", checkamount);
        } else {
          checkamount = (deAll.bonus_credit + deAll.amount) * promo.turn_over;
          check_turn = 2;
          console.log("checkamount turnover", checkamount);
        }

        checkmax_withdraw =
          (deAll.bonus_credit + deAll.amount) * promo.max_withdraw;
      } else {
        deAll = depositAll.depositall;

        if (error_listone.turn_type == 1) {
          checkamount = deAll.amount * error_listone.turn_win;
          check_turn = 1;
          console.log("checkamount turnwinpro", checkamount);
        } else {
          checkamount = deAll.amount * error_listone.turn_over;
          check_turn = 2;
          console.log("checkamount turnoverprp", checkamount);
        }

        checkmax_withdraw = deAll.amount * error_listone.max_withdraw;
      }

      moneysumcheck = checkamount;
      sum_withdraw = checkmax_withdraw;
    }

    let check_withdraw;
    console.log(
      "winlost:",
      winLostsum.data.data.result.result.summary.validAmount
    );
    let bank_time = moment().locale("th").format("YYYY-MM-DD HH:mm:ss");

    console.log("sumturn:", moneysumcheck);
    console.log("bank_time:", bank_time);
    console.log("====================================");
    console.log("check_turn:", check_turn);
    console.log("====================================");

    if (check_turn == 1) {
      console.log("moneysumcheck", moneysumcheck);
      console.log("credit:", creditba);
      if (creditba >= moneysumcheck) {
        if (amount > sum_withdraw) {
          check_withdraw = "ถอนเกินจำนวนเงินที่กำหนดไว้";
        } else {
          await models.Ref_deposits.update(
            {
              status: 1,
            },
            {
              where: {
                username: req.user.sb_username,
              },
            }
          );

          const creditwithdraw = await this.withdrawcredit(
            amount,
            req.user.sb_username
          );

          const member_account_bank = await models.Member_account_bank.findOne({
            where: {
              member_uuid: req.user.uuid,
            },
          });

          await models.Member_account_bank_transaction.create({
            uuid: uuidv4(),
            amount: amount,
            credit_before: creditwithdraw.data.result[0].beforeBalance,
            credit_after: creditwithdraw.data.result[0].afterBalance,
            ref: creditwithdraw.data.result[0].ref,
            bank: member_account_bank.uuid,
            transaction_status: "Approve",
            transaction_type: "2", //ผากหรือถอน
            username: req.user.sb_username,
            bank_time: bank_time,
          });

          check_withdraw = "รออนุมัติ";
          console.log("ok");
        }
      } else {
        check_withdraw = "turn_win ยังไม่ถึง";
        console.log("not");
      }
    } else {
      console.log(
        "validAmount:",
        winLostsum.data.data.result.result.summary.validAmount
      );
      console.log("moneysumcheck:", moneysumcheck);
      if (
        winLostsum.data.data.result.result.summary.validAmount >= moneysumcheck
      ) {
        console.log("=========123");

        if (amount > sum_withdraw) {
          check_withdraw = "ถอนเกินจำนวนเงินที่กำหนดไว้";
        } else {
          console.log("=========123555555");
          await models.Ref_deposits.update(
            {
              status: 1,
            },
            {
              where: {
                username: req.user.sb_username,
              },
            }
          );

          const creditwithdraw = await this.withdrawcredit(
            amount,
            req.user.sb_username
          );

          const member_account_bank = await models.Member_account_bank.findOne({
            where: {
              member_uuid: req.user.uuid,
            },
          });

          await models.Member_account_bank_transaction.create({
            uuid: uuidv4(),
            amount: amount,
            credit_before: creditwithdraw.data.result[0].beforeBalance,
            credit_after: creditwithdraw.data.result[0].afterBalance,
            ref: creditwithdraw.data.result[0].ref,
            bank: member_account_bank.uuid,
            transaction_status: "Approve",
            transaction_type: "2", //ผากหรือถอน
            username: req.user.sb_username,
            bank_time: bank_time,
          });

          check_withdraw = "รออนุมัติ";
          console.log("ok");
        }
      } else {
        check_withdraw = "turn_over ยังไม่ถึง";
        console.log("not");
      }
    }

    return res.status(200).json({
      data: check_withdraw,
    });
  } catch (error) {
    next(error);
  }
};

async function getDepositAll(username, ref) {
  try {
    const getDepositAll = await models.Member_account_bank_transaction.findOne({
      attributes: ["id", "uuid", "amount", "bonus_credit", "credit_before", "credit_after", "bank_time", "annotation", "ref", "promotion_uuid"],
      where: {
        username: username,
        transaction_type: 1,
        ref: ref
      }
    });

    const promotion = await models.Promotions.findOne({
      where: {
        uuid: getDepositAll.promotion_uuid
      }
    })


    return {
      depositall: getDepositAll,
      promotion: promotion
    };

  } catch (error) {
    throw error;
  }
}

exports.getError_turnover = async (uuidref) => {
  try {

    const error_list = await models.Error_List_TurnOver.findOne(
      {
        where: {
          ref_deposit_uuid: uuidref
        }
      }
    );


    return error_list;

  } catch (error) {
    throw error;
  }
}




exports.getDepositLatest = async (username) => {
  try {
    const depositLatest = await models.Member_account_bank_transaction.findAll({
      attributes: ["id", "uuid", "amount", "bonus_credit", "credit_before", "credit_after", "bank_time", "annotation", "ref"],
      limit: 20,
      where: {
        username: username,
        transaction_type: 1,
      },
      order: [["createdAt", "DESC"]],
    });

    return depositLatest;

  } catch (error) {
    throw error;
  }
}


exports.getDepositLatestOne = async (username) => {
  try {
    const depositLatestOne = await models.Member_account_bank_transaction.findOne({
      attributes: ["id", "uuid", "amount", "bonus_credit", "credit_before", "credit_after", "bank_time", "annotation", "ref", "promotion_uuid"],
      limit: 1,
      where: {
        username: username,
        transaction_type: 1,
      },
      order: [["createdAt", "DESC"]],
    });

    const promotion = await models.Promotions.findOne({
      where: {
        uuid: depositLatestOne.promotion_uuid
      }
    })


    return {
      deposit_last: depositLatestOne,
      promotion: promotion
    };

  } catch (error) {
    throw error;
  }
}






async function deposit(amount, username) {
  try {

    const user = await models.Member.findOne({
      where: {
        sb_username: username
      }
    });


    const response = await axios.post(`${urlConfig}/api/add-deposit`, {
      amount: amount,
      username: username
    }
      , {
        headers: {
          'Content-Type': 'application/json',
        }
      });

    return response;

  } catch (error) {
    next(error);
  }
}


//qrcode
exports.qrdeposit = async (req, res, next) => {
  try {

    const { amount, promotion_uuid, annotation } = req.body;

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    let anno = " ";
    let maxbonus = " ";

    let turnnotpro = 1;
    let promotion;


    if (annotation) {
      anno = annotation;
      promotion = await models.Promotions.findOne({
        where: {
          uuid: promotion_uuid
        },
      });

      maxbonus = promotion.max_bonus;
    } else {

      anno = "ไม่รับโปรโมชั่น";
      promotion = await models.Promotions.findOne({
        where: {
          turnnotpro: turnnotpro
        },
      });
      maxbonus = 0;
    }

    const member_account_bank = await models.Member_account_bank.findOne({
      where: {
        member_uuid: req.user.uuid
      },
    });


    const trandeposit = await models.Member_account_bank_transaction.create({
      uuid: uuidv4(),
      bank: member_account_bank.uuid,
      amount: amount,
      bonus_credit: maxbonus,
      transaction_type: '1', //ฝากหรือถอน
      annotation: anno,
      transaction_status: '0',
      username: req.user.sb_username,
      promotion_uuid: promotion.uuid,
    });

    const bank = await models.Main_Bank.findOne(
      {
        where: {
          bank_name: 'promptpay'
        },
      }
    );
    const payment = bank.bank_number;

    const qrcode = `https://promptpay.io/${payment}/${amount}.png`;

    res.status(200).json({
      data: {
        qrcode: qrcode,
        bank: bank
      }
    });

  } catch (error) {

    next(error);

  }
}



//update amount account
exports.amountaccount = async (accountnumber, amounttotal, amountbalance) => {
  try {

    const bank_number = accountnumber.substring(4, 20);
    let mamount = parseFloat(amounttotal);
    let mamountb = parseFloat(amountbalance);


    const Main_Bank = await models.Main_Bank.findOne({
      where: {
        bank_number: {
          [Op.like]: '%' + bank_number + '%'
        }
      }
    });



    if (Main_Bank != null) {

      // update
      const trandeposit = await models.Main_Bank.update({
        amount: mamountb
      }, {
        where: {
          uuid: Main_Bank.uuid
        }
      });
      return trandeposit;
    } else {
      console.log("test");
      return "null";
    }


  } catch (error) {

    next(error);

  }
}


//checksms
exports.checksmstransaction = async (date, time, amount, bank_account_number, first_name, last_name) => {
  try {

    const datesub = date.substring(0, 5);
    const timesub = time.substring(0, 5);
    const datecheck = datesub + ' ' + timesub;
    const amountcheck = parseFloat(amount);
    const bank_account_num = bank_account_number.substring(1, 20);



    console.log(first_name);
    let account;
    if (first_name) {
      account = await findProfileScbBank(first_name, last_name, bank_account_number);
      console.log("test1");
      if (account == null) {
        const bknumber = await models.Member_account_bank.findOne({
          where: {
            bank_number: {
              [Op.like]: '%' + bank_account_num + '%'
            }
          }
        });

        account = bknumber;

      }

    } else {

      account = await findProfileOtherBank(bank_account_number);
    }




    if (account) {
      console.log("ok");

      const member = await models.Member.findOne({
        attributes: { exclude: ['password'] },
        where: {
          uuid: account.member_uuid,
        },
      });

      console.log(member);


      const tranLatest = await models.Member_account_bank_transaction.findOne({
        where: {
          amount: amountcheck,
          bank_time: datecheck,
          username: member.sb_username
        }
      });
      console.log(tranLatest);

      if (tranLatest != null) {

        return 'already';
      }

      console.log(member.sb_username);
      console.log('acount');
      return 'not';

    } else {
      console.log('notacount');
      return 'not';
    }


  } catch (error) {

    next(error);

  }
}


//transaction curl
exports.curltransactions = async (title, date, time, amount, transfer_from_bank, bank_account_number, first_name, last_name, accountnumber, amounttotal, amountbalance) => {
  try {


    const uuidtarnscurl = uuidv4();
    const trancurl = await models.Transactions_Curl.create({
      uuid: uuidtarnscurl,
      title: title,
      date: date,
      time: time,
      amount: amount,
      transfer_from_bank: transfer_from_bank,
      bank_account_number: bank_account_number,
      first_name: first_name,
      last_name: last_name,
      accountnumber: accountnumber,
      amounttotal: amounttotal,
      amountbalance: amountbalance,
      status: 1
    });

    return trancurl;


  } catch (error) {

    next(error);

  }
}

//transaction curln
exports.curltransactionsnot = async (title, date, time, amount, transfer_from_bank, bank_account_number, first_name, last_name, accountnumber, amounttotal, amountbalance) => {
  try {


    const uuidtarnscurl = uuidv4();
    const trancurl = await models.Transactions_Curl.create({
      uuid: uuidtarnscurl,
      title: title,
      date: date,
      time: time,
      amount: amount,
      transfer_from_bank: transfer_from_bank,
      bank_account_number: bank_account_number,
      first_name: first_name,
      last_name: last_name,
      accountnumber: accountnumber,
      amounttotal: amounttotal,
      amountbalance: amountbalance,
      status: 0
    });

    return trancurl;


  } catch (error) {

    next(error);

  }
}



exports.autocurl = async (req, res, next) => {
  try {



    const { hash_key, title, date, time, amount, transfer_from_bank, bank_account_number, first_name, last_name, accountnumber, amounttotal, amountbalance } = req.body;

    console.log(title);
    const datesub = date.substring(0, 5);
    const timesub = time.substring(0, 5);
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง1');
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    console.log(datesub, timesub);


    if (hash_key) {
      const hash = hash_key;
      if (md5(hash) === '637e35acf4b87f919b859c6ff33bcd19') {

        console.log("bank_account_number :", bank_account_number);
        if (bank_account_number == " " || bank_account_number == "") {

          const curltransaction = await this.curltransactionsnot(title, date, time, amount, transfer_from_bank, bank_account_number, first_name, last_name, accountnumber, amounttotal, amountbalance);

          if (amountbalance) {

            //updateaccount
            console.log('amounttotal');
            const accountamount = await this.amountaccount(accountnumber, amounttotal, amountbalance);
          }

          const error = new Error('success not account');
          error.statusCode = 422;
          error.validation = errors.array();
          throw error;


        }



        const checksms = await this.checksmstransaction(date, time, amount, bank_account_number, first_name, last_name);

        // console.log(checksms);

        //already sms
        if (checksms == 'already') {

          // insert transactions_curl
          const curltransaction = await this.curltransactions(title, date, time, amount, transfer_from_bank, bank_account_number, first_name, last_name, accountnumber, amounttotal, amountbalance);

          if (amountbalance) {

            //updateaccount
            console.log('amounttotal');
            const accountamount = await this.amountaccount(accountnumber, amounttotal, amountbalance);
          }
          const error = new Error('already');
          error.statusCode = 422;
          error.validation = errors.array();
          throw error;
        }

        if (amountbalance) {

          //updateaccount
          console.log('amounttotal');
          const accountamount = await this.amountaccount(accountnumber, amounttotal, amountbalance);
        }





        if (first_name != " " && last_name != " " && transfer_from_bank === "SCB") {
          const account = await findProfileScbBank(first_name, last_name, bank_account_number);


          if (account != null) {


            const member = await models.Member.findOne({
              attributes: { exclude: ['password'] },
              where: {
                uuid: account.member_uuid,
              },
            });

            const tranLatest = await models.Member_account_bank_transaction.findAll({
              limit: 1,
              where: {

                amount: amount,
                transaction_type: '1',
                transaction_status: '0',
                username: member.sb_username


              },
              order: [["createdAt", "DESC"]],
            });

            //โอนผ่านบัญชี
            if (tranLatest.length === 0) {

              //ไม่รับโปรโมชั่น
              if (member.bonus === 0) {
                const Promotionnot = await models.Promotions.findOne({
                  where: {
                    turnnotpro: 1
                  }
                });
                let mamount = parseFloat(Promotionnot.max_bonus) + parseFloat(amount);
                const response = await deposit(mamount, member.sb_username);

                console.log(response.data);

                let before = response.data.result[0].beforeBalance;
                let resamount = response.data.result[0].amount;
                let after = response.data.result[0].afterBalance;
                let ref = response.data.result[0].ref;

                if (resamount == null) {
                  const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง2');
                  error.statusCode = 422;
                  error.validation = errors.array();
                  throw error;
                }

                const uuidtarns = uuidv4();
                const trandeposit = await models.Member_account_bank_transaction.create({
                  uuid: uuidtarns,
                  bank: account.uuid,
                  amount: amount,
                  bonus_credit: Promotionnot.max_bonus,
                  transaction_type: '1', //ฝากหรือถอน
                  annotation: Promotionnot.promotion_name,
                  credit_before: before,
                  credit_after: after,
                  bank_time: datesub + ' ' + timesub,
                  create_by: 'auto',
                  ref: ref,
                  username: member.sb_username,
                  promotion_uuid: Promotionnot.uuid,
                  transaction_status: '1'

                });

                // insert transactions_curl
                const curltransaction = await this.curltransactions(title, date, time, amount, transfer_from_bank, bank_account_number, first_name, last_name, accountnumber, amounttotal, amountbalance);

                const refdepost = await models.Ref_deposits.create({
                  uuid: uuidv4(),
                  username: member.sb_username,
                  ref: ref,
                  acc_bank_transaction_uuid: uuidtarns,
                  status: 0

                });



                res.status(200).json({
                  data: {
                    message: "success",
                    member: trandeposit
                  }
                });

              } else {

                //รับโปรโมชั่น
                let Promotion;
                Promotion = await models.Promotions.findOne({
                  where: {
                    min_deposit: {
                      [Op.lte]: amount
                    },
                    max_deposit: {
                      [Op.gte]: amount
                    }
                  }
                });

                if (Promotion == null) {
                  Promotion = await models.Promotions.findOne({
                    where: {
                      turnnotpro: 1
                    }
                  });
                }

                let mamount = parseFloat(Promotion.max_bonus) + parseFloat(amount);
                const response = await deposit(mamount, member.sb_username);

                let before = response.data.result[0].beforeBalance;
                let resamount = response.data.result[0].amount;
                let after = response.data.result[0].afterBalance;
                let ref = response.data.result[0].ref;

                if (resamount == null) {
                  const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง3');
                  error.statusCode = 422;
                  error.validation = errors.array();
                  throw error;
                }

                const uuidtarn = uuidv4();
                const trandeposit = await models.Member_account_bank_transaction.create({
                  uuid: uuidtarn,
                  bank: account.uuid,
                  amount: amount,
                  bonus_credit: Promotion.max_bonus,
                  transaction_type: '1', //ฝากหรือถอน
                  annotation: Promotion.promotion_name,
                  credit_before: before,
                  credit_after: after,
                  bank_time: datesub + ' ' + timesub,
                  create_by: 'auto',
                  ref: ref,
                  username: member.sb_username,
                  promotion_uuid: Promotion.uuid,
                  transaction_status: '1'

                });

                // insert transactions_curl
                const curltransaction = await this.curltransactions(title, date, time, amount, transfer_from_bank, bank_account_number, first_name, last_name, accountnumber, amounttotal, amountbalance);

                const refdepostpro = await models.Ref_deposits.create({
                  uuid: uuidv4(),
                  username: member.sb_username,
                  ref: ref,
                  acc_bank_transaction_uuid: uuidtarn,
                  status: 0

                });


                res.status(200).json({
                  data: {
                    message: "success",
                    member: trandeposit
                  }
                });

              }



            } else {

              //โอนผ่าน promptpay

              // if (tranLatest.length === 0) {
              //   const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
              //   error.statusCode = 422;
              //   error.validation = errors.array();
              //   throw error;
              // }
              //ไม่รับโปรโมชั่น
              let promotion;
              if (member.bonus === 0) {


                promotion = await models.Promotions.findOne({
                  where: {
                    turnnotpro: 1
                  }
                });

              } else {

                promotion = await models.Promotions.findOne({
                  where: {
                    uuid: tranLatest[0].promotion_uuid
                  }
                });

              }


              let mamount = parseFloat(promotion.max_bonus) + parseFloat(amount);


              // console.log('deposit');
              const response = await deposit(mamount, member.sb_username);
              console.log(response.data);

              let before = response.data.result[0].beforeBalance;
              let resamount = response.data.result[0].amount;
              let after = response.data.result[0].afterBalance;
              let ref = response.data.result[0].ref;

              if (resamount == null) {
                const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
                error.statusCode = 422;
                error.validation = errors.array();
                throw error;
              }

              // update
              const trandeposit = await models.Member_account_bank_transaction.update({
                credit_before: before,
                credit_after: after,
                bank_time: datesub + ' ' + timesub,
                create_by: 'auto',
                ref: ref,
                transaction_status: '1',
                annotation: promotion.promotion_name,
                promotion_uuid: promotion.uuid,

              }, {
                where: {
                  uuid: tranLatest[0].uuid
                }
              });

              // insert transactions_curl
              const curltransaction = await this.curltransactions(title, date, time, amount, transfer_from_bank, bank_account_number, first_name, last_name, accountnumber, amounttotal, amountbalance);

              const refdepostprom = await models.Ref_deposits.create({
                uuid: uuidv4(),
                username: member.sb_username,
                ref: ref,
                acc_bank_transaction_uuid: tranLatest[0].uuid,
                status: 0

              });

              res.status(200).json({
                data: {
                  message: "success",
                  member: tranLatest
                }
              });

            }


          } else {

            // insert transactions_curl
            const curltransaction = await this.curltransactionsnot(title, date, time, amount, transfer_from_bank, bank_account_number, first_name, last_name, accountnumber, amounttotal, amountbalance);

            res.status(400).json({
              data: {

                success: false,
                message: 'username invalid'
              }
            });
          }

        } else if (bank_account_number != " ") {

          const account = await findProfileOtherBank(bank_account_number);


          if (account == null) {

            // insert transactions_curl
            const curltransaction = await this.curltransactionsnot(title, date, time, amount, transfer_from_bank, bank_account_number, first_name, last_name, accountnumber, amounttotal, amountbalance);

            const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
            error.statusCode = 422;
            error.validation = errors.array();
            throw error;
          }

          const member = await models.Member.findOne({
            attributes: { exclude: ['password'] },
            where: {
              uuid: account.member_uuid,
            },
          });

          const tranLatest = await models.Member_account_bank_transaction.findAll({
            limit: 1,
            where: {
              amount: amount,
              transaction_type: '1',
              transaction_status: '0',
              username: member.sb_username


            },
            order: [["createdAt", "DESC"]],
          });


          console.log(tranLatest.length);
          //โอนผ่านบัญชี
          if (tranLatest.length === 0) {
            //ไม่รับโปรโมชั่น
            if (member.bonus === 0) {


              const Promotionnot = await models.Promotions.findOne({
                where: {
                  turnnotpro: 1
                }
              });



              let mamount = parseFloat(Promotionnot.max_bonus) + parseFloat(amount);
              const response = await deposit(mamount, member.sb_username);

              let before = response.data.result[0].beforeBalance;
              let resamount = response.data.result[0].amount;
              let after = response.data.result[0].afterBalance;
              let ref = response.data.result[0].ref;

              if (resamount == null) {
                const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
                error.statusCode = 422;
                error.validation = errors.array();
                throw error;
              }

              const tarnnotuuid = uuidv4();
              const trandeposit = await models.Member_account_bank_transaction.create({
                uuid: tarnnotuuid,
                bank: account.uuid,
                amount: amount,
                bonus_credit: Promotionnot.max_bonus,
                transaction_type: '1', //ฝากหรือถอน
                annotation: Promotionnot.promotion_name,
                credit_before: before,
                credit_after: after,
                bank_time: datesub + ' ' + timesub,
                create_by: 'auto',
                ref: ref,
                username: member.sb_username,
                promotion_uuid: Promotionnot.uuid,
                transaction_status: '1'

              });

              // insert transactions_curl
              const curltransaction = await this.curltransactions(title, date, time, amount, transfer_from_bank, bank_account_number, first_name, last_name, accountnumber, amounttotal, amountbalance);

              const refdepositnot = await models.Ref_deposits.create({
                uuid: uuidv4(),
                username: member.sb_username,
                ref: ref,
                acc_bank_transaction_uuid: tarnnotuuid,
                status: 0

              });

              res.status(200).json({
                data: {
                  message: "success",
                  member: trandeposit
                }
              });

            } else {

              //รับโปรโมชั่น
              let Promotion;
              Promotion = await models.Promotions.findOne({
                where: {
                  min_deposit: {
                    [Op.lte]: amount
                  },
                  max_deposit: {
                    [Op.gte]: amount
                  }
                }
              });


              if (Promotion == null) {

                Promotion = await models.Promotions.findOne({
                  where: {
                    turnnotpro: 1
                  }
                });

              }


              let mamount = parseFloat(Promotion.max_bonus) + parseFloat(amount);
              const response = await deposit(mamount, member.sb_username);

              let before = response.data.result[0].beforeBalance;
              let resamount = response.data.result[0].amount;
              let after = response.data.result[0].afterBalance;
              let ref = response.data.result[0].ref;

              if (resamount == null) {
                const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
                error.statusCode = 422;
                error.validation = errors.array();
                throw error;
              }

              const tarnprouuid = uuidv4();
              const trandeposit = await models.Member_account_bank_transaction.create({
                uuid: tarnprouuid,
                bank: account.uuid,
                amount: amount,
                bonus_credit: Promotion.max_bonus,
                transaction_type: '1', //ฝากหรือถอน
                annotation: Promotion.promotion_name,
                credit_before: before,
                credit_after: after,
                bank_time: datesub + ' ' + timesub,
                create_by: 'auto',
                ref: ref,
                username: member.sb_username,
                promotion_uuid: Promotion.uuid,
                transaction_status: '1'

              });

              // insert transactions_curl
              const curltransaction = await this.curltransactions(title, date, time, amount, transfer_from_bank, bank_account_number, first_name, last_name, accountnumber, amounttotal, amountbalance);
              const refdepositpro = await models.Ref_deposits.create({
                uuid: uuidv4(),
                username: member.sb_username,
                ref: ref,
                acc_bank_transaction_uuid: tarnprouuid,
                status: 0

              });

              res.status(200).json({
                data: {
                  message: "success",
                  member: trandeposit
                }
              });

            }

          } else {

            //โอนผ่าน promptpay

            let promotion;
            if (member.bonus === 0) {


              promotion = await models.Promotions.findOne({
                where: {
                  turnnotpro: 1
                }
              });

            } else {

              promotion = await models.Promotions.findOne({
                where: {
                  uuid: tranLatest[0].promotion_uuid
                }
              });

            }

            let mamount = parseFloat(promotion.max_bonus) + parseFloat(amount);
            // console.log('deposit');
            const response = await deposit(mamount, member.sb_username);

            let before = response.data.result[0].beforeBalance;
            let resamount = response.data.result[0].amount;
            let after = response.data.result[0].afterBalance;
            let ref = response.data.result[0].ref;

            if (resamount == null) {
              const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
              error.statusCode = 422;
              error.validation = errors.array();
              throw error;
            }

            // update
            const trandeposit = await models.Member_account_bank_transaction.update({
              credit_before: before,
              credit_after: after,
              bank_time: datesub + ' ' + timesub,
              create_by: 'auto',
              ref: ref,
              transaction_status: '1',
              annotation: promotion.promotion_name,
              promotion_uuid: promotion.uuid,

            }, {
              where: {
                uuid: tranLatest[0].uuid
              }
            });

            // insert transactions_curl
            const curltransaction = await this.curltransactions(title, date, time, amount, transfer_from_bank, bank_account_number, first_name, last_name, accountnumber, amounttotal, amountbalance);

            const refdepositprom = await models.Ref_deposits.create({
              uuid: uuidv4(),
              username: member.sb_username,
              ref: ref,
              acc_bank_transaction_uuid: tranLatest[0].uuid,
              status: 0

            });

            res.status(200).json({
              data: {
                message: "success",
                member: tranLatest
              }
            });

          }


        }



      }
      else {
        res.status(400).json({
          data: {

            success: false,
            message: 'key invalid'
          }
        });
      }

    }

  } catch (error) {

    next(error);

  }
}


async function findProfileScbBank(first_name, last_name, bank_account_number) {
  try {

    const bank_number = bank_account_number.substring(1, 20);

    const member = await models.Member.findOne({
      where: {
        first_name: {
          [Op.like]: '%' + first_name + '%'
        },
        last_name: {
          [Op.like]: '%' + last_name + '%'
        }
      }
    });

    if (member != null) {
      const bknumber = await models.Member_account_bank.findOne({
        where: {
          bank_number: {
            [Op.like]: '%' + bank_number + '%'
          }
        }
      });

      if (bknumber == null) {

        const memberfind = await models.Member.findOne({
          where: {
            tel: {
              [Op.like]: '%' + bank_number + '%'
            }
          }
        });

        if (memberfind != null) {
          const memberacount = await models.Member_account_bank.findOne({
            where: {
              member_uuid: memberfind.uuid
            }
          });

          return memberacount;

        } else {
          return memberfind;
        }



      } else {
        return bknumber;
      }


    }

    return member;

  } catch (error) {

    next(error);

  }
}



async function findProfileOtherBank(bank_account_number) {
  try {
    const bank_number = bank_account_number.substring(1, 20);
    if (bank_number != null) {

      const member = await models.Member_account_bank.findOne({
        where: {
          bank_number: {
            [Op.like]: '%' + bank_number + '%'
          }
        }
      });

      if (member == null) {
        const memberfind = await models.Member.findOne({
          where: {
            tel: {
              [Op.like]: '%' + bank_number + '%'
            }
          }
        });

        if (memberfind != null) {
          const memberacount = await models.Member_account_bank.findOne({
            where: {
              member_uuid: memberfind.uuid
            }
          });

          return memberacount;
        }



      } else {
        return member;
      }


    }
  } catch (error) {

    next(error);

  }
}


exports.withdrawIncome = async (req, res, next) => {
  try {
    // req.user.uuid

    // query income amount
    let sum = "SELECT\n"
    sum += "IFNULL(REPLACE(FORMAT(SUM(DISTINCT p1.total1), 2), ',', ''), 0) AS total1,\n"
    sum += "IFNULL(REPLACE(FORMAT(SUM(DISTINCT p2.total2 / 100 * p2.percent_value), 2), ',', ''), 0) AS total2,\n"
    sum += "IFNULL(REPLACE(FORMAT((SUM(DISTINCT p3.total3 / 100 * p3.percent_value) / 100 * p3.percent_value), 2), ',', ''), 0) AS total3,\n"
    sum += "IFNULL(REPLACE(FORMAT(((SUM(DISTINCT p4.total4 / 100 * p4.percent_value) / 100 * p4.percent_value) / 100 * p4.percent_value), 2), ',', ''), 0) AS total4,\n"
    sum += "IFNULL(REPLACE(FORMAT((((SUM(DISTINCT p5.total5 / 100 * p5.percent_value) / 100 * p5.percent_value) / 100 * p5.percent_value) / 100 * p5.percent_value), 2), ',', ''), 0) AS total5,\n"
    sum += "IFNULL(REPLACE(FORMAT(((((SUM(DISTINCT p6.total6 / 100 * p6.percent_value) / 100 * p6.percent_value) / 100 * p6.percent_value) / 100 * p6.percent_value) / 100 * p6.percent_value), 2), ',', ''), 0) AS total6,\n"
    sum += "IFNULL(REPLACE(FORMAT((((((SUM(DISTINCT p7.total7 / 100 * p7.percent_value) / 100 * p7.percent_value) / 100 * p7.percent_value) / 100 * p7.percent_value) / 100 * p7.percent_value) / 100 * p7.percent_value), 2), ',', ''), 0) AS total7,\n"
    sum += "IFNULL(REPLACE(FORMAT(((((((SUM(DISTINCT p8.total8 / 100 * p8.percent_value) / 100 * p8.percent_value) / 100 * p8.percent_value) / 100 * p8.percent_value) / 100 * p8.percent_value) / 100 * p8.percent_value) / 100 * p8.percent_value), 2), ',', ''), 0) AS total8,\n"
    sum += "IFNULL(REPLACE(FORMAT((((((((SUM(DISTINCT p9.total9 / 100 * p9.percent_value) / 100 * p9.percent_value) / 100 * p9.percent_value) / 100 * p9.percent_value) / 100 * p9.percent_value) / 100 * p9.percent_value) / 100 * p9.percent_value) / 100 * p9.percent_value), 2), ',', ''), 0) AS total9,\n"
    sum += "IFNULL(REPLACE(FORMAT(((((((((SUM(DISTINCT p10.total10 / 100 * p10.percent_value) / 100 * p10.percent_value) / 100 * p10.percent_value) / 100 * p10.percent_value) / 100 * p10.percent_value) / 100 * p10.percent_value) / 100 * p10.percent_value) / 100 * p10.percent_value) / 100 * p10.percent_value), 2), ',', ''), 0) AS total10\n"
    sum += "FROM (\n"
    sum += "   SELECT id, member_uuid_member FROM Affiliate_Members WHERE member_uuid = '"+req.user.uuid+"'\n"
    sum += ") AS f1\n"
    for (let i=2; i <= 10; i++) {
        sum += "LEFT JOIN (\n"
        sum += "   SELECT * FROM Affiliate_Members\n"
        sum += ") AS f"+i+" ON (f"+(i - 1)+".member_uuid_member = f"+i+".member_uuid)\n"
    }
    for (let i=1; i <= 10; i++) {
        sum += "LEFT JOIN (\n"
        sum += "	SELECT member_uuid_member, SUM((amount / 100) * percent_value) AS total"+i+", percent_value FROM Affiliate_Deposits WHERE `status` = 0 GROUP BY member_uuid_member\n"
        sum += ") AS p"+i+" ON (f"+i+".member_uuid_member = p"+i+".member_uuid_member)\n"
    } // end query income amount

    resultSum = await models.sequelize.query(sum, {
        type: models.sequelize.QueryTypes.SELECT
    });// resultSum query

    // convert obj to arr query income amount
    const con = Object.values(resultSum[0]);
    let con_ = con.map(Number); // convert string to number
    const reducer = (accumulator, currentValue) => accumulator + currentValue; // fn sum [ arr ]

    res.status(200).json({
        income: con_.reduce(reducer).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'), // sum and two decimal digits
    });

  } catch (error) {
    next(error);
  }
}

exports.callTBSGetOTP = async (req, res, next) => {
  var params = {
    key: req.body.key,
    secret: req.body.secret,
    msisdn: req.body.tel
  }
  try{
    const callTBS = tbs(TBS_REQUEST_OTP)
    const result = await callTBS.request(params)
    console.log("result getotp:",result);
    res.send(result);
  }catch (error){
    next(error); 
  }
}

exports.callTBSVerifyOTP = async (req, res, next) => {
  var params = {
    key: req.body.key,
    secret: req.body.secret,
    token: req.body.token,
    pin: req.body.pin
    }
  try{
    const callTBS = tbs(TBS_VERIFY_OTP)
    const result = await callTBS.verify(params)
    console.log("result verifyotp:",result);
    res.send(result);
  }catch (error){

    next(error); 
  }
}
