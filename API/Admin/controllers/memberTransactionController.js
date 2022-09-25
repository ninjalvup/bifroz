const models = require("../models/index");
const { v4: uuidv4 } = require("uuid");
const askmebetController = require("./askmebetController");
const { Op } = require("sequelize");
const scb = require("./bank_withdraw/scb");
const appScb = require("./bank_withdraw/appScb");
const moment = require("moment");
const urlConfig = "http://localhost:5000";
const axios = require('axios')

let stackWithdraw = [];
let withdrawqueue = [];

exports.withdrawPendingForApprovalList = async (req, res, next) => {
  try {
    let startDate = req.query.start_date;
    let endDate = req.query.end_date;
    let username = req.query.username;
    let status = req.query.status;
    let withdraw;

    if (startDate !== "" && endDate !== "" && username === "" && status === "") {
      withdraw = await models.Member_Account_Bank_Transaction.findAll({
        where: {
          transaction_type: {
            [Op.or]: [2, 3]
          },
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
        include: [
          {
            as: "member_account_banks",
            model: models.Member_Account_Bank,
          },
        ],
        order: [["id", "DESC"]],
      });
    } else if (startDate !== "" && endDate !== "" && username !== "" && status === "") {
      withdraw = await models.Member_Account_Bank_Transaction.findAll({
        where: {
          transaction_type: {
            [Op.or]: [2, 3]
          },
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
          username: username,
        },
        include: [
          {
            as: "member_account_banks",
            model: models.Member_Account_Bank,
          },
        ],
        order: [["id", "DESC"]],
      });
    } else if (startDate !== "" && endDate !== "" && username === "" && status !== "") {
      withdraw = await models.Member_Account_Bank_Transaction.findAll({
        where: {
          transaction_type: {
            [Op.or]: [2, 3]
          },
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
          transaction_status: status
        },
        include: [
          {
            as: "member_account_banks",
            model: models.Member_Account_Bank,
          },
        ],
        order: [["id", "DESC"]],
      });
    } else {
      withdraw = await models.Member_Account_Bank_Transaction.findAll({
        where: {
          transaction_type: {
            [Op.or]: [2, 3]
          },
        },
        include: [
          {
            as: "member_account_banks",
            model: models.Member_Account_Bank,
          },
        ],
        order: [["id", "DESC"]],
      });
    }

    res.status(200).json({
      data: withdraw,
    });
  } catch (error) {
    next(error);
  }
};

exports.depositPendingForApprovalList = async (req, res, next) => {
  try {
    const withdraw = await models.Member_Account_Bank_Transaction.findAll({
      where: { transaction_type: 1, transaction_status: 0 },
      order: [["id", "DESC"]],
    });

    res.status(200).json({
      data: withdraw,
    });
  } catch (error) {
    next(error);
  }
};

exports.withdrawApprovedList = async (req, res, next) => {
  try {
    let startDate = req.query.start_date;
    let endDate = req.query.end_date;
    let username = req.query.username;
    let withdraw;

    if (startDate !== "" && endDate !== "" && username === "") {
      withdraw = await models.Member_Account_Bank_Transaction.findAll({
        where: {
          transaction_type: 2,
          transaction_status: 1,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
        include: [
          {
            as: "member_account_banks",
            model: models.Member_Account_Bank,
          },
        ],
        order: [["id", "DESC"]],
      });
    } else if (startDate !== "" && endDate !== "" && username !== "") {
      withdraw = await models.Member_Account_Bank_Transaction.findAll({
        where: {
          transaction_type: 2,
          transaction_status: 1,
          username: username,
        },
        include: [
          {
            as: "member_account_banks",
            model: models.Member_Account_Bank,
          },
        ],
        order: [["id", "DESC"]],
      });
    } else {
      withdraw = await models.Member_Account_Bank_Transaction.findAll({
        where: { transaction_type: 2, transaction_status: 1 },
        include: [
          {
            as: "member_account_banks",
            model: models.Member_Account_Bank,
          },
        ],
        order: [["id", "DESC"]],
      });
    }

    res.status(200).json({
      data: withdraw,
    });
  } catch (error) {
    next(error);
  }
};

exports.withdrawDisApprovedList = async (req, res, next) => {
  try {
    let startDate = req.query.start_date;
    let endDate = req.query.end_date;
    let username = req.query.username;
    let withdraw;

    if (startDate !== "" && endDate !== "" && username === "") {
      withdraw = await models.Member_Account_Bank_Transaction.findAll({
        where: {
          transaction_type: 2,
          transaction_status: 2,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
        include: [
          {
            as: "member_account_banks",
            model: models.Member_Account_Bank,
          },
        ],
        order: [["id", "DESC"]],
      });
    } else if (startDate !== "" && endDate !== "" && username !== "") {
      withdraw = await models.Member_Account_Bank_Transaction.findAll({
        where: {
          transaction_type: 2,
          transaction_status: 2,
          username: username,
        },
        include: [
          {
            as: "member_account_banks",
            model: models.Member_Account_Bank,
          },
        ],
        order: [["id", "DESC"]],
      });
    } else {
      withdraw = await models.Member_Account_Bank_Transaction.findAll({
        where: { transaction_type: 2, transaction_status: 2 },
        include: [
          {
            as: "member_account_banks",
            model: models.Member_Account_Bank,
          },
        ],
        order: [["id", "DESC"]],
      });
    }

    res.status(200).json({
      data: withdraw,
    });
  } catch (error) {
    next(error);
  }
};

exports.showApproveWithdrawByUUID = async (req, res, next) => {
  try {
    const uuid = req.params.uuid;
    console.log(uuid);

    const withdraw = await models.Member_Account_Bank_Transaction.findOne({
      where: {
        uuid: uuid,
      },
      attributes: ["uuid", "username", "amount"],
    });

    const response = await askmebetController.getCredit(withdraw.username);

    res.status(200).json({
      data: {
        withdraw: withdraw,
        current_credit: response.current_credit,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.approveWithdraw = async (req, res, next) => {
  try {
    const { uuid, create_by, annotation } = req.body;

     // update status
     await models.Member_Account_Bank_Transaction.update(
      {
        transaction_status: "Success",
        create_by: create_by,
        auto_status: "manual",
        annotation: annotation
      },
      {
        where: {
          uuid: uuid,
        },
      }
    );

      res.status(200).json({
        data: {
          message: "อัพเดทรายการถอนมือเรียบร้อย",
        },
      });



  } catch (error) {
    next(error);
  }
};

exports.checkDataMember = async (req, res, next) => {
  try {
    let refWithCredit, winLost, depositLatestOneWithPromotion, info;
    const username = req.params.username;
    let member;
    let current_time = moment().format("YYYY-MM-DD HH:mm:ss");

    const refLatest = await models.Ref_Deposit.findAll({
      attributes: ["id", "uuid", "username", "ref", "createdAt"],
      limit: 1,
      where: {
        username: username,
      },
      order: [["createdAt", "DESC"]],
    });

    member = await models.Member.findOne({
      attributes: { exclude: ["password"] },
      where: {
        sb_username: username,
      },
    });

    if (member === null) {
      const error = new Error("ไม่พบข้อมูลรหัสผู้ใช้งาน");
      error.statusCode = 404;
      throw error;
    }

    if (member !== null) {
      const bank = await models.Member_Account_Bank.findOne({
        where: {
          member_uuid: member.uuid,
        },
      });

      info = {
        uuid: bank.uuid,
        tel: member.tel,
        bank_account_name: bank.bank_account_name,
        bank_name: bank.bank_name,
        bank_number: bank.bank_number,
      };
    }

    const response = await askmebetController.getCredit(username);

    console.log(response);

    if (response !== null) {
      refWithCredit = await refLatest.map((refLatest, index) => {
        return {
          id: refLatest.id,
          uuid: refLatest.uuid,
          username: refLatest.username,
          ref: refLatest.ref,
          credit: response.current_credit[0].balance,
          createdAt: refLatest.createdAt,
        };
      });
    }

    if (refWithCredit.length === 0) {
      const error = new Error("ไม่พบข้อมูลการฝาก");
      error.statusCode = 404;
      throw error;
    } else {
      winLost = await this.getWinLostByRef(
        refWithCredit[0].username,
        // member.group_id,
        refWithCredit[0].ref,
        refWithCredit[0].createdAt,
        current_time
      );
      depositLatest = await this.getDepositLatest(refWithCredit[0].username);
      depositLatestOneWithPromotion = await this.getDepositLatestOne(
        refWithCredit[0].username
      );
    }

    res.status(200).json({
      user: refWithCredit,
      info: info,
      win_lost: winLost.data,
      deposit_latest_one_with_promotion: depositLatestOneWithPromotion,
      deposit_latest: depositLatest,
    });
  } catch (error) {
    next(error);
  }
};

exports.getWinLostByRef = async (
  username,
  groupId,
  dateTimeFrom,
  dateTimeTo
) => {
  try {
    const winLost = await askmebetController.winlose(
      username,
      groupId,
      dateTimeFrom,
      dateTimeTo
    );
    return winLost;
  } catch (error) {
    throw error;
  }
};

exports.getDepositLatest = async (username) => {
  try {
    const depositLatest = await models.Member_Account_Bank_Transaction.findAll({
      attributes: [
        "id",
        "uuid",
        "amount",
        "bonus_credit",
        "credit_before",
        "credit_after",
        "bank_time",
        "annotation",
        "ref",
      ],
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
};

exports.getDepositLatestOne = async (username) => {
  try {
    const depositLatestOne = await models.Member_Account_Bank_Transaction.findOne(
      {
        attributes: [
          "id",
          "uuid",
          "amount",
          "bonus_credit",
          "credit_before",
          "credit_after",
          "bank_time",
          "annotation",
          "ref",
          "promotion_uuid",
        ],
        limit: 1,
        where: {
          username: username,
          transaction_type: 1,
        },
        order: [["createdAt", "DESC"]],
      }
    );

    const promotion = await models.Promotion.findOne({
      where: {
        uuid: depositLatestOne.promotion_uuid,
      },
    });

    const refTurnOver = await models.Ref_Deposit.findOne({
      attributes: ["uuid"],
      include: [
        {
          as: "error_list_turnover",
          model: models.Error_List_TurnOver,
        },
      ],
      where: {
        ref: depositLatestOne.ref,
      },
    });

    return {
      deposit_last: depositLatestOne,
      promotion: promotion,
      ref_turn_over: refTurnOver,
    };
  } catch (error) {
    throw error;
  }
};

exports.makeWithdraw = async (req, res, next) => {
  try {
    const {
      bank_uuid,
      bank_time,
      amount,
      bonus_credit,
      username,
      annotation,
      create_by,
    } = req.body;
    const transaction_type = 2;
    const transaction_status = "Approve";
    const autoStatus = "-";
    let account_transection;

    //* check get credit
    const response = await askmebetController.getCredit(username);
    let current_credit = response.current_credit[0].balance;

    let member = await models.Member.findOne({
      attributes: ["uuid", "_id"],
      where: { sb_username: username },
    });

    if (member === null) {
      const error = new Error("Not Found Member");
      error.statusCode = 404;
      throw error;
    }

    if (amount > current_credit || amount === 0 || amount <= 0) {
      const error = new Error("ยอดถอน Credit ไม่ถูกต้อง");
      error.statusCode = 400;
      throw error;
    } else {

      // ตัดเครดิตออก
      let respWithdraw = await askmebetController.withdraw(amount, username); // member._id

      // insert transaction
      account_transection = await models.Member_Account_Bank_Transaction.create(
        {
          uuid: uuidv4(),
          amount: amount,
          bank: bank_uuid,
          bonus_credit: bonus_credit,
          credit_before: respWithdraw.data.result[0].beforeBalance,
          credit_after: respWithdraw.data.result[0].afterBalance,
          transaction_type: transaction_type,
          bank_time: bank_time,
          create_by: create_by,
          annotation: annotation,
          ref: "",
          transaction_status: transaction_status,
          auto_status: autoStatus,
          username: username,
        }
      );
    }

    res.status(201).json({
      message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
      data: account_transection,
    });
  } catch (error) {
    next(error);
  }
};

exports.checkSevenDay = async (req, res, next) => {
  try {
    const { username } = req.body;
    const transaction_type = 1; // ฝาก
    let member;

    if (username !== "") {
      member = await models.Member.findOne({
        where: { sb_username: username },
      });
    }

    if (member === null) {
      const error = new Error("ไม่พบข้อมูลรหัสผู้ใช้งาน");
      error.statusCode = 404;
      throw error;
    }

    const sevenDay = await models.Member_Account_Bank_Transaction.findAll({
      where: {
        username: username,
        transaction_type: transaction_type,
      },
    });

    res.status(200).json({
      data: sevenDay,
    });
  } catch (error) {
    next(error);
  }
};

exports.requeue = async (req, res, next) => {
  try {

  } catch (error) {
    next(error);
  }
};


// exports.approveWithdrawAuto = async (req, res, next) => {
//   try {

//     const { uuid, amount, bank_name, bank_number } = req.body;

//     let statusProcess;
//     let scbWithdraw;

//     console.log("data:", uuid, amount, bank_name, bank_number);

//     let bankCode = await this.findBankCode(bank_name);
//     console.log(bankCode);

//     const bank = await models.Main_Bank.findOne({
//       where: {
//         bank_status: 1,
//         bank_type: 2,
//       },
//     });

//     let scbLogin = await scb.login(bank.username, bank.password);
//     let current_time = moment().format("YYYY-MM-DD HH:mm:ss");
//     console.log("run...");
//     console.log(scbLogin);

//     console.log("data2:", uuid, amount, bank_name, bank_number);

//     if (scbLogin.data.status === "Success") {
//       // update status process
//       statusProcess = await models.Member_Account_Bank_Transaction.update(
//         {
//           auto_status: scbLogin.data.system,
//           transaction_status: scbLogin.data.status,
//           updatedAt: current_time,
//         },
//         {
//           where: {
//             uuid: uuid,
//           },
//         }
//       );

//       setTimeout(async function () {
//         scbWithdraw = await scb.withdraw(bankCode, bank_number, amount, uuid); // uuid
//         console.log(scbWithdraw);

//         if (scbWithdraw.data.status === "Success") {
//           statusProcess = await models.Member_Account_Bank_Transaction.update(
//             {
//               credit_bank_before: scbWithdraw.data.balance_before,
//               auto_status: scbWithdraw.data.system,
//               transaction_status: scbWithdraw.data.status,
//               updatedAt: current_time,
//             },
//             {
//               where: {
//                 uuid: uuid,
//               },
//             }
//           );

//           console.log(statusProcess);

//           res.status(200).json({
//             message: "อัพเดทข้อมูลเรียบร้อยแล้ว",
//             statusWithdraw: scbWithdraw.data.system,
//           });

//         } else if (scbWithdraw.data.status === "Fail") {
//           statusProcess = await models.Member_Account_Bank_Transaction.update(
//             {
//               auto_status: scbWithdraw.data.system,
//               transaction_status: scbWithdraw.data.status,
//               updatedAt: current_time,
//             },
//             {
//               where: {
//                 uuid: uuid,
//               },
//             }
//           );

//           console.log(statusProcess);

//           res.status(200).json({
//             message: "อัพเดทข้อมูลเรียบร้อยแล้ว",
//             statusWithdraw: scbWithdraw.data.system,
//           });
//         }
//       }, 3000);
//     } else if (scbLogin.data.status === "Fail") {
//       // update status process
//       statusProcess = await models.Member_Account_Bank_Transaction.update(
//         {
//           auto_status: scbLogin.data.system,
//           transaction_status: scbLogin.data.status,
//           updatedAt: current_time,
//         },
//         {
//           where: {
//             uuid: uuid,
//           },
//         }
//       );

//       console.log(statusProcess);

//     }

//   } catch (error) {
//     next(error);
//   }
// };

exports.approveWithdrawAuto = async (req, res, next) => {
  try {

    const { uuid, amount, bank_name, bank_number } = req.body;

    let statusProcess;
    let scbWithdraw;

    console.log("data:", uuid, amount, bank_name, bank_number);

    let bankCode = await this.findBankCode(bank_name);
    console.log(bankCode);

    const scb_App = await models.Scb_App.findOne({
      where:{
        status_type: 0,
        status: 1
      }
    });

    if(scb_App){

     let data = {
      amount: amount,
      uuid: uuid,
      bank_name: bank_name,
      bank_number: bank_number
     }

      let scbw = await appScb.withdraw(data);

    } else {

      const bank = await models.Main_Bank.findOne({
        where: {
          bank_status: 1,
          bank_type: 2,
        },
      });

      let scbLogin = await scb.login(bank.username, bank.password);
      let current_time = moment().format("YYYY-MM-DD HH:mm:ss");
      console.log("run...");
      console.log(scbLogin);

      console.log("data2:", uuid, amount, bank_name, bank_number);

      if (scbLogin.data.status === "Success") {
        // update status process
        statusProcess = await models.Member_Account_Bank_Transaction.update(
          {
            auto_status: scbLogin.data.system,
            transaction_status: scbLogin.data.status,
            updatedAt: current_time,
          },
          {
            where: {
              uuid: uuid,
            },
          }
        );

        setTimeout(async function () {
          scbWithdraw = await scb.withdraw(bankCode, bank_number, amount, uuid); // uuid
          console.log(scbWithdraw);

          if (scbWithdraw.data.status === "Success") {
            statusProcess = await models.Member_Account_Bank_Transaction.update(
              {
                credit_bank_before: scbWithdraw.data.balance_before,
                auto_status: scbWithdraw.data.system,
                transaction_status: scbWithdraw.data.status,
                updatedAt: current_time,
              },
              {
                where: {
                  uuid: uuid,
                },
              }
            );

            console.log(statusProcess);

            res.status(200).json({
              message: "อัพเดทข้อมูลเรียบร้อยแล้ว",
              statusWithdraw: scbWithdraw.data.system,
            });

          } else if (scbWithdraw.data.status === "Fail") {
            statusProcess = await models.Member_Account_Bank_Transaction.update(
              {
                auto_status: scbWithdraw.data.system,
                transaction_status: scbWithdraw.data.status,
                updatedAt: current_time,
              },
              {
                where: {
                  uuid: uuid,
                },
              }
            );

            console.log(statusProcess);

            res.status(200).json({
              message: "อัพเดทข้อมูลเรียบร้อยแล้ว",
              statusWithdraw: scbWithdraw.data.system,
            });
          }
        }, 3000);
      } else if (scbLogin.data.status === "Fail") {
        // update status process
        statusProcess = await models.Member_Account_Bank_Transaction.update(
          {
            auto_status: scbLogin.data.system,
            transaction_status: scbLogin.data.status,
            updatedAt: current_time,
          },
          {
            where: {
              uuid: uuid,
            },
          }
        );

        console.log(statusProcess);

      }

    }

  } catch (error) {
    next(error);
  }
};


exports.checkWithdrawStack = () => {
  try {
    if (stackWithdraw.length === 0) {
      return false;
    } else {
      return stackWithdraw.length;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.checkOTP = async (req, res, next) => {
  try {


    let byAuto = "ออโต้";

    let res;
    let current_time = moment().format("YYYY-MM-DD HH:mm:ss");
    let patt = /[OTP]+.[0-9]+/g;
    let { sms } = req.body;

    console.log("sms:", sms);

    console.log(sms.match(patt));


    if (sms.match(patt)) {
      console.log(sms);
      res = await scb.smsOTP(sms);
      console.log("res:", res);
      if (res.data.status === "Success") {
        console.log(res.data.system);
        console.log(res.data.status);
        let statusProcess = await models.Member_Account_Bank_Transaction.update(
          {
            credit_bank_after: res.data.balance_after,
            transaction_slip: "https://api.bifroz.com/withdraw" + res.data.image,
            annotation: res.data.content,
            auto_status: res.data.system,
            transaction_status: res.data.status,
            updatedAt: current_time,
          },
          {
            where: {
              uuid: res.data.uuid,
            },
          }
        );

        const withdrawUser = await models.Member_Account_Bank_Transaction.findOne({
          where: {
            uuid: res.data.uuid,
          },
          attributes: ["uuid", "username"],
        });

        console.log(withdrawUser);

        const lastRef = await models.Ref_Deposit.findOne({
          where: {
            username: withdrawUser.username,
          },
          order: [
            ['id', 'desc']
          ],
          limit: 1
        });

        console.log(lastRef);

        // check ref
        const checkRef = await models.Affiliate_Deposit.findAll({
          where: {
            ref: lastRef.ref
          },
          order: [
            ['id', 'desc']
          ],
          limit: 1
        })


          // diff date, Dew
      const date1 = new Date(lastRef.createdAt)
      const date2 = new Date()
      const diffTime = Math.abs(date2 - date1)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (checkRef[0].ref !=  null) {
        // get total_turn
        let validAmount = ''
        if (diffDays < 8) { // วันที่ check ต้องน้อยกว่า 8 วัน
          const  response = await axios.post(`${urlConfig}/api/winLost`, {
            username: withdrawUser.username,
            group_id: checkRef[0].ref,
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
            ref: checkRef[0].ref
          }
        })

        // update status
        await models.Member_Account_Bank_Transaction.update(
          {
            transaction_status: "Success",
            create_by: create_by,
            auto_status: "manual",
            annotation: annotation
          },
          {
            where: {
              uuid: uuid,
            },
          }
        );

      }

        console.log(statusProcess);
      }

    }

  } catch (error) {
    next(error);
  }
};

exports.findBankCode = async (bankName) => {
  try {
    if (bankName === "scb") {
      return "001";
    } else if (bankName === "kbnk") {
      return "004";
    } else if (bankName === "bbla") {
      return "002";
    } else if (bankName === "ktba") {
      return "006";
    } else if (bankName === "BAAC") {
      return "034";
    } else if (bankName === "ttb") {
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
    } else if (bankName === "TISCO") {
      return "067";
    } else if (bankName === "KKP") {
      return "069";
    } else if (bankName === "IBANK") {
      return "066";
    }
  } catch (error) { }
};

// exports.addRefDeposit = async (username, ref, accounTransectionUUID) => {
//   try {
//     const refDeposit = await models.Ref_Deposit.create({
//       uuid: uuidv4(),
//       username: username,
//       ref: ref,
//       acc_bank_transaction_uuid: accounTransectionUUID,
//       status: 0,
//     });

//     return refDeposit;
//   } catch (error) {}
// };

exports.updateStatusWithdraw = async (req, res, next) => {
  try {
    const { uuid, type, username, amount, annotation, create_by } = req.body;
    let status;
    let statusSystem;

    let member = await models.Member.findOne({
      attributes: ["_id"],
      where: { sb_username: username },
    });

    if (type === "cancel") {

      status = "Reject";
      statusSystem = "Normal";

      // คืนเครดิต;
      let response = await askmebetController.deposit(amount, username); // member._id
      let refDeposit = this.updateRefDeposit(username);

      await models.Member_Account_Bank_Transaction.update(
        {
          transaction_status: status,
          auto_status: statusSystem,
          annotation: annotation,
          create_by: create_by
        },
        {
          where: {
            uuid: uuid,
          },
        }
      );

      // const refDeposit2 = await this.addRefDeposit(
      //   username,
      //   response.result[0].ref,
      //   "-"
      // );

      res.status(200).json({
        message: "อัพเดทข้อมูลเรียบร้อยแล้ว",
      });
    } else if (type === "reset") {
      status = "Create";
      statusSystem = "Normal";

      await models.Member_Account_Bank_Transaction.update(
        {
          transaction_status: status,
          auto_status: statusSystem,
          create_by: create_by
        },
        {
          where: {
            uuid: uuid,
          },
        }
      );

      res.status(200).json({
        message: "อัพเดทข้อมูลเรียบร้อยแล้ว",
      });
    } else if (type === "update") {
      status = "Process";
      statusSystem = "Approve";

      await models.Member_Account_Bank_Transaction.update(
        {
          transaction_status: status,
          auto_status: statusSystem,
          create_by: create_by
        },
        {
          where: {
            uuid: uuid,
          },
        }
      );

      res.status(200).json({
        message: "อัพเดทข้อมูลเรียบร้อยแล้ว",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateRefDeposit = async (username) => {
  try {
    const refDeposit = await models.Ref_Deposit.update(
      {
        status: 0,
      },
      {
        where: {
          username: username,
        },
      }
    );

    return refDeposit;
  } catch (error) { }
};

// ถอน ออโต้ no admin
exports.getWithdrawList = async () => {
  try {

    let combines = await models.Combine.findOne({
      where: {
        id: 1
      }
    })

    if (combines.status_auto === 1) {

      console.log("status: auto withdraw working !!!");

      const withdrawSCB = await models.Member_Account_Bank_Transaction.findAll({
        where: {
          transaction_type: 2,
          transaction_status: "Approve",
          amount: {
            [Op.between]: [combines.credit_min, combines.credit_max],
            // [Op.lte]: combines.credit_min,
          },
        },
        include: [
          {
            as: "member_account_banks",
            model: models.Member_Account_Bank,
          },
        ],
        order: [["id", "DESC"]],
      });



      if (withdrawSCB.length > 0) {

        const statusQueue = await models.Member_Account_Bank_Transaction.update(
          {
            auto_status: 'queue',
            transaction_status: 'queue',
          },
          {
            where: {
              uuid: withdrawSCB[0].uuid,
            },
          }
        );


        withdrawqueue.push({
          amount: withdrawSCB[0].amount,
          uuid: withdrawSCB[0].uuid,
          bank_name: withdrawSCB[0].member_account_banks[0].bank_name,
          bank_number: withdrawSCB[0].member_account_banks[0].bank_number
        });

        console.log("input:", withdrawqueue);

        withdrawqueueauto();


      } else {
        console.log("Data Withdraw : 0");
      }

    } else {
      console.log("status: auto withdraw closed !!!");
    }



  } catch (error) {
    console.log(error);
  }
}

//setInterval(this.getWithdrawList, 2000)
