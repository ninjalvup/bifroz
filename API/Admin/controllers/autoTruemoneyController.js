const models = require("../models/index");
const {
  v4: uuidv4
} = require("uuid");
const askmebetController = require("./askmebetController");

const bankdepositController = require("./bank_deposit/transaction");
const {
  Op
} = require("sequelize");
const {
  async
} = require("crypto-random-string");


exports.getTruemoney = async (req, res, next) => {
  try {
    const truemoneyTransaction = await models.Truemoney_Transactions.findAll({
      order: [
        ["uuid", "DESC"]
      ],
      where: {
        status: 1,
        createdAt: {
          [Op.gt]: new Date(),
        }
      }
    });

    res.status(200).json({
      data: truemoneyTransaction,
    });
  } catch (error) {
    next(error);
  }
};

exports.getTruemoneyNotaccount = async (req, res, next) => {
  try {
    const truemoneyTransaction = await models.Truemoney_Transactions.findAll({
      order: [
        ["uuid", "DESC"]
      ],
      where: {
        status: 0,
        createdAt: {
          [Op.gt]: new Date(),
        }
      }
    });

    res.status(200).json({
      data: truemoneyTransaction,
    });
  } catch (error) {
    next(error);
  }
};


exports.getTruemoneyByID = async (req, res, next) => {
  try {
    const uuid = req.params.uuid;

    const truemoneyTransactions = await models.Truemoney_Transactions.findOne({
      where: {
        uuid: uuid,
      },
    });

    if (truemoneyTransactions === null) {
      const error = new Error("Not Found Data");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      data: truemoneyTransactions,
    });
  } catch (error) {
    next(error);
  }
};

exports.approvedTruemoney = async (req, res, next) => {
  try {
    const statusApproved = 1;
    const uuid = req.params.uuid;
    let totalAmount = 0;
    let response;
    let bankMemeber;
    let bonus;

    const {
      amount,
      username,
      bank_date,
      bank_time,
      create_by
    } = req.body;

    let member = await models.Member.findOne({
      attributes: ['uuid', '_id', 'bonus'],
      where: {
        sb_username: username
      },
    });

    let resp = await this.mapBonusPromotion(amount);
    bonus = resp.max_bonus;
    console.log(bonus);

    const time = `${bank_date} ${bank_time}`;
    totalAmount = amount + bonus;


    if (member === null) {
      const error = new Error("Not Found Member");
      error.statusCode = 404;
      throw error;
    }

    bankMemeber = await models.Member_Account_Bank.findOne({
      attributes: ['uuid'],
      where: {
        member_uuid: member.uuid
      },
    });

    const truemoneyTransactions = await models.Truemoney_Transactions.update({
      status: statusApproved,
    }, {
      where: {
        uuid: uuid,
      },
    });

    response = await askmebetController.deposit(totalAmount, member._id);

    console.log(response);

    // insert transaction
    const account_transection = await models.Member_Account_Bank_Transaction.create({
      uuid: uuidv4(),
      amount: totalAmount,
      bank: bankMemeber.uuid,
      bonus_credit: bonus,
      credit_before: response.result[0].beforeBalance,
      credit_after: response.result[0].afterBalance,
      transaction_type: "1",
      bank_time: time,
      create_by: create_by,
      annotation: "-",
      ref: response.result[0].ref,
      transaction_status: "1",
      username: username,
    });

    console.log(account_transection);

    const refDeposit = await this.addRefDeposit(username, account_transection.ref, account_transection.uuid);


    res.status(200).json({
      message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
      account_transection: account_transection,
      refDeposit: refDeposit
    });



  } catch (error) {
    next(error);
  }
};

exports.addRefDeposit = async (username, ref, accounTransectionUUID) => {
  try {

    const refDeposit = await models.Ref_Deposit.create({
      uuid: uuidv4(),
      username: username,
      ref: ref,
      acc_bank_transaction_uuid: accounTransectionUUID,
      status: 0
    });

    return refDeposit;

  } catch (error) {}
};

exports.mapBonusPromotion = async (amount) => {
  try {

    let bonusPromotion;

    bonusPromotion = await models.Promotion.findOne({
      where: {
        min_deposit: {
          [Op.lte]: amount,
        },
        max_deposit: {
          [Op.gte]: amount,
        }
      },
    });

    if (bonusPromotion === null) {
      bonusPromotion = await models.Promotion.findOne({
        where: {
          turnnotpro: 1
        }
      });
    }

    return bonusPromotion;

  } catch (error) {

  }
}

exports.truewallet = async (req, res, next) => {
  try {

    const {
      text,
      title,
      amount,
      fname,
      lname,
      afterbalance,
      messagetime,
      bank_date,
      bank_time,
      key
    } = req.body;

    if (key === '52vda') {
      await this.deposittruewallet(text, title, amount, fname, lname, afterbalance, messagetime, bank_date, bank_time);
    }

    res.status(200).json({
      message: "เพิ่มข้อมูลเรียบร้อยแล้ว",

    });
  } catch (error) {
    next(error);
  }
}



exports.deposittruewallet = async (text, title, amount, bank_date, bank_time, tel) => {
  try {

    console.log(amount, bank_date, bank_time, tel);
    let create_by = "-";



    const member = await models.Member.findOne({
      attributes: ["uuid"],
      where: {
        tel: tel
      },
    });

    const memberAccountBank = await models.Member_Account_Bank.findOne({
      where: {
       member_uuid: member.uuid
      },
    });


    if (memberAccountBank !== null) {

      const existSms = await models.Sms_Transaction.findOne({
        where: {
          bank_date: bank_date,
          bank_time: bank_time,
          amount: amount,
          bank_tranfer: title,
          sms_content: text,
        }
      });

      if (existSms) {
        return 'not null'
      } else {

        const smsTransaction = await models.Sms_Transaction.create({
          uuid: uuidv4(),
          title_tranfer: title,
          bank_date: bank_date,
          bank_time: bank_time,
          amount: amount,
          bank_tranfer: title,
          sms_content: text,
          status: 1,
        });


        bankdepositController.approvedSmsSCBAuto(
          amount,
          memberAccountBank.member_uuid,
          bank_date,
          bank_time,
          create_by,
          smsTransaction.uuid
        );

        return 'ok'
      }
    } else {



      const existSms = await models.Sms_Transaction.findOne({
        where: {
          bank_date: bank_date,
          bank_time: bank_time,
          amount: amount,
          bank_tranfer: title,
          sms_content: text,
        }
      });

      if (existSms) {


        return 'null'
      }else {



      const smsTransaction = await models.Sms_Transaction.create({
        uuid: uuidv4(),
        title_tranfer: 'truewallet',
        bank_date: bank_date,
        bank_time: bank_time,
        amount: amount,
        bank_tranfer: title,
        sms_content: text,
        status: 0,
      });

      return 'bank';
    }

    }

  } catch (error) {
    return error
  }
}


exports.deposit = async (req, res, next) => {
  try {
    let  amount, fname, lname, afterbalance, bank_date, bank_time;
    const {text,title} = req.query;
    console.log(req.query);
    let sp = text.split(" ");
    // let suaf = sp[6].split("\n");
    amount = sp[1];
    tel = sp[4];
    // fname = "";
    // lname = "";
    // afterbalance = suaf[1];
   

    const moment = require("moment");
    let curentdatetime = moment();
    bank_date = moment(curentdatetime).format("DD/MM");
    bank_time = moment(curentdatetime).format("h:mm");
    //h:mm:ss

    const regex = new RegExp('คุณได้รับเงิน');

    console.log(regex.test(text)); // true
    let check = regex.test(text);

    if (check) {
      console.log("ok");
      // await this.deposittruewallet(text, title, amount, fname, lname, afterbalance, bank_date, bank_time, tel);
      await this.deposittruewallet(text, title, amount, bank_date, bank_time, tel);
    }

    res.status(200).json({
      message: "เพิ่มข้อมูลเรียบร้อยแล้ว",

    });

  } catch (error) {
    next(error)
  }
}
