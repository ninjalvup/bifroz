const models = require("../models/index");
const { v4: uuidv4 } = require("uuid");
const askmebetController = require("./askmebetController");
const { Op } = require("sequelize");

exports.index = async (req, res, next) => {
  try {
    let startDate = req.query.start_date;
    let endDate = req.query.end_date;
    let username = req.query.username;
    let error_type = req.query.error_type;
    let error_list;
    let cutCreditTotal = 0;
    let addCreditTotal = 0;
    let slipCreditTotal = 0;

    if (
      startDate !== "" &&
      endDate !== "" &&
      username === "" &&
      error_type === ""
    ) {

      error_list = await models.Error_List.findAll({
        order: [["id", "DESC"]],
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      cutCreditTotal = await models.Error_List.findAll({
        attributes: [
          [models.sequelize.fn('sum', models.sequelize.col('amount')), 'totalAmount'],
        ],
        where: {
          error_list_name: "ตัดเครดิต",
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      }); 

      addCreditTotal = await models.Error_List.findAll({
        attributes: [
          [models.sequelize.fn('sum', models.sequelize.col('amount')), 'totalAmount'],
        ],
        where: {
          error_list_name: "เพิ่มเครดิต",
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });
      
      slipCreditTotal = await models.Error_List.findAll({
        attributes: [
          [models.sequelize.fn('sum', models.sequelize.col('amount')), 'totalAmount'],
        ],
        where: {
          error_list_name: "สลิปไม่แสดง",
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

    } else if (startDate !== "" && endDate !== "" && username !== "") {

      error_list = await models.Error_List.findAll({
        order: [["id", "DESC"]],
        where: {
          username: username,
        },
      });

    } else if (
      startDate !== "" &&
      endDate !== "" &&
      username === "" &&
      error_type !== ""
    ) {

      error_list = await models.Error_List.findAll({
        order: [["id", "DESC"]],
        where: {
          error_list_name: error_type,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

    } else {

      error_list = await models.Error_List.findAll({
        order: [["id", "DESC"]],
      });

       cutCreditTotal = await models.Error_List.findAll({
          attributes: [
            [models.sequelize.fn('sum', models.sequelize.col('amount')), 'totalAmount'],
          ],
          where: {
            error_list_name: "ตัดเครดิต"
          },
        }); 


        addCreditTotal = await models.Error_List.findAll({
          attributes: [
            [models.sequelize.fn('sum', models.sequelize.col('amount')), 'totalAmount'],
          ],
          where: {
            error_list_name: "เพิ่มเครดิต"
          },
        });
        
        slipCreditTotal = await models.Error_List.findAll({
          attributes: [
            [models.sequelize.fn('sum', models.sequelize.col('amount')), 'totalAmount'],
          ],
          where: {
            error_list_name: "สลิปไม่แสดง"
          },
        });
        
      
    }

    res.status(200).json({
      data: error_list,
      cutCreditTotal,
      addCreditTotal,
      slipCreditTotal
    });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const {
      error_list_name,
      username,
      amount,
      bonus_credit,
      date,
      annotation,
      create_by,
      turn_over,
    } = req.body;

    console.log(req.body);
    console.log(turn_over);

    let response;
    let errorList;
    let bankMember;
    let member;

    if (username !== "") {
      member = await models.Member.findOne({
        attributes: ["uuid", "_id"],
        where: { sb_username: username },
      });

      if (member === null) {
        const error = new Error("Not Found Member");
        error.statusCode = 404;
        throw error;
      }

      bankMember = await models.Member_Account_Bank.findOne({
        attributes: ["uuid"],
        where: { member_uuid: member.uuid },
      });
    }

    if (error_list_name === "เพิ่มเครดิต") {
      const transaction_type = 1;
      const transaction_status = "manual";

      // เพิ่มเครดิตออก;
      response = await askmebetController.deposit(amount, username); // member._id

      console.log(response);

      errorList = await models.Error_List.create({
        uuid: uuidv4(),
        username: username,
        amount: amount,
        bank: bankMember.uuid,
        bonus_credit: bonus_credit,
        credit_before: response.result[0].beforeBalance,
        credit_after: response.result[0].afterBalance,
        date: date,
        annotation: annotation,
        create_by: create_by,
        error_list_name: error_list_name,
        ref: response.result[0].ref,
      });

      // insert transaction
      const account_transection = await models.Member_Account_Bank_Transaction.create(
        {
          uuid: uuidv4(),
          amount: amount,
          bank: bankMember.uuid,
          bonus_credit: bonus_credit,
          credit_before: errorList.credit_before,
          credit_after: errorList.credit_after,
          transaction_type: transaction_type,
          bank_time: date,
          create_by: create_by,
          annotation: annotation,
          ref: errorList.ref,
          transaction_status: transaction_status,
          auto_status: "-",
          username: username,
        }
      );

      const refDeposit = await this.addRefDeposit(
        username,
        errorList.ref,
        account_transection.uuid,
        turn_over
      );


      // affiliate deposit
      const affiliateDeposit = await this.affiliateDeposit(username, amount, account_transection.ref);
      ///////////////////////

      res.status(201).json({
        message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
        account_transection: account_transection,
        data: errorList,
        resp: response,
        refDeposit: refDeposit,
        affiliateDeposit: affiliateDeposit
      });
    } else if (error_list_name === "ตัดเครดิต") {
      const transaction_type = 9;
      const transaction_status = "manual";

      // ตัดเครดิตออก
      response = await askmebetController.withdraw(amount, username); // member._id

      console.log(response.data.resp.code);

      if (response.data.resp.code === 0) {
        errorList = await models.Error_List.create({
          uuid: uuidv4(),
          username: username,
          amount: amount,
          bank: bankMember.uuid,
          bonus_credit: bonus_credit,
          credit_before: response.data.result[0].beforeBalance,
          credit_after: response.data.result[0].afterBalance,
          date: date,
          annotation: annotation,
          create_by: create_by,
          error_list_name: error_list_name,
          ref: response.data.result[0].ref,
        });
        

        // insert transaction
        const account_transection = await models.Member_Account_Bank_Transaction.create(
          {
            uuid: uuidv4(),
            amount: amount,
            bank: bankMember.uuid,
            bonus_credit: bonus_credit,
            credit_before: errorList.credit_before,
            credit_after: errorList.credit_after,
            transaction_type: transaction_type,
            bank_time: date,
            create_by: create_by,
            annotation: annotation,
            ref: errorList.ref,
            transaction_status: transaction_status,
            auto_status: "-",
            username: username,
          }
        );

        const refDeposit = this.updateRefDeposit(username);

        res.status(201).json({
          message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
          data: errorList,
          resp_api: response.data,
        });
      }

      if (response.data.resp.code !== 0) {
        const error = new Error(
          "Member no more balance to withdraw. Please try again"
        );
        error.statusCode = 400;
        throw error;
      }
    } else if (error_list_name === "สลิปไม่แสดง") {
      const transaction_type = 1;
      const transaction_status = "manual";

      // เพิ่มเครดิต;
      response = await askmebetController.deposit(amount, username); // member._id

      errorList = await models.Error_List.create({
        uuid: uuidv4(),
        username: username,
        amount: amount,
        bank: bankMember.uuid,
        bonus_credit: bonus_credit,
        credit_before: response.result[0].beforeBalance,
        credit_after: response.result[0].afterBalance,
        date: date,
        annotation: annotation,
        create_by: create_by,
        error_list_name: error_list_name,
        ref: response.result[0].ref,
      });

      // new
      let bonusDefault = await models.Promotion.findOne({
        where: {
          turnnotpro: 1,
        },
      });

      // insert transaction
      const account_transection = await models.Member_Account_Bank_Transaction.create(
        {
          uuid: uuidv4(),
          amount: amount,
          bank: bankMember.uuid,
          bonus_credit: bonus_credit,
          credit_before: errorList.credit_before,
          credit_after: errorList.credit_after,
          transaction_type: transaction_type,
          bank_time: date,
          create_by: create_by,
          annotation: annotation,
          ref: errorList.ref,
          transaction_status: transaction_status,
          auto_status: "-",
          username: username,
          promotion_uuid: bonusDefault.uuid  // new
        }
      );

      const refDeposit = await this.addRefDepositNoTurn(
        username,
        errorList.ref,
        account_transection.uuid
      );

      const affiliateDeposit = await this.affiliateDeposit(username, amount, account_transection.ref);

      res.status(201).json({
        message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
        account_transection: account_transection,
        data: errorList,
        resp: response,
        refDeposit: refDeposit,
        affiliateDeposit: affiliateDeposit
      });
    }
  } catch (error) {
    console.log(error)
    next(error);
  }
};


exports.addRefDeposit = async (
  username,
  ref,
  accounTransectionUUID,
  turn_over
) => {
  try {

    console.log("t: ", turn_over, username, ref, accounTransectionUUID);

    const refDeposit = await models.Ref_Deposit.create({
      uuid: uuidv4(),
      username: username,
      ref: ref,
      acc_bank_transaction_uuid: accounTransectionUUID,
      status: 0,
    });

    const turnOver = this.addTurnOver(turn_over, refDeposit.uuid);

    return turnOver;

  } catch (error) {}
};

exports.addRefDepositNoTurn = async (username, ref, accounTransectionUUID) => {
  try {
    const refDeposit = await models.Ref_Deposit.create({
      uuid: uuidv4(),
      username: username,
      ref: ref,
      acc_bank_transaction_uuid: accounTransectionUUID,
      status: 0,
    });

    const turnOver = this.addDefaultTurnOver(refDeposit.uuid);

    return turnOver;
  } catch (error) {}
};

exports.updateRefDeposit = async (username) => {
  try {
    const refDeposit = await models.Ref_Deposit.update(
      {
        status: 1,
      },
      {
        where: {
          username: username,
        },
      }
    );

    return refDeposit;

  } catch (error) {}
};

exports.addTurnOver = async (turnValue, refDeposit) => {
  try {

    const {
      turn_over_slot,
      turn_over_hdp,
      turn_over_mix_replay,
      turn_over_mix_step,
      turn_over_bacara,
      turn_over_thai_lotterry,
      turn_over_thai_m2,
      turn_over_thai_multiplayer,
      max_withdraw,
      turn_win,
      turn_over,
      turn_type,
    } = turnValue;

    const errorListTurnOver = await models.Error_List_TurnOver.create({
      uuid: uuidv4(),
      turn_over_slot: turn_over_slot,
      turn_over_hdp: turn_over_hdp,
      turn_over_mix_replay: turn_over_mix_replay,
      turn_over_mix_step: turn_over_mix_step,
      turn_over_bacara: turn_over_bacara,
      turn_over_thai_lotterry: turn_over_thai_lotterry,
      turn_over_thai_m2: turn_over_thai_m2,
      turn_over_thai_multiplayer: turn_over_thai_multiplayer,
      max_withdraw: max_withdraw,
      turn_win: turn_win,
      turn_over: turn_over,
      turn_type: turn_type,
      ref_deposit_uuid: refDeposit,
    });

    return errorListTurnOver;
  } catch (error) {}
};


exports.addDefaultTurnOver = async (refDeposit) => {
  try {

    const errorListTurnOver = await models.Error_List_TurnOver.create({
      uuid: uuidv4(),
      turn_over_slot: 1,
      turn_over_hdp: 1,
      turn_over_mix_replay: 1,
      turn_over_mix_step: 1,
      turn_over_bacara: 1,
      turn_over_thai_lotterry: 1,
      turn_over_thai_m2: 1,
      turn_over_thai_multiplayer: 1,
      max_withdraw: 10000,
      turn_win: 0,
      turn_over: 0,
      turn_type: 2,
      ref_deposit_uuid: refDeposit,
    });

    return errorListTurnOver;
    
  } catch (error) {}
};


exports.affiliateDeposit = async (username, amount, ref) => {
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
      status: 0,
      turnover: 0,
      ref: ref
    });

    
    return affiliateDeposit;
    
    
  } catch (error) {}
};
