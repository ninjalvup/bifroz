const models = require("../models/index");
const { v4: uuidv4 } = require("uuid");
const askmebetController = require("./askmebetController");
const { Op } = require("sequelize");

exports.getCurlListSCB = async (req, res, next) => {
  try {
    const curlTransaction = await models.Transactions_Curl.findAll({
      where: {
        status: 1,
      },
      order: [["id", "DESC"]],
    });

    res.status(200).json({
      data: curlTransaction,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCurlListSCBnotaccount = async (req, res, next) => {
  try {
    const curlTransaction = await models.Transactions_Curl.findAll({
      where: {
        status: 0,
      },
      order: [["id", "DESC"]],
    });

    res.status(200).json({
      data: curlTransaction,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCurlByID = async (req, res, next) => {
  try {
    const id = req.params.id;

    const curlTransaction = await models.Transactions_Curl.findOne({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      data: curlTransaction,
    });
  } catch (error) {
    next(error);
  }
};

exports.approvedCurl = async (req, res, next) => {
  try {
    const statusApproved = 1;
    const id = req.params.id;
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
      where: { sb_username: username },
    });

    if(member.bonus === 1){
       bonus = await this.mapBonusPromotion(amount);
    } else {
       bonus = 0;
    }

    const time = `${bank_date} ${bank_time}`;
    totalAmount = amount + bonus;


      if (member === null) {
        const error = new Error("Not Found Member");
        error.statusCode = 404;
        throw error;
      } 

      bankMemeber = await models.Member_Account_Bank.findOne({
          attributes: ['uuid'],
          where: { member_uuid: member.uuid },
       });

      const Transactions_Curl = await models.Transactions_Curl.update(
        {
          status: statusApproved,
        },
        {
          where: {
            id: id,
          },
        }
      );

      response = await askmebetController.deposit(totalAmount, member._id);

      console.log(response);

      // insert transaction
      const account_transection = await models.Member_Account_Bank_Transaction.create(
              {
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
              }
      );

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

    if(bonusPromotion === null){
      bonusPromotion = await models.Promotion.findOne({
        where: {
          turnnotpro: 1
        }
      });
    }

    return bonusPromotion.max_bonus;
    
  } catch (error) {
    
  }
}
